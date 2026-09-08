export function initProjectVideos(scope: ParentNode = document) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (prefersReducedMotion) return;

	scope.querySelectorAll<HTMLElement>('[data-project-video]').forEach((wrapper) => {
		if (wrapper.dataset.projectVideoInitialized === 'true') return;

		const player = wrapper.querySelector('video');
		if (!player) return;

		wrapper.dataset.projectVideoInitialized = 'true';

		const scrollRoot = wrapper.closest('.home, .project-page');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					player.play().catch(() => {});
				} else {
					player.pause();
				}
			},
			{
				threshold: 0.35,
				rootMargin: '120px',
				root: scrollRoot instanceof HTMLElement ? scrollRoot : null,
			},
		);

		observer.observe(wrapper);
	});
}
