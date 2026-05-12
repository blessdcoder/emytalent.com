/**
 * main.js — EMY TALENT
 *
 * Responsibilities:
 *   1. Load HTML components into mount points via fetch()
 *   2. Hide the page spinner once all components are ready
 *   3. Theme toggle (dark ↔ light) with localStorage persistence
 *   4. Back-to-top button visibility
 *   5. Scroll-reveal animation via IntersectionObserver
 *   6. Animated stat counters via IntersectionObserver
 *   7. Active nav-link highlight on scroll
 *   8. Auto-update footer copyright year
 */

'use strict';


/* =============================================================
   1. COMPONENT LOADER
   Fetches an HTML file and injects it into the target element.
   Components load sequentially (await) so Bootstrap's JS always
   finds accordion/carousel elements before it tries to bind them.
============================================================= */

/**
 * @param {string} mountId  - id of the target element
 * @param {string} filePath - path to the HTML fragment file
 */
async function loadComponent(mountId, filePath) {
    const el = document.getElementById(mountId);

    if (!el) {
        console.warn(`[EMY] Mount point #${mountId} not found in DOM`);
        return;
    }

    try {
        const res = await fetch(filePath);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        if (html.trim()) el.innerHTML = html;
    } catch (err) {
        console.warn(`[EMY] Could not load component "${filePath}":`, err.message);
    }
}


/* =============================================================
   2. PAGE SPINNER
   Hidden once all components are injected and features are ready.
============================================================= */

function hideSpinner() {
    const spinner = document.getElementById('spinner');
    if (!spinner) return;
    spinner.classList.remove('show');
    spinner.setAttribute('hidden', '');
}


/* =============================================================
   3. THEME TOGGLE
   Reads saved preference from localStorage on boot.
   Toggle button in navbar switches between dark and light.
   The <html data-theme> attribute drives all CSS token switching.
============================================================= */

const THEME_KEY   = 'emy-theme';
const THEME_DARK  = 'dark';
const THEME_LIGHT = 'light';

/** Apply a theme and persist it. */
function applyTheme(theme) {
    const root      = document.documentElement;
    const metaColor = document.getElementById('meta-theme-color');

    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    /* Update browser chrome colour */
    if (metaColor) {
        metaColor.content = (theme === THEME_LIGHT) ? '#f5f5f5' : '#0f0f0f';
    }

    /* Update the toggle button's aria-label for screen readers */
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.setAttribute(
            'aria-label',
            theme === THEME_DARK
                ? 'Switch to light mode'
                : 'Switch to dark mode'
        );
    }
}

/** Wire up the toggle button once the navbar component is in the DOM. */
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === THEME_DARK ? THEME_LIGHT : THEME_DARK);
    });

    /* Reflect the current theme on the button (may have been set before component loaded) */
    const saved = localStorage.getItem(THEME_KEY) || THEME_DARK;
    applyTheme(saved);
}


/* =============================================================
   4. BACK-TO-TOP BUTTON
   Shows after the user scrolls past 400 px.
   Clicking scrolls smoothly back to the top.
============================================================= */

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    /* Show / hide on scroll */
    const SCROLL_THRESHOLD = 400;

    window.addEventListener('scroll', () => {
        if (window.scrollY > SCROLL_THRESHOLD) {
            btn.classList.add('is-visible');
        } else {
            btn.classList.remove('is-visible');
        }
    }, { passive: true });

    /* Smooth scroll to top on click */
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


/* =============================================================
   5. SCROLL-REVEAL
   Elements with class="reveal" start invisible (see CSS).
   IntersectionObserver adds "revealed" when they enter the viewport.
   Falls back to showing all elements if IO is unsupported.
============================================================= */

function initReveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    /* Fallback for older browsers */
    if (!('IntersectionObserver' in window)) {
        items.forEach(el => el.classList.add('revealed'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); /* only animate once */
            });
        },
        { threshold: 0.12 }
    );

    items.forEach(el => observer.observe(el));
}


/* =============================================================
   6. ANIMATED STAT COUNTERS
   Elements with class="stat-number" and data-target="N" count
   up from 0 to N over ~1.8 s when they scroll into view.
============================================================= */

function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                observer.unobserve(entry.target);

                const el        = entry.target;
                const target    = Number(el.dataset.target);
                const duration  = 1800; /* ms */
                const frameRate = 16;   /* ~60 fps */
                const step      = target / (duration / frameRate);
                let   current   = 0;

                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = Math.floor(current);
                    if (current >= target) clearInterval(timer);
                }, frameRate);
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach(el => observer.observe(el));
}


/* =============================================================
   7. ACTIVE NAV LINK ON SCROLL
   Watches all <section id="..."> elements.
   When one enters the viewport, the matching nav link gets
   the "active" class (removes it from all others first).
============================================================= */

function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.site-nav__link[href^="#"]');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                /* Remove active from all links */
                links.forEach(l => l.classList.remove('active'));
                /* Set active on the matching link */
                const match = document.querySelector(
                    `.site-nav__link[href="#${entry.target.id}"]`
                );
                if (match) match.classList.add('active');
            });
        },
        /* Trigger when section occupies the middle third of the viewport */
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => observer.observe(s));
}


/* =============================================================
   8. FOOTER YEAR
   Keeps the copyright year current automatically.
============================================================= */

function setFooterYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}


/* =============================================================
   BOOT SEQUENCE
   Components must load before features are initialised,
   because features query elements that live inside components.
   Sequential awaits guarantee the correct order.
============================================================= */

/** Skip network requests when opened via file:// (no server). */
const isFileProtocol = window.location.protocol === 'file:';

async function boot() {
    if (isFileProtocol) {
        /*
         * Running locally without a dev server.
         * Components won't load, but the hero section is static HTML
         * so it still renders. Just hide the spinner.
         */
        hideSpinner();
        return;
    }

    /* ── Load all components in document order ── */
    await loadComponent('navbar',             './src/components/navbar.html');
    await loadComponent('about-mount',        './src/components/about.html');
    await loadComponent('services-mount',     './src/components/services.html');
    await loadComponent('testimonials-mount', './src/components/testimonials.html');
    await loadComponent('contact-mount',      './src/components/contact.html');
    await loadComponent('footer-mount',       './src/components/footer.html');

    /* ── All components are now in the DOM — initialise features ── */
    hideSpinner();
    initThemeToggle();   /* must come before other features that read theme */
    initBackToTop();
    initReveal();
    initCounters();
    initNavHighlight();
    setFooterYear();
}

/* Start once the DOM is ready */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
