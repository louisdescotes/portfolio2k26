let muxModulePromise: Promise<typeof import('@mux/mux-video')> | undefined;

function loadMuxVideo() {
	muxModulePromise ??= import('@mux/mux-video');
	return muxModulePromise;
}

function getPlayer(wrapper: HTMLElement) {
	return wrapper.querySelector<HTMLMediaElement>('video, mux-video');
}

export function initMuxVideos(scope: ParentNode = document) {
	const wrappers = [...scope.querySelectorAll<HTMLElement>('[data-mux-video]')];
	const hasHls = wrappers.some((wrapper) => wrapper.dataset.muxMode !== 'mp4');

	if (hasHls) void loadMuxVideo();

	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	wrappers.forEach((wrapper) => {
		if (wrapper.dataset.muxInitialized === 'true') return;

		const player = getPlayer(wrapper);
		if (!player) return;

		wrapper.dataset.muxInitialized = 'true';

		if (prefersReducedMotion) return;

		const isMp4 = wrapper.dataset.muxMode === 'mp4';
		const scrollRoot = wrapper.closest('.home, .project-page');
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (isMp4) {
						player.play?.().catch(() => {});
						return;
					}

					void loadMuxVideo().then(() => {
						player.play?.().catch(() => {});
					});
				} else if (
					wrapper.dataset.craftZoomed !== 'true' &&
					wrapper.closest('[data-craft-zoom-media]')?.dataset.craftZoomed !== 'true'
				) {
					player.pause?.();
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
