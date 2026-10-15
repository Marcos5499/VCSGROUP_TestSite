// Concept E — The printed annual.
// Idea: the Group's own printed company profile becomes the website. Each sector is a
// chapter, colour arrives in solid blocks like a two-colour print job, and the masthead
// carries the sections the way a newspaper does.
import { group, sectors, contacts } from './data.mjs';
import { firstSentence, restSentences, esc, telHref, picture, sectorPicture, head, foot, nextSector, extLink } from './common.mjs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,600;1,6..96,500&family=Jost:wght@400;500&display=swap';
const page = (title, description) => head({ title: `${title} · VCS Group`, description, fonts: FONTS, css: 'e.css' });

// Companies with a known year of founding or joining, for the year slider.
const dated = sectors.flatMap((s) => s.companies.filter((c) => c.since).map((c) => ({ ...c, sector: s.name, slug: s.slug }))).sort((a, b) => a.since - b.since);

function masthead(current) {
  return `<header class="mast">
  <div class="mast-top">
    <a class="mast-logo" href="index.html" aria-label="VCS Group home"><img src="../assets/vcs-logo-light.png" width="559" height="125" alt=""></a>
    <nav class="mast-group" aria-label="Group">
      <a href="about.html"${current === 'about' ? ' aria-current="page"' : ''}>About</a>
      <a href="about.html#journey">Journey</a>
      <a href="about.html#leadership">Leadership</a>
      <a href="contact.html"${current === 'contact' ? ' aria-current="page"' : ''}>Contact</a>
    </nav>
    <button class="mast-index" type="button" data-menu-open aria-expanded="false" aria-controls="menu"><span class="mast-index-lines" aria-hidden="true"></span>Contents</button>
  </div>
</header>
<nav class="strip" aria-label="Sectors" data-header>
  <a class="strip-home" href="index.html"${current === 'home' ? ' aria-current="page"' : ''}>The Group</a>
  ${sectors.map((s) => `<a href="${s.slug}.html"${current === s.slug ? ' aria-current="page"' : ''}>${esc(s.name)}</a>`).join('')}
</nav>
<div class="menu" id="menu" data-menu hidden role="dialog" aria-modal="true" aria-label="Contents">
  <div class="menu-in">
    <div class="menu-head">
      <p class="menu-title">Contents</p>
      <button class="menu-close" type="button" data-menu-close>Close</button>
    </div>
    <ol class="menu-chapters">
      ${sectors.map((s, i) => `<li style="--i:${i}"><a href="${s.slug}.html"><span class="menu-name">${esc(s.long)}</span><span class="menu-cos">${esc(s.companies.slice(0, 4).map((c) => c.name).join(' · '))}${s.companies.length > 4 ? ' and more' : ''}</span></a></li>`).join('')}
    </ol>
    <div class="menu-foot">
      <a href="index.html">The Group</a><a href="about.html">Our story</a><a href="about.html#journey">Journey</a><a href="about.html#values">Values</a><a href="contact.html">Contact</a>
      <span>${esc(group.tel)} · ${esc(group.email)}</span>
    </div>
  </div>
</div>`;
}

// Hero: narrow talk at the left, a wide two-line headline on the axis, a picture cropped by the bottom edge.
const hero = ({ lines, sentence, action, pic, figure }) => `<section class="hero">
  <div class="hero-left">
    <p class="hero-sentence" data-rise style="--i:2">${sentence}</p>
    ${action ? `<div data-rise style="--i:3">${action}</div>` : ''}
  </div>
  <div class="hero-right">
    <h1 class="hero-title lines">${lines.map((l, i) => `<span class="line"><span data-line style="--i:${i}">${esc(l)}</span></span>`).join('')}</h1>
    <div class="hero-pic">
      <div class="hero-pic-in">${pic}</div>
      ${figure ? `<div class="hero-fig"><strong>${esc(figure[0])}</strong><span>${esc(figure[1])}</span></div>` : ''}
    </div>
  </div>
</section>`;

const textPage = (title, cols, id = '') => `<section class="textpage"${id ? ` id="${id}"` : ''}>
  <h2 class="axis-title" data-reveal>${esc(title)}</h2>
  <div class="textpage-cols" data-stagger>${cols.map((c) => `<div class="col">${c}</div>`).join('')}</div>
</section>`;

function contactRow(sentence, email, tel) {
  return `<section class="crow">
  <p class="crow-sentence" data-reveal>${esc(sentence)}</p>
  <div class="crow-pic shutter">${picture('clock')}</div>
  <div class="crow-links" data-stagger>
    <p class="crow-q">Where should you write?</p>
    <a href="mailto:${esc(email)}">${esc(email)}</a>
    <a href="${telHref(tel)}">${esc(tel)}</a>
    <p class="crow-note">Victoria, Mahé. We reply on working days.</p>
  </div>
</section>`;
}

function footer() {
  return `<footer class="foot">
  <div class="foot-name"><svg viewBox="0 0 1000 170" aria-hidden="true" focusable="false"><text x="0" y="150" textLength="1000" lengthAdjust="spacingAndGlyphs">VCS Group</text></svg><span class="sr">VCS Group</span></div>
  <div class="foot-row">
    <ul class="foot-places">
      <li><a href="${telHref(group.tel)}">${esc(group.tel)}</a></li>
      <li><a href="mailto:${group.email}">${group.email}</a></li>
      <li>${extLink(group.web, 'www.vcs.sc')}</li>
    </ul>
    <div class="foot-links">
      <ul>${sectors.slice(0, 4).map((s) => `<li><a href="${s.slug}.html">${esc(s.long)}</a></li>`).join('')}</ul>
      <ul>${sectors.slice(4).map((s) => `<li><a href="${s.slug}.html">${esc(s.long)}</a></li>`).join('')}</ul>
      <ul><li><a href="about.html">Our story</a></li><li><a href="about.html#journey">Journey</a></li><li><a href="about.html#leadership">Leadership</a></li><li><a href="contact.html">Contact</a></li></ul>
    </div>
  </div>
  <div class="foot-legal"><span>© 2026 VCS Group · ${group.address.map(esc).join(', ')} · Pictures are drawn until the Group’s photographs are supplied.</span><a href="#main">Back to top</a></div>
</footer>`;
}

const shell = (current, title, description, body) => `${page(title, description)}
<body class="e">
<a class="skip" href="#main">Skip to content</a>
${masthead(current)}
<main id="main">
${body}
</main>
${footer()}
${foot}`;

// ---------------------------------------------------------------- home
function home() {
  const band = `<section class="band-sec">
  <h2 class="band-title" data-reveal>Seven sectors, one group</h2>
  <div class="band">
    ${sectors.map((s, i) => `<a class="panel" href="${s.slug}.html" style="--g:${[5, 2, 3, 2, 4, 2, 3][i]}">
      ${sectorPicture(s)}
      <span class="panel-name">${esc(s.name)}</span>
      <span class="panel-cos">${esc(s.companies.slice(0, 3).map((c) => c.name).join(', '))}</span>
    </a>`).join('')}
  </div>
  <p class="band-caption" data-reveal>Choose a sector to read its chapter: the companies, the brands they represent and how to reach them.</p>
</section>`;

  const years = `<section class="years" data-years>
  <div class="years-head">
    <h2 class="years-title" data-reveal>The Group, year by year</h2>
    <p class="years-lead" data-reveal>Move through time to see the companies that had joined by then.</p>
  </div>
  <div class="years-body">
    <div class="years-ctrl">
      <p class="years-year" data-year aria-live="polite">2023</p>
      <label class="years-label" for="year-range">Year</label>
      <input id="year-range" type="range" min="1991" max="2023" step="1" value="2023">
      <p class="years-count"><span data-year-count>${dated.length}</span> companies</p>
      <p class="years-note" data-year-note></p>
    </div>
    <ol class="years-list">
      ${dated.map((c) => `<li class="is-on" data-since="${c.since}"><span class="yl-year">${c.since}</span><span class="yl-name">${esc(c.name)}</span><a class="yl-sector" href="${c.slug}.html">${esc(c.sector)}</a></li>`).join('')}
    </ol>
  </div>
  <script type="application/json">${JSON.stringify(group.milestones)}</script>
</section>`;

  return shell('home', 'The Group', 'VCS Group: twelve companies across eight sectors of the Seychelles economy since 1991.', `
${hero({
    lines: ['Built in', 'Seychelles'],
    sentence: 'Twelve companies across eight sectors, from the country’s first computer company to its first private radio station.',
    action: '<a class="btn btn-ink" href="about.html">Read our story</a>',
    pic: picture('network', { eager: true }),
    figure: ['1991', 'The year it began, at Le Chantier']
  })}
<section class="tiles">
  <div class="tile tile-a" data-reveal><p class="tile-slogan">Twelve<br>companies</p></div>
  <div class="tile tile-b" data-reveal><p class="tile-word">~300</p><p class="tile-cap">people</p></div>
  <div class="tile tile-c shutter">${picture('mahe')}</div>
  <div class="tile tile-text"><p data-reveal>${esc(group.story[0])} ${esc(firstSentence(group.story[1]))}</p></div>
</section>
${band}
${years}
<section class="mosaic">
  <div class="mosaic-pic shutter">${picture('clock')}</div>
  <div class="mosaic-tile mosaic-teal" data-reveal><strong>8</strong><span>sectors of the Seychelles economy</span></div>
  <div class="mosaic-tile mosaic-navy" data-reveal><strong>16</strong><span>technology partners behind our ICT division</span></div>
</section>
<section class="facts">
  <dl class="facts-side" data-stagger>
    <div><dt>Founded</dt><dd>${esc(group.founded)}</dd></div>
    <div><dt>Head office</dt><dd>Le Chantier, Victoria</dd></div>
    <div><dt>People</dt><dd>Nearly 300</dd></div>
  </dl>
  <p class="facts-para" data-reveal>${esc(group.purpose)}</p>
  <h2 class="facts-word">Our values</h2>
  <ul class="facts-list" data-stagger>${group.values.map(([n, d]) => `<li><span>${esc(n)}</span><span>${esc(d)}</span></li>`).join('')}</ul>
</section>
${contactRow('Write to the Group and we will put you in touch with the right company.', group.email, group.tel)}`);
}

// ---------------------------------------------------------------- sector chapter
function sectorPage(s) {
  const next = nextSector(s);
  const main = s.companies.find((c) => c.web);
  const lines = { ict: ['Information', 'Technology'], automobile: ['Automobile'], distribution: ['Import &', 'Distribution'], tourism: ['Travel &', 'Tourism'], printing: ['Printing &', 'Publishing'], media: ['Media &', 'Marketing'], investment: ['Investment'] }[s.slug];
  return shell(s.slug, s.long, `${s.long} at the VCS Group: ${s.companies.map((c) => c.name).join(', ')}.`, `
${hero({
    lines,
    sentence: esc(s.line) + ' ' + esc(firstSentence(s.intro)),
    action: main ? `<a class="btn btn-ink" href="${esc(main.web)}" target="_blank" rel="noopener">Visit ${esc(main.webLabel)}</a>` : `<a class="btn btn-ink" href="contact.html">Contact us</a>`,
    pic: sectorPicture(s, { eager: true }),
    figure: s.facts[0]
  })}
${textPage('In brief', [`<p>${esc(s.intro)}</p>`, `<p>${esc(s.more)}</p>${s.services.length ? `<ul class="svc">${s.services.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}`])}
<section class="cos">
  <h2 class="axis-title" data-reveal>${s.slug === 'investment' ? 'Holdings' : 'The companies'}</h2>
  <div class="cos-list" data-stagger>
    ${s.companies.map((c) => `<article class="co">
      <div class="co-year">${c.since ? c.since : ''}</div>
      <div class="co-main"><h3 class="co-name">${esc(c.name)}</h3><p>${esc(c.text)}</p></div>
      <div class="co-reach">${c.tel ? `<a href="${telHref(c.tel)}">${esc(c.tel)}</a>` : ''}${c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}${c.web ? `<a class="btn btn-ink" href="${esc(c.web)}" target="_blank" rel="noopener">Visit ${esc(c.webLabel)}</a>` : ''}</div>
    </article>`).join('')}
  </div>
</section>
<section class="mosaic">
  <div class="mosaic-pic shutter">${picture(s.slug === 'tourism' ? 'mahe' : s.slug === 'investment' ? 'mahe' : 'clock')}</div>
  <div class="mosaic-tile mosaic-teal" data-reveal><strong>${esc(s.facts[1][0])}</strong><span>${esc(s.facts[1][1])}</span></div>
  <div class="mosaic-tile mosaic-navy" data-reveal><strong>${esc(s.facts[2][0])}</strong><span>${esc(s.facts[2][1])}</span></div>
</section>
${s.brands.length ? `<section class="colourpage">
  <h2 class="colourpage-title" data-reveal>${s.slug === 'tourism' ? 'Airlines we ticket' : s.slug === 'media' ? 'Our titles and stations' : 'Brands we represent'}</h2>
  <ul class="colourpage-list" data-stagger>${s.brands.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
</section>` : ''}
<section class="nextch">
  <a href="${next.slug}.html"><span class="nextch-label">Next chapter</span><span class="nextch-name">${esc(next.long)}</span></a>
</section>
${contactRow(`Questions about ${s.name.toLowerCase()}? Write to the team.`, (s.companies.find((c) => c.email) || group).email, (s.companies.find((c) => c.tel) || group).tel)}`);
}

function about() {
  return shell('about', 'Our story', 'The story, values, leadership and milestones of the VCS Group.', `
${hero({ lines: ['Our story'], sentence: 'From one computer company in Victoria to twelve companies across Seychelles.', action: '<a class="btn btn-ink" href="#journey">See the journey</a>', pic: picture('clock', { eager: true }), figure: ['12', 'companies in the Group today'] })}
${textPage('Since 1991', group.story.map((p) => `<p>${esc(p)}</p>`))}
<section class="cos" id="journey">
  <h2 class="axis-title" data-reveal>The journey</h2>
  <div class="cos-list" data-stagger>${group.milestones.map(([y, t]) => `<article class="co co-slim"><div class="co-year">${y}</div><div class="co-main"><p>${esc(t)}</p></div></article>`).join('')}</div>
</section>
<section class="colourpage" id="values">
  <h2 class="colourpage-title" data-reveal>Our values</h2>
  <dl class="values" data-stagger>${group.values.map(([n, d]) => `<div><dt>${esc(n)}</dt><dd>${esc(d)}</dd></div>`).join('')}</dl>
</section>
${textPage('Leadership', [`<ul class="people">${group.leadership.slice(0, 3).map(([n, r]) => `<li><strong>${esc(n)}</strong><span>${esc(r)}</span></li>`).join('')}</ul>`, `<ul class="people">${group.leadership.slice(3).map(([n, r]) => `<li><strong>${esc(n)}</strong><span>${esc(r)}</span></li>`).join('')}</ul>`], 'leadership')}
${contactRow('Write to the Group and we will put you in touch with the right company.', group.email, group.tel)}`);
}

function contact() {
  return shell('contact', 'Contact', 'Contact the VCS Group and its companies.', `
${hero({ lines: ['Contact'], sentence: 'Head office at Le Chantier, Victoria. Service centres at Providence Industrial Estate.', action: `<a class="btn btn-ink" href="mailto:${group.email}">${group.email}</a>`, pic: picture('mahe', { eager: true }), figure: [group.tel, 'Head office, Victoria'] })}
<section class="cos">
  <h2 class="axis-title" data-reveal>Our offices</h2>
  <div class="cos-list" data-stagger>
    ${contacts.map((c) => `<article class="co"><div class="co-year">${esc(c.division)}</div><div class="co-main"><h3 class="co-name">${esc(c.company)}</h3><p>${c.lines.map(esc).join(', ')}</p></div><div class="co-reach"><a href="${telHref(c.tel)}">${esc(c.tel)}</a><a href="mailto:${esc(c.email)}">${esc(c.email)}</a>${c.web ? extLink(c.web, c.webLabel) : ''}</div></article>`).join('')}
  </div>
</section>
${contactRow('Write to the Group and we will put you in touch with the right company.', group.email, group.tel)}`);
}

export function buildE() {
  const files = { 'index.html': home(), 'about.html': about(), 'contact.html': contact() };
  for (const s of sectors) files[`${s.slug}.html`] = sectorPage(s);
  return files;
}
