// @ts-check
import { defineConfig } from 'astro/config';
import { transformerNotationHighlight, transformerMetaHighlight } from '@shikijs/transformers';

// https://astro.build/config
export default defineConfig({
  // Set this to your real domain once you have one (used for canonical URLs and the sitemap later).
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      // Two ways to highlight lines (they get the mustard bar):
      //   1. SQL: end the line with a comment:  -- [!code highlight]
      //      The marker isn't shown on the page.
      //   2. Any language (use this for Lava): list line numbers after the language,
      //      like ```liquid {2-4}  or  ```liquid {1,3}
      transformers: [
        transformerNotationHighlight({ matchAlgorithm: 'v3' }),
        transformerMetaHighlight(),
      ],
    },
  },
});
