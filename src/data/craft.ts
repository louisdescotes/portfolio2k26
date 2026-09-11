export type CraftItem = {
	title: string;
	muxPlaybackId: string;
	src?: string;
	poster?: string;
	/** Unmute when zoomed (stays muted in the grid for autoplay). */
	hasAudio?: boolean;
};

export const craftItems: CraftItem[] = [
	{
		title: 'X Like',
		muxPlaybackId: 'local-xp4',
		src: '/craft/xp4.mp4',
		poster: '/craft/xp4-poster.jpg',
		hasAudio: true,
	},
	{
		title: 'Craft 1',
		muxPlaybackId: '2hIk7XjBp00buJ202IuLTwQn8x7H9bzFcLvUyrW7diO8E',
	},
	{
		title: 'Craft 2',
		muxPlaybackId: 'XNWQb6FwLFn6riwHxQErTeqliKe00897yjC1IeYaNIUw',
	},
	{
		title: 'Craft 3',
		muxPlaybackId: 'QJlKF84NsI4tOzD9YSsZkANtnCckW75FYKGctK002q00s',
	},
	{
		title: 'Craft 4',
		muxPlaybackId: 'VvaeJQKh81zqxwVD102eidioojhLdj019024X1a6zd9XEY',
	},
];
