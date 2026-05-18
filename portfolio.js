// Ariel Soothy — Portfolio shared JS
// Theme toggle + scroll reveal + active-section highlighting.
// Drop into each project and include after portfolio-theme.css.

(function () {
  'use strict';

  // ---------- Theme toggle ----------
  const STORAGE_KEY = 'portfolio-theme';
  const root = document.documentElement;

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (_) {}
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.querySelectorAll('[data-theme-icon]').forEach(icon => {
        icon.style.display = icon.dataset.themeIcon === theme ? 'block' : 'none';
      });
    });
  }

  function initTheme() {
    let theme;
    try { theme = localStorage.getItem(STORAGE_KEY); } catch (_) {}
    if (!theme) theme = 'dark'; // portfolio default
    setTheme(theme);
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  }

  // ---------- Mobile nav ----------
  function initMobileNav() {
    const nav = document.querySelector('.portfolio-nav');
    const toggle = document.querySelector('[data-mobile-toggle]');
    if (!nav || !toggle) return;
    toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    nav.querySelectorAll('.portfolio-nav__link').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('is-open'));
    });
  }

  // ---------- Scroll reveal ----------
  function initReveal() {
    // Mark the doc as JS-reveal-capable; CSS only hides .reveal when this class is on.
    root.classList.add('js-reveal');

    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Safety net: anything still hidden after 1.2s gets revealed (handles
    // full-page screenshots and other edge cases that don't trigger IO).
    setTimeout(() => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => el.classList.add('is-visible'));
    }, 1200);
  }

  // ---------- Active-section nav highlight ----------
  function initSectionHighlight() {
    const links = Array.from(document.querySelectorAll('.portfolio-nav__link[href^="#"]'));
    if (!links.length) return;
    const map = new Map();
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href.length < 2) return; // skip empty "#" placeholder anchors
      let sec;
      try { sec = document.querySelector(href); } catch (_) { return; }
      if (sec) map.set(sec, a);
    });
    if (!map.size) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const a = map.get(e.target);
        if (!a) return;
        if (e.isIntersecting) {
          links.forEach(l => l.classList.remove('portfolio-nav__link--active'));
          a.classList.add('portfolio-nav__link--active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    map.forEach((_a, sec) => io.observe(sec));
  }

  // ---------- Wire up ----------
  function init() {
    initTheme();
    initMobileNav();
    initReveal();
    initSectionHighlight();
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for charts that need to react to theme changes
  window.PortfolioTheme = {
    getColors() {
      const css = getComputedStyle(root);
      return {
        accent:     css.getPropertyValue('--accent').trim(),
        accent2:    css.getPropertyValue('--accent-2').trim(),
        text:       css.getPropertyValue('--text').trim(),
        textMuted:  css.getPropertyValue('--text-muted').trim(),
        bg:         css.getPropertyValue('--bg').trim(),
        surface:    css.getPropertyValue('--surface').trim(),
        surface2:   css.getPropertyValue('--surface-2').trim(),
        border:     css.getPropertyValue('--border').trim(),
        success:    css.getPropertyValue('--success').trim(),
        warning:    css.getPropertyValue('--warning').trim(),
        danger:     css.getPropertyValue('--danger').trim(),
      };
    },
    onThemeChange(cb) {
      const obs = new MutationObserver((muts) => {
        if (muts.some(m => m.attributeName === 'data-theme')) cb(this.getColors());
      });
      obs.observe(root, { attributes: true });
    },
    setTheme,
    toggleTheme,
  };
})();
