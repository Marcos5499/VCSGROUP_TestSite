// One flat graphic language for every drawing: filled shapes only, no outlines,
// light made with tone steps (a lit face and a shaded face), colours from CSS tokens
// so each concept can map them to its own fields. viewBox 800 x 600 for all.
// These drawings stand in for the Group's own photography until it is supplied.

const C = {
  sky: 'var(--art-sky)', sun: 'var(--art-sun)', far: 'var(--art-far)', mid: 'var(--art-mid)',
  near: 'var(--art-near)', ink: 'var(--art-ink)', deep: 'var(--art-deep)', lit: 'var(--art-lit)',
  stone: 'var(--art-stone)', stoneLit: 'var(--art-stone-lit)', paper: 'var(--art-paper)', accent: 'var(--art-accent)'
};

const wrap = (label, body, cls = '') =>
  `<svg class="art ${cls}" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;

// Repeated parts
const palm = (x, y, s = 1, flip = 1) => `
<g transform="translate(${x} ${y}) scale(${s * flip} ${s})">
  <path d="M0 0 C 6 -60 18 -120 40 -170 L48 -166 C 28 -118 16 -60 10 0 Z" fill="${C.deep}"/>
  <path d="M44 -168 C 10 -190 -30 -186 -60 -160 C -26 -170 6 -168 40 -160 Z" fill="${C.deep}"/>
  <path d="M44 -168 C 80 -196 126 -190 150 -160 C 118 -176 82 -174 48 -160 Z" fill="${C.deep}"/>
  <path d="M44 -170 C 30 -214 0 -232 -36 -228 C -6 -216 18 -198 38 -164 Z" fill="${C.ink}"/>
  <path d="M46 -170 C 70 -216 108 -232 140 -220 C 106 -214 80 -196 52 -164 Z" fill="${C.ink}"/>
  <path d="M44 -166 C 40 -130 20 -104 -10 -96 C 14 -116 30 -138 38 -166 Z" fill="${C.ink}"/>
  <path d="M48 -166 C 66 -132 92 -116 120 -114 C 94 -130 74 -146 54 -166 Z" fill="${C.deep}"/>
  <circle cx="40" cy="-160" r="6" fill="${C.mid}"/><circle cx="50" cy="-158" r="5" fill="${C.mid}"/>
</g>`;

const tern = (x, y, s = 1) => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 0 C 8 -6 14 -6 20 0 C 26 -6 32 -6 40 0 C 32 -2 26 0 20 4 C 14 0 8 -2 0 0 Z" fill="${C.paper}"/>`;

const sea = (top) => `
<rect x="0" y="${top}" width="800" height="${600 - top}" fill="${C.ink}"/>
<rect x="0" y="${top}" width="800" height="18" fill="${C.mid}"/>
<path d="M60 ${top + 46} h120 v4 h-120z M300 ${top + 70} h170 v4 h-170z M560 ${top + 40} h140 v4 h-140z M120 ${top + 110} h200 v5 h-200z M480 ${top + 132} h220 v5 h-220z" fill="${C.far}"/>`;

export const art = {
  // Mahé: granite peaks of Morne Seychellois over the bay, boulders on the shore, fairy terns.
  mahe: (label = 'Drawing of Mahé: granite peaks over the bay, palms and boulders on the shore') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<circle cx="610" cy="150" r="64" fill="${C.sun}"/>
<path d="M0 360 C 70 300 120 230 190 210 C 240 196 262 240 300 226 C 350 206 380 120 440 112 C 500 104 520 190 580 200 C 640 210 690 250 800 300 L800 400 L0 400 Z" fill="${C.far}"/>
<path d="M430 120 C 452 112 470 128 482 150 C 466 146 452 140 430 120 Z" fill="${C.sky}" opacity=".35"/>
<path d="M0 380 C 90 330 160 300 240 310 C 320 320 360 280 430 280 C 520 280 560 330 640 330 C 710 330 760 320 800 330 L800 420 L0 420 Z" fill="${C.mid}"/>
<path d="M180 330 C 200 316 220 322 240 312 L250 420 L170 420 Z" fill="${C.near}"/>
${sea(410)}
<path d="M520 470 C 530 420 590 400 640 410 C 700 420 730 450 736 500 L520 500 Z" fill="${C.stone}"/>
<path d="M548 470 C 560 432 600 418 640 424 C 610 436 584 456 576 500 L548 500 Z" fill="${C.stoneLit}"/>
<path d="M650 500 C 660 466 700 452 740 462 C 780 472 800 490 800 520 L650 520 Z" fill="${C.stone}"/>
<path d="M480 520 C 488 494 520 486 548 492 C 570 498 584 512 584 530 L480 530 Z" fill="${C.stoneLit}"/>
<path d="M0 560 C 120 540 300 548 470 532 C 600 520 700 528 800 540 L800 600 L0 600 Z" fill="${C.paper}"/>
<path d="M0 578 C 160 566 360 570 560 556 C 680 548 760 556 800 560 L800 600 L0 600 Z" fill="${C.stoneLit}"/>
${palm(96, 560, 1.15)}${palm(170, 566, 0.85, -1)}
<g transform="translate(330 452)"><path d="M0 0 L90 0 L78 14 L10 14 Z" fill="${C.paper}"/><rect x="40" y="-34" width="4" height="34" fill="${C.paper}"/><path d="M44 -32 L72 -4 L44 -4 Z" fill="${C.accent}"/></g>
${tern(300, 160)}${tern(352, 136, .8)}${tern(250, 190, .7)}
<path d="M0 0 h800 v600 h-800z" fill="none"/>`),

  // Victoria's clock tower, the Lorloz, with the hills of Victoria behind it.
  clock: (label = 'Drawing of the clock tower in Victoria, Mahé') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<path d="M0 330 C 100 260 180 200 260 210 C 330 218 370 160 430 150 C 520 136 560 220 640 230 C 700 238 750 260 800 280 L800 600 L0 600 Z" fill="${C.far}"/>
<path d="M0 420 C 120 380 220 370 320 390 C 420 410 520 380 620 380 C 700 380 760 400 800 410 L800 600 L0 600 Z" fill="${C.mid}"/>
<rect x="0" y="520" width="800" height="80" fill="${C.ink}"/>
<rect x="0" y="520" width="800" height="10" fill="${C.deep}"/>
<g>
  <rect x="330" y="500" width="140" height="22" fill="${C.stone}"/>
  <rect x="330" y="500" width="70" height="22" fill="${C.stoneLit}"/>
  <rect x="345" y="470" width="110" height="30" fill="${C.stone}"/>
  <rect x="345" y="470" width="55" height="30" fill="${C.stoneLit}"/>
  <rect x="352" y="300" width="12" height="170" fill="${C.stoneLit}"/><rect x="436" y="300" width="12" height="170" fill="${C.stone}"/>
  <rect x="380" y="300" width="10" height="170" fill="${C.stoneLit}"/><rect x="410" y="300" width="10" height="170" fill="${C.stone}"/>
  <path d="M364 300 C 364 340 380 350 380 350 L380 300 Z M420 300 L420 350 C 420 350 436 340 436 300 Z" fill="${C.stone}"/>
  <rect x="388" y="330" width="24" height="140" fill="${C.ink}"/>
  <rect x="340" y="284" width="120" height="16" fill="${C.stoneLit}"/>
  <rect x="356" y="200" width="88" height="84" fill="${C.stone}"/>
  <rect x="356" y="200" width="44" height="84" fill="${C.stoneLit}"/>
  <circle cx="400" cy="242" r="30" fill="${C.paper}"/>
  <circle cx="400" cy="242" r="30" fill="none"/>
  <rect x="398" y="220" width="4" height="24" fill="${C.ink}" transform="rotate(-60 400 242)"/>
  <rect x="398" y="216" width="4" height="28" fill="${C.ink}" transform="rotate(60 400 242)"/>
  <circle cx="400" cy="242" r="4" fill="${C.accent}"/>
  <rect x="348" y="190" width="104" height="12" fill="${C.stoneLit}"/>
  <path d="M352 190 L400 136 L448 190 Z" fill="${C.stone}"/>
  <path d="M352 190 L400 136 L400 190 Z" fill="${C.stoneLit}"/>
  <rect x="397" y="108" width="6" height="30" fill="${C.stone}"/>
  <circle cx="400" cy="106" r="7" fill="${C.accent}"/>
</g>
<g transform="translate(560 520)"><rect x="-3" y="-120" width="6" height="120" fill="${C.deep}"/><rect x="-14" y="-132" width="28" height="16" fill="${C.deep}"/><rect x="-10" y="-128" width="20" height="9" fill="${C.sun}"/></g>
<g transform="translate(240 520)"><rect x="-3" y="-120" width="6" height="120" fill="${C.deep}"/><rect x="-14" y="-132" width="28" height="16" fill="${C.deep}"/><rect x="-10" y="-128" width="20" height="9" fill="${C.sun}"/></g>
${palm(90, 524, 1)}${palm(700, 524, 1.1, -1)}
${tern(520, 110, .9)}${tern(560, 92, .7)}`),

  // Island Star, the 58-foot Viking sport fisher, outriggers up, off the coast.
  boat: (label = 'Drawing of a 58-foot sport-fishing boat like the Island Star at sea') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<circle cx="150" cy="140" r="56" fill="${C.sun}"/>
<path d="M440 330 C 480 290 540 270 600 280 C 660 290 700 316 760 330 Z" fill="${C.far}"/>
<path d="M560 290 C 580 280 600 282 612 292 C 596 292 580 292 560 290 Z" fill="${C.sky}" opacity=".4"/>
${sea(330)}
<g transform="translate(150 300)">
  <rect x="236" y="-170" width="5" height="150" fill="${C.deep}" transform="rotate(-24 236 -20)"/>
  <rect x="300" y="-170" width="5" height="150" fill="${C.deep}" transform="rotate(24 300 -20)"/>
  <rect x="250" y="-150" width="5" height="120" fill="${C.ink}"/><rect x="290" y="-150" width="5" height="120" fill="${C.ink}"/>
  <rect x="244" y="-156" width="58" height="10" fill="${C.ink}"/>
  <path d="M120 -40 L300 -40 L320 -76 L170 -76 Z" fill="${C.paper}"/>
  <path d="M170 -76 L320 -76 L330 -96 L196 -96 Z" fill="${C.stoneLit}"/>
  <rect x="210" y="-120" width="110" height="24" fill="${C.ink}"/>
  <rect x="214" y="-116" width="102" height="8" fill="${C.mid}"/>
  <path d="M188 -66 h40 v14 h-48 z M240 -66 h46 v14 h-46 z" fill="${C.ink}"/>
  <path d="M0 0 L470 0 C 500 0 520 -20 530 -40 L60 -40 C 30 -40 10 -20 0 0 Z" fill="${C.paper}"/>
  <path d="M10 0 L470 0 C 498 0 516 -14 524 -26 L40 -26 C 24 -24 14 -14 10 0 Z" fill="${C.stoneLit}"/>
  <path d="M0 0 L470 0 C 480 10 470 30 440 34 L40 34 C 16 30 4 16 0 0 Z" fill="${C.ink}"/>
  <rect x="20" y="4" width="440" height="6" fill="${C.accent}"/>
  <text x="300" y="-6" font-size="13" font-family="Arial, sans-serif" font-weight="700" fill="${C.ink}" letter-spacing="1">ISLAND STAR</text>
  <path d="M-40 40 C 100 30 300 50 560 36 L560 50 C 300 62 100 46 -40 52 Z" fill="${C.paper}" opacity=".9"/>
</g>
<g transform="translate(640 410) rotate(-18)"><path d="M0 0 C 20 -16 60 -18 90 0 C 60 10 20 12 0 0 Z" fill="${C.deep}"/><path d="M20 -8 C 34 -46 52 -50 62 -12 Z" fill="${C.deep}"/><path d="M90 0 L112 -14 L104 0 L112 14 Z" fill="${C.deep}"/><path d="M-4 0 L-26 -2 L-4 3 Z" fill="${C.deep}"/></g>
${tern(520, 140, .8)}${tern(470, 168, .6)}`),

  // Offset press: rollers, a printed sheet running through as a ribbon, a delivered stack.
  press: (label = 'Drawing of an offset printing press with sheets running through it') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<rect x="0" y="470" width="800" height="130" fill="${C.stone}"/>
<rect x="0" y="470" width="800" height="12" fill="${C.stoneLit}"/>
<rect x="90" y="190" width="460" height="280" fill="${C.ink}"/>
<rect x="90" y="190" width="460" height="40" fill="${C.deep}"/>
<rect x="90" y="230" width="230" height="240" fill="${C.mid}"/>
<g fill="${C.stoneLit}"><circle cx="170" cy="300" r="46"/><circle cx="290" cy="300" r="46"/><circle cx="410" cy="300" r="46"/><circle cx="230" cy="390" r="40"/><circle cx="350" cy="390" r="40"/><circle cx="470" cy="390" r="40"/></g>
<g fill="${C.stone}"><circle cx="170" cy="300" r="30"/><circle cx="290" cy="300" r="30"/><circle cx="410" cy="300" r="30"/><circle cx="230" cy="390" r="26"/><circle cx="350" cy="390" r="26"/><circle cx="470" cy="390" r="26"/></g>
<g fill="${C.ink}"><circle cx="170" cy="300" r="8"/><circle cx="290" cy="300" r="8"/><circle cx="410" cy="300" r="8"/><circle cx="230" cy="390" r="7"/><circle cx="350" cy="390" r="7"/><circle cx="470" cy="390" r="7"/></g>
<path d="M40 350 C 120 350 140 344 170 346 C 230 350 260 342 290 346 C 350 352 380 342 410 346 C 470 352 520 344 560 340 C 640 332 690 300 760 290 L760 316 C 694 326 646 356 562 366 C 520 370 470 378 410 372 C 380 368 350 378 290 372 C 260 368 230 376 170 372 C 140 370 120 376 40 376 Z" fill="${C.paper}"/>
<rect x="600" y="330" width="16" height="22" fill="${C.accent}" transform="rotate(-10 600 330)"/><rect x="630" y="322" width="16" height="22" fill="${C.mid}" transform="rotate(-12 630 322)"/><rect x="660" y="312" width="16" height="22" fill="${C.ink}" transform="rotate(-14 660 312)"/>
<g transform="translate(590 410)"><rect width="170" height="60" fill="${C.paper}"/><rect y="0" width="170" height="10" fill="${C.stoneLit}"/><rect y="22" width="170" height="4" fill="${C.stone}"/><rect y="40" width="170" height="4" fill="${C.stone}"/><rect x="12" y="-24" width="146" height="24" fill="${C.paper}"/><rect x="24" y="-18" width="60" height="12" fill="${C.accent}"/><rect x="92" y="-18" width="54" height="4" fill="${C.ink}"/><rect x="92" y="-10" width="40" height="4" fill="${C.ink}"/></g>
<g transform="translate(110 206)"><rect width="18" height="8" fill="${C.accent}"/><rect x="26" width="18" height="8" fill="${C.sun}"/><rect x="52" width="18" height="8" fill="${C.paper}"/><rect x="330" width="80" height="10" fill="${C.mid}"/></g>
<text x="450" y="216" font-size="13" font-family="Arial, sans-serif" font-weight="700" fill="${C.paper}" letter-spacing="1">OFFSET</text>
<rect x="60" y="470" width="30" height="16" fill="${C.deep}"/><rect x="550" y="470" width="30" height="16" fill="${C.deep}"/>`),

  // An SUV in the Autoland workshop, the lift and the roller shutter behind.
  car: (label = 'Drawing of an SUV in a service workshop') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<rect x="60" y="80" width="680" height="330" fill="${C.far}"/>
<g fill="${C.mid}"><rect x="80" y="100" width="640" height="18"/><rect x="80" y="130" width="640" height="18"/><rect x="80" y="160" width="640" height="18"/><rect x="80" y="190" width="640" height="18"/><rect x="80" y="220" width="640" height="18"/></g>
<rect x="60" y="64" width="680" height="20" fill="${C.ink}"/>
<g transform="translate(600 260)"><rect width="110" height="120" fill="${C.ink}"/><g fill="${C.stoneLit}"><rect x="14" y="16" width="8" height="40"/><rect x="34" y="16" width="8" height="52"/><rect x="54" y="16" width="8" height="34"/><rect x="74" y="16" width="20" height="8"/><circle cx="84" cy="50" r="10"/></g></g>
<rect x="0" y="470" width="800" height="130" fill="${C.stone}"/>
<rect x="0" y="470" width="800" height="10" fill="${C.stoneLit}"/>
<rect x="150" y="440" width="12" height="30" fill="${C.deep}"/><rect x="560" y="440" width="12" height="30" fill="${C.deep}"/>
<rect x="120" y="432" width="480" height="10" fill="${C.ink}"/>
<g transform="translate(120 432)">
  <path d="M10 -40 C 10 -70 30 -86 70 -92 L140 -150 C 160 -164 190 -170 230 -170 L360 -170 C 390 -170 410 -160 426 -140 L460 -96 C 488 -92 500 -76 500 -50 L500 -30 L10 -30 Z" fill="${C.mid}"/>
  <path d="M70 -92 L140 -150 C 160 -164 190 -170 230 -170 L360 -170 C 390 -170 410 -160 426 -140 L460 -96 Z" fill="${C.lit}"/>
  <path d="M152 -100 L190 -146 L270 -146 L270 -100 Z M286 -100 L286 -146 L360 -146 C 380 -146 392 -138 402 -124 L420 -100 Z" fill="${C.sky}"/>
  <rect x="280" y="-104" width="8" height="70" fill="${C.ink}" opacity=".35"/>
  <rect x="236" y="-82" width="26" height="6" fill="${C.ink}"/><rect x="330" y="-82" width="26" height="6" fill="${C.ink}"/>
  <rect x="470" y="-74" width="30" height="14" fill="${C.sun}"/><rect x="10" y="-70" width="20" height="14" fill="${C.accent}"/>
  <rect x="200" y="-178" width="180" height="8" fill="${C.ink}"/>
  <rect x="226" y="-52" width="70" height="16" fill="${C.paper}"/><text x="232" y="-40" font-size="12" font-family="Arial, sans-serif" font-weight="700" fill="${C.ink}">S 1991</text>
  <circle cx="110" cy="-30" r="44" fill="${C.ink}"/><circle cx="110" cy="-30" r="24" fill="${C.stoneLit}"/><circle cx="110" cy="-30" r="8" fill="${C.ink}"/>
  <circle cx="400" cy="-30" r="44" fill="${C.ink}"/><circle cx="400" cy="-30" r="24" fill="${C.stoneLit}"/><circle cx="400" cy="-30" r="8" fill="${C.ink}"/>
</g>`),

  // Wines, Champagne and spirits on a crate: the Savy & Sons cellar.
  bottles: (label = 'Drawing of wine, Champagne and spirit bottles on a wooden crate') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<rect x="0" y="440" width="800" height="160" fill="${C.ink}"/>
<g transform="translate(150 380)"><rect width="500" height="80" fill="${C.stone}"/><rect width="500" height="16" fill="${C.stoneLit}"/><rect y="40" width="500" height="6" fill="${C.stoneLit}" opacity=".6"/><rect x="190" y="26" width="120" height="30" fill="${C.paper}"/><text x="204" y="47" font-size="15" font-family="Georgia, serif" font-weight="700" fill="${C.ink}">SAVY &amp; SONS</text></g>
<g transform="translate(200 380)">
  <path d="M0 0 L0 -170 C 0 -200 18 -214 18 -236 L18 -300 L42 -300 L42 -236 C 42 -214 60 -200 60 -170 L60 0 Z" fill="${C.deep}"/>
  <path d="M0 0 L0 -170 C 0 -200 18 -214 18 -236 L18 -300 L28 -300 L28 -236 C 28 -214 14 -200 14 -170 L14 0 Z" fill="${C.mid}"/>
  <rect x="16" y="-316" width="28" height="20" fill="${C.accent}"/><rect x="6" y="-120" width="48" height="64" fill="${C.paper}"/><rect x="14" y="-104" width="32" height="5" fill="${C.ink}"/><rect x="14" y="-92" width="22" height="4" fill="${C.ink}"/>
</g>
<g transform="translate(300 380)">
  <path d="M0 0 L0 -190 C 0 -220 22 -232 22 -260 L22 -320 L50 -320 L50 -260 C 50 -232 72 -220 72 -190 L72 0 Z" fill="${C.near}"/>
  <path d="M0 0 L0 -190 C 0 -220 22 -232 22 -260 L22 -320 L34 -320 L34 -260 C 34 -232 16 -220 16 -190 L16 0 Z" fill="${C.lit}"/>
  <path d="M18 -322 L54 -322 L50 -280 L22 -280 Z" fill="${C.sun}"/><rect x="8" y="-150" width="56" height="80" fill="${C.paper}"/><rect x="18" y="-132" width="36" height="10" fill="${C.accent}"/><rect x="18" y="-112" width="36" height="4" fill="${C.ink}"/>
</g>
<g transform="translate(410 380)">
  <rect x="0" y="-210" width="86" height="210" fill="${C.ink}"/><rect x="0" y="-210" width="22" height="210" fill="${C.mid}"/>
  <rect x="30" y="-250" width="26" height="40" fill="${C.ink}"/><rect x="26" y="-264" width="34" height="16" fill="${C.sun}"/>
  <rect x="10" y="-150" width="66" height="70" fill="${C.sun}"/><rect x="20" y="-136" width="46" height="8" fill="${C.ink}"/><rect x="20" y="-120" width="30" height="4" fill="${C.ink}"/>
</g>
<g transform="translate(530 380)">
  <path d="M0 0 L0 -150 C 0 -176 16 -188 16 -206 L16 -262 L38 -262 L38 -206 C 38 -188 54 -176 54 -150 L54 0 Z" fill="${C.deep}"/>
  <rect x="14" y="-276" width="26" height="18" fill="${C.stoneLit}"/><rect x="6" y="-110" width="42" height="56" fill="${C.paper}"/><rect x="12" y="-96" width="30" height="4" fill="${C.accent}"/>
</g>
<g transform="translate(640 440)"><path d="M0 0 L40 0 L36 -60 C 36 -80 4 -80 4 -60 Z" fill="${C.paper}" opacity=".9"/><rect x="18" y="-10" width="4" height="10" fill="${C.paper}"/><path d="M8 -46 L32 -46 L34 -62 C 30 -72 10 -72 6 -62 Z" fill="${C.accent}"/></g>`),

  // A broadcast mast with signal arcs, and the morning paper.
  mast: (label = 'Drawing of a radio mast broadcasting over a folded newspaper') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<path d="M0 420 C 120 360 220 330 330 350 C 420 366 520 320 620 330 C 700 338 760 360 800 370 L800 600 L0 600 Z" fill="${C.far}"/>
<g transform="translate(250 430)">
  <path d="M-60 0 L-6 -330 L6 -330 L60 0 L44 0 L0 -300 L-44 0 Z" fill="${C.ink}"/>
  <g fill="${C.ink}"><rect x="-50" y="-60" width="100" height="6"/><rect x="-40" y="-130" width="80" height="6"/><rect x="-30" y="-200" width="60" height="6"/><rect x="-20" y="-260" width="40" height="6"/></g>
  <path d="M-48 -56 L34 -126 L38 -120 L-44 -50 Z M-36 -126 L26 -196 L30 -190 L-32 -120 Z M-26 -196 L16 -256 L20 -250 L-22 -190 Z" fill="${C.ink}"/>
  <circle cx="0" cy="-338" r="10" fill="${C.accent}"/>
  <path d="M40 -380 C 70 -360 70 -316 40 -296 L34 -304 C 58 -320 58 -356 34 -372 Z M70 -404 C 116 -372 116 -304 70 -272 L64 -280 C 104 -310 104 -366 64 -396 Z M100 -428 C 160 -386 160 -290 100 -248 L94 -256 C 146 -296 146 -380 94 -420 Z" fill="${C.mid}"/>
  <path d="M-40 -380 C -70 -360 -70 -316 -40 -296 L-34 -304 C -58 -320 -58 -356 -34 -372 Z M-70 -404 C -116 -372 -116 -304 -70 -272 L-64 -280 C -104 -310 -104 -366 -64 -396 Z" fill="${C.mid}"/>
</g>
<rect x="0" y="430" width="800" height="170" fill="${C.ink}"/>
<g transform="translate(420 300) rotate(-6)">
  <rect width="300" height="220" fill="${C.paper}"/><rect width="150" height="220" fill="${C.stoneLit}"/>
  <rect x="16" y="16" width="268" height="34" fill="${C.ink}"/><text x="26" y="42" font-size="24" font-family="Georgia, serif" font-weight="700" fill="${C.paper}">TODAY</text>
  <rect x="16" y="62" width="160" height="90" fill="${C.mid}"/><g fill="${C.ink}"><rect x="188" y="62" width="96" height="6"/><rect x="188" y="76" width="96" height="4"/><rect x="188" y="88" width="80" height="4"/><rect x="188" y="100" width="96" height="4"/><rect x="188" y="112" width="70" height="4"/><rect x="16" y="164" width="268" height="8"/><rect x="16" y="180" width="200" height="4"/><rect x="16" y="192" width="240" height="4"/></g>
</g>
<g transform="translate(90 480)"><rect width="110" height="70" fill="${C.deep}"/><rect x="10" y="10" width="60" height="50" fill="${C.mid}"/><circle cx="90" cy="24" r="8" fill="${C.sun}"/><circle cx="90" cy="48" r="8" fill="${C.stoneLit}"/><text x="14" y="42" font-size="16" font-family="Arial, sans-serif" font-weight="700" fill="${C.paper}">90.7</text></g>`),

  // A server rack and patch panel: the ICT division's own world.
  rack: (label = 'Drawing of a server rack with network switches') => wrap(label, `
<rect width="800" height="600" fill="${C.sky}"/>
<rect x="0" y="480" width="800" height="120" fill="${C.stone}"/><rect x="0" y="480" width="800" height="10" fill="${C.stoneLit}"/>
<g transform="translate(250 80)">
  <rect width="300" height="400" fill="${C.ink}"/><rect width="20" height="400" fill="${C.deep}"/><rect x="280" width="20" height="400" fill="${C.deep}"/>
  ${[0,1,2,3,4,5,6,7,8].map((i) => `<rect x="30" y="${20 + i * 42}" width="240" height="32" fill="${i % 3 === 0 ? C.mid : C.near}"/><rect x="30" y="${20 + i * 42}" width="240" height="6" fill="${C.lit}"/>${[0,1,2,3,4,5,6,7].map((j) => `<rect x="${44 + j * 22}" y="${32 + i * 42}" width="12" height="10" fill="${C.ink}"/>`).join('')}<circle cx="${250}" cy="${36 + i * 42}" r="4" fill="${i % 2 ? C.accent : C.sun}"/>`).join('')}
</g>
<path d="M550 140 C 640 140 650 220 720 220 L720 232 C 640 232 630 152 550 152 Z M550 220 C 620 220 640 300 720 300 L720 312 C 630 312 610 232 550 232 Z" fill="${C.accent}"/>
<path d="M250 180 C 170 180 150 260 80 260 L80 272 C 160 272 180 192 250 192 Z" fill="${C.mid}"/>`)
};

// Which drawing stands for each sector.
export const sectorArt = { ict: 'rack', automobile: 'car', distribution: 'bottles', tourism: 'boat', printing: 'press', media: 'mast', investment: 'clock' };
