/* ============================================================
   ZAID SHAIKH — PORTFOLIO ENGINE (V3.0 LUXURY ARCHITECTURE)
   1:1 Engineered to match script-kittens.com Elite Design
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
        
        // Remove from DOM so it can never block anything
        setTimeout(() => {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 700);
    }

    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 20) + 15;
        if (progress > 100) progress = 100;
        if (seamFill) seamFill.style.height = progress + '%';

        if (progress >= 100) {
            setTimeout(dismiss, 250);
        }
    }, 40);

    // Hard fallback guarantees the page is revealed even if assets take time
    setTimeout(dismiss, 1200);
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
    const hoverElements = document.querySelectorAll('a, button, .product-card-new, .cc-tab, .cc-action-btn, .hero-proof-item');
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
        let currentId = 'home';

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

// === 7. 3D COMMAND CENTER TERMINAL ===
function initCommandCenter() {
    const ccEl = document.getElementById('commandCenter');
    const terminalBody = document.getElementById('terminalBody');
    const typingLine = document.getElementById('typingLine');
    if (!ccEl) return;

    // 3D Parallax Mouse Tilt
    const heroRight = ccEl.closest('.hero-right-cc');
    if (heroRight && _perfTier !== 'low') {
        heroRight.addEventListener('mousemove', (e) => {
            const rect = ccEl.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            ccEl.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
        }, { passive: true });

        heroRight.addEventListener('mouseleave', () => {
            ccEl.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
            ccEl.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        heroRight.addEventListener('mouseenter', () => {
            ccEl.style.transition = 'none';
        });
    }

    // Tab Switching
    const tabs = document.querySelectorAll('.cc-tab');
    const panels = document.querySelectorAll('.cc-tab-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const targetPanel = document.querySelector(`.cc-tab-panel[data-panel="${target}"]`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // Auto-typing DevOps & AI stream
    if (terminalBody && typingLine) {
        const commands = [
            {
                cmd: 'agent --deploy restaurant-bot --target telegram',
                flags: ['--deploy', '--target'],
                response: { type: 'success', icon: 'fa-robot', text: 'Hermes 3 Agent live. Webhook active. Google Sheets synced.' }
            },
            {
                cmd: 'k8s get pods -n ai-mesh -o wide',
                flags: ['-n', '-o'],
                response: { type: 'info', icon: 'fa-cubes', text: '3/3 Pods Ready: hermes-agent, deepgram-tts, sheet-logger [Healthy]' }
            },
            {
                cmd: 'model --load blind-assist-core --mode on-device',
                flags: ['--load', '--mode'],
                response: { type: 'success', icon: 'fa-eye', text: 'YOLOv8 + Indian Currency CV model initialized. 0ms cloud lag.' }
            },
            {
                cmd: 'docker ps --filter status=running',
                flags: ['--filter'],
                response: { type: 'info', icon: 'fa-server', text: '4 containers live: openrouter-proxy, telegram-webhook, redis, api' }
            },
            {
                cmd: 'audit --verify-pipeline --strict',
                flags: ['--verify-pipeline', '--strict'],
                response: { type: 'success', icon: 'fa-shield-halved', text: 'Integrity hash-chain 100% valid. Zero drift across nodes.' }
            }
        ];

        let cmdIndex = 0;
        function typeNextCommand() {
            if (!_pageVisible) {
                setTimeout(typeNextCommand, 2000);
                return;
            }

            const item = commands[cmdIndex % commands.length];
            cmdIndex++;
            let charIndex = 0;
            typingLine.innerHTML = '<span class="cc-prompt">❯</span> <span class="cc-cursor">|</span>';

            const interval = setInterval(() => {
                if (charIndex < item.cmd.length) {
                    let current = item.cmd.substring(0, charIndex + 1);
                    item.flags.forEach(f => {
                        current = current.replace(f, `<span class="cc-flag">${f}</span>`);
                    });
                    current = current.replace(/^(\S+)/, '<span class="cc-cmd">$1</span>');
                    typingLine.innerHTML = `<span class="cc-prompt">❯</span> ${current} <span class="cc-cursor">|</span>`;
                    charIndex++;
                } else {
                    clearInterval(interval);
                    setTimeout(() => {
                        let formattedCmd = item.cmd;
                        item.flags.forEach(f => {
                            formattedCmd = formattedCmd.replace(f, `<span class="cc-flag">${f}</span>`);
                        });
                        formattedCmd = formattedCmd.replace(/^(\S+)/, '<span class="cc-cmd">$1</span>');

                        const lineCmd = document.createElement('div');
                        lineCmd.className = 'cc-line';
                        lineCmd.innerHTML = `<span class="cc-prompt">❯</span> ${formattedCmd}`;
                        terminalBody.insertBefore(lineCmd, typingLine);

                        const lineRes = document.createElement('div');
                        lineRes.className = `cc-line cc-line--${item.response.type}`;
                        lineRes.innerHTML = `<i class="fas ${item.response.icon}"></i> ${item.response.text}`;
                        terminalBody.insertBefore(lineRes, typingLine);

                        const allLines = terminalBody.querySelectorAll('.cc-line:not(.cc-line--typing):not(.cc-line--ascii)');
                        if (allLines.length > 8) {
                            allLines[0].remove();
                            allLines[1].remove();
                        }

                        terminalBody.scrollTop = terminalBody.scrollHeight;
                        typingLine.innerHTML = '<span class="cc-prompt">❯</span> <span class="cc-cursor">|</span>';

                        setTimeout(typeNextCommand, 3000);
                    }, 400);
                }
            }, 35 + Math.random() * 20);
        }

        setTimeout(typeNextCommand, 1800);
    }

    // Quick Action interactive buttons
    document.querySelectorAll('.cc-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.dataset.cmd;
            if (!terminalBody || !typingLine) return;

            const lineCmd = document.createElement('div');
            lineCmd.className = 'cc-line';
            lineCmd.innerHTML = `<span class="cc-prompt">❯</span> <span class="cc-cmd">${cmd}</span>`;
            terminalBody.insertBefore(lineCmd, typingLine);

            const lineRes = document.createElement('div');
            lineRes.className = 'cc-line cc-line--success';
            lineRes.innerHTML = `<i class="fas fa-check-circle"></i> Executed [${cmd}]: All services reporting operational.`;
            terminalBody.insertBefore(lineRes, typingLine);

            terminalBody.scrollTop = terminalBody.scrollHeight;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            document.querySelector('.cc-tab[data-tab="terminal"]')?.classList.add('active');
            document.querySelector('.cc-tab-panel[data-panel="terminal"]')?.classList.add('active');
        });
    });
}

// === 8. CARD 3D TILT ===
function initCardTilt() {
    if (_perfTier === 'low') return;

    const cards = document.querySelectorAll('.product-card-new, .cheats-gateway-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
            card.style.transition = 'transform 0.4s ease';
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });
}

// === 9. INITIALIZATION ===
function boot() {
    initPreloader();
    initCursor();
    initNavbar();
    initLenis();
    initCounters();
    initCommandCenter();
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
