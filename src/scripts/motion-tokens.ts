/** Shared Motion tokens — craft zoom, project entrance, view transitions. */

/** Strong ease-out for UI interactions (craft zoom, presses) */
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const EASE_OUT_CSS = 'cubic-bezier(0.23, 1, 0.32, 1)';

/**
 * Cinematic page curve — shared by the sheet VT and line reveals
 * so text rides the same motion language as the page surface.
 */
export const EASE_PAGE = [0.4, 0.3, 0, 1] as const;

export const EASE_PAGE_CSS = 'cubic-bezier(0.4, 0.3, 0, 1)';

/** View Transition duration (sheet in / out) */
export const PAGE_DURATION_S = 0.7;

export const PAGE_DURATION_CSS = `${PAGE_DURATION_S}s`;

/** Content entrance — snappy settle, no bounce (back / media) */
export const ENTRANCE_TWEEN = {
	type: 'spring',
	bounce: 0,
	duration: 0.45,
} as const;

/**
 * Masked line reveal — same ease as the page VT, slightly shorter
 * so copy finishes as the sheet settles (~700ms) instead of after it.
 */
export const TEXT_REVEAL = {
	type: 'tween',
	ease: EASE_PAGE,
	duration: 0.62,
} as const;

/** Cascade between masked lines inside one block */
export const LINE_STAGGER_S = 0.035;

/** Critically damped spring — craft zoom reposition (Apple move / response 0.4) */
export const SPRING_MOVE = { type: 'spring', bounce: 0, duration: 0.4 } as const;

/** Chrome fade durations for craft zoom overlay */
export const ZOOM_CHROME = {
	in: 0.2,
	out: 0.18,
	closeDelay: 0.08,
} as const;
