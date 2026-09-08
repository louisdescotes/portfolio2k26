import { animate, stagger } from 'motion';
import { ENTRANCE_TWEEN, LINE_STAGGER_S, TEXT_REVEAL } from './motion-tokens';
import { splitElementIntoLines } from './split-lines';

const MEDIA_READY_TIMEOUT_MS = 1200;
const MEDIA_OFFSET_Y = 22;

export const prefersReducedMotion = () =>
	window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const settle = async (animation: { finished: Promise<unknown> }) => {
	try {
		await animation.finished;
	} catch {
		// Interrupted or cancelled mid-flight.
	}
};

const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export const resetInlineMotion = (element: HTMLElement) => {
	element.style.opacity = '';
	element.style.transform = '';
	element.style.clipPath = '';
	element.style.willChange = '';
};

export const markEntranceDone = (root: HTMLElement) => {
	root
		.querySelectorAll<HTMLElement>(
			'[data-animate-back], [data-animate-media], [data-animate-rest]',
		)
		.forEach(resetInlineMotion);
	root
		.querySelectorAll<HTMLElement>('[data-animate-text] .line > *')
		.forEach(resetInlineMotion);
	root.querySelectorAll<HTMLElement>('[data-animate-text]').forEach((element) => {
		element.style.minHeight = '';
	});
	root.dataset.entrance = 'done';
};

export const revealLines = (
	element: HTMLElement,
	startMs: number,
	options: {
		fromY?: string;
		toY?: string;
		stagger?: number;
	} = {},
) => {
	const fromY = options.fromY ?? '110%';
	const toY = options.toY ?? '0%';
	const lineStagger = options.stagger ?? LINE_STAGGER_S;

	const lines = splitElementIntoLines(element);
	if (lines.length === 0) return null;

	for (const line of lines) line.style.willChange = 'transform';

	// Full `transform` string — Motion `y` shorthand is main-thread / rAF.
	return animate(
		lines,
		{
			transform: [`translateY(${fromY})`, `translateY(${toY})`],
		},
		{
			...TEXT_REVEAL,
			delay: stagger(lineStagger, { startDelay: startMs / 1000 }),
		},
	);
};

/** Opacity + rise — for chrome like the back control */
export const revealFadeUp = (
	element: HTMLElement,
	startMs: number,
	options: {
		offsetY?: number;
	} = {},
) => {
	const offsetY = options.offsetY ?? MEDIA_OFFSET_Y;

	element.style.opacity = '0';
	element.style.transform = `translateY(${offsetY}px)`;
	element.style.willChange = 'transform, opacity';

	return animate(
		element,
		{
			opacity: [0, 1],
			transform: [`translateY(${offsetY}px)`, 'translateY(0px)'],
		},
		{
			...ENTRANCE_TWEEN,
			delay: startMs / 1000,
		},
	);
};

const loadPoster = (url: string) =>
	new Promise<void>((resolve) => {
		const img = new Image();
		img.onload = () => resolve();
		img.onerror = () => resolve();
		img.src = url;
	});

/**
 * Poster is enough to fade the cover in — don't block on mux-video metadata
 * (can stall for seconds on mobile).
 */
export const waitForMediaReady = async (container: HTMLElement) => {
	const player = container.querySelector<HTMLElement>('video, mux-video');
	if (!player) return;

	const poster = player.getAttribute('poster');
	if (!poster) return;

	await Promise.race([loadPoster(poster), sleep(MEDIA_READY_TIMEOUT_MS)]);
};

/**
 * Delay (ms) from now so a storyboard `atMs` still lands on the clock,
 * after an async gate like poster load.
 */
export const remainingDelayMs = (atMs: number, entranceStartedAt: number) =>
	Math.max(0, atMs - (performance.now() - entranceStartedAt));

/**
 * Media entrance: translateY + opacity.
 * Honors storyboard `atMs`, but never before the poster is ready.
 * Pass a prefetched `ready` promise so poster load overlaps copy reveals.
 */
export const revealMediaFadeUp = (
	element: HTMLElement,
	atMs: number,
	entranceStartedAt: number,
	options: { offsetY?: number; ready?: Promise<void> } = {},
): { finished: Promise<unknown> } => {
	const offsetY = options.offsetY ?? MEDIA_OFFSET_Y;

	element.style.opacity = '0';
	element.style.transform = `translateY(${offsetY}px)`;
	element.style.willChange = 'transform, opacity';

	const finished = (async () => {
		await (options.ready ?? waitForMediaReady(element));

		const animation = animate(
			element,
			{
				opacity: [0, 1],
				transform: [`translateY(${offsetY}px)`, 'translateY(0px)'],
			},
			{
				...ENTRANCE_TWEEN,
				delay: remainingDelayMs(atMs, entranceStartedAt) / 1000,
			},
		);

		await settle(animation);
	})();

	return { finished };
};
