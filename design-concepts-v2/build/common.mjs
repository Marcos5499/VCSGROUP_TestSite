import { existsSync, readFileSync } from 'node:fs';
import { art, sectorArt } from './art.mjs';
import { sectors, needs, findCompany, sectorBySlug } from './data.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const telHref = (t) => 'tel:' + t.replace(/\s/g, '');

// Photographs: drop a file into assets/photos and list it in photos.json
// ({"slot": {"file": "x.jpg", "alt": "...", "credit": "..."}}); the build then
// uses it instead of the drawing for that slot.
const photosFile = new URL('../assets/photos/photos.json', import.meta.url);
export const photos = existsSync(photosFile) ? JSON.parse(readFileSync(photosFile, 'utf8')) : {};

// A picture slot: the Group's network image, a photograph if one is supplied, else the drawing.
export function picture(slot, { cls = '', eager = false } = {}) {
  if (slot === 'network') {
    return `<img class="pic ${cls}" src="../assets/vcs-network-1400.jpg" width="1400" height="1120" alt="The network image from the cover of the VCS Group company profile"${eager ? '' : ' loading="lazy"'}>`;
  }
  const p = photos[slot];
  if (p) return `<img class="pic ${cls}" src="../assets/photos/${esc(p.file)}" width="${p.w || 1600}" height="${p.h || 1200}" alt="${esc(p.alt)}"${eager ? '' : ' loading="lazy"'}>`;
  const key = sectorArt[slot] || slot;
  return art[key]().replace('class="art ', `class="art pic ${cls} `);
}

export const sectorPicture = (s, opts) => picture(s.slug, opts);

export function head({ title, description, fonts, css }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<script>document.documentElement.classList.add('js')</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${fonts}" rel="stylesheet">
<link rel="stylesheet" href="${css}">
</head>`;
}

export const foot = `<script src="../assets/site.js"></script>
</body>
</html>`;

// Data for the finder (concept D).
export const needsData = needs.map(([label, slug, name]) => {
  const c = findCompany(slug, name);
  return { label, slug, sector: sectorBySlug[slug].name, company: c.name, text: c.text, tel: c.tel, email: c.email, web: c.web || null, webLabel: c.webLabel || null };
});

export const nextSector = (s) => sectors[(sectors.indexOf(s) + 1) % sectors.length];
export const prevSector = (s) => sectors[(sectors.indexOf(s) - 1 + sectors.length) % sectors.length];

export const extLink = (href, label, cls = '') => `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`;

export { sectors };

// The first sentence of a paragraph, with exactly one full stop.
export const firstSentence = (t) => t.split('. ')[0].replace(/\.$/, '') + '.';
export const restSentences = (t) => t.split('. ').slice(1).join('. ');
