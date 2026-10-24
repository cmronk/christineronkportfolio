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
    featured: z.boolean().default(false), // shows as "Latest essay" style highlight
    draft: z.boolean().default(false), // drafts show in `npm run dev` but not in the live site
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    category: z.enum(['Systems & Integrations', 'Data & Reporting', 'Development']),
    tools: z.array(z.string()).default([]),
    // The four-column overview at the top of each case study
    problem: z.string(),
    approach: z.string(),
    decisions: z.string(),
    result: z.string(),
    quote: z.string().optional(),
    // Optional before/after screenshots for the comparison slider.
    // Put the images in /public/images/ and reference them like "/images/workspaces-before.png".
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    // Optional built-in illustration for the top of the case study page,
    // used instead of the before/after slider. Add more names here as you make more.
    illustration: z.enum(['growth-track', 'devotional', 'connections']).optional(),
    featured: z.boolean().default(false), // the one shown in the homepage spotlight
    order: z.number().default(100), // lower numbers show first
    draft: z.boolean().default(false),
  }),
});

// Lighter-weight "Selected sites" gallery on the Work page.
// One .md file per site in src/content/sites/. No body text needed.
const sites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/sites' }),
  schema: z.object({
    title: z.string(),
    year: z.string(), // e.g. "2021" or "2019–2021"
    role: z.string(), // what you did: "Designed and built", "Built on WordPress", etc.
    summary: z.string(),
    tools: z.array(z.string()).default([]),
    status: z.enum(['Live', 'Since redesigned', 'No longer active']).default('Since redesigned'),
    image: z.string().optional(), // screenshot in /public/images/sites/
    link: z.string().optional(), // live site, or a Wayback Machine snapshot if redesigned
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, caseStudies, sites };
