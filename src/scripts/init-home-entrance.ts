import {
	markEntranceDone,
	prefersReducedMotion,
	revealLines,
	revealMediaFadeUp,
	settle,
} from './entrance-utils';

/* ─────────────────────────────────────────────────────────
 * ANIMATION STORYBOARD — home entrance (once per session)
 *
 * Trigger: first home visit in this tab session only.
 * Reload / navigate away & back → instant, no motion.
 *
 * Orchestration with page-main VT (0→700ms, EASE_PAGE):
 * text starts mid-sheet so reveal + surface feel like one move.
 *
 * Text: tween 620ms · ease [0.4, 0.3, 0, 1] · line stagger 35ms
 * Media: spring bounce 0 / duration 0.45s
 *
 *     0ms   sheet VT running — content held
 *   160ms   name lines reveal (stagger 35ms)
 *   240ms   role / subtitle
 *   320ms   intro description
 *   460ms   projects fade-up (y + opacity, after poster)
 *  ~900ms   entrance complete / styles cleared
 * ───────────────────────────────────────────────────────── */

const HOME_ENTRANCE_KEY = 'home-entrance-seen';

const TIMING = {
	title: 160, // name rides the sheet in
	type: 240, // role line
	description: 320, // bio paragraph
	projects: 460, // projects heading + carousel
};

const TEXT_STAGES = [
	{ key: 'title', at: TIMING.title },
	{ key: 'type', at: TIMING.type },
	{ key: 'description', at: TIMING.description },
] as const;

const hasSeenHomeEntrance = () => {
	try {
		return sessionStorage.getItem(HOME_ENTRANCE_KEY) === '1';
	} catch {
		return false;
	}
};

const markHomeEntranceSeen = () => {
	try {
		sessionStorage.setItem(HOME_ENTRANCE_KEY, '1');
	} catch {
		// Private mode / blocked storage — still play once this load.
	}
};

export function initHomeEntrance() {
	const page = document.querySelector<HTMLElement>('.home[data-entrance]');
	if (!page || page.dataset.entrance === 'done') return;

	// Special moment already spent this session → show instantly.
	if (prefersReducedMotion() || hasSeenHomeEntrance()) {
		markEntranceDone(page);
		return;
	}

	// Consume the greeting before play so mid-nav / reload won't replay.
	markHomeEntranceSeen();

	void (async () => {
		await document.fonts.ready;
		const entranceStartedAt = performance.now();

		const running: Array<{ finished: Promise<unknown> }> = [];

		for (const stage of TEXT_STAGES) {
			const element = page.querySelector<HTMLElement>(
				`[data-animate-text="${stage.key}"]`,
			);
			if (!element) continue;

			const animation = revealLines(element, stage.at);
			if (animation) running.push(animation);
		}

		const projects = page.querySelector<HTMLElement>('[data-animate-media="projects"]');
		if (projects) {
			running.push(revealMediaFadeUp(projects, TIMING.projects, entranceStartedAt));
		}

		await Promise.all(running.map(settle));
		markEntranceDone(page);
	})();
}
