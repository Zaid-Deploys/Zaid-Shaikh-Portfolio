/* ============================================================
   ZAID SHAIKH — PORTFOLIO INTERACTIVITY SCRIPT
   Matching script-kittens.com architecture & micro-interactions
   DevOps · Developer · Agentic AI — Mumbai, India · 2026
============================================================ */

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

var _globalMouseX = window.innerWidth / 2;
var _globalMouseY = window.innerHeight / 2;
var _pageVisible = true;
var _perfTier = 'high';

// === 1. PERFORMANCE TIER DETECTION ===
(function detectPerformanceTier() {
    var start = performance.now();
    var sum = 0;
    for (var i = 0; i < 50000; i++) { sum += Math.sin(i) * Math.cos(i); }
    var elapsed = performance.now() - start;

    var cores = navigator.hardwareConcurrency || 4;
    var memory = navigator.deviceMemory || 4;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    var score = elapsed;
    if (cores <= 2) score += 20;
    if (memory <= 2) score += 20;
    if (isMobile) score += 15;

    if (score > 35 || cores < 4) _perfTier = 'low';
    else if (score > 15 || cores < 8) _perfTier = 'medium';
    else _perfTier = 'high';

    console.log('[ZaidPortfolio] Performance tier:', _perfTier);
})();

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    document.addEventListener('visibilitychange', () => {
        _pageVisible = !document.hidden;
    });

    // Throttled mouse tracking
    let mouseThrottle = false;
    document.addEventListener('mousemove', (e) => {
        _globalMouseX = e.clientX;
        _globalMouseY = e.clientY;
        if (!mouseThrottle) {
            mouseThrottle = true;
            setTimeout(() => { mouseThrottle = false; }, 16);
        }
    }, { passive: true });

    // Initialize all modules
    initPreloader();
    initCursor();
    initNavbar();
    initParticles();
    initLenisScroll();
    initCommandCenter();
    initCounters();
    initCardTilt();
});

/* ============================================================
   2. PRELOADER — CURTAIN HERO TEAR
   ============================================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const seamFill = document.querySelector('.pl-seam-fill');
    if (!preloader || !seamFill) return;

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 10;
        if (progress > 100) progress = 100;
        seamFill.style.height = progress + '%';

        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 300);
        }
    }, 60);
}

/* ============================================================
   3. PRECISION SPARKLE STAR CURSOR
   ============================================================ */
function initCursor() {
    // Disable on touch screens
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    if (!cursorDot || !cursorOutline) return;

    let dotX = _globalMouseX, dotY = _globalMouseY;
    let outlineX = _globalMouseX, outlineY = _globalMouseY;

    function renderCursor() {
        if (_pageVisible) {
            dotX += (_globalMouseX - dotX) * 0.9;
            dotY += (_globalMouseY - dotY) * 0.9;
            outlineX += (_globalMouseX - outlineX) * 0.2;
            outlineY += (_globalMouseY - outlineY) * 0.2;

            cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
            cursorOutline.style.transform = `translate3d(${outlineX - 19}px, ${outlineY - 19}px, 0)`;
        }
        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover interactive scaling
    const hoverElements = document.querySelectorAll('a, button, .project-card, .bento-card, .cc-tab, .cc-action-btn');
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

    // Click burst particles
    document.addEventListener('click', (e) => {
        createClickBurst(e.clientX, e.clientY);
    });

    // Sparkle trail
    let lastSparkle = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle > 80 && _perfTier !== 'low') {
            lastSparkle = now;
            createSparkle(e.clientX, e.clientY);
        }
    }, { passive: true });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✦';
    sparkle.style.left = (x + (Math.random() * 16 - 8)) + 'px';
    sparkle.style.top = (y + (Math.random() * 16 - 8)) + 'px';
    sparkle.style.color = Math.random() > 0.5 ? '#dc2626' : '#ffffff';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 750);
}

function createClickBurst(x, y) {
    for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.className = 'sparkle';
        p.textContent = '✦';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.color = '#dc2626';
        p.style.transform = `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-${Math.random() * 30 + 15}px)`;
        p.style.transition = 'all 0.5s ease-out';
        p.style.opacity = '1';
        document.body.appendChild(p);

        setTimeout(() => {
            p.style.opacity = '0';
        }, 50);
        setTimeout(() => p.remove(), 550);
    }
}

/* ============================================================
   4. TOP NAVBAR & TUBELIGHT SCROLLSPY
   ============================================================ */
function initNavbar() {
    const navbar = document.querySelector('.top-navbar');
    const hamburger = document.querySelector('.nav-hamburger');
    const mobileMenu = document.querySelector('.nav-mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link[data-section], .nav-mobile-link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    // Navbar glass fade on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile Hamburger
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });
    }

    // ScrollSpy logic
    function updateActiveNav() {
        const scrollPos = window.scrollY + window.innerHeight * 0.35;
        let currentSection = '';

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Close mobile menu when nav link clicked
    document.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('open');
            hamburger?.classList.remove('open');
        });
    });
}

/* ============================================================
   5. LENIS SMOOTH SCROLLING
   ============================================================ */
function initLenisScroll() {
    if (typeof Lenis === 'undefined' || window.innerWidth <= 768) return;

    const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                lenis.scrollTo(target, { offset: -90, duration: 1.2 });
            }
        });
    });
}

/* ============================================================
   6. 3D INTERACTIVE COMMAND CENTER TERMINAL
   ============================================================ */
function initCommandCenter() {
    const ccEl = document.getElementById('commandCenter');
    const terminalBody = document.getElementById('terminalBody');
    const typingLine = document.getElementById('typingLine');
    if (!ccEl) return;

    // 3D Parallax Mouse Tilt
    const ccParent = ccEl.closest('.hero-3d-section');
    if (ccParent && _perfTier !== 'low') {
        ccParent.addEventListener('mousemove', (e) => {
            const rect = ccParent.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            ccEl.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
        }, { passive: true });

        ccParent.addEventListener('mouseleave', () => {
            ccEl.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0)';
            ccEl.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        ccParent.addEventListener('mouseenter', () => {
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

    // Auto-typing DevOps & Agentic AI command stream
    if (terminalBody && typingLine) {
        const commands = [
            {
                cmd: 'agent --deploy restaurant-bot --target telegram',
                flags: ['--deploy', '--target'],
                response: { type: 'success', icon: 'fa-robot', text: 'Hermes Agent active. Telegram webhook verified. Latency: 8ms.' }
            },
            {
                cmd: 'k8s get pods -n ai-mesh -o wide',
                flags: ['-n', '-o'],
                response: { type: 'info', icon: 'fa-cubes', text: '3/3 Pods Ready: hermes-agent, deepgram-tts, sheet-logger [Healthy]' }
            },
            {
                cmd: 'model --load blind-assist-core --mode on-device',
                flags: ['--load', '--mode'],
                response: { type: 'success', icon: 'fa-eye', text: 'YOLOv8 depth + Indian Currency CV model initialized. 0ms cloud lag.' }
            },
            {
                cmd: 'docker ps --filter status=running',
                flags: ['--filter'],
                response: { type: 'info', icon: 'fa-server', text: '4 containers live: openrouter-proxy, telegram-webhook, redis, sheets-api' }
            },
            {
                cmd: 'audit --verify-pipeline --strict',
                flags: ['--verify-pipeline', '--strict'],
                response: { type: 'success', icon: 'fa-shield-halved', text: 'Integrity hash-chain 100% valid. Zero drift detected across nodes.' }
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
                        // Print executed line
                        let formattedCmd = item.cmd;
                        item.flags.forEach(f => {
                            formattedCmd = formattedCmd.replace(f, `<span class="cc-flag">${f}</span>`);
                        });
                        formattedCmd = formattedCmd.replace(/^(\S+)/, '<span class="cc-cmd">$1</span>');

                        const lineCmd = document.createElement('div');
                        lineCmd.className = 'cc-line';
                        lineCmd.innerHTML = `<span class="cc-prompt">❯</span> ${formattedCmd}`;
                        terminalBody.insertBefore(lineCmd, typingLine);

                        // Print response
                        const lineRes = document.createElement('div');
                        lineRes.className = `cc-line cc-line--${item.response.type}`;
                        lineRes.innerHTML = `<i class="fas ${item.response.icon}"></i> ${item.response.text}`;
                        terminalBody.insertBefore(lineRes, typingLine);

                        // Clean old lines if list is too long
                        const allLines = terminalBody.querySelectorAll('.cc-line:not(.cc-line--typing):not(.cc-line--ascii)');
                        if (allLines.length > 10) {
                            allLines[0].remove();
                            allLines[1].remove();
                        }

                        terminalBody.scrollTop = terminalBody.scrollHeight;
                        typingLine.innerHTML = '<span class="cc-prompt">❯</span> <span class="cc-cursor">|</span>';

                        setTimeout(typeNextCommand, 2800);
                    }, 400);
                }
            }, 40 + Math.random() * 20);
        }

        setTimeout(typeNextCommand, 2000);
    }

    // Quick-action interactive buttons
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

            // Switch to terminal tab if not active
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            document.querySelector('.cc-tab[data-tab="terminal"]')?.classList.add('active');
            document.querySelector('.cc-tab-panel[data-panel="terminal"]')?.classList.add('active');
        });
    });
}

/* ============================================================
   7. ANIMATED NUMBER COUNTERS
   ============================================================ */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target || 0);
                let count = 0;
                const step = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        count = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = count;
                }, 30);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* ============================================================
   8. CARD HOVER 3D TILT
   ============================================================ */
function initCardTilt() {
    if (_perfTier === 'low') return;

    const cards = document.querySelectorAll('.project-card, .bento-card');
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

/* ============================================================
   9. BACKGROUND PARTICLES CANVAS
   ============================================================ */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const count = _perfTier === 'high' ? 45 : (_perfTier === 'medium' ? 25 : 12);
    const particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -Math.random() * 0.4 - 0.1,
            alpha: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.4 ? '#dc2626' : '#ffffff'
        });
    }

    function animateParticles() {
        if (_pageVisible) {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < count; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.y < 0) {
                    p.y = height;
                    p.x = Math.random() * width;
                }
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
            }
        }
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
}
