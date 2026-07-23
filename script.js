/* ============================================================
   Gopika Pushpan — portfolio. Vanilla JS, no dependencies.
   Lean: reveal, nav, count-up, hero reveal, smooth scroll.
   ============================================================ */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* year */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

  /* hero reveal on load */
  function heroGo() { const n = $('#name'); if (n) requestAnimationFrame(() => n.classList.add('go')); }
  if (document.readyState === 'complete') heroGo();
  else addEventListener('load', heroGo);
  // fallback so the name never stays hidden
  setTimeout(heroGo, 400);

  /* nav stuck + progress bar */
  const nav = $('#nav'), topbar = $('#topbar');
  function onScroll() {
    const y = scrollY;
    if (nav) nav.classList.toggle('stuck', y > 20);
    const h = document.documentElement.scrollHeight - innerHeight;
    if (topbar) topbar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* burger */
  const burger = $('#burger'), links = $('#links');
  if (burger) burger.addEventListener('click', () => {
    burger.classList.toggle('open'); links.classList.toggle('open');
  });
  links && $$('a', links).forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); links.classList.remove('open');
  }));

  /* active nav link */
  const map = {};
  $$('.links a').forEach(l => { const h = l.getAttribute('href'); if (h && h[0] === '#') map[h.slice(1)] = l; });
  const navObs = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && map[e.target.id]) {
      Object.values(map).forEach(l => l.style.color = '');
      map[e.target.id].style.color = 'var(--accent)';
    }
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('section[id]').forEach(s => navObs.observe(s));

  /* reveal on scroll */
  const items = $$('.rv');
  if (reduce) items.forEach(i => i.classList.add('in'));
  else {
    const ro = new IntersectionObserver((es, o) => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); o.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(i => ro.observe(i));
  }

  /* count-up (supports decimals + suffix) */
  const cObs = new IntersectionObserver((es, o) => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || 0, 10);
    const suf = el.dataset.suffix || '';
    if (reduce) { el.textContent = target.toFixed(dec) + suf; o.unobserve(el); return; }
    let t0 = null; const dur = 1300;
    (function step(t) {
      if (!t0) t0 = t;
      const k = clamp((t - t0) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = (eased * target).toFixed(dec) + suf;
      if (k < 1) requestAnimationFrame(step); else el.textContent = target.toFixed(dec) + suf;
    })(performance.now());
    o.unobserve(el);
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(n => cObs.observe(n));

  /* smooth anchor scroll (offset for fixed nav) */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault();
    scrollTo({ top: t.getBoundingClientRect().top + scrollY - 58, behavior: reduce ? 'auto' : 'smooth' });
  }));
})();
