// Content collections: think of each one like a Rock content channel.
// The schema below is the channel's "item attributes". Every Markdown file
// in the folder is one content channel item.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    readTime: z.string().optional(), // e.g. "5 min read"
    tags: z.array(z.string()).default([]),
    // Card illustration. Add new motifs in src/components/ArticleArt.astro, then list them here.
    art: z.enum(['planet', 'clock', 'lightbulb', 'books', 'gears', 'sprout']).default('planet'),
    // Optional pull quote, shown beside the article in the space-themed quote card.
    pullQuote: z.string().optional(),
    pullQuoteBy: z.string().optional(), // attribution, if it's someone else's words
    featured: z.boolean().default(false), // shows as "Latest essay" style highlight
    draft: z.boolean().default(false), // drafts show in `npm run dev` but not in the live site
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['Systems', 'Data', 'Development']),
    tools: z.array(z.string()).default([]),
    // Big-number strip at the top of each case study (up to three).
    // When a case study has stats, they replace the four-column overview below.
    //   stats:
    //     - value: "48 → 8 days"
    //       label: "Average wait for a first contact"
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })).max(3).optional(),
    // The older four-column overview. Only shown when a case study has no stats.
    // Optional now, so updated case studies can drop them.
    problem: z.string().optional(),
    approach: z.string().optional(),
    decisions: z.string().optional(),
    result: z.string().optional(),
    quote: z.string().optional(),
    // Optional sidebar illustration beside the story, shown when there's no quote.
    // Add more names here as you make more.
    aside: z.enum(['paper-plane', 'journey', 'countdown']).optional(),
    // Optional before/after screenshots for the comparison slider.
    // Put the images in /public/images/ and reference them like "/images/workspaces-before.png".
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    // Optional built-in illustration for the top of the case study page,
    // used instead of the before/after slider. Add more names here as you make more.
    illustration: z.enum(['growth-track', 'devotional', 'connections', 'before-after']).optional(),
    featured: z.boolean().default(false), // the one shown in the homepage spotlight
    order: z.number().default(100), // lower numbers show first
    draft: z.boolean().default(false),
    video: z.string().optional(),
    poster: z.string().optional(),
    videoLabel: z.string().optional(),
  }),
});


export const collections = { articles, caseStudies };