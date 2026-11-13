import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    period: z.string().optional(),
    role: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    url: z.url().optional(),
    order: z.number().int().default(100),
    draft: z.boolean().default(true),
  }),
});

export const collections = { projects };
