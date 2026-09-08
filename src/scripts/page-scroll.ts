const PAGE_SCROLL_KEY = 'page-main-scroll';

export function getPageScrollElement(): HTMLElement | null {
	return document.querySelector<HTMLElement>('.home, .project-page');
}

export function savePageScroll() {
	const scrollElement = getPageScrollElement();
	if (!scrollElement) return;

	sessionStorage.setItem(PAGE_SCROLL_KEY, String(scrollElement.scrollTop));
}

export function resetPageScroll() {
	const scrollElement = getPageScrollElement();
	if (!scrollElement) return;

	scrollElement.scrollTop = 0;
}

export function restorePageScroll() {
	const scrollElement = getPageScrollElement();
	if (!scrollElement || !document.querySelector('.home')) return;

	const saved = sessionStorage.getItem(PAGE_SCROLL_KEY);
	if (saved === null) return;

	const scrollTop = Number.parseFloat(saved);
	if (Number.isNaN(scrollTop)) return;

	scrollElement.scrollTop = scrollTop;
}
