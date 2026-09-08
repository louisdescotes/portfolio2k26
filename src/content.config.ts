import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		type: z.string(),
		description: z.string(),
		muxPlaybackId: z.string(),
		coverVideo: z.string(),
		coverPoster: z.string(),
		order: z.number(),
	}),
});

export const collections = { projects };
