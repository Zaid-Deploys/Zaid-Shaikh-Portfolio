/* ============================================================
   ZAID SHAIKH — PORTFOLIO ENGINE (V3.0 LUXURY ARCHITECTURE)
   Clean, authentic developer portfolio matching script-kittens.com
   DevOps · Developer · Agentic AI — Mumbai, India · 2026
   ============================================================ */

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Global state
let _globalMouseX = window.innerWidth / 2;
let _globalMouseY = window.innerHeight / 2;
let _pageVisible = true;
let _perfTier = 'high';

// === 1. PERFORMANCE TIER DETECTION ===
(function detectPerformanceTier() {
    try {
        const start = performance.now();
        let sum = 0;
        for (let i = 0; i < 30000; i++) { sum += Math.sin(i) * Math.cos(i); }
        const elapsed = performance.now() - start;

        const cores = navigator.hardwareConcurrency || 4;
        const memory = navigator.deviceMemory || 4;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        let score = elapsed;
        if (cores <= 2) score += 20;
        if (memory <= 2) score += 20;
        if (isMobile) score += 15;

        if (score > 35 || cores < 4) _perfTier = 'low';
        else if (score > 15 || cores < 8) _perfTier = 'medium';
        else _perfTier = 'high';
    } catch (e) {
        _perfTier = 'medium';
    }
})();

// === 2. IMMEDIATE & BULLETPROOF PRELOADER ===
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const seamFill = document.querySelector('.pl-seam-fill');
    let progress = 0;
    let dismissed = false;

    function dismiss() {
        if (dismissed) return;
        dismissed = true;
        clearInterval(progressInterval);
        
        if (seamFill) seamFill.style.height = '100%';
        preloader.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 600);
    }

    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 15;
        if (progress > 100) progress = 100;
        if (seamFill) seamFill.style.height = progress + '%';

        if (progress >= 100) {
            setTimeout(dismiss, 200);
        }
    }, 35);

    // Hard fallback guarantees the page is revealed immediately
    setTimeout(dismiss, 1000);
}

// === 3. SCRIPT KITTENS GPU-ACCELERATED SPARKLE CURSOR ===
function initCursor() {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;

    let mouseX = _globalMouseX, mouseY = _globalMouseY;
    let dotX = _globalMouseX, dotY = _globalMouseY;
    let outlineX = _globalMouseX, outlineY = _globalMouseY;
    let lastSparkleTime = 0;

    const glitterColors = ['#ffffff', '#dc2626', '#ef4444', '#f87171', '#ECDFCC', '#d4d4d4'];
    const glitterSymbols = ['✦', '✧', '★', '✴', '❋', '✶'];

    // Object pool for glitter particles
    const POOL_SIZE = 25;
    const pool = [];
    const poolContainer = document.createElement('div');
    poolContainer.className = 'cursor-glitter';
    poolContainer.style.cssText = 'position:fixed;top:0;left:0;width:0;height:0;pointer-events:none;z-index:99997;';
    document.body.appendChild(poolContainer);

    for (let i = 0; i < POOL_SIZE; i++) {
        const el = document.createElement('div');
        el.className = 'sparkle';
        el.style.display = 'none';
        poolContainer.appendChild(el);
        pool.push({ el, active: false });
    }

    function spawnGlitter(x, y) {
        if (_perfTier === 'low') return;
        const p = pool.find(item => !item.active);
        if (!p) return;

        p.active = true;
        const el = p.el;
        el.textContent = glitterSymbols[Math.floor(Math.random() * glitterSymbols.length)];
        el.style.color = glitterColors[Math.floor(Math.random() * glitterColors.length)];
        el.style.left = (x + (Math.random() * 14 - 7)) + 'px';
        el.style.top = (y + (Math.random() * 14 - 7)) + 'px';
        el.style.display = 'block';
        el.style.animation = 'sparkleAnim 0.7s ease-out forwards';

        setTimeout(() => {
            el.style.display = 'none';
            p.active = false;
        }, 700);
    }

    // Render loop
    function render() {
        if (_pageVisible) {
            dotX += (mouseX - dotX) * 0.7;
            dotY += (mouseY - dotY) * 0.7;
            outlineX += (mouseX - outlineX) * 0.22;
            outlineY += (mouseY - outlineY) * 0.22;

            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
            cursorOutline.style.transform = `translate3d(${outlineX - 21}px, ${outlineY - 21}px, 0)`;
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        _globalMouseX = mouseX;
        _globalMouseY = mouseY;

        const now = performance.now();
        if (now - lastSparkleTime > 70) {
            lastSparkleTime = now;
            spawnGlitter(mouseX, mouseY);
        }
    }, { passive: true });

    // Hover interactive scaling
    const hoverElements = document.querySelectorAll('a, button, .product-card-new, .profile-luxury-card, .hero-proof-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });

    // Click burst
    document.addEventListener('click', (e) => {
        cursorDot.classList.add('active');
        cursorOutline.classList.add('active');
        setTimeout(() => {
            cursorDot.classList.remove('active');
            cursorOutline.classList.remove('active');
        }, 200);

        for (let i = 0; i < 5; i++) {
            spawnGlitter(e.clientX, e.clientY);
        }
    });
}

// === 4. NAVBAR & TUBELIGHT ACTIVE SCROLLSPY ===
function initNavbar() {
    const navbar = document.getElementById('topNavbar');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('navMobileMenu');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    // Navbar glass blur on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Hamburger
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        document.querySelectorAll('.nav-mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // ScrollSpy with Tubelight flicker indicator
    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight * 0.35;
        let currentId = 'about';

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === currentId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
}

// === 5. LENIS SMOOTH SCROLLING ===
function initLenis() {
    if (typeof Lenis === 'undefined' || window.innerWidth <= 768) return;

    try {
        const lenis = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (!targetId || targetId === '#') return;
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    lenis.scrollTo(target, { offset: -70, duration: 1.2 });
                }
            });
        });
    } catch (e) {
        console.warn('Lenis scroll fallback', e);
    }
}

// === 6. PROOF COUNTERS ANIMATION ===
function initCounters() {
    const counters = document.querySelectorAll('.hero-proof-value[data-count]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count') || '0', 10);
                let current = 0;
                const duration = 1200;
                const startTime = performance.now();

                function update(time) {
                    const elapsed = time - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    current = Math.floor(progress * target);
                    el.textContent = current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target;
                    }
                }
                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
}

// === 7. 3D CARD PERSPECTIVE TILT ===
function initCardTilt() {
    if (_perfTier === 'low') return;

    const cards = document.querySelectorAll('.product-card-new, .profile-luxury-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
            card.style.transition = 'transform 0.4s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// === 8. BOOTSTRAP ===
function boot() {
    initPreloader();
    initCursor();
    initNavbar();
    initLenis();
    initCounters();
    initCardTilt();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

document.addEventListener('visibilitychange', () => {
    _pageVisible = !document.hidden;
});
