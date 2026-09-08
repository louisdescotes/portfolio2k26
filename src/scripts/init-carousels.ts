import '@blossom-carousel/web';
import { restorePageScroll, savePageScroll } from './page-scroll';

const DRAG_THRESHOLD = 10;
const CAROUSEL_SCROLL_KEY = 'projects-carousel-scroll';

function getTrack(carousel: HTMLElement) {
	return carousel.querySelector<HTMLElement>('.projects-carousel__track');
}

function saveCarouselScroll() {
	const track = document.querySelector<HTMLElement>('.projects-carousel__track');
	if (!track) return;

	sessionStorage.setItem(CAROUSEL_SCROLL_KEY, String(track.scrollLeft));
}

function restoreCarouselScroll(carousel: HTMLElement, onSettled: () => void) {
	const saved = sessionStorage.getItem(CAROUSEL_SCROLL_KEY);
	if (saved === null) {
		onSettled();
		return;
	}

	const track = getTrack(carousel);
	if (!track) {
		onSettled();
		return;
	}

	const scrollLeft = Number.parseFloat(saved);
	if (Number.isNaN(scrollLeft)) {
		onSettled();
		return;
	}

	const applyScroll = () => {
		track.scrollLeft = scrollLeft;
	};

	applyScroll();
	requestAnimationFrame(() => {
		applyScroll();
		requestAnimationFrame(onSettled);
	});
}

function initCarouselLinks(carousel: HTMLElement) {
	if (carousel.dataset.carouselLinksInit === 'true') return;

	const track = getTrack(carousel);
	if (!track) return;

	carousel.dataset.carouselLinksInit = 'true';

	let pointerStart = { x: 0, y: 0 };
	let hasDragged = false;

	const onPointerDown = (event: Event) => {
		const pointer = event as PointerEvent;
		pointerStart = { x: pointer.clientX, y: pointer.clientY };
		hasDragged = false;
	};

	const onPointerMove = (event: Event) => {
		const pointer = event as PointerEvent;
		if (
			Math.abs(pointer.clientX - pointerStart.x) > DRAG_THRESHOLD ||
			Math.abs(pointer.clientY - pointerStart.y) > DRAG_THRESHOLD
		) {
			hasDragged = true;
		}
	};

	track.addEventListener('pointerdown', onPointerDown, { passive: true });
	track.addEventListener('pointermove', onPointerMove, { passive: true });

	carousel.querySelectorAll<HTMLAnchorElement>('.projects-carousel__link').forEach((link) => {
		link.addEventListener('click', (event) => {
			if (hasDragged) {
				event.preventDefault();
				return;
			}

			saveCarouselScroll();
			savePageScroll();
		});
	});
}

export function initCarousels(scope: ParentNode = document) {
	scope.querySelectorAll<HTMLElement>('.projects-carousel').forEach((carousel) => {
		initCarouselLinks(carousel);
	});
}

export function restoreHomeScroll(scope: ParentNode = document) {
	const carousel = scope.querySelector<HTMLElement>('.projects-carousel');
	if (!carousel) {
		restorePageScroll();
		return;
	}

	restoreCarouselScroll(carousel, restorePageScroll);
}
