import { getCollection } from 'astro:content';
import { t, url, menu, programs, langs, type Lang } from '../../i18n';

export const getStaticPaths = () => langs.map((lang) => ({ params: { lang } }));

// Индекс для поиска по сайту (собирается автоматически)
export async function GET({ params }: { params: { lang: Lang } }) {
  const lang = params.lang;
  const d = t[lang];
  const nd = d.navDesc as Record<string, string>;
  const L = (p: string) => url(`/${lang}/${p}`);
  const items: { t: string; s?: string; u: string }[] = [];
  for (const m of menu) {
    items.push({ t: d.nav[m.key], s: nd[m.key], u: L(m.path) });
    for (const c of m.children) items.push({ t: d.nav[c.key], s: nd[c.key], u: L(c.path) });
  }
  for (const p of programs) items.push({ t: `${p[lang].title} (${p.code})`, s: p[lang].short, u: L(`programs/${p.slug}/`) });
  for (const n of await getCollection('news', (x) => x.data.lang === lang && !x.data.draft))
    items.push({ t: n.data.title, s: n.data.summary ?? undefined, u: L(`news/${n.id}/`) });
  for (const x of await getCollection('teachers'))
    items.push({ t: x.data.name, s: (lang === 'kg' && x.data.role_kg) || x.data.role_ru, u: L('education/teachers/') });
  for (const x of await getCollection('documents'))
    items.push({ t: (lang === 'kg' && x.data.title_kg) || x.data.title_ru, s: d.nav.documents, u: x.data.file ? url(x.data.file) : x.data.link || L('about/documents/') });
  for (const x of await getCollection('faq', (f) => f.data.lang === lang))
    items.push({ t: x.data.question, s: d.nav.faq, u: L('admission/faq/') });
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
