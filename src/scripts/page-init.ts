import { initCarousels, restoreHomeScroll } from './init-carousels';
import { initCraftZoom, teardownCraftZoom } from './init-craft-zoom';
import { initHomeEntrance } from './init-home-entrance';
import { initMuxVideos } from './init-mux-videos';
import { initProjectEntrance } from './init-project-entrance';
import { initProjectVideos } from './init-project-videos';
import { resetPageScroll } from './page-scroll';

document.addEventListener('astro:before-swap', () => {
	teardownCraftZoom();
});

document.addEventListener('astro:after-swap', () => {
	if (document.querySelector('.home')) {
		restoreHomeScroll();
		return;
	}

	resetPageScroll();
});

document.addEventListener('astro:page-load', () => {
	if (document.querySelector('.project-page')) {
		resetPageScroll();
		initProjectEntrance();
	}

	if (document.querySelector('.home')) {
		initHomeEntrance();
	}

	initMuxVideos();
	initProjectVideos();
	initCarousels();
	initCraftZoom();
});
