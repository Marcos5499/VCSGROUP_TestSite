// Concept D — The name as a monument.
// Idea: the three letters on every VCS company's paperwork become the architecture.
// Each page is its own name set as a monument across an inset picture.
import { group, sectors, contacts } from './data.mjs';
import { firstSentence, restSentences, esc, telHref, picture, sectorPicture, head, foot, needsData, nextSector, extLink } from './common.mjs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap';
const page = (title, description) => head({ title: `${title} · VCS Group`, description, fonts: FONTS, css: 'd.css' });

// A word fitted exactly to its box: SVG text stretched to the viewBox width, so it never wraps
// and always runs margin to margin whatever the word's length.
const K = 0.5; // average advance of a condensed capital, in em
export const fitWord = (word, cls = '') => {
  const fs = 1000 / (word.length * K);
  const h = Math.round(fs * 0.74);
  return `<svg class="fit ${cls}" viewBox="0 0 1000 ${h}" aria-hidden="true" focusable="false"><text x="0" y="${Math.round(fs * 0.72)}" font-size="${fs.toFixed(1)}" textLength="1000" lengthAdjust="spacingAndGlyphs">${esc(word)}</text></svg>`;
};

function header(current) {
  const links = sectors.map((s) => `<a href="${s.slug}.html"${current === s.slug ? ' aria-current="page"' : ''}>${esc(s.name)}</a>`).join('');
  return `<header class="bar" data-header>
  <a class="bar-logo" href="index.html" aria-label="VCS Group home"><img src="../assets/vcs-logo-white.png" width="559" height="125" alt=""></a>
  <nav class="bar-sectors" aria-label="Sectors">${links}</nav>
  <div class="bar-end">
    <a class="btn btn-accent" href="contact.html">Contact</a>
    <button class="bar-menu" type="button" data-menu-open aria-expanded="false" aria-controls="menu">Menu</button>
  </div>
</header>
<div class="menu" id="menu" data-menu hidden role="dialog" aria-modal="true" aria-label="Site menu">
  <div class="menu-in">
    <div class="menu-top">
      <img src="../assets/vcs-logo-white.png" width="559" height="125" alt="VCS Group">
      <button class="bar-menu" type="button" data-menu-close>Close</button>
    </div>
    <div class="menu-body">
      <ul class="menu-list">
        ${sectors.map((s, i) => `<li style="--i:${i}"><a href="${s.slug}.html" data-preview-for="${s.slug}"><span class="menu-word">${esc(s.name)}</span><span class="menu-cos">${esc(s.companies.slice(0, 4).map((c) => c.name).join(', '))}${s.companies.length > 4 ? ' and more' : ''}</span></a></li>`).join('')}
      </ul>
      <div class="menu-side">
        <div class="menu-frames">${sectors.map((s, i) => `<div class="menu-frame${i === 0 ? ' is-on' : ''}" data-preview="${s.slug}">${sectorPicture(s)}</div>`).join('')}</div>
        <nav class="menu-group" aria-label="Group">
          <a href="index.html">Home</a><a href="about.html">About the Group</a><a href="about.html#journey">Our journey</a><a href="contact.html">Contact</a>
        </nav>
        <p class="menu-note">${esc(group.address[0])}, ${esc(group.address[1])}<br>${esc(group.tel)} · ${esc(group.email)}</p>
      </div>
    </div>
  </div>
</div>`;
}

// The hero: picture inset on the left (held while the right side scrolls), the name crossing it.
function heroSplit({ word, sentence, pic, after = '' }) {
  return `<section class="split">
  <div class="split-pic"><div class="split-pic-in shutter">${pic}</div></div>
  <div class="split-text">
    <div class="split-first">
      <p class="split-sentence" data-reveal>${sentence}</p>
    </div>
    ${after}
  </div>
  <h1 class="monument"><span class="sr">${esc(word)}</span>${fitWord(word, 'monument-in')}</h1>
</section>`;
}

const bars = (title, items, { open = 0 } = {}) => `<section class="bars-sec">
  <div class="bars-col">
    <h2 class="giant" data-reveal><span class="sr">${esc(title)}</span>${fitWord(title)}</h2>
    <div class="bars" data-stagger>
      ${items.map((it, i) => `<details class="barrow"${i === open ? ' open' : ''}>
        <summary><span>${it.title}</span><span class="plus" aria-hidden="true"></span></summary>
        <div class="barrow-panel"><div>${it.body}</div></div>
      </details>`).join('')}
    </div>
  </div>
</section>`;

const figures = (title, rows, pic = '') => `<section class="figs">
  <div class="figs-in">
    <h2 class="figs-title" data-reveal>${esc(title)}</h2>
    <dl class="figs-list" data-stagger>
      ${rows.map(([f, t]) => `<div class="figs-row"><dt>${esc(f)}</dt><dd>${esc(t)}</dd></div>`).join('')}
    </dl>
  </div>
  ${pic ? `<div class="figs-pic shutter">${pic}</div>` : ''}
</section>`;

const emailDisplay = (sentence, email, tel, place) => `<section class="mailbig">
  <p class="mailbig-sentence" data-reveal>${esc(sentence)}</p>
  <a class="mailbig-address" href="mailto:${esc(email)}" data-reveal>${esc(email)}</a>
  <div class="mailbig-corners"><span>${esc(tel)} · ${esc(place)}</span><span><a href="contact.html">All contact details</a></span></div>
</section>`;

function footer() {
  return `<footer class="foot">
  <div class="foot-cols">
    <div><p class="foot-first">VCS Group</p><p>${group.address.map(esc).join('<br>')}</p></div>
    <div><p class="foot-first">Sectors</p><ul>${sectors.map((s) => `<li><a href="${s.slug}.html">${esc(s.long)}</a></li>`).join('')}</ul></div>
    <div><p class="foot-first">Group</p><ul><li><a href="about.html">About the Group</a></li><li><a href="about.html#journey">Our journey</a></li><li><a href="about.html#leadership">Leadership</a></li><li><a href="contact.html">Contact</a></li></ul></div>
    <div><p class="foot-first">Reach us</p><p><a href="${telHref(group.tel)}">${esc(group.tel)}</a><br><a href="mailto:${group.email}">${group.email}</a><br>${extLink(group.web, 'www.vcs.sc')}</p></div>
  </div>
  <div class="foot-mark">${fitWord('VCS GROUP')}</div>
  <p class="foot-legal">© 2026 VCS Group, Seychelles. Pictures are drawn until the Group’s own photographs are supplied.</p>
</footer>`;
}

const shell = (current, title, description, body) => `${page(title, description)}
<body class="d">
<a class="skip" href="#main">Skip to content</a>
${header(current)}
<main id="main">
${body}
</main>
${footer()}
${foot}`;

// ---------------------------------------------------------------- pages
function home() {
  const finder = `<div class="finder" data-finder>
    <h2 class="finder-title" data-reveal>What do you need?</h2>
    <div class="finder-needs" data-stagger>
      ${needsData.map((n, i) => `<button type="button" data-need aria-pressed="${i === 0 ? 'true' : 'false'}">${esc(n.label)}</button>`).join('')}
    </div>
    <div class="finder-out" data-finder-out aria-live="polite">
      <p class="finder-company" data-f-company>${esc(needsData[0].company)}</p>
      <p class="finder-text" data-f-text>${esc(needsData[0].text)}</p>
      <p class="finder-contact"><a data-f-tel href="${telHref(needsData[0].tel)}">${esc(needsData[0].tel)}</a> · <a data-f-email href="mailto:${esc(needsData[0].email)}">${esc(needsData[0].email)}</a></p>
      <p class="finder-actions"><a class="btn btn-ink" data-f-sector href="${needsData[0].slug}.html">More about ${esc(needsData[0].sector)}</a> <a class="btn btn-tone" data-f-web href="${esc(needsData[0].web || '#')}" target="_blank" rel="noopener"${needsData[0].web ? '' : ' hidden'}>Visit ${esc(needsData[0].webLabel || '')}</a></p>
    </div>
    <script type="application/json">${JSON.stringify(needsData).replace(/</g, '\\u003c')}</script>
  </div>`;

  const intro = `<div class="narrow" data-stagger>
    <p class="narrow-first">Twelve companies, eight sectors and nearly 300 people.</p>
    <p>${esc(group.story[0])}</p>
    <p>${esc(group.story[1])}</p>
    <p>${esc(group.story[2])} <a class="ul" href="about.html">Read the Group’s story</a></p>
  </div>`;

  return shell('home', 'Home', 'VCS Group: twelve companies across eight sectors of the Seychelles economy since 1991.', `
${heroSplit({ word: 'VCS GROUP', sentence: 'Building Seychelles since 1991.', pic: picture('network', { eager: true }), after: intro + finder })}
${bars('SECTORS', sectors.map((s) => ({
    title: `${esc(s.long)}`,
    body: `<p class="bar-line">${esc(s.line)} ${esc(firstSentence(s.intro))}</p>
      <ul class="bar-items">${s.companies.map((c) => `<li><span>${esc(c.name)}</span><span>${c.since ? 'Since ' + c.since : ''}</span></li>`).join('')}</ul>
      <a class="btn btn-ink" href="${s.slug}.html">Go to ${esc(s.name)}</a>`
  })))}
<section class="plate">
  <div class="plate-pic shutter">${picture('mahe')}</div>
  <div class="plate-text" data-stagger>
    <p class="plate-tabs"><a href="about.html" aria-current="true">Purpose</a><a href="about.html#values">Values</a><a href="about.html#leadership">Leadership</a></p>
    <div>
      <h2 class="plate-title">Rooted in Mahé</h2>
      <p class="plate-desc">${esc(group.purpose)}</p>
    </div>
    <div class="cells"><a class="cell cell-ink" href="about.html">About the Group</a><a class="cell cell-tone" href="contact.html">Contact us</a></div>
  </div>
</section>
${figures('The Group in figures', [['1991', 'The year VCS became the first computer services company in Seychelles.'], ['~300', 'People across the Group, in a culture built on professional excellence.'], ['12', 'Companies, from Victoria Computer Services to Pure 90.7 FM.'], ['8', 'Sectors of the Seychelles economy, from ICT and automobiles to media and investment.']], picture('clock'))}
${emailDisplay('Write to the Group about partnerships, careers or anything else.', group.email, group.tel, 'Victoria, Mahé')}`);
}

function sectorPage(s) {
  const next = nextSector(s);
  const intro = `<div class="narrow" data-stagger>
    <p class="narrow-first">${esc(s.intro)}</p>
    <p>${esc(s.more)}</p>
    ${s.services.length ? `<ul class="services">${s.services.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
  </div>`;
  const mainContact = s.companies.find((c) => c.email) || { email: group.email, tel: group.tel };
  return shell(s.slug, s.long, `${s.long} at the VCS Group: ${s.companies.map((c) => c.name).join(', ')}.`, `
${heroSplit({ word: s.name.toUpperCase(), sentence: `${esc(s.line)}`, pic: sectorPicture(s, { eager: true }), after: intro })}
${bars(s.slug === 'investment' ? 'HOLDINGS' : 'COMPANIES', s.companies.map((c) => ({
    title: esc(c.name),
    body: `<p class="bar-line">${esc(c.text)}</p>
      <ul class="bar-items">
        ${c.since ? `<li><span>In the Group since</span><span>${c.since}</span></li>` : ''}
        ${c.tel ? `<li><span>Telephone</span><span><a href="${telHref(c.tel)}">${esc(c.tel)}</a></span></li>` : ''}
        ${c.email ? `<li><span>Email</span><span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></span></li>` : ''}
      </ul>
      ${c.web ? `<a class="btn btn-ink" href="${esc(c.web)}" target="_blank" rel="noopener">Visit ${esc(c.webLabel)}</a>` : ''}`
  })))}
${figures(`${s.name} in figures`, s.facts)}
${s.brands.length ? `<section class="brands">
  <h2 class="brands-title" data-reveal>${s.slug === 'tourism' ? 'Airlines we ticket' : s.slug === 'media' ? 'Our titles and stations' : 'Brands we represent'}</h2>
  <p class="brands-run" data-reveal>${s.brands.map(esc).join(' · ')}</p>
</section>` : ''}
<section class="next">
  <a class="next-link" href="${next.slug}.html"><span class="next-label">Next sector</span><span class="next-word"><span class="sr">${esc(next.name)}</span>${fitWord(next.name.toUpperCase())}</span></a>
</section>
${emailDisplay(`Write to our ${s.name.toLowerCase()} team.`, mainContact.email, mainContact.tel || group.tel, 'Mahé, Seychelles')}`);
}

function about() {
  const intro = `<div class="narrow" data-stagger>
    ${group.story.map((p, i) => `<p${i === 0 ? ' class="narrow-first"' : ''}>${esc(p)}</p>`).join('')}
  </div>`;
  return shell('about', 'About the Group', 'The story, values, leadership and milestones of the VCS Group.', `
${heroSplit({ word: 'OUR STORY', sentence: 'From one computer company in Victoria to twelve companies across Seychelles.', pic: picture('clock', { eager: true }), after: intro })}
<section class="facts" id="values">
  <dl class="facts-side" data-stagger>
    <div><dt>Founded</dt><dd>${esc(group.founded)}</dd></div>
    <div><dt>Based in</dt><dd>Le Chantier, Victoria</dd></div>
    <div><dt>People</dt><dd>Nearly 300</dd></div>
  </dl>
  <p class="facts-para" data-reveal>${esc(group.purpose)} Six values guide how we work with customers, partners and each other.</p>
</section>
${bars('VALUES', group.values.map(([n, d]) => ({ title: esc(n), body: `<p class="bar-line">${esc(d)}</p>` })))}
<section class="record" id="journey">
  <h2 class="record-title" data-reveal>Our journey</h2>
  <ol class="record-list" data-stagger>${group.milestones.map(([y, t]) => `<li><span class="record-year">${y}</span><span>${esc(t)}</span></li>`).join('')}</ol>
</section>
<section class="record record-alt" id="leadership">
  <h2 class="record-title" data-reveal>Leadership</h2>
  <ul class="record-people" data-stagger>${group.leadership.map(([n, r]) => `<li><span>${esc(n)}</span><span>${esc(r)}</span></li>`).join('')}</ul>
</section>
${emailDisplay('Write to the Group about partnerships, careers or anything else.', group.email, group.tel, 'Victoria, Mahé')}`);
}

function contact() {
  const intro = `<div class="narrow" data-stagger>
    <p class="narrow-first">Write or call the head office, or go straight to the company you need.</p>
    <p>${group.address.map(esc).join(', ')}<br>Telephone <a href="${telHref(group.tel)}">${esc(group.tel)}</a><br>Fax ${esc(group.fax)}</p>
  </div>`;
  return shell('contact', 'Contact', 'Contact the VCS Group and its companies.', `
${heroSplit({ word: 'CONTACT', sentence: 'Head office at Le Chantier, Victoria. Service centres at Providence.', pic: picture('mahe', { eager: true }), after: intro })}
<section class="book">
  <h2 class="record-title" data-reveal>Our offices</h2>
  <div class="book-grid" data-stagger>
    ${contacts.map((c) => `<div class="book-item"><p class="book-co">${esc(c.company)}</p><p class="book-div">${esc(c.division)}</p><p>${c.lines.map(esc).join('<br>')}</p><p><a href="${telHref(c.tel)}">${esc(c.tel)}</a><br><a href="mailto:${esc(c.email)}">${esc(c.email)}</a>${c.web ? `<br>${extLink(c.web, c.webLabel)}` : ''}</p></div>`).join('')}
  </div>
</section>
${emailDisplay('Write to the Group about partnerships, careers or anything else.', group.email, group.tel, 'Victoria, Mahé')}`);
}

export function buildD() {
  const files = { 'index.html': home(), 'about.html': about(), 'contact.html': contact() };
  for (const s of sectors) files[`${s.slug}.html`] = sectorPage(s);
  return files;
}
