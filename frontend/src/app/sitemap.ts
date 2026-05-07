import { MetadataRoute } from 'next';
import { CONVERSION_TYPES } from '@/constants/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://movifile.com';
  const lastModified = new Date('2026-05-08');
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Tool pages (high priority for SEO)
  const toolPages: MetadataRoute.Sitemap = CONVERSION_TYPES.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...toolPages];
}
