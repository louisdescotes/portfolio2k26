import { animate } from 'motion';
import { prefersReducedMotion, settle } from './entrance-utils';
import { EASE_OUT, SPRING_MOVE, ZOOM_CHROME } from './motion-tokens';

const IDENTITY_TRANSFORM = 'translate(0px, 0px) scale(1)';

type ZoomPhase = 'idle' | 'opening' | 'open' | 'closing';

interface CraftZoomSession {
	trigger: HTMLElement;
	media: HTMLElement;
	video: HTMLElement;
	player: HTMLMediaElement | null;
	hasAudio: boolean;
}

interface ZoomRect {
	left: number;
	top: number;
	width: number;
	height: number;
}

let phase: ZoomPhase = 'idle';
let session: CraftZoomSession | null = null;
let overlay: HTMLElement | null = null;
let closeGeneration = 0;
let lockedScrollTop = 0;
let openedAt = 0;

const CLOSE_GUARD_MS = 400;

const getPlayer = (video: HTMLElement) =>
	video.querySelector<HTMLMediaElement>('video, mux-video');

const getHome = () => document.querySelector<HTMLElement>('.home');

const getHeader = () => document.querySelector<HTMLElement>('.header');

const freezeHomeScroll = () => {
	const home = getHome();
	if (home) home.scrollTop = lockedScrollTop;
};

const preventHomeScroll = (event: Event) => {
	event.preventDefault();
};

const waitForFrame = () =>
	new Promise<void>((resolve) => {
		requestAnimationFrame(() => resolve());
	});

const waitForLayout = async () => {
	await waitForFrame();
	await waitForFrame();
};

const toHomeRect = (rect: DOMRect, homeRect: DOMRect): ZoomRect => ({
	left: rect.left - homeRect.left,
	top: rect.top - homeRect.top,
	width: rect.width,
	height: rect.height,
});

const getTargetRect = (source: ZoomRect, homeRect: DOMRect): ZoomRect => {
	const maxWidth = homeRect.width * 0.9;
	const maxHeight = homeRect.height * 0.85;
	const scale = Math.min(maxWidth / source.width, maxHeight / source.height);
	const width = source.width * scale;
	const height = source.height * scale;

	return {
		left: (homeRect.width - width) / 2,
		top: (homeRect.height - height) / 2,
		width,
		height,
	};
};

const getZoomTransform = (source: ZoomRect, target: ZoomRect) => {
	const scale = target.width / source.width;

	return `translate(${target.left - source.left}px, ${target.top - source.top}px) scale(${scale})`;
};

const applyFixedRect = (element: HTMLElement, rect: ZoomRect) => {
	element.style.position = 'fixed';
	element.style.left = `${rect.left}px`;
	element.style.top = `${rect.top}px`;
	element.style.width = `${rect.width}px`;
	element.style.height = `${rect.height}px`;
	element.style.margin = '0';
	element.style.zIndex = '201';
	element.style.transformOrigin = 'top left';
	element.style.willChange = 'transform';
};

const clearFixedRect = (element: HTMLElement) => {
	element.style.position = '';
	element.style.left = '';
	element.style.top = '';
	element.style.width = '';
	element.style.height = '';
	element.style.margin = '';
	element.style.zIndex = '';
	element.style.transform = '';
	element.style.transformOrigin = '';
	element.style.willChange = '';
};

const setPageInert = (isInert: boolean) => {
	const header = getHeader();
	if (!header) return;

	if (isInert) header.setAttribute('inert', '');
	else header.removeAttribute('inert');
};

const setScrollLock = (isLocked: boolean) => {
	const home = getHome();
	if (!home) return;

	if (isLocked) {
		lockedScrollTop = home.scrollTop;
		home.addEventListener('scroll', freezeHomeScroll);
		home.addEventListener('wheel', preventHomeScroll, { passive: false });
		home.addEventListener('touchmove', preventHomeScroll, { passive: false });
		return;
	}

	home.removeEventListener('scroll', freezeHomeScroll);
	home.removeEventListener('wheel', preventHomeScroll);
	home.removeEventListener('touchmove', preventHomeScroll);
};

const focusWithoutScroll = (element: HTMLElement) => {
	element.focus({ preventScroll: true });
	freezeHomeScroll();
};

const setOverlayOpen = (isOpen: boolean) => {
	if (!overlay) return;

	overlay.hidden = !isOpen;
	overlay.classList.toggle('is-open', isOpen);
	overlay.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
	freezeHomeScroll();
};

const restoreVideo = () => {
	if (!session) return;

	if (session.hasAudio && session.player) {
		session.player.muted = true;
		session.player.setAttribute('muted', '');
	}

	clearFixedRect(session.video);
	delete session.video.dataset.craftZoomed;
};

const resetChrome = (backdrop: HTMLElement, closeButton: HTMLElement) => {
	backdrop.style.opacity = '';
	closeButton.style.opacity = '';
	closeButton.style.transform = '';
};

const finishIdle = (shouldRestoreFocus = true) => {
	restoreVideo();
	setOverlayOpen(false);
	setPageInert(false);
	setScrollLock(false);

	if (overlay) {
		const backdrop = overlay.querySelector<HTMLElement>('[data-craft-zoom-backdrop]');
		const closeButton = overlay.querySelector<HTMLElement>('[data-craft-zoom-close]');
		if (backdrop && closeButton) resetChrome(backdrop, closeButton);
	}

	const trigger = session?.trigger;
	session = null;
	phase = 'idle';
	if (shouldRestoreFocus && trigger) focusWithoutScroll(trigger);
};

const isPointerCloseLocked = () => performance.now() - openedAt < CLOSE_GUARD_MS;

const keepPlaying = (player: HTMLMediaElement | null, withSound = false) => {
	if (!player) return;

	if (withSound) {
		player.muted = false;
		player.removeAttribute('muted');
	}

	player.play?.().catch(() => {});
};

const lockPressScale = (trigger: HTMLElement) => {
	trigger.dataset.craftPressLock = 'true';

	const clear = () => {
		delete trigger.dataset.craftPressLock;
		trigger.removeEventListener('pointerup', clear);
		trigger.removeEventListener('pointercancel', clear);
		trigger.removeEventListener('lostpointercapture', clear);
	};

	trigger.addEventListener('pointerup', clear);
	trigger.addEventListener('pointercancel', clear);
	trigger.addEventListener('lostpointercapture', clear);
};

const openZoom = async (trigger: HTMLElement) => {
	if (phase !== 'idle' || !overlay) return;

	const home = getHome();
	const media = trigger.querySelector<HTMLElement>('.craft-card__media');
	const video =
		trigger.querySelector<HTMLElement>('[data-craft-zoom-media]') ??
		trigger.querySelector<HTMLElement>('[data-mux-video]');
	const backdrop = overlay.querySelector<HTMLElement>('[data-craft-zoom-backdrop]');
	const closeButton = overlay.querySelector<HTMLButtonElement>('[data-craft-zoom-close]');

	if (!home || !media || !video || !backdrop || !closeButton) return;

	// Force scale(1) before measuring — :active otherwise leaves media at 0.97.
	lockPressScale(trigger);
	video.dataset.craftZoomed = 'true';
	await waitForLayout();

	const homeRect = home.getBoundingClientRect();
	const sourceRect = toHomeRect(video.getBoundingClientRect(), homeRect);
	if (sourceRect.width === 0 || sourceRect.height === 0) {
		delete video.dataset.craftZoomed;
		delete trigger.dataset.craftPressLock;
		return;
	}

	phase = 'opening';
	const generation = closeGeneration;
	const player = getPlayer(video);
	const hasAudio = trigger.dataset.craftAudio === 'true';
	const title = trigger.dataset.craftTitle ?? 'Craft';
	const titleEl = overlay.querySelector('.craft-zoom__title');
	if (titleEl) titleEl.textContent = title;

	session = { trigger, media, video, player, hasAudio };
	keepPlaying(player, hasAudio);
	openedAt = performance.now();

	setScrollLock(true);
	setOverlayOpen(true);
	setPageInert(true);
	applyFixedRect(video, sourceRect);

	const zoomTransform = getZoomTransform(sourceRect, getTargetRect(sourceRect, homeRect));
	const reduceMotion = prefersReducedMotion();

	if (reduceMotion) {
		video.style.transform = zoomTransform;
		backdrop.style.opacity = '0';
		closeButton.style.opacity = '0';
		await waitForLayout();
		freezeHomeScroll();

		if (generation !== closeGeneration) return;

		phase = 'open';
		focusWithoutScroll(closeButton);

		await Promise.all([
			settle(animate(backdrop, { opacity: 1 }, { duration: ZOOM_CHROME.in, ease: EASE_OUT })),
			settle(animate(closeButton, { opacity: 1 }, { duration: ZOOM_CHROME.in, ease: EASE_OUT })),
		]);
		return;
	}

	video.style.transform = IDENTITY_TRANSFORM;
	backdrop.style.opacity = '0';
	closeButton.style.opacity = '0';
	closeButton.style.transform = 'scale(0.95)';
	await waitForLayout();
	freezeHomeScroll();

	if (generation !== closeGeneration) return;

	phase = 'open';
	focusWithoutScroll(closeButton);

	await Promise.all([
		settle(animate(video, { transform: zoomTransform }, SPRING_MOVE)),
		settle(animate(backdrop, { opacity: 1 }, { duration: ZOOM_CHROME.in, ease: EASE_OUT })),
		settle(
			animate(
				closeButton,
				{ opacity: 1, transform: 'scale(1)' },
				{ duration: ZOOM_CHROME.in, delay: ZOOM_CHROME.closeDelay, ease: EASE_OUT },
			),
		),
	]);
};

const closeZoom = async (immediate = false) => {
	if (phase === 'idle') return;
	if (phase === 'closing' && !immediate) return;
	if (!immediate && isPointerCloseLocked()) return;

	closeGeneration += 1;
	const generation = closeGeneration;

	if (immediate || !overlay || !session) {
		finishIdle(!immediate);
		return;
	}

	const { video } = session;
	const backdrop = overlay.querySelector<HTMLElement>('[data-craft-zoom-backdrop]');
	const closeButton = overlay.querySelector<HTMLElement>('[data-craft-zoom-close]');
	if (!backdrop || !closeButton) {
		finishIdle();
		return;
	}

	phase = 'closing';
	if (session.hasAudio && session.player) {
		session.player.muted = true;
		session.player.setAttribute('muted', '');
	}
	keepPlaying(session.player);
	lockPressScale(session.trigger);

	if (prefersReducedMotion()) {
		video.style.transform = IDENTITY_TRANSFORM;
		await Promise.all([
			settle(animate(backdrop, { opacity: 0 }, { duration: ZOOM_CHROME.out, ease: EASE_OUT })),
			settle(animate(closeButton, { opacity: 0 }, { duration: ZOOM_CHROME.out, ease: EASE_OUT })),
		]);

		if (generation !== closeGeneration) return;
		finishIdle();
		return;
	}

	await Promise.all([
		settle(animate(video, { transform: IDENTITY_TRANSFORM }, SPRING_MOVE)),
		settle(animate(backdrop, { opacity: 0 }, { duration: ZOOM_CHROME.out, ease: EASE_OUT })),
		settle(
			animate(
				closeButton,
				{ opacity: 0, transform: 'scale(0.95)' },
				{ duration: ZOOM_CHROME.out, ease: EASE_OUT },
			),
		),
	]);

	if (generation !== closeGeneration) return;
	finishIdle();
};

const onKeyDown = (event: KeyboardEvent) => {
	if (event.key !== 'Escape') return;
	if (phase === 'idle' || phase === 'closing') return;

	event.preventDefault();
	void closeZoom(true);
};

const onTriggerClick = (event: Event) => {
	event.stopPropagation();
	const trigger = event.currentTarget as HTMLElement | null;
	if (!trigger) return;

	if (phase === 'opening' || phase === 'open') {
		void closeZoom();
		return;
	}

	void openZoom(trigger);
};

export function teardownCraftZoom() {
	document.removeEventListener('keydown', onKeyDown);
	void closeZoom(true);
	overlay = null;
}

export function initCraftZoom() {
	const nextOverlay = document.querySelector<HTMLElement>('[data-craft-zoom]');
	if (!nextOverlay) return;

	if (overlay && overlay !== nextOverlay) teardownCraftZoom();

	overlay = nextOverlay;

	if (overlay.dataset.craftZoomInitialized === 'true') return;
	overlay.dataset.craftZoomInitialized = 'true';

	const backdrop = overlay.querySelector<HTMLElement>('[data-craft-zoom-backdrop]');
	const closeButton = overlay.querySelector<HTMLButtonElement>('[data-craft-zoom-close]');
	if (!backdrop || !closeButton) return;

	backdrop.addEventListener('click', () => {
		void closeZoom();
	});

	closeButton.addEventListener('click', () => {
		void closeZoom();
	});

	document.addEventListener('keydown', onKeyDown);

	document.querySelectorAll<HTMLElement>('[data-craft-zoom-trigger]').forEach((trigger) => {
		trigger.addEventListener('click', onTriggerClick);
	});
}
