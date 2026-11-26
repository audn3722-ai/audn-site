import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Новости добавляются через админку Pages CMS в папку src/content/news
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['ru', 'kg']).default('ru'),
    summary: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { news };
