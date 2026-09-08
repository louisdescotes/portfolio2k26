import {
	markEntranceDone,
	prefersReducedMotion,
	remainingDelayMs,
	revealFadeUp,
	revealLines,
	revealMediaFadeUp,
	settle,
	waitForMediaReady,
} from './entrance-utils';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — project entrance
 *
 * Trigger: astro:page-load on .project-page
 * Rare / high-attention (project open) — delight OK.
 *
 * Text: tween 620ms · ease [0.4, 0.3, 0, 1] · line stagger 35ms
 * Chrome / media: spring bounce 0 / duration 0.45s
 *
 *     0ms   sheet VT running — content held (CSS)
 *   120ms   back settles in
 *   180ms   title lines reveal (stagger 35ms)
 *   260ms   type line
 *   340ms   description lines
 *   480ms   hero media fade-up (after poster; never blocks on mux ready)
 *   660ms   body below hero (MDX) — after cover has begun
 *  ~1100ms  entrance complete / styles cleared
 * ───────────────────────────────────────────────────────── */

const TIMING = {
	back: 120, // back control
	title: 180, // title lines
	type: 260, // type / meta
	description: 340, // description lines
	media: 480, // cover — storyboard beat (slips only if poster late)
	rest: 660, // MDX below hero — 180ms after media beat
};

const TEXT_STAGES = [
	{ key: 'title', at: TIMING.title },
	{ key: 'type', at: TIMING.type },
	{ key: 'description', at: TIMING.description },
] as const;

export function initProjectEntrance() {
	const page = document.querySelector<HTMLElement>('.project-page[data-entrance]');
	if (!page || page.dataset.entrance === 'done') return;

	if (prefersReducedMotion()) {
		markEntranceDone(page);
		return;
	}

	void (async () => {
		await document.fonts.ready;
		const entranceStartedAt = performance.now();

		const media = page.querySelector<HTMLElement>('[data-animate-media]');
		const rest = page.querySelector<HTMLElement>('[data-animate-rest]');
		// Prefetch poster while copy reveals — don't serialize behind text setup.
		const mediaReady = media ? waitForMediaReady(media) : Promise.resolve();

		const running: Array<{ finished: Promise<unknown> }> = [];

		const back = page.querySelector<HTMLElement>('[data-animate-back]');
		if (back) running.push(revealFadeUp(back, TIMING.back, { offsetY: 8 }));

		for (const stage of TEXT_STAGES) {
			const element = page.querySelector<HTMLElement>(
				`[data-animate-text="${stage.key}"]`,
			);
			if (!element) continue;

			const animation = revealLines(element, stage.at);
			if (animation) running.push(animation);
		}

		if (media) {
			running.push(
				revealMediaFadeUp(media, TIMING.media, entranceStartedAt, {
					ready: mediaReady,
				}),
			);
		}

		if (rest) {
			running.push({
				finished: (async () => {
					await mediaReady;
					// Keep rest 180ms after the cover's actual start (handles poster slip).
					const mediaStartMs =
						Math.max(TIMING.media, performance.now() - entranceStartedAt);
					const restAt = mediaStartMs + (TIMING.rest - TIMING.media);
					await settle(revealFadeUp(rest, remainingDelayMs(restAt, entranceStartedAt)));
				})(),
			});
		}

		await Promise.all(running.map(settle));
		markEntranceDone(page);
	})();
}
