import { readItems } from '@directus/sdk';
import directus from './directusSDK';
import type { Page } from './types';

const translationsFields = [
  'translations.id',
  'translations.languages_code',
  'translations.content',
] as const;

const gridTranslationsFields = [
  'translations.id',
  'translations.languages_code',
  'translations.content_left',
  'translations.content_right',
] as const;

export const sectionsItemFields = {
  block: ['id', ...translationsFields],
} as const;

const pageQueryFields = [
  'id',
  'slug',
  'sections.id',
  'sections.sort',
  'sections.collection',
  ...sectionsItemFields.block.map((f) => `sections.item:block.${f}`),  
];

export async function fetchAllPageSlugs(): Promise<string[]> {
  if (!directus) return [];
  const pages = await directus.request(
    readItems('pages', { fields: ['slug'], limit: -1 }),
  );
  return (pages as Array<{ slug: string }>).map((p) => p.slug).filter(Boolean);
}

export async function fetchPageBySlug(slug: string): Promise<Page | null> {
  if (!directus) return null;
  const pages = await directus.request(
    readItems('pages', {
      filter: { slug: { _eq: slug } },
      // @ts-expect-error — deeply nested M2A field strings aren't representable in the SDK's generic field type
      fields: pageQueryFields,
      limit: 1,
    }),
  );  
  const list = pages as Page[];
  if (!list || list.length === 0) return null;
  const page = list[0];
  if (page.sections) {
    page.sections = [...page.sections].sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
    for (const section of page.sections) {
      if (section.collection === 'slider' && section.item?.slides) {
        section.item.slides = [...section.item.slides].sort(
          (a, b) => (a.sort ?? 0) - (b.sort ?? 0),
        );
      }
    }
  }
  return page;
}
