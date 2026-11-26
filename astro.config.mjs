import { defineConfig } from 'astro/config';

// Пока домен www.audn.kg не подключён, сайт живёт по адресу
// https://audn3722-ai.github.io/audn-site/
// После подключения домена: SITE=https://www.audn.kg и BASE=/ (см. README).
export default defineConfig({
  site: process.env.SITE || 'https://audn3722-ai.github.io',
  base: process.env.BASE || '/audn-site',
  trailingSlash: 'always',
});
