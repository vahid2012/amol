import { ALL_BLOG_POSTS, SERVICES, CITIES, BRAND_PAGES, TV_REPAIR_BRANDS } from '../data/site';

export const GET = ({ site }: { site: URL }) => {
  const base = site?.origin ?? 'https://amol-service.ir';
  const staticPages = ['', 'about', 'contact', 'blog'];
  const servicePages = SERVICES.map((s) => s.slug);
  const cityPages = CITIES.map((c) => c.slug);
  const blogPages = ALL_BLOG_POSTS.map((p) => `blog/${p.slug}`);
  const brandPages = BRAND_PAGES.map((b) => `brands/${b.slug}`);
  const tvPages = TV_REPAIR_BRANDS.map((t) => t.slug);

  const all = [...staticPages, ...servicePages, ...cityPages, ...blogPages, ...brandPages, ...tvPages];

  const urls = all
    .map((path) => {
      const loc = `${base}/${path}`.replace(/\/$/, '') || base;
      return `  <url><loc>${loc}</loc><lastmod>2026-11-23</lastmod></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
