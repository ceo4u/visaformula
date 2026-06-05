import { defineCollection, z } from 'astro:content';

const visaGuides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    country: z.string(),
    visaType: z.string(),
    processingTime: z.string(),
    fee: z.string(),
    requirements: z.array(z.string()),
    seoKeywords: z.array(z.string()),
    publishedDate: z.string().transform((str) => new Date(str)),
    updatedDate: z.string().transform((str) => new Date(str)).optional(),
  }),
});

const successStories = defineCollection({
  type: 'content',
  schema: z.object({
    author: z.string(),
    country: z.string(),
    visaType: z.string(),
    story: z.string(),
    rating: z.number().min(1).max(5),
    publishedDate: z.string().transform((str) => new Date(str)),
  }),
});

export const collections = {
  'visa-guides': visaGuides,
  'success-stories': successStories,
};
