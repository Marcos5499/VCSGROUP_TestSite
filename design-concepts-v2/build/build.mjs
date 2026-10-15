// Builds the concept sites: node build.mjs [d|e|f ...]
import { writeFileSync, mkdirSync } from 'node:fs';
const which = process.argv.slice(2);
const targets = {
  d: ['../d-monument', async () => (await import('./d.mjs')).buildD()],
  e: ['../e-annual', async () => (await import('./e.mjs')).buildE()],
  f: ['../f-statement', async () => (await import('./f.mjs')).buildF()]
};
for (const key of which.length ? which : Object.keys(targets)) {
  const [dir, make] = targets[key];
  const out = new URL(dir + '/', import.meta.url);
  mkdirSync(out, { recursive: true });
  const files = await make();
  for (const [name, html] of Object.entries(files)) writeFileSync(new URL(name, out), html);
  console.log(key, Object.keys(files).length, 'pages');
}
