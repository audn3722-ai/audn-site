import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Всё содержимое ниже редактируется через админку Pages CMS (.pages.yml)

// Новости и объявления
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['ru', 'kg']).default('ru'),
    kind: z.enum(['news', 'announcement']).default('news'),
    summary: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    draft: z.boolean().default(false),
  }),
});

const person = z.object({
  name: z.string(),
  role_ru: z.string(),
  role_kg: z.string().optional().nullable(),
  photo: z.string().optional().nullable(),
  order: z.coerce.number().default(100),
});

// Руководство
const leadership = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/leadership' }),
  schema: person,
});

// Преподаватели
const teachers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/teachers' }),
  schema: person.extend({
    program: z.enum(['law', 'pedagogy', 'common']).default('common'),
    disciplines_ru: z.string().optional().nullable(),
    disciplines_kg: z.string().optional().nullable(),
  }),
});

// Документы (PDF): устав, лицензия, расписание, практика, учебные планы и т.д.
export const docCategories = [
  'charter', 'license', 'regulations', 'plan-law', 'plan-pedagogy',
  'calendar', 'schedule', 'practice', 'materials',
] as const;
const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    title_ru: z.string(),
    title_kg: z.string().optional().nullable(),
    category: z.enum(docCategories),
    file: z.string().optional().nullable(),
    link: z.string().optional().nullable(),
    date: z.preprocess((v) => (v === '' ? null : v), z.coerce.date().nullable()).optional(),
    order: z.coerce.number().default(100),
  }),
});

// Вопросы и ответы для абитуриентов
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    lang: z.enum(['ru', 'kg']).default('ru'),
    order: z.coerce.number().default(100),
  }),
});

export const collections = { news, leadership, teachers, documents, faq };
