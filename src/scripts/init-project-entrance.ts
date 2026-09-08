import {
	markEntranceDone,
	prefersReducedMotion,
	revealFadeUp,
	revealLines,
	revealMediaFadeUp,
	settle,
} from './entrance-utils';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — project entrance
 *
 * Trigger: astro:page-load on .project-page
 * Orchestration with page-main VT (0→700ms, EASE_PAGE):
 * copy reveals while the sheet is still arriving.
 *
 * Text: tween 620ms · ease [0.4, 0.3, 0, 1] · line stagger 35ms
 * Chrome: spring bounce 0 / duration 0.45s
 *
 *     0ms   sheet VT running — content held
 *   120ms   back settles in
 *   180ms   title lines reveal (stagger 35ms)
 *   260ms   type line
 *   340ms   description lines
 *   480ms   hero media fade-up (y + opacity, after poster)
 *  ~900ms   entrance complete / styles cleared
 * ───────────────────────────────────────────────────────── */

const TIMING = {
	back: 120, // back control — early, low travel
	title: 180, // title rides the sheet in
	type: 260, // type / meta line
	description: 340, // description lines
	media: 480, // cover fade-up after copy — waits for poster
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

		const media = page.querySelector<HTMLElement>('[data-animate-media]');
		if (media) {
			running.push(revealMediaFadeUp(media, TIMING.media, entranceStartedAt));
		}

		await Promise.all(running.map(settle));
		markEntranceDone(page);
	})();
}
