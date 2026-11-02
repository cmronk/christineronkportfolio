// @ts-check
import { defineConfig } from 'astro/config';

// Highlight lines in a code block by listing them after the language:
//   ```sql {3-5}      ```liquid {1,4-6}
// Highlighted lines get the mustard bar; the rest dim (see global.css).
// Line numbers count from 1 at the first line inside the block.
function linesFromMeta(meta = '') {
  const lines = new Set();
  const match = meta.match(/\{([\d,\s-]+)\}/);
  if (!match) return lines;
  for (const part of match[1].split(',')) {
    const [start, end = start] = part.trim().split('-').map(Number);
    for (let n = start; n <= end; n++) lines.add(n);
  }
  return lines;
}

const highlightLines = {
  name: 'highlight-lines',
  line(node, lineNumber) {
    if (linesFromMeta(this.options.meta?.__raw).has(lineNumber)) this.addClassToHast(node, 'highlighted');
  },
  pre(node) {
    if (linesFromMeta(this.options.meta?.__raw).size) this.addClassToHast(node, 'has-highlighted');
  },
};

// https://astro.build/config
export default defineConfig({
  // Set this to your real domain once you have one (used for canonical URLs and the sitemap later).
  site: 'https://example.com',
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      transformers: [highlightLines],
    },
  },
});
