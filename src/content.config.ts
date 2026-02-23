import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.string().default('AI'),
    coverImage: z.string().optional(),
    sourceImage: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
