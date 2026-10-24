import { getCollection } from 'astro:content';

// Drafts are visible while you run `npm run dev`, hidden on the live site.
const showDrafts = import.meta.env.DEV;

export async function getArticles() {
  const items = await getCollection('articles', ({ data }) => showDrafts || !data.draft);
  return items.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getCaseStudies() {
  const items = await getCollection('caseStudies', ({ data }) => showDrafts || !data.draft);
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getSites() {
  const items = await getCollection('sites', ({ data }) => showDrafts || !data.draft);
  return items.sort((a, b) => a.data.order - b.data.order);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
