// Concept F — Type and nothing else.
// Idea: the Group's firsts (the first computer company in 1991, the first independent daily
// colour paper, the first private radio station) are told as typographic set pieces.
// The live thing: the number of days VCS has been at work in Seychelles, and the time in Victoria.
import { group, sectors, contacts } from './data.mjs';
import { firstSentence, restSentences, esc, telHref, picture, sectorPicture, head, foot, nextSector, extLink } from './common.mjs';

const FONTS = 'https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;600&display=swap';
const page = (title, description) => head({ title: `${title} · VCS Group`, description, fonts: FONTS, css: 'f.css' });

const daysSince = Math.floor((Date.UTC(2026, 9, 15) - Date.UTC(1991, 11, 2)) / 86400000);

function header(current) {
  return `<header class="bar" data-header>
  <a class="bar-logo" href="index.html" aria-label="VCS Group home"><img src="../assets/vcs-logo-light.png" width="559" height="125" alt=""></a>
  <nav class="bar-sectors" aria-label="Sectors">${sectors.map((s) => `<a href="${s.slug}.html"${current === s.slug ? ' aria-current="page"' : ''}>${esc(s.name)}</a>`).join('')}</nav>
  <button class="bar-menu" type="button" data-menu-open aria-expanded="false" aria-controls="menu">Menu</button>
</header>
<div class="menu" id="menu" data-menu hidden role="dialog" aria-modal="true" aria-label="Site menu">
  <div class="menu-head">
    <img src="../assets/vcs-logo-white.png" width="559" height="125" alt="VCS Group">
    <button class="bar-menu" type="button" data-menu-close>Close</button>
  </div>
  <ul class="menu-words">
    ${sectors.map((s, i) => `<li><a href="${s.slug}.html"><span class="menu-mask"><span class="menu-word" style="--i:${i}">${esc(s.name)}</span></span><span class="menu-cos" style="--i:${i}">${esc(s.companies.slice(0, 3).map((c) => c.name).join(' · '))}</span></a></li>`).join('')}
  </ul>
  <div class="menu-foot"><a href="index.html">Home</a><a href="about.html">About the Group</a><a href="about.html#values">Values</a><a href="contact.html">Contact</a><span>${esc(group.tel)} · ${esc(group.email)}</span></div>
</div>`;
}

// Hero: one word so large the screen crops it.
const hero = ({ word, sentence, action }) => `<section class="hero">
  <div class="hero-top">
    <p class="hero-sentence" data-rise style="--i:0">${sentence}</p>
    ${action ? `<div data-rise style="--i:1">${action}</div>` : ''}
  </div>
  <h1 class="hero-word" style="--len:${word.length}"><span class="hero-word-in">${esc(word)}</span></h1>
</section>`;

const stair = (lines, pics) => `<section class="stair">
  <p class="stair-text">${lines.map((l, i) => `<span class="stair-line" style="--step:${i}" data-reveal>${esc(l)}</span>`).join('')}</p>
  ${pics ? `<div class="stair-pics">${pics.map((p) => `<div class="stair-pic shutter">${p}</div>`).join('')}</div>` : ''}
  <p class="stair-note" data-reveal>${esc(group.founded)} · Le Chantier, Victoria</p>
</section>`;

const lineup = (rows) => `<section class="lineup">
  <h2 class="lineup-title" data-reveal>Every company</h2>
  ${rows.map((g) => `<div class="lineup-group">
    <h3 class="lineup-head"><a href="${g.slug}.html">${esc(g.head)}</a></h3>
    <table class="lineup-table"><tbody>
      ${g.items.map((c) => `<tr data-reveal><th scope="row">${esc(c.name)}</th><td>${c.since ? `Since ${c.since}` : esc(g.headShort)}</td><td>${c.tel ? `<a href="${telHref(c.tel)}">${esc(c.tel)}</a>` : ''}</td><td>${c.web ? `<a href="${esc(c.web)}" target="_blank" rel="noopener">${esc(c.webLabel)}</a>` : c.email ? `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}</td></tr>`).join('')}
    </tbody></table>
  </div>`).join('')}
</section>`;

const mailbig = (sentence, email, tel) => `<section class="mailbig">
  <p class="mailbig-sentence" data-reveal>${esc(sentence)}</p>
  <a class="mailbig-address" href="mailto:${esc(email)}" data-reveal>${esc(email)}</a>
  <div class="mailbig-corners"><span>${esc(tel)} · Victoria, Mahé</span><span><a href="contact.html">All offices</a></span></div>
</section>`;

function footer() {
  return `<footer class="foot">
  <div class="foot-name" aria-hidden="true"><svg viewBox="0 0 1000 214" focusable="false"><text x="0" y="200" textLength="1000" lengthAdjust="spacingAndGlyphs">VCS GROUP</text></svg></div>
  <div class="foot-row">
    <ul class="foot-places">
      <li><a href="${telHref(group.tel)}">${esc(group.tel)}</a></li>
      <li><a href="mailto:${group.email}">${group.email}</a></li>
      <li>${extLink(group.web, 'www.vcs.sc')}</li>
    </ul>
    <div class="foot-links">
      <ul>${sectors.map((s) => `<li><a href="${s.slug}.html">${esc(s.long)}</a></li>`).join('')}</ul>
      <ul><li><a href="about.html">About the Group</a></li><li><a href="about.html#values">Values</a></li><li><a href="about.html#leadership">Leadership</a></li><li><a href="contact.html">Contact</a></li></ul>
      <ul>${group.address.map((a) => `<li>${esc(a)}</li>`).join('')}</ul>
    </div>
  </div>
  <div class="foot-legal"><span>© 2026 VCS Group. Pictures are drawn until the Group’s photographs are supplied.</span><a href="#main">Back to top</a></div>
</footer>`;
}

const shell = (current, title, description, body) => `${page(title, description)}
<body class="f">
<a class="skip" href="#main">Skip to content</a>
${header(current)}
<main id="main">
${body}
</main>
${footer()}
${foot}`;

const groups = () => sectors.map((s) => ({ slug: s.slug, head: s.long, headShort: s.name, items: s.companies }));

function home() {
  return shell('home', 'Home', 'VCS Group: twelve companies across eight sectors of the Seychelles economy since 1991.', `
${hero({ word: 'VCS GROUP', sentence: 'Twelve companies in eight sectors of the Seychelles economy, since 1991.', action: '<a class="btn" href="#sectors">See every company</a>' })}
${stair(['From the first', 'computer company', 'in Seychelles to', 'twelve companies', 'in eight sectors.'], [picture('network'), picture('mahe')])}
<section class="pair">
  <div class="pair-head">
    <h2 class="pair-title" data-reveal>Then and now</h2>
    <p class="pair-text" data-reveal>In 1991 there was one company: Victoria Computer Services. It went on to develop the first software suite used in the tourism industry and helped bring the internet to Seychelles. Today the Group has twelve companies and nearly 300 people.</p>
  </div>
  <div class="pair-specimens">
    <div class="pair-spec"><p class="pair-big">1</p><p class="pair-cap">company in 1991</p></div>
    <div class="pair-spec"><p class="pair-big">12</p><p class="pair-cap">companies today</p></div>
  </div>
</section>
<section class="sectors" id="sectors">
  <h2 class="sectors-title" data-reveal>Seven sectors</h2>
  <ul class="sectors-list">
    ${sectors.map((s) => `<li data-reveal><a href="${s.slug}.html"><span class="sectors-word">${esc(s.name)}</span><span class="sectors-line">${esc(s.line)}</span></a></li>`).join('')}
  </ul>
</section>
<figure class="band shutter">${picture('clock')}</figure>
${lineup(groups())}
<section class="figure" data-since-clock>
  <h2 class="figure-claim" data-reveal>Days at work for Seychelles</h2>
  <p class="figure-big"><span data-days>${daysSince.toLocaleString('en-GB')}</span></p>
  <p class="figure-cap">Counted live from 2 December 1991, the day Victoria Computer Services was incorporated. It is <span data-time>--:--</span> in Victoria right now.</p>
</section>
<section class="facts" id="values">
  <dl class="facts-side" data-stagger>
    <div><dt>Founded</dt><dd>${esc(group.founded)}</dd></div>
    <div><dt>Founder</dt><dd>${esc(group.founder)}</dd></div>
    <div><dt>People</dt><dd>Nearly 300</dd></div>
  </dl>
  <p class="facts-para" data-reveal>${esc(group.purpose)}</p>
  <h2 class="facts-word">Our values</h2>
  <ul class="facts-list" data-stagger>${group.values.map(([n, d]) => `<li><span>${esc(n)}</span><span>${esc(d)}</span></li>`).join('')}</ul>
</section>
${mailbig('Write about partnerships, careers or anything else.', group.email, group.tel)}`);
}

function sectorPage(s) {
  const next = nextSector(s);
  const main = s.companies.find((c) => c.web);
  const mail = s.companies.find((c) => c.email) || group;
  return shell(s.slug, s.long, `${s.long} at the VCS Group: ${s.companies.map((c) => c.name).join(', ')}.`, `
${hero({ word: s.name.toUpperCase(), sentence: `${esc(s.long)}. ${esc(s.line)}`, action: main ? `<a class="btn" href="${esc(main.web)}" target="_blank" rel="noopener">Visit ${esc(main.webLabel)}</a>` : '<a class="btn" href="contact.html">Contact us</a>' })}
<section class="para">
  <p class="para-big" data-reveal>${esc(firstSentence(s.intro))}</p>
  <div class="para-more" data-stagger>${restSentences(s.intro) ? `<p>${esc(restSentences(s.intro))}</p>` : ''}<p>${esc(s.more)}</p>${s.services.length ? `<ul>${s.services.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}</div>
</section>
<figure class="band shutter">${sectorPicture(s)}</figure>
${lineup([{ slug: s.slug, head: s.slug === 'investment' ? 'Holdings' : 'The companies', headShort: s.name, items: s.companies }])}
<section class="numerals">
  ${s.facts.map(([f, t]) => `<div class="numeral" data-reveal><p class="numeral-big">${esc(f)}</p><p class="numeral-text">${esc(t)}</p></div>`).join('')}
</section>
${s.brands.length ? `<section class="capabilities">
  <h2 class="capabilities-title" data-reveal>${s.slug === 'tourism' ? 'Airlines we ticket' : s.slug === 'media' ? 'Our titles and stations' : 'Brands we represent'}</h2>
  <p class="capabilities-run" data-reveal>${s.brands.map(esc).join(' / ')}</p>
</section>` : ''}
<section class="next"><a href="${next.slug}.html"><span class="next-label">Next sector</span><span class="next-word">${esc(next.name)}</span></a></section>
${mailbig(`Write to our ${s.name.toLowerCase()} team.`, mail.email, mail.tel || group.tel)}`);
}

function about() {
  return shell('about', 'About the Group', 'The story, values, leadership and milestones of the VCS Group.', `
${hero({ word: 'OUR STORY', sentence: 'From one computer company in Victoria to twelve companies across Seychelles.', action: '<a class="btn" href="#journey">See the journey</a>' })}
${stair(['Founded by', 'Marc Houareau', 'on 2 December', '1991 at', 'Le Chantier.'], [picture('clock'), picture('network')])}
<section class="para"><p class="para-big" data-reveal>Today the Group has twelve companies and nearly 300 people in eight sectors.</p><div class="para-more" data-stagger><p>${esc(group.story[0])}</p><p>${esc(group.story[2])}</p></div></section>
<section class="lineup" id="journey">
  <h2 class="lineup-title" data-reveal>The journey</h2>
  <table class="lineup-table lineup-years"><tbody>${group.milestones.map(([y, t]) => `<tr data-reveal><th scope="row">${y}</th><td colspan="3">${esc(t)}</td></tr>`).join('')}</tbody></table>
</section>
<section class="facts" id="leadership">
  <dl class="facts-side" data-stagger><div><dt>Founded</dt><dd>${esc(group.founded)}</dd></div><div><dt>Head office</dt><dd>Le Chantier, Victoria</dd></div><div><dt>People</dt><dd>Nearly 300</dd></div></dl>
  <p class="facts-para" data-reveal>${esc(group.purpose)}</p>
  <h2 class="facts-word">Leadership</h2>
  <ul class="facts-list" data-stagger>${group.leadership.map(([n, r]) => `<li><span>${esc(n)}</span><span>${esc(r)}</span></li>`).join('')}</ul>
  <h2 class="facts-word" id="values">Our values</h2>
  <ul class="facts-list" data-stagger>${group.values.map(([n, d]) => `<li><span>${esc(n)}</span><span>${esc(d)}</span></li>`).join('')}</ul>
</section>
${mailbig('Write about partnerships, careers or anything else.', group.email, group.tel)}`);
}

function contact() {
  return shell('contact', 'Contact', 'Contact the VCS Group and its companies.', `
${hero({ word: 'CONTACT', sentence: 'Head office at Le Chantier, Victoria. Service centres at Providence.', action: `<a class="btn" href="mailto:${group.email}">${group.email}</a>` })}
<section class="lineup">
  <h2 class="lineup-title" data-reveal>Our offices</h2>
  <table class="lineup-table"><tbody>${contacts.map((c) => `<tr data-reveal><th scope="row">${esc(c.company)}</th><td>${c.lines.map(esc).join(', ')}</td><td><a href="${telHref(c.tel)}">${esc(c.tel)}</a></td><td>${c.web ? extLink(c.web, c.webLabel) : `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`}</td></tr>`).join('')}</tbody></table>
</section>
<figure class="band shutter">${picture('mahe')}</figure>
${mailbig('Write about partnerships, careers or anything else.', group.email, group.tel)}`);
}

export function buildF() {
  const files = { 'index.html': home(), 'about.html': about(), 'contact.html': contact() };
  for (const s of sectors) files[`${s.slug}.html`] = sectorPage(s);
  return files;
}
