import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
	if (!site) return new Response(null, { status: 404 });

	const projects = await getCollection('projects');
	const pages = ['/', ...projects.map((project) => `/projets/${project.id}/`)];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(path) => `  <url>
    <loc>${new URL(path, site).href}</loc>
  </url>`,
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
};
