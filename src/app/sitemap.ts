import { MetadataRoute } from 'next';
import { propertiesApi } from '@/lib/api/properties';
import { blogsApi } from '@/lib/api/blogs';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://getplot.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${siteUrl}/buy`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/rent`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/commercial`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/post-property`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ];

  let propertyRoutes: MetadataRoute.Sitemap = [];
  try {
    const propRes = await propertiesApi.getAll({ per_page: 50 });
    if (propRes.data) {
      propertyRoutes = propRes.data.map((p) => ({
        url: `${siteUrl}/property/${p.slug}`,
        lastModified: p.published_at ? new Date(p.published_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }));
    }
  } catch {
    // fallback
  }

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogRes = await blogsApi.getAll({ page: 1 });
    if (blogRes.data) {
      blogRoutes = blogRes.data.map((b) => ({
        url: `${siteUrl}/blog/${b.slug}`,
        lastModified: b.published_at ? new Date(b.published_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch {
    // fallback
  }

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
