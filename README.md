# Christine Ronk Portfolio

Personal portfolio built with [Astro](https://astro.build). Articles and case studies are plain Markdown files, so adding new content never means touching the page code.

## Getting started

You'll need [Node.js](https://nodejs.org) 24 (the current LTS) or newer.

```bash
npm install      # first time only
npm run dev      # starts a local preview at http://localhost:4321
npm run build    # builds the live site into /dist
```

While `npm run dev` is running, the site reloads automatically every time you save a file.

## How it's organized (the Rock RMS version)

If you know Rock content channels, you already know how this works.

| Rock RMS | This site |
| --- | --- |
| Content channel | A collection: `articles` or `caseStudies` |
| Content channel item | One `.md` file in `src/content/articles/` or `src/content/case-studies/` |
| Item attributes | The "front matter" block between the `---` lines at the top of each file |
| Attribute definitions | `src/content.config.ts` (the schema; the build fails with a clear message if a required field is missing) |
| Lava list template | `src/pages/writing/index.astro`, `src/pages/work/index.astro` |
| Item detail page | `src/pages/writing/[id].astro`, `src/pages/work/[id].astro` |
| Page/site theme | `src/layouts/BaseLayout.astro` and `src/styles/global.css` |

```
src/
  content/
    articles/           ← one .md file per article
    case-studies/       ← one .md file per case study
  content.config.ts     ← the fields each article and case study has
  components/           ← reusable pieces (cards, slider, contact form, illustrations)
  layouts/              ← the shared page shell (header, footer, fonts)
  pages/                ← every file here becomes a URL
  styles/global.css     ← colors, fonts, and shared styles
public/                 ← images, resume PDF, favicon (served as-is)
```

## Adding an article

1. Create a new file in `src/content/articles/`. The file name becomes the URL, so `why-systems-fail.md` lives at `/writing/why-systems-fail/`.
2. Start it with front matter, then write in Markdown:

   ```markdown
   ---
   title: "Why Systems Fail Quietly"
   date: 2026-11-15
   summary: "One or two sentences for the card and search results."
   readTime: "6 min read"
   tags: [systems, rock-rms]
   ---

   Your article starts here.

   ## A section heading

   > A pull quote.
   ```

3. Save. It appears on the Writing page, and the newest two show on the homepage.

**Drafts:** add `draft: true` to the front matter. Drafts show up in `npm run dev` (labeled "Draft") but are left out of the live site.

## Adding a case study

Same idea, in `src/content/case-studies/`. Copy `role-based-workspaces.md` as a starting point. Fields:

- `category`: one of `Systems & Integrations`, `Data & Reporting`, `Development` (powers the filter buttons on the Work page)
- `problem`, `approach`, `decisions`, `result`: the four-column overview at the top of the page
- `quote`: optional pull quote in the sidebar
- `featured: true`: the one shown in the homepage spotlight (only set this on one)
- `order`: lower numbers show first
- `beforeImage` / `afterImage`: optional screenshots for the drag-to-compare slider

## Adding a website to "Selected sites"

For sites that don't need a full case study. Add a file to `src/content/sites/` with only front matter (no body needed). Copy `pathwd.md` as a starting point.

- `status`: `Live`, `Since redesigned`, or `No longer active`
- `image`: a screenshot in `public/images/sites/`. For sites that have changed, grab one from the Wayback Machine (web.archive.org).
- `link`: the live site, or a Wayback Machine snapshot if it's been redesigned. Don't link to a redesigned live site, since visitors would see someone else's work.
- Without an `image`, the card shows a placeholder illustration.

## Images

Put images in `public/images/` and reference them starting with a slash: `/images/workspaces-before.png`. In Markdown: `![Description of the image](/images/dashboard.png)`.

Blur names, emails, and anything else sensitive in Rock screenshots before adding them.

The illustrations on the site right now are simple placeholders. To use your final artwork, replace the SVG inside `src/components/HeroArt.astro` and `src/components/CardArt.astro` with `<img>` tags.

## Resume

Save your resume as `public/resume.pdf`. The About page already links to it.

## Deploying (Netlify)

1. Push this folder to a new GitHub repository.
2. In [Netlify](https://www.netlify.com), choose **Add new site → Import an existing project** and pick the repo. Netlify detects Astro automatically (build command `npm run build`, publish directory `dist`).
3. Every time you push a change to GitHub, the live site rebuilds on its own.
4. Add your custom domain under **Domain management**, then update `site` in `astro.config.mjs`.

## Contact form

The form in `src/components/ContactForm.astro` uses **Netlify Forms**, so it works as soon as the site is on Netlify:

- Submissions appear under **Forms** in the Netlify dashboard.
- Turn on email notifications under **Site configuration → Forms → Form notifications**.
- Spam protection is built in, plus a hidden "honeypot" field that catches bots.
- After sending, people land on `/thanks/`.

**Hosting somewhere else?** Sign up for [Formspree](https://formspree.io), create a form, then in `ContactForm.astro` change the `<form>` tag to `<form action="https://formspree.io/f/YOUR_ID" method="POST" class="form">` and remove the `data-netlify`, `netlify-honeypot`, and `form-name` bits.

## Customizing the look

All colors and fonts are tokens at the top of `src/styles/global.css`. Change a value there and it updates everywhere.

Motion (twinkling stars, orbiting planet, cards lifting on hover) automatically turns off for visitors who have "reduce motion" set on their device.
