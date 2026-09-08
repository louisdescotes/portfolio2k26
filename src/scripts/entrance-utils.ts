import { animate, stagger } from 'motion';
import { ENTRANCE_TWEEN, LINE_STAGGER_S, TEXT_REVEAL } from './motion-tokens';
import { splitElementIntoLines } from './split-lines';

const MEDIA_READY_TIMEOUT_MS = 2500;
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
	root.querySelectorAll<HTMLElement>('[data-animate-back], [data-animate-media]').forEach(
		resetInlineMotion,
	);
	root
		.querySelectorAll<HTMLElement>('[data-animate-text] .line > *')
		.forEach(resetInlineMotion);
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

	return animate(
		lines,
		{ y: [fromY, toY] },
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

const waitForPlayerReady = (player: HTMLElement) =>
	new Promise<void>((resolve) => {
		const media = player as HTMLMediaElement;
		if (typeof media.readyState === 'number' && media.readyState >= 1) {
			resolve();
			return;
		}

		const done = () => {
			player.removeEventListener('loadedmetadata', done);
			player.removeEventListener('loadeddata', done);
			resolve();
		};

		player.addEventListener('loadedmetadata', done, { once: true });
		player.addEventListener('loadeddata', done, { once: true });
	});

/** Wait for poster / first frame so we don't fade in an empty shell. */
export const waitForMediaReady = async (container: HTMLElement) => {
	const player = container.querySelector<HTMLElement>('video, mux-video');
	if (!player) return;

	const poster = player.getAttribute('poster');
	const tasks: Array<Promise<void>> = [];

	if (poster) tasks.push(loadPoster(poster));
	tasks.push(waitForPlayerReady(player));

	await Promise.race([Promise.all(tasks), sleep(MEDIA_READY_TIMEOUT_MS)]);
};

/**
 * Media entrance: translateY + opacity.
 * Honors storyboard `atMs`, but never before media is ready.
 * Returns the same `{ finished }` shape as other reveals so callers can settle uniformly.
 */
export const revealMediaFadeUp = (
	element: HTMLElement,
	atMs: number,
	entranceStartedAt: number,
	options: { offsetY?: number } = {},
): { finished: Promise<unknown> } => {
	const offsetY = options.offsetY ?? MEDIA_OFFSET_Y;

	element.style.opacity = '0';
	element.style.transform = `translateY(${offsetY}px)`;
	element.style.willChange = 'transform, opacity';

	const finished = (async () => {
		await waitForMediaReady(element);

		const elapsed = performance.now() - entranceStartedAt;
		const delaySec = Math.max(0, atMs - elapsed) / 1000;

		const animation = animate(
			element,
			{
				opacity: [0, 1],
				transform: [`translateY(${offsetY}px)`, 'translateY(0px)'],
			},
			{
				...ENTRANCE_TWEEN,
				delay: delaySec,
			},
		);

		await settle(animation);
	})();

	return { finished };
};
