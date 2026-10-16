// VCS Group website: navigation, menus and scroll motion.
// Content never depends on this file; hidden states only apply when html has the "js" class.
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Header: solid once the page scrolls -----------------------------------
  var header = doc.querySelector('[data-header]');
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  if (header) { window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); }

  // ---- Mega menu: Our businesses --------------------------------------------
  var SECTORS = {
    ict: { title: 'ICT', text: 'Where the Group began in 1991: software, hardware and IT services for banks, hotels, airlines, schools and government.' },
    automobile: { title: 'Automobile', text: 'Sales, service and parts for Honda, BMW, Chevrolet, Isuzu, Peugeot, GWM and HAVAL at the Autoland Complex, Providence.' },
    distribution: { title: 'Import & Distribution', text: 'Savy & Sons, the leading wine, spirits and beverage wholesaler, serving Mahé, Praslin and La Digue.' },
    tourism: { title: 'Tourism', text: 'Air ticketing with SeaShell Travel, chauffeur and rental cars with Executive Cars, and sport fishing aboard Island Star.' },
    printing: { title: 'Printing & Publishing', text: 'Printhouse, the largest private printer in Seychelles, and iMedia, publisher of the official Seychelles Directory.' },
    media: { title: 'Media & Marketing', text: 'Switch agency, TODAY in Seychelles and Pure 90.7 FM: the country’s first daily colour paper and first private radio station.' },
    investment: { title: 'Investment', text: 'Strategic shareholdings in insurance, banking, telecoms, brewing, property and marine enterprises across Seychelles.' }
  };
  var trigger = doc.querySelector('[data-mega-trigger]');
  var mega = doc.querySelector('[data-mega]');
  var closeTimer = null;

  function openMega() {
    if (!mega || !mega.hidden) return clearTimeout(closeTimer);
    mega.hidden = false;
    requestAnimationFrame(function () { mega.classList.add('is-open'); });
    trigger.setAttribute('aria-expanded', 'true');
    header.classList.add('is-mega-open');
  }
  function closeMega(now) {
    if (!mega || mega.hidden) return;
    var done = function () {
      mega.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      header.classList.remove('is-mega-open');
      setTimeout(function () { if (!mega.classList.contains('is-open')) mega.hidden = true; }, 220);
    };
    clearTimeout(closeTimer);
    if (now) done(); else closeTimer = setTimeout(done, 180);
  }
  function showSector(item) {
    var key = item.getAttribute('data-mega-item'), s = SECTORS[key];
    mega.querySelectorAll('[data-mega-item]').forEach(function (el) { el.classList.toggle('is-active', el === item); });
    var img = mega.querySelector('[data-mega-image]');
    img.classList.add('is-swapping');
    setTimeout(function () {
      img.style.setProperty('--img', "url('../assets/img/" + key + ".jpg')");
      img.classList.remove('is-swapping');
    }, reduce ? 0 : 140);
    mega.querySelector('[data-mega-title]').textContent = s.title;
    mega.querySelector('[data-mega-text]').textContent = s.text;
    var link = mega.querySelector('[data-mega-link]');
    link.href = item.getAttribute('href');
    link.firstChild.textContent = 'Explore ' + s.title.split(' ')[0] + ' ';
  }
  if (trigger && mega) {
    var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    trigger.addEventListener('click', function () { mega.hidden ? openMega() : closeMega(true); });
    if (canHover) {
      [trigger, mega].forEach(function (el) {
        el.addEventListener('mouseenter', openMega);
        el.addEventListener('mouseleave', function () { closeMega(false); });
      });
    }
    mega.querySelectorAll('[data-mega-item]').forEach(function (item) {
      item.addEventListener('mouseenter', function () { showSector(item); });
      item.addEventListener('focus', function () { showSector(item); });
    });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !mega.hidden) { closeMega(true); trigger.focus(); } });
    doc.addEventListener('click', function (e) { if (!mega.hidden && !mega.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) closeMega(true); });
    mega.addEventListener('focusout', function (e) { if (!mega.contains(e.relatedTarget) && e.relatedTarget !== trigger) closeMega(true); });
  }

  // ---- Full-page menu: opens in a circle from the Menu button ----------------
  var menu = doc.querySelector('[data-menu]');
  var opener = doc.querySelector('[data-menu-open]');
  function openMenu() {
    var r = opener.getBoundingClientRect();
    menu.style.setProperty('--ox', Math.round(r.left + r.width / 2) + 'px');
    menu.style.setProperty('--oy', Math.round(r.top + r.height / 2) + 'px');
    closeMega(true);
    menu.hidden = false;
    requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add('is-open'); }); });
    root.classList.add('no-scroll');
    opener.setAttribute('aria-expanded', 'true');
    setTimeout(function () { var f = menu.querySelector('a'); if (f) f.focus({ preventScroll: true }); }, reduce ? 0 : 300);
  }
  function closeMenu() {
    if (menu.hidden) return;
    menu.classList.remove('is-open');
    root.classList.remove('no-scroll');
    opener.setAttribute('aria-expanded', 'false');
    setTimeout(function () { menu.hidden = true; }, reduce ? 0 : 440);
    opener.focus({ preventScroll: true });
  }
  if (menu && opener) {
    opener.addEventListener('click', openMenu);
    menu.querySelectorAll('[data-menu-close]').forEach(function (b) { b.addEventListener('click', closeMenu); });
    menu.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', closeMenu); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  // ---- Button press ripple, from where it was pressed ------------------------
  doc.addEventListener('pointerdown', function (e) {
    var b = e.target.closest('.btn');
    if (!b || reduce) return;
    var r = b.getBoundingClientRect();
    b.style.setProperty('--x', (e.clientX - r.left) + 'px');
    b.style.setProperty('--y', (e.clientY - r.top) + 'px');
    b.classList.remove('is-pressed'); void b.offsetWidth; b.classList.add('is-pressed');
  });

  // ---- Statement revealed word by word ---------------------------------------
  doc.querySelectorAll('[data-words]').forEach(function (p) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(doc.createTextNode(part)); return; }
            var s = doc.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = part; frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) walk(n);
      });
    })(p);
  });

  // ---- Entrances as sections arrive (once) -----------------------------------
  doc.querySelectorAll('[data-stagger]').forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty('--i', i); });
  });
  var targets = doc.querySelectorAll('[data-reveal], [data-stagger] > *, [data-words], .panel');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }

  // ---- Testimonials: arrows, side clicks and dots of keyboard ----------------
  var stage = doc.querySelector('[data-voices]');
  if (stage) {
    var track = stage.querySelector('[data-voices-track]');
    var items = track.children, n = items.length, idx = 0;
    var count = doc.querySelector('[data-voices-count]');
    function go(i) {
      idx = (i + n) % n;
      var w = items[0].getBoundingClientRect().width, gap = 28;
      track.style.transform = 'translateX(' + (-(idx * (w + gap) + w / 2)) + 'px)';
      Array.prototype.forEach.call(items, function (it, k) { it.classList.toggle('is-active', k === idx); });
      if (count) count.textContent = (idx + 1) + ' / ' + n;
    }
    doc.querySelectorAll('[data-voices-prev]').forEach(function (b) { b.addEventListener('click', function () { go(idx - 1); }); });
    doc.querySelectorAll('[data-voices-next]').forEach(function (b) { b.addEventListener('click', function () { go(idx + 1); }); });
    window.addEventListener('resize', function () { go(idx); });
    go(0);
  }
})();
