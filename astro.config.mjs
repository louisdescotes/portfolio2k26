// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

const site =
	process.env.SITE ??
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: undefined);

// https://astro.build/config
export default defineConfig({
	integrations: [mdx()],
	site,
	compressHTML: true,
	build: {
		inlineStylesheets: 'auto',
	},
	vite: {
		build: {
			chunkSizeWarningLimit: 700,
		},
	},
});
