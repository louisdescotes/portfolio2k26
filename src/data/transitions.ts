import { EASE_PAGE_CSS, PAGE_DURATION_CSS } from '../scripts/motion-tokens';

const ease = EASE_PAGE_CSS;
const duration = PAGE_DURATION_CSS;

const pageMainAnim = {
	old: {
		name: 'page-main-out',
		duration,
		easing: ease,
		fillMode: 'both',
	},
	new: {
		name: 'page-main-in',
		duration,
		easing: ease,
		fillMode: 'both',
	},
} as const;

const siteHeaderAnim = {
	old: {
		name: 'site-header-out',
		duration,
		easing: ease,
		fillMode: 'both',
	},
	new: {
		name: 'site-header-in',
		duration,
		easing: ease,
		fillMode: 'both',
	},
} as const;

export const pageMainTransition = {
	forwards: pageMainAnim,
	backwards: pageMainAnim,
} as const;

export const siteHeaderTransition = {
	forwards: siteHeaderAnim,
	backwards: siteHeaderAnim,
} as const;
