import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

const TOPICS = ['como-llegar', 'fotos', 'historia', 'san-francisco-y-aranzazu'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales = ['zh', 'en', 'es'];
  const routes = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
      });
    }
    for (const topic of TOPICS) {
      sitemap.push({
        url: `${baseUrl}/${locale}/${topic}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return sitemap;
}
