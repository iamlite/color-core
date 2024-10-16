import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://color-core.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: 'https://docs.color-core.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9
    },
    {
      url: 'https://color-core.com/conversions',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: 'https://color-core.com/accessibility-checker',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: 'https://color-core.com/color-mixing',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: 'https://color-core.com/harmonies',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: 'https://color-core.com/scales',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: 'https://color-core.com/manipulation',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    }
  ]
}
