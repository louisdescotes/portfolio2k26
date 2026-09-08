export function initProjectVideos(scope: ParentNode = document) {
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	scope.querySelectorAll<HTMLElement>('[data-project-video]').forEach((wrapper) => {
		if (wrapper.dataset.projectVideoInitialized === 'true') return;

		const player = wrapper.querySelector('video');
		if (!player) return;

		wrapper.dataset.projectVideoInitialized = 'true';

		const setMediaRatio = () => {
			if (!player.videoWidth || !player.videoHeight) return;

			const ratio = player.videoWidth / player.videoHeight;
			wrapper.style.setProperty('--media-ratio', `${ratio}`);
			wrapper.dataset.orientation = ratio < 1 ? 'portrait' : 'landscape';
		};

		player.addEventListener('loadedmetadata', setMediaRatio);
		if (player.readyState >= 1) setMediaRatio();

		if (prefersReducedMotion) return;

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
