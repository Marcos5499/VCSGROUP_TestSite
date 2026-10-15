// Shared behaviour for the three VCS Group concepts.
// Content never depends on this script: hidden states only apply under html.js.
(function () {
  var doc = document, root = doc.documentElement;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Full-page menu -------------------------------------------------------
  var menu = doc.querySelector('[data-menu]');
  var openers = doc.querySelectorAll('[data-menu-open]');
  var closers = doc.querySelectorAll('[data-menu-close]');
  var lastOpener = null;

  function openMenu(e) {
    if (!menu) return;
    lastOpener = e && e.currentTarget;
    if (lastOpener) {
      // Open from where it was clicked.
      var r = lastOpener.getBoundingClientRect();
      menu.style.setProperty('--ox', Math.round(r.left + r.width / 2) + 'px');
      menu.style.setProperty('--oy', Math.round(r.top + r.height / 2) + 'px');
    }
    menu.hidden = false;
    // Next frame so the transition runs from the closed state.
    requestAnimationFrame(function () { requestAnimationFrame(function () { menu.classList.add('is-open'); }); });
    root.classList.add('menu-open');
    openers.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
    var first = menu.querySelector('a, button');
    if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, reduce ? 0 : 260);
  }
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.classList.remove('is-open');
    root.classList.remove('menu-open');
    openers.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    var done = function () { menu.hidden = true; };
    if (reduce) done(); else setTimeout(done, 420);
    if (lastOpener) lastOpener.focus({ preventScroll: true });
  }
  openers.forEach(function (b) { b.addEventListener('click', openMenu); });
  closers.forEach(function (b) { b.addEventListener('click', closeMenu); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  if (menu) {
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href').charAt(0) === '#') closeMenu(); }); });
    // Index with preview: hovering a sector shows its picture.
    var previews = menu.querySelectorAll('[data-preview]');
    menu.querySelectorAll('[data-preview-for]').forEach(function (link) {
      var show = function () {
        previews.forEach(function (p) { p.classList.toggle('is-on', p.getAttribute('data-preview') === link.getAttribute('data-preview-for')); });
      };
      link.addEventListener('mouseenter', show);
      link.addEventListener('focus', show);
    });
  }

  // ---- Section entrances (once) ---------------------------------------------
  var revealables = doc.querySelectorAll('[data-reveal], [data-stagger] > *, .shutter');
  if ('IntersectionObserver' in window && !reduce) {
    doc.querySelectorAll('[data-stagger]').forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty('--i', i); });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
    // Safety net: never leave anything hidden.
    setTimeout(function () { revealables.forEach(function (el) { el.classList.add('is-in'); }); }, 3000);
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---- Header state ---------------------------------------------------------
  var header = doc.querySelector('[data-header]');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Concept D: "What do you need?" finder --------------------------------
  var finder = doc.querySelector('[data-finder]');
  if (finder) {
    var out = finder.querySelector('[data-finder-out]');
    var data = JSON.parse(finder.querySelector('script[type="application/json"]').textContent);
    var buttons = finder.querySelectorAll('[data-need]');
    var render = function (i) {
      var d = data[i];
      buttons.forEach(function (b, j) { b.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
      out.classList.remove('is-swap'); void out.offsetWidth; out.classList.add('is-swap');
      out.querySelector('[data-f-company]').textContent = d.company;
      out.querySelector('[data-f-text]').textContent = d.text;
      var tel = out.querySelector('[data-f-tel]'); tel.textContent = d.tel; tel.href = 'tel:' + d.tel.replace(/\s/g, '');
      var mail = out.querySelector('[data-f-email]'); mail.textContent = d.email; mail.href = 'mailto:' + d.email;
      var sec = out.querySelector('[data-f-sector]'); sec.textContent = 'More about ' + d.sector; sec.href = d.slug + '.html';
      var web = out.querySelector('[data-f-web]');
      if (d.web) { web.hidden = false; web.href = d.web; web.textContent = 'Visit ' + d.webLabel; } else { web.hidden = true; }
    };
    buttons.forEach(function (b, i) { b.addEventListener('click', function () { render(i); }); });
  }

  // ---- Concept E: the Group in any year ---------------------------------------
  var years = doc.querySelector('[data-years]');
  if (years) {
    var range = years.querySelector('input[type="range"]');
    var yOut = years.querySelector('[data-year]');
    var cOut = years.querySelector('[data-year-count]');
    var mOut = years.querySelector('[data-year-note]');
    var items = years.querySelectorAll('[data-since]');
    var notes = JSON.parse(years.querySelector('script[type="application/json"]').textContent);
    var update = function () {
      var y = +range.value, n = 0;
      items.forEach(function (it) {
        var on = +it.getAttribute('data-since') <= y;
        it.classList.toggle('is-on', on); if (on) n++;
      });
      yOut.textContent = y;
      cOut.textContent = n;
      var note = '';
      for (var k = 0; k < notes.length; k++) { if (notes[k][0] <= y) note = notes[k]; }
      mOut.textContent = note ? note[0] + ': ' + note[1] : '';
      range.setAttribute('aria-valuetext', y + ', ' + n + ' companies');
    };
    range.addEventListener('input', update);
    update();
  }

  // ---- Concept F: days at work and the time in Victoria ---------------------
  var clock = doc.querySelector('[data-since-clock]');
  if (clock) {
    var start = Date.UTC(1991, 11, 2);
    var dOut = clock.querySelector('[data-days]');
    var tOut = clock.querySelector('[data-time]');
    var tick = function () {
      var now = Date.now();
      var days = Math.floor((now - start) / 86400000);
      dOut.textContent = days.toLocaleString('en-GB');
      // Seychelles Time is UTC+4 all year.
      var t = new Date(now + 4 * 3600000);
      var hh = String(t.getUTCHours()).padStart(2, '0'), mm = String(t.getUTCMinutes()).padStart(2, '0');
      tOut.textContent = hh + ':' + mm;
    };
    tick();
    setInterval(tick, 30000);
  }

  // ---- Concept F: sector line-up preview -------------------------------------
  var lineup = doc.querySelector('[data-lineup]');
  if (lineup) {
    var frames = lineup.querySelectorAll('[data-frame]');
    lineup.querySelectorAll('[data-row]').forEach(function (row) {
      var show = function () { frames.forEach(function (f) { f.classList.toggle('is-on', f.getAttribute('data-frame') === row.getAttribute('data-row')); }); };
      row.addEventListener('mouseenter', show); row.addEventListener('focus', show);
    });
  }
})();
