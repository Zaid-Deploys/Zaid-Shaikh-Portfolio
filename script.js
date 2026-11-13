/* ============================================================
   ZAID SHAIKH — PORTFOLIO ENGINE (V3.0 LUXURY ARCHITECTURE)
   Clean, authentic developer portfolio with elite dark luxury aesthetic
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
        preloader.classList.add('pl-ready');

        // Brief pause at 100% so the user sees the charged seam line before tearing
        setTimeout(() => {
            preloader.classList.add('hidden');
            preloader.style.pointerEvents = 'none';
            document.body.style.overflow = 'visible';
            // Allow door opening transition to complete before removing from DOM
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
            }, 1000);
        }, 200);
    }

    // Steady, smooth progression over 1.5s to display the emblem
    const progressInterval = setInterval(() => {
        progress += Math.random() * 0.8 + 1.6; // ~2% every 30ms = ~1.5s to reach 100%
        if (progress > 100) progress = 100;
        if (seamFill) seamFill.style.height = progress + '%';

        if (progress >= 60) {
            preloader.classList.add('pl-ready');
        }

        if (progress >= 100) {
            clearInterval(progressInterval);
            dismiss();
        }
    }, 30);

    // Hard fallback guarantees reveal
    setTimeout(dismiss, 2800);
}

// === 3. GPU-ACCELERATED SPARKLE CURSOR ===
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
    const hoverElements = document.querySelectorAll('a, button, .product-card-new, .profile-luxury-card, .hero-proof-item, .hero-img');
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
let _updateActiveNav = null;

function initNavbar() {
    const navbar = document.getElementById('topNavbar');
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('navMobileMenu');

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
    _updateActiveNav = function updateActiveNav() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;

        const aboutSec = document.getElementById('about');
        const projectsSec = document.getElementById('projects');
        const skillsSec = document.getElementById('skills');
        const servicesSec = document.getElementById('services');
        const contactSec = document.getElementById('contact');

        const projectsTop = projectsSec ? (projectsSec.getBoundingClientRect().top + scrollY) : 1200;
        const skillsTop = skillsSec ? (skillsSec.getBoundingClientRect().top + scrollY) : 2300;
        const servicesTop = servicesSec ? (servicesSec.getBoundingClientRect().top + scrollY) : 3300;
        const contactTop = contactSec ? (contactSec.getBoundingClientRect().top + scrollY) : 7500;

        let currentId = 'about';

        // 1. Bottom of page or footer clearly visible -> Contact
        if ((scrollY + windowHeight >= scrollHeight - 80) || (contactSec && scrollY + windowHeight >= contactTop + 140)) {
            currentId = 'contact';
        } else {
            // Viewport focus line ~ 38% down the screen
            const focusY = scrollY + windowHeight * 0.38;

            if (focusY >= servicesTop) {
                currentId = 'services';
            } else if (focusY >= skillsTop) {
                currentId = 'skills';
            } else if (focusY >= projectsTop) {
                currentId = 'projects';
            } else {
                currentId = 'about';
            }
        }

        const allNavLinks = document.querySelectorAll('.nav-link[data-section], .nav-mobile-link[data-section]');
        allNavLinks.forEach(link => {
            if (link.getAttribute('data-section') === currentId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('scroll', _updateActiveNav, { passive: true });
    window.addEventListener('resize', _updateActiveNav, { passive: true });
    _updateActiveNav();
}

// === 5. LENIS SMOOTH SCROLLING & UNIVERSAL ANCHOR NAVIGATION ===
let _lenisInstance = null;

function initLenis() {
    if (typeof Lenis !== 'undefined' && window.innerWidth > 768) {
        try {
            _lenisInstance = new Lenis({
                duration: 1.15,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smooth: true,
                smoothTouch: false,
            });

            _lenisInstance.on('scroll', () => {
                if (_updateActiveNav) _updateActiveNav();
            });

            function raf(time) {
                _lenisInstance.raf(time);
                requestAnimationFrame(raf);
            }
            requestAnimationFrame(raf);
        } catch (e) {
            console.warn('Lenis scroll error', e);
        }
    }

    // Universal anchor navigation for all in-page links (Home, Projects, Skills, Contact)
    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navOffset = 70;
            const targetY = target.getBoundingClientRect().top + window.pageYOffset - navOffset;

            if (_lenisInstance) {
                _lenisInstance.scrollTo(targetY, { duration: 1.15 });
            } else {
                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
            }

            let sectionName = targetId.replace('#', '');
            if (sectionName === 'inquiry' || sectionName === 'faq') {
                sectionName = 'services';
            }
            document.querySelectorAll('.nav-link[data-section], .nav-mobile-link[data-section]').forEach(link => {
                link.classList.toggle('active', link.getAttribute('data-section') === sectionName);
            });
        }
    });
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

    const cards = document.querySelectorAll('.pricing-card, .product-card-new, .profile-luxury-card');
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

// === 8. HERO SMOKE SHADER (WEBGL2 FLUID ENGINE) ===
function initHeroSmoke() {
    const canvas = document.getElementById('hero-smoke-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, powerPreference: 'high-performance' });
    if (!gl) {
        console.warn('WebGL2 not available for hero-smoke-canvas');
        return;
    }

    const vSrc = `#version 300 es
precision highp float;
in vec4 position;
void main() {
    gl_Position = position;
}`;

    const fSrc = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec3 u_color;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time + 660.0)

float rnd(vec2 p) {
    p = fract(p * vec2(12.9898, 78.233));
    p += dot(p, p + 34.56);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(rnd(i), rnd(i + vec2(1.0, 0.0)), u.x), mix(rnd(i + vec2(0.0, 1.0)), rnd(i + 1.0), u.x), u.y);
}

float fbm(vec2 p) {
    float t = 0.0, a = 1.0;
    for (int i = 0; i < 4; i++) {
        t += a * noise(p);
        p *= mat2(1.0, -1.2, 0.2, 1.2) * 2.0;
        a *= 0.5;
    }
    return t;
}

void main() {
    vec2 uv = (FC - 0.5 * R) / R.y;
    vec3 col = vec3(1.0);
    uv.x += 0.25;
    uv *= vec2(2.0, 1.0);
    float n = fbm(uv * 0.28 - vec2(T * 0.008, 0.0));
    n = noise(uv * 3.0 + n * 2.0);
    col.r -= fbm(uv + vec2(0.0, T * 0.012) + n);
    col.g -= fbm(uv * 1.003 + vec2(0.0, T * 0.012) + n + 0.003);
    col.b -= fbm(uv * 1.006 + vec2(0.0, T * 0.012) + n + 0.006);
    col = mix(col, u_color, dot(col, vec3(0.21, 0.71, 0.07)));
    col = mix(vec3(0.0), col, min(time * 0.1, 1.0));
    col = clamp(col, 0.0, 1.0);

    vec2 ndc = FC / R;
    float edgeL = 1.0 - smoothstep(0.0, 0.40, ndc.x);
    float edgeR = smoothstep(0.60, 1.0, ndc.x);
    float edgeT = smoothstep(0.65, 1.0, ndc.y);
    float edgeB = 1.0 - smoothstep(0.0, 0.35, ndc.y);
    float edgeMask = max(max(edgeL, edgeR), max(edgeT, edgeB));
    float leftBoost = 1.0 - smoothstep(0.0, 0.55, ndc.x);
    edgeMask = edgeMask * 0.75 + leftBoost * 0.45 + 0.18;
    edgeMask = clamp(edgeMask, 0.0, 1.0);
    col *= edgeMask;

    O = vec4(col, 1.0);
}`;

    function compile(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error('Shader compilation error:', gl.getShaderInfoLog(s));
            return null;
        }
        return s;
    }

    const vs = compile(gl.VERTEX_SHADER, vSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(prog));
        return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'time');
    const uRes  = gl.getUniformLocation(prog, 'resolution');
    const uCol  = gl.getUniformLocation(prog, 'u_color');
    const color = [0.863, 0.149, 0.149]; // Signature crimson

    function resize() {
        const hero = canvas.parentElement || document.body;
        const w = hero.offsetWidth || window.innerWidth;
        const h = hero.offsetHeight || window.innerHeight;
        canvas.width  = Math.max(320, Math.floor(w * 0.5));
        canvas.height = Math.max(240, Math.floor(h * 0.5));
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let isHeroVisible = true;
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            isHeroVisible = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        obs.observe(canvas.parentElement || canvas);
    }

    function render(now) {
        if (_pageVisible && isHeroVisible) {
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(prog);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, now * 0.001);
            gl.uniform3fv(uCol, color);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// === 9. MOVING PLASMA WAVE SHADER (HARMONIC THREADS) ===
function initPricingShader() {
    const canvas = document.getElementById('pricing-shader-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'high-performance' });
    if (!gl) return;

    const vSrc = 'attribute vec4 aVertexPosition; void main(){ gl_Position = aVertexPosition; }';
    const fSrc = `precision highp float;
uniform vec2 iResolution;
uniform float iTime;
const float overallSpeed = 0.22;
const float gridSmoothWidth = 0.015;
const float scale = 5.0;
const vec4 lineColor = vec4(0.52, 0.25, 0.96, 1.0); // Vibrant electric violet/purple
const float minLineWidth = 0.01;
const float maxLineWidth = 0.2;
const float lineSpeed = 1.0 * overallSpeed;
const float lineAmplitude = 1.0;
const float lineFrequency = 0.2;
const float warpSpeed = 0.2 * overallSpeed;
const float warpFrequency = 0.5;
const float warpAmplitude = 1.0;
const float offsetFrequency = 0.5;
const float offsetSpeed = 1.33 * overallSpeed;
const float minOffsetSpread = 0.6;
const float maxOffsetSpread = 2.0;

#define drawSmoothLine(pos,halfWidth,t) smoothstep(halfWidth,0.0,abs(pos-(t)))
#define drawCrispLine(pos,halfWidth,t) smoothstep(halfWidth+gridSmoothWidth,halfWidth,abs(pos-(t)))
#define drawCircle(pos,radius,coord) smoothstep(radius+gridSmoothWidth,radius,length(coord-(pos)))

float random(float t){ return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0; }
float getPlasmaY(float x, float hf, float offset){ return random(x * lineFrequency + iTime * lineSpeed) * hf * lineAmplitude + offset; }

void main(){
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 space = (gl_FragCoord.xy - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;
  float hf = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
  float vf = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);
  space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + hf);
  space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * hf;
  vec4 lines = vec4(0.0);
  for(int l = 0; l < 16; l++){
    float nli = float(l) / 16.0;
    float ot = iTime * offsetSpeed;
    float op = float(l) + space.x * offsetFrequency;
    float r = random(op + ot) * 0.5 + 0.5;
    float hw = mix(minLineWidth, maxLineWidth, r * hf) / 2.0;
    float offset = random(op + ot * (1.0 + nli)) * mix(minOffsetSpread, maxOffsetSpread, hf);
    float lp = getPlasmaY(space.x, hf, offset);
    float line = drawSmoothLine(lp, hw, space.y) / 2.0 + drawCrispLine(lp, hw * 0.15, space.y);
    float cx = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
    vec2 cp = vec2(cx, getPlasmaY(cx, hf, offset));
    float circle = drawCircle(cp, 0.01, space) * 4.0;
    line = line + circle;
    lines += line * lineColor * r * 1.35;
  }
  lines *= vf;
  gl_FragColor = lines;
}`;

    function mk(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.warn('Pricing shader compile error:', gl.getShaderInfoLog(s));
            return null;
        }
        return s;
    }

    const vs = mk(gl.VERTEX_SHADER, vSrc);
    const fs = mk(gl.FRAGMENT_SHADER, fSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn('Pricing shader link error:', gl.getProgramInfoLog(prog));
        return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const p = gl.getAttribLocation(prog, 'aVertexPosition');
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const uRes = gl.getUniformLocation(prog, 'iResolution');
    const uTime = gl.getUniformLocation(prog, 'iTime');
    const startTime = Date.now();

    function resize() {
        canvas.width  = Math.min(canvas.offsetWidth  || 900, 1000);
        canvas.height = Math.min(canvas.offsetHeight || 520, 520);
        gl.viewport(0, 0, canvas.width, canvas.height);

        const grid = document.querySelector('.pricing-grid');
        if (grid && canvas && canvas.parentElement) {
            const gridRect = grid.getBoundingClientRect();
            const parentRect = canvas.parentElement.getBoundingClientRect();
            const targetY = (gridRect.top - parentRect.top) + (gridRect.height * 0.42);
            canvas.style.top = (targetY - canvas.offsetHeight / 2) + 'px';
            canvas.style.bottom = 'auto';
        }
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let isVisible = true;
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        obs.observe(canvas.parentElement || canvas);
    }

    function render() {
        if (_pageVisible && isVisible) {
            const t = (Date.now() - startTime) / 1000;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(prog);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, t);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// === 9.5 PROJECT CAROUSEL SLIDER ===
function initProjectSlider() {
    const viewport = document.getElementById('pricingViewport');
    const grid = document.getElementById('pricingGrid');
    const prevBtn = document.getElementById('pricingPrevBtn');
    const nextBtn = document.getElementById('pricingNextBtn');
    const dots = document.querySelectorAll('.pricing-dot');
    const cards = document.querySelectorAll('#pricingGrid .pricing-card');

    if (!viewport || !grid || !cards.length) return;

    let currentIndex = 0;

    function getVisibleCount() {
        const w = window.innerWidth;
        if (w <= 680) return 1;
        if (w <= 1040) return 2;
        return 3;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - getVisibleCount());
    }

    function updateCardWidths() {
        const viewportWidth = viewport.clientWidth;
        const visibleCount = getVisibleCount();
        const gap = 28;
        const cardWidth = Math.floor((viewportWidth - (visibleCount - 1) * gap) / visibleCount);
        grid.style.setProperty('--card-width', `${cardWidth}px`);
        return { cardWidth, gap };
    }

    function updateSlider(animate = true) {
        const { cardWidth, gap } = updateCardWidths();
        const maxIdx = getMaxIndex();

        if (currentIndex > maxIdx) currentIndex = maxIdx;
        if (currentIndex < 0) currentIndex = 0;

        const offset = currentIndex * (cardWidth + gap);

        grid.style.transition = animate ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)' : 'none';
        grid.style.transform = `translateX(-${offset}px)`;

        // Update dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const maxIdx = getMaxIndex();
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = maxIdx;
            }
            updateSlider(true);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxIdx = getMaxIndex();
            if (currentIndex < maxIdx) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateSlider(true);
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener('click', () => {
            const target = parseInt(dot.getAttribute('data-index'), 10) || 0;
            currentIndex = target;
            updateSlider(true);
        });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            const maxIdx = getMaxIndex();
            if (diff > 0) {
                if (currentIndex < maxIdx) currentIndex++;
                else currentIndex = 0;
            } else {
                if (currentIndex > 0) currentIndex--;
                else currentIndex = maxIdx;
            }
            updateSlider(true);
        }
    }, { passive: true });

    window.addEventListener('resize', () => {
        updateSlider(false);
    }, { passive: true });

    // Initial setup
    setTimeout(() => {
        updateSlider(false);
    }, 50);
}

// === 9.6 SKILLS SECTION MOVING RAINBOW SHADER ===
function initSkillsRainbow() {
    const canvas = document.getElementById('skills-rainbow-canvas');
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'high-performance' }) ||
               canvas.getContext('experimental-webgl', { alpha: true, antialias: false });
    if (!gl) return;

    const vSrc = `
attribute vec2 a_pos;
void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
    `.trim();

    const fSrc = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;

    // Graceful continuous sinusoidal wave flowing all the way from edge to edge
    float w = sin(uv.x * 2.8 + u_time * 0.85) * 0.15;
    float d = 0.028;
    float spread = 0.062;

    // True physical spectral dispersion: Red, Green, Blue channel peaks with optical overlap
    float r = smoothstep(spread, 0.0, abs(uv.y - 0.5 - w - d * 1.3));
    float g = smoothstep(spread, 0.0, abs(uv.y - 0.5 - w));
    float b = smoothstep(spread, 0.0, abs(uv.y - 0.5 - w + d * 1.3));

    // Natural spectral warmth and blending (overlap naturally produces golden amber, yellow, cyan, violet)
    vec3 c = vec3(r, g, b);
    c.r += r * 0.25;
    c.g += g * 0.10;
    c.b += b * 0.20;

    // Sleek outer atmospheric glow
    float glow = smoothstep(spread * 2.0, 0.0, abs(uv.y - 0.5 - w)) * 0.20;
    c += vec3(glow * 0.85, glow * 0.55, glow * 1.0);

    // Alpha blending: completely touches the border at x=0 and x=1 without artificial edge fade
    float alpha = clamp(max(max(c.r, c.g), c.b) * 1.15, 0.0, 1.0);

    gl_FragColor = vec4(c, alpha);
}
    `.trim();

    function mkShader(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.warn('Skills rainbow shader compile error:', gl.getShaderInfoLog(s));
            return null;
        }
        return s;
    }

    const vs = mkShader(gl.VERTEX_SHADER, vSrc);
    const fs = mkShader(gl.FRAGMENT_SHADER, fSrc);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn('Skills rainbow program link error:', gl.getProgramInfoLog(prog));
        return;
    }

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1
    ]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const startTime = Date.now();

    function resize() {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(320, Math.floor(rect.width || canvas.parentElement.offsetWidth || window.innerWidth));
        const height = Math.max(200, Math.floor(rect.height || canvas.parentElement.offsetHeight || 600));
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    let isVisible = true;
    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        obs.observe(canvas.parentElement || canvas);
    }

    function render() {
        if (_pageVisible && isVisible) {
            const t = (Date.now() - startTime) / 1000;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(prog);
            gl.uniform1f(uTime, t);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// === 9.7 PARTICLE TEXT EFFECT (TECHNICAL SKILLS) ===
function initParticleText() {
    const canvas = document.getElementById('particle-text-canvas');
    if (!canvas) return;

    function resizeCanvas() {
        canvas.width  = canvas.offsetWidth  || 1200;
        canvas.height = canvas.offsetHeight || 360;
    }
    resizeCanvas();

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let aliveCount = 0;
    let wordIndex  = 0;
    const MAX_PARTICLES = 2500;
    const pixelStep  = 4;
    let lastTime = 0;
    const wordInterval = 2200;
    let lastWordTime = 0;
    let mouseX = -9999, mouseY = -9999;

    const words = [
        'PYTHON',
        'AWS CLOUD',
        'DOCKER',
        'KUBERNETES',
        'DEVOPS',
        'LINUX',
        'AGENTIC AI',
        'FASTAPI',
        'NETWORKS'
    ];

    const maxPool = MAX_PARTICLES + 500;
    const px = new Float32Array(maxPool);
    const py = new Float32Array(maxPool);
    const vx = new Float32Array(maxPool);
    const vy = new Float32Array(maxPool);
    const tx = new Float32Array(maxPool);
    const ty = new Float32Array(maxPool);
    const maxSpd = new Float32Array(maxPool);
    const maxFrc = new Float32Array(maxPool);
    const pSize  = new Float32Array(maxPool);
    const sr = new Uint8Array(maxPool);
    const sg = new Uint8Array(maxPool);
    const sb = new Uint8Array(maxPool);
    const tr = new Uint8Array(maxPool);
    const tg = new Uint8Array(maxPool);
    const tb = new Uint8Array(maxPool);
    const cw = new Float32Array(maxPool);
    const cbr = new Float32Array(maxPool);
    const killed = new Uint8Array(maxPool);

    function initParticle(i) {
        px[i] = Math.random() * canvas.width;
        py[i] = Math.random() * canvas.height;
        vx[i] = (Math.random() - 0.5) * 2;
        vy[i] = (Math.random() - 0.5) * 2;
        tx[i] = 0; ty[i] = 0;
        maxSpd[i] = Math.random() * 8 + 10;
        maxFrc[i] = maxSpd[i] * 0.15;
        pSize[i]  = Math.random() * 2.0 + 1.8;
        sr[i] = 220; sg[i] = 38; sb[i] = 38;
        tr[i] = 255; tg[i] = 255; tb[i] = 255;
        cw[i] = 0;
        cbr[i] = Math.random() * 0.03 + 0.01;
        killed[i] = 0;
    }

    // Ambient falling snow/stars in particle text background (faster fall)
    const bgSnow = [];
    const bgSnowCount = 100;
    for (let s = 0; s < bgSnowCount; s++) {
        bgSnow.push({
            x: Math.random() * (canvas.width || 1200),
            y: Math.random() * (canvas.height || 380),
            size: Math.random() * 1.5 + 0.6,
            speed: Math.random() * 1.0 + 0.9, // faster fall
            baseAlpha: Math.random() * 0.4 + 0.25,
            twinkleSpeed: Math.random() * 2.2 + 0.8,
            swayAmp: Math.random() * 0.8 + 0.2,
            swaySpeed: Math.random() * 1.4 + 0.8,
            phase: Math.random() * 6.28
        });
    }

    const palette = [
        [220,  38,  38],   // Crimson Red
        [255, 255, 255],   // Pure White
        [167, 139, 250],   // Neon Violet / Purple
        [ 16, 185, 129],   // Emerald Green
        [ 14, 165, 233],   // Sky Blue / Cyan
        [245, 158,  11],   // Amber Gold
        [255, 255, 255],   // Crisp White
        [239,  68,  68],   // Coral Red
        [129, 140, 248]    // Indigo
    ];
    let paletteIndex = 0;

    const offscreen = document.createElement('canvas');
    const oc = offscreen.getContext('2d');

    function nextWord(word) {
        offscreen.width  = canvas.width;
        offscreen.height = canvas.height;

        // Safely fit text within 80% of canvas width and 52% of canvas height on mobile
        const maxTextWidth = Math.max(canvas.width * 0.80, 160);
        const maxTextHeight = canvas.height * 0.52;

        let fontSize = Math.min(
            canvas.width / (word.length * 0.70),
            maxTextHeight
        );

        oc.font = 'bold ' + Math.round(fontSize) + 'px Cinzel, Georgia, serif';
        let measured = oc.measureText(word).width;
        if (measured > maxTextWidth && measured > 0) {
            fontSize = fontSize * (maxTextWidth / measured);
        }
        if (fontSize > maxTextHeight) {
            fontSize = maxTextHeight;
        }
        fontSize = Math.max(fontSize, 18);

        oc.clearRect(0, 0, offscreen.width, offscreen.height);
        oc.fillStyle = 'white';
        oc.font = 'bold ' + Math.round(fontSize) + 'px Cinzel, Georgia, serif';
        oc.textAlign = 'center';
        oc.textBaseline = 'middle';
        oc.fillText(word, offscreen.width / 2, offscreen.height / 2);

        const imageData = oc.getImageData(0, 0, offscreen.width, offscreen.height);
        const pixels = imageData.data;
        const w = offscreen.width;

        const newColor = palette[paletteIndex % palette.length];
        paletteIndex++;

        let coords = [];
        for (let i = 0, len = pixels.length; i < len; i += pixelStep * 4) {
            if (pixels[i + 3] > 128) coords.push(i);
        }

        if (coords.length > MAX_PARTICLES) {
            const step = coords.length / MAX_PARTICLES;
            const thinned = [];
            for (let t = 0; t < MAX_PARTICLES; t++) {
                thinned.push(coords[Math.floor(t * step)]);
            }
            coords = thinned;
        }

        // Fisher-Yates shuffle
        for (let j = coords.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            const tmp = coords[j]; coords[j] = coords[k]; coords[k] = tmp;
        }

        let pIdx = 0;
        const ncr = newColor[0], ncg = newColor[1], ncb = newColor[2];
        for (let c = 0; c < coords.length; c++) {
            const ci = coords[c];
            const cpx = (ci / 4) % w;
            const cpy = Math.floor(ci / 4 / w);

            if (pIdx >= aliveCount) {
                if (pIdx >= maxPool) break;
                initParticle(pIdx);
            }
            killed[pIdx] = 0;

            const weight = cw[pIdx];
            sr[pIdx] = Math.round(sr[pIdx] + (tr[pIdx] - sr[pIdx]) * weight) | 0;
            sg[pIdx] = Math.round(sg[pIdx] + (tg[pIdx] - sg[pIdx]) * weight) | 0;
            sb[pIdx] = Math.round(sb[pIdx] + (tb[pIdx] - sb[pIdx]) * weight) | 0;
            tr[pIdx] = ncr;
            tg[pIdx] = ncg;
            tb[pIdx] = ncb;
            cw[pIdx] = 0;
            tx[pIdx] = cpx;
            ty[pIdx] = cpy;
            pIdx++;
        }

        for (let i2 = pIdx; i2 < aliveCount; i2++) {
            if (!killed[i2]) {
                const angle = Math.random() * 6.2832;
                const mag   = (canvas.width + canvas.height) * 0.5;
                tx[i2] = canvas.width  * 0.5 + Math.cos(angle) * mag;
                ty[i2] = canvas.height * 0.5 + Math.sin(angle) * mag;
                const w2 = cw[i2];
                sr[i2] = Math.round(sr[i2] + (tr[i2] - sr[i2]) * w2) | 0;
                sg[i2] = Math.round(sg[i2] + (tg[i2] - sg[i2]) * w2) | 0;
                sb[i2] = Math.round(sb[i2] + (tb[i2] - sb[i2]) * w2) | 0;
                tr[i2] = 0; tg[i2] = 0; tb[i2] = 0;
                cw[i2] = 0;
                killed[i2] = 1;
            }
        }

        if (pIdx > aliveCount) aliveCount = pIdx;
    }

    const colorBuckets = {};
    const bucketKeys = [];

    let ptAnimId = null;
    let isVisible = true;

    function ptAnimate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const dt = Math.min(timestamp - lastTime, 33);
        lastTime = timestamp;
        const dtScale = dt / 16.667;

        if (_pageVisible && isVisible) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw background ambient falling snow/stars
            const nowSec = timestamp * 0.001;
            const bgW = canvas.width, bgH = canvas.height;
            for (let s = 0; s < bgSnowCount; s++) {
                const sn = bgSnow[s];
                sn.y += sn.speed * dtScale;
                if (sn.y > bgH + 5) {
                    sn.y = -5;
                    sn.x = Math.random() * bgW;
                }
                const driftX = sn.x + Math.sin(nowSec * sn.swaySpeed + sn.phase) * sn.swayAmp * 12;
                const alpha = Math.max(0.08, Math.min(0.9, sn.baseAlpha + Math.sin(nowSec * sn.twinkleSpeed + sn.phase) * 0.25));
                ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                ctx.fillRect(driftX, sn.y, sn.size, sn.size);
            }

            for (let bi = 0; bi < bucketKeys.length; bi++) {
                const bk = colorBuckets[bucketKeys[bi]];
                bk.xs.length = 0; bk.ys.length = 0; bk.sizes.length = 0;
            }
            bucketKeys.length = 0;

            const cw2 = canvas.width, ch2 = canvas.height;
            let newAlive = aliveCount;

            for (let i = 0; i < aliveCount; i++) {
                const dx = tx[i] - px[i];
                const dy = ty[i] - py[i];
                const distSq = dx * dx + dy * dy;

                if (killed[i]) {
                    if (px[i] < -100 || px[i] > cw2 + 100 ||
                        py[i] < -100 || py[i] > ch2 + 100) {
                        newAlive--;
                        if (i < newAlive) {
                            px[i]=px[newAlive]; py[i]=py[newAlive];
                            vx[i]=vx[newAlive]; vy[i]=vy[newAlive];
                            tx[i]=tx[newAlive]; ty[i]=ty[newAlive];
                            maxSpd[i]=maxSpd[newAlive]; maxFrc[i]=maxFrc[newAlive];
                            pSize[i]=pSize[newAlive];
                            sr[i]=sr[newAlive]; sg[i]=sg[newAlive]; sb[i]=sb[newAlive];
                            tr[i]=tr[newAlive]; tg[i]=tg[newAlive]; tb[i]=tb[newAlive];
                            cw[i]=cw[newAlive]; cbr[i]=cbr[newAlive];
                            killed[i]=killed[newAlive];
                            i--;
                        }
                        continue;
                    }
                }

                const dist = Math.sqrt(distSq);
                const prox = dist < 60 ? (dist / 60) * (dist / 60) : 1;

                if (dist > 0.5) {
                    const invDist = 1 / dist;
                    const desX = dx * invDist * maxSpd[i] * prox;
                    const desY = dy * invDist * maxSpd[i] * prox;
                    const steerX = (desX - vx[i]) * 0.18 * dtScale;
                    const steerY = (desY - vy[i]) * 0.18 * dtScale;
                    vx[i] += steerX;
                    vy[i] += steerY;
                }

                // Mouse & touch interactive repulsion
                if (mouseX > -1000) {
                    const mdx = px[i] - mouseX;
                    const mdy = py[i] - mouseY;
                    const mDistSq = mdx * mdx + mdy * mdy;
                    if (mDistSq < 14400 && mDistSq > 1) { // 120px interactive radius
                        const mDist = Math.sqrt(mDistSq);
                        const mForce = (1 - mDist / 120) * 12;
                        vx[i] += (mdx / mDist) * mForce * dtScale;
                        vy[i] += (mdy / mDist) * mForce * dtScale;
                    }
                }

                px[i] += vx[i] * dtScale;
                py[i] += vy[i] * dtScale;
                vx[i] *= 0.96;
                vy[i] *= 0.96;

                if (cw[i] < 1) {
                    cw[i] = Math.min(cw[i] + cbr[i] * dtScale, 1);
                }
                const w = cw[i];
                const cr = (sr[i] + (tr[i] - sr[i]) * w + 0.5) | 0;
                const cg = (sg[i] + (tg[i] - sg[i]) * w + 0.5) | 0;
                const cb = (sb[i] + (tb[i] - sb[i]) * w + 0.5) | 0;

                const qr = cr >> 2, qg = cg >> 2, qb = cb >> 2;
                const colorKey = (qr << 12) | (qg << 6) | qb;
                if (!colorBuckets[colorKey]) {
                    colorBuckets[colorKey] = {
                        color: 'rgb(' + (qr << 2) + ',' + (qg << 2) + ',' + (qb << 2) + ')',
                        xs: [], ys: [], sizes: []
                    };
                }
                if (colorBuckets[colorKey].xs.length === 0) bucketKeys.push(colorKey);
                const bucket = colorBuckets[colorKey];
                bucket.xs.push(px[i]);
                bucket.ys.push(py[i]);
                bucket.sizes.push(pSize[i]);
            }

            aliveCount = newAlive;

            for (let ki = 0; ki < bucketKeys.length; ki++) {
                const b = colorBuckets[bucketKeys[ki]];
                ctx.fillStyle = b.color;
                const bxs = b.xs, bys = b.ys, bsz = b.sizes;
                for (let j = 0, blen = bxs.length; j < blen; j++) {
                    const s = bsz[j];
                    ctx.fillRect(bxs[j] - s * 0.5, bys[j] - s * 0.5, s, s);
                }
            }

            if (!lastWordTime) lastWordTime = timestamp;
            if (timestamp - lastWordTime >= wordInterval) {
                lastWordTime = timestamp;
                wordIndex = (wordIndex + 1) % words.length;
                nextWord(words[wordIndex]);
            }
        }

        ptAnimId = requestAnimationFrame(ptAnimate);
    }

    const ptSection = canvas.closest('.particle-text-section') || canvas.parentElement;
    if ('IntersectionObserver' in window && ptSection) {
        const obs = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        }, { threshold: 0.05 });
        obs.observe(ptSection);
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            resizeCanvas();
            nextWord(words[wordIndex]);
        }, 150);
    }, { passive: true });

    // Interactive cursor & touch repulsion
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
        mouseY = (e.clientY - rect.top)  * (canvas.height / rect.height);
    }, { passive: true });

    canvas.addEventListener('mouseleave', () => {
        mouseX = -9999;
        mouseY = -9999;
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            const rect = canvas.getBoundingClientRect();
            mouseX = (e.touches[0].clientX - rect.left) * (canvas.width / rect.width);
            mouseY = (e.touches[0].clientY - rect.top)  * (canvas.height / rect.height);
        }
    }, { passive: true });

    canvas.addEventListener('touchend', () => {
        mouseX = -9999;
        mouseY = -9999;
    }, { passive: true });

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            nextWord(words[0]);
        });
    } else {
        nextWord(words[0]);
    }
    ptAnimId = requestAnimationFrame(ptAnimate);
}

// === 9.8 AMBIENT FALLING SNOW & TWINKLING STARS ===
function initStarsSnow() {
    const canvases = document.querySelectorAll('.stars-snow-canvas');
    if (!canvases.length) return;

    canvases.forEach((canvas) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let w = 0, h = 0;
        let particles = [];
        let isVisible = true;
        let animId = null;
        let lastTime = 0;

        function resize() {
            const rect = canvas.getBoundingClientRect();
            w = canvas.width  = rect.width  || canvas.parentElement?.offsetWidth  || window.innerWidth;
            h = canvas.height = rect.height || canvas.parentElement?.offsetHeight || 600;

            const density = 0.00010;
            const count = Math.min(Math.floor(w * h * density), 180);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 1.5 + 0.6,
                    speed: Math.random() * 1.0 + 0.9, // faster fall
                    baseAlpha: Math.random() * 0.45 + 0.25,
                    twinkleSpeed: Math.random() * 2.2 + 0.8,
                    swayAmp: Math.random() * 0.8 + 0.2,
                    swaySpeed: Math.random() * 1.4 + 0.8,
                    phase: Math.random() * 6.28
                });
            }
        }
        resize();

        let roTimer;
        const ro = new ResizeObserver(() => {
            clearTimeout(roTimer);
            roTimer = setTimeout(resize, 100);
        });
        ro.observe(canvas.parentElement || canvas);

        function draw(timestamp) {
            if (!_pageVisible || !isVisible) {
                animId = requestAnimationFrame(draw);
                return;
            }
            if (!lastTime) lastTime = timestamp;
            const dt = Math.min(timestamp - lastTime, 33);
            lastTime = timestamp;
            const dtScale = dt / 16.667;
            const nowSec = timestamp * 0.001;

            ctx.clearRect(0, 0, w, h);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.y += p.speed * dtScale;
                if (p.y > h + 5) {
                    p.y = -5;
                    p.x = Math.random() * w;
                }

                const currentX = p.x + Math.sin(nowSec * p.swaySpeed + p.phase) * p.swayAmp * 12;
                const alpha = Math.max(0.08, Math.min(0.9, p.baseAlpha + Math.sin(nowSec * p.twinkleSpeed + p.phase) * 0.25));

                ctx.fillStyle = 'rgba(255, 255, 255, ' + alpha + ')';
                ctx.fillRect(currentX, p.y, p.size, p.size);
            }

            animId = requestAnimationFrame(draw);
        }

        const parentSec = canvas.closest('section, footer') || canvas.parentElement;
        if ('IntersectionObserver' in window && parentSec) {
            const obs = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            }, { threshold: 0.02 });
            obs.observe(parentSec);
        }

        animId = requestAnimationFrame(draw);
    });
}

// === 9.8 FREELANCE PROJECT INQUIRY ===
function initFreelanceInquiry() {
    const form = document.getElementById('flInquiryForm');
    const copyBtn = document.getElementById('flCopyBtn');
    const toast = document.getElementById('flToast');
    const toastMsg = document.getElementById('flToastMsg');
    const submitBtn = document.getElementById('flSubmitBtn');
    const btnSpinner = document.getElementById('flBtnSpinner');
    const btnIcon = document.getElementById('flBtnIcon');
    const btnText = document.getElementById('flBtnText');

    // Progress Elements
    const progressBar = document.getElementById('flProgressBar');
    const progressPercent = document.getElementById('flProgressPercent');
    const stepContact = document.getElementById('step-contact');
    const stepProject = document.getElementById('step-project');
    const stepBudget = document.getElementById('step-budget');
    const stepDesc = document.getElementById('step-desc');

    // Field Elements
    const nameInput = document.getElementById('flClientName');
    const emailInput = document.getElementById('flClientEmail');
    const businessInput = document.getElementById('flClientBusiness');
    const projectTypeInput = document.getElementById('flProjectType');
    const budgetInput = document.getElementById('flBudget');
    const descInput = document.getElementById('flProjectDesc');

    // Error Elements
    const nameError = document.getElementById('flClientNameError');
    const emailError = document.getElementById('flClientEmailError');
    const projectTypeError = document.getElementById('flProjectTypeError');
    const descError = document.getElementById('flProjectDescError');

    // Success State Elements
    const successState = document.getElementById('flSuccessState');
    const successRefCode = document.getElementById('flSuccessRefCode');
    const resetFormBtn = document.getElementById('flResetFormBtn');
    const copyRefBtn = document.getElementById('flCopyRefBtn');

    if (!form) return;

    let isSubmitting = false;
    let currentRefId = '';

    // Standard RFC-compliant Email Regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    function validateField(field, isLiveCheck = false) {
        let isValid = true;
        let msg = '';

        if (field === 'name' || !field) {
            const val = (nameInput?.value || '').trim();
            if (!val) {
                isValid = false;
                msg = 'Please enter your name.';
            } else if (val.length < 2) {
                isValid = false;
                msg = 'Name must be at least 2 characters.';
            }
            if (!isLiveCheck || !isValid) {
                setFieldError(nameInput, nameError, isValid ? '' : msg);
            } else {
                setFieldError(nameInput, nameError, '');
            }
        }

        if (field === 'email' || !field) {
            const val = (emailInput?.value || '').trim();
            if (!val) {
                isValid = false;
                msg = 'Please enter your email address.';
            } else if (!emailRegex.test(val)) {
                isValid = false;
                msg = 'Please provide a valid email address (e.g. name@domain.com).';
            }
            if (!isLiveCheck || !isValid) {
                setFieldError(emailInput, emailError, isValid ? '' : msg);
            } else {
                setFieldError(emailInput, emailError, '');
            }
        }

        if (field === 'projectType' || !field) {
            const val = (projectTypeInput?.value || '').trim();
            if (!val) {
                isValid = false;
                msg = 'Please select a project category.';
            }
            if (!isLiveCheck || !isValid) {
                setFieldError(projectTypeInput, projectTypeError, isValid ? '' : msg);
            } else {
                setFieldError(projectTypeInput, projectTypeError, '');
            }
        }

        if (field === 'desc' || !field) {
            const val = (descInput?.value || '').trim();
            if (!val) {
                isValid = false;
                msg = 'Please describe your project scope & objectives.';
            } else if (val.length < 15) {
                isValid = false;
                msg = 'Please provide at least 15 characters of project context.';
            }
            if (!isLiveCheck || !isValid) {
                setFieldError(descInput, descError, isValid ? '' : msg);
            } else {
                setFieldError(descInput, descError, '');
            }
        }

        return isValid;
    }

    function setFieldError(inputEl, errorEl, msg) {
        if (!inputEl) return;
        if (msg) {
            inputEl.classList.add('has-error');
            inputEl.setAttribute('aria-invalid', 'true');
            if (errorEl) {
                errorEl.innerHTML = `<i class="fas fa-exclamation-circle" style="color: #ef4444;"></i> <span>${msg}</span>`;
                errorEl.classList.add('is-visible');
            }
        } else {
            inputEl.classList.remove('has-error');
            inputEl.setAttribute('aria-invalid', 'false');
            if (errorEl) {
                errorEl.textContent = '';
                errorEl.classList.remove('is-visible');
            }
        }
    }

    // Dynamic 4-Step Progress Calculation
    function updateProgress() {
        const nameVal = (nameInput?.value || '').trim();
        const emailVal = (emailInput?.value || '').trim();
        const projectVal = (projectTypeInput?.value || '').trim();
        const budgetVal = (budgetInput?.value || '').trim();
        const descVal = (descInput?.value || '').trim();

        // 1. Contact Details: Name >= 2 chars & valid email
        const isContactValid = nameVal.length >= 2 && emailRegex.test(emailVal);
        updateStepUI(stepContact, isContactValid, nameVal.length > 0 || emailVal.length > 0);

        // 2. Project Selection: Category picked
        const isProjectValid = projectVal.length > 0;
        updateStepUI(stepProject, isProjectValid, projectVal.length > 0);

        // 3. Budget Range: Valid selection (default is valid)
        const isBudgetValid = budgetVal.length > 0;
        updateStepUI(stepBudget, isBudgetValid, budgetVal.length > 0);

        // 4. Project Description: At least 15 chars
        const isDescValid = descVal.length >= 15;
        updateStepUI(stepDesc, isDescValid, descVal.length > 0);

        let completedCount = 0;
        if (isContactValid) completedCount++;
        if (isProjectValid) completedCount++;
        if (isBudgetValid) completedCount++;
        if (isDescValid) completedCount++;

        const percentage = Math.round((completedCount / 4) * 100);

        if (progressBar) {
            progressBar.style.width = percentage + '%';
            progressBar.parentElement?.setAttribute('aria-valuenow', percentage);
        }
        if (progressPercent) {
            progressPercent.textContent = percentage + '%';
            if (percentage === 100) {
                progressPercent.style.color = '#10b981';
                progressPercent.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.6)';
            } else {
                progressPercent.style.color = '#ef4444';
                progressPercent.style.textShadow = '0 0 10px rgba(239, 68, 68, 0.55)';
            }
        }
    }

    function updateStepUI(stepEl, isCompleted, isActive) {
        if (!stepEl) return;
        const bullet = stepEl.querySelector('.fl-step-bullet');
        if (isCompleted) {
            stepEl.classList.add('is-completed');
            stepEl.classList.remove('is-active');
            if (bullet) bullet.innerHTML = '<i class="fas fa-check-circle"></i>';
        } else if (isActive) {
            stepEl.classList.add('is-active');
            stepEl.classList.remove('is-completed');
            if (bullet) bullet.innerHTML = '<i class="fas fa-dot-circle"></i>';
        } else {
            stepEl.classList.remove('is-completed', 'is-active');
            if (bullet) bullet.innerHTML = '<i class="fas fa-circle"></i>';
        }
    }

    // Attach real-time listeners for instant feedback, focus lighting, and progress updates
    const allFormInputs = [nameInput, emailInput, businessInput, projectTypeInput, budgetInput, descInput];
    allFormInputs.forEach(inp => {
        if (!inp) return;
        inp.addEventListener('focus', () => {
            inp.classList.add('is-focused');
            inp.closest('.fl-field')?.classList.add('is-focused');
        });
        inp.addEventListener('blur', () => {
            inp.classList.remove('is-focused');
            inp.closest('.fl-field')?.classList.remove('is-focused');
        });
    });

    [nameInput, emailInput, descInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', () => {
            if (input.classList.contains('has-error')) {
                if (input === nameInput) validateField('name', true);
                if (input === emailInput) validateField('email', true);
                if (input === descInput) validateField('desc', true);
            }
            updateProgress();
        });
        input.addEventListener('blur', () => {
            if (input.value.trim().length > 0) {
                if (input === nameInput) validateField('name');
                if (input === emailInput) validateField('email');
                if (input === descInput) validateField('desc');
            }
        });
    });

    [projectTypeInput, budgetInput].forEach(select => {
        if (!select) return;
        select.addEventListener('change', () => {
            if (select === projectTypeInput) validateField('projectType', true);
            updateProgress();
        });
    });

    function getInquirySummary() {
        const name = (nameInput?.value || '').trim();
        const email = (emailInput?.value || '').trim();
        const business = (businessInput?.value || '').trim() || 'N/A';
        const projectType = projectTypeInput?.value || 'General Project';
        const budget = budgetInput?.value || 'Flexible / Need Guidance';
        const desc = (descInput?.value || '').trim();
        const refId = currentRefId || ('INQ-2026-' + Math.random().toString(36).substring(2, 7).toUpperCase());

        return {
            refId,
            name,
            email,
            business,
            projectType,
            budget,
            desc,
            formattedText: `PROJECT INQUIRY FOR ZAID SHAIKH\nReference ID: ${refId}\nOfficial Contact: business@zaiddev.me\n-----------------------------------\nClient Name: ${name}\nClient Email: ${email}\nBusiness / Brand: ${business}\nProject Category: ${projectType}\nEstimated Budget: ${budget}\n\nProject Scope & Description:\n${desc}\n-----------------------------------\nSubmitted via https://www.zaiddev.me/`
        };
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Comprehensive field validation
        const isNameOk = validateField('name');
        const isEmailOk = validateField('email');
        const isProjectOk = validateField('projectType');
        const isDescOk = validateField('desc');

        if (!isNameOk || !isEmailOk || !isProjectOk || !isDescOk) {
            // Focus the first invalid element without clearing any input data
            if (!isNameOk) nameInput?.focus();
            else if (!isEmailOk) emailInput?.focus();
            else if (!isProjectOk) projectTypeInput?.focus();
            else if (!isDescOk) descInput?.focus();

            showToast('Please review the highlighted fields before submitting.');
            return;
        }

        if (isSubmitting) return;
        isSubmitting = true;

        // 2. Submit Button Loading State
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('is-loading');
        }
        if (btnSpinner) btnSpinner.style.display = 'inline-flex';
        if (btnIcon) btnIcon.style.display = 'none';
        if (btnText) btnText.textContent = 'Transmitting Inquiry...';

        // 3. Generate Genuine Reference ID
        currentRefId = 'INQ-2026-' + Math.random().toString(36).substring(2, 7).toUpperCase();
        const data = getInquirySummary();

        // 4. Dispatch Email Client & Clipboard Backup
        const subject = encodeURIComponent(`[Project Inquiry - ${data.refId}] ${data.projectType} - ${data.name}`);
        const body = encodeURIComponent(data.formattedText);
        const mailtoDestination = `mailto:business@zaiddev.me?subject=${subject}&body=${body}`;

        // Attempt automatic clipboard copy for seamless fallback
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(data.formattedText).catch(() => {});
        }

        // Open user's default email client addressed to official business email
        window.location.href = mailtoDestination;

        // 5. Transition to Animated Success State
        setTimeout(() => {
            if (form) form.style.display = 'none';
            if (successState) {
                successState.style.display = 'block';
                if (successRefCode) successRefCode.textContent = data.refId;
                successState.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Reset submit button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('is-loading');
            }
            if (btnSpinner) btnSpinner.style.display = 'none';
            if (btnIcon) btnIcon.style.display = 'inline-block';
            if (btnText) btnText.textContent = 'Send Project Inquiry';
            isSubmitting = false;

            showToast('Inquiry drafted! Your email client has opened.');
        }, 600);
    });

    // Reset Form button in success state
    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            if (form) {
                form.reset();
                form.style.display = 'block';
                // Reset all error states
                [nameInput, emailInput, projectTypeInput, descInput].forEach(inp => {
                    setFieldError(inp, null, '');
                });
            }
            if (successState) successState.style.display = 'none';
            currentRefId = '';
            updateProgress();
            form?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // Copy Reference ID button in success state
    if (copyRefBtn) {
        copyRefBtn.addEventListener('click', () => {
            if (!currentRefId) return;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(currentRefId).then(() => {
                    showToast(`Reference ID ${currentRefId} copied to clipboard!`);
                }).catch(() => {
                    showToast(`Reference ID: ${currentRefId}`);
                });
            } else {
                showToast(`Reference ID: ${currentRefId}`);
            }
        });
    }

    // Manual Copy Inquiry Details button
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const data = getInquirySummary();
            if (!data.name && !data.desc) {
                showToast('Please enter your project details first.');
                return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(data.formattedText).then(() => {
                    showToast('Inquiry details copied to clipboard!');
                }).catch(() => {
                    showToast('Copy failed. Please copy manually.');
                });
            } else {
                showToast('Inquiry details ready to copy.');
            }
        });
    }

    function showToast(msg) {
        if (!toast) return;
        if (toastMsg) toastMsg.textContent = msg;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 4000);
    }

    // Initialize progress on page load
    updateProgress();
}

// === 9.9 CINEMATIC FREELANCE MOTION ENGINE ===
function initFreelanceMotion() {
    const servicesSection = document.getElementById('services');
    if (!servicesSection) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchOrMobile = window.innerWidth <= 768 || window.matchMedia('(hover: none)').matches;

    // 1. Intersection Observer for Cinematic Viewport Scroll Reveals
    const revealElements = servicesSection.querySelectorAll('.fl-reveal-item, .fl-process-wrapper');
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('fl-revealed'));
    } else {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fl-revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 2. Interactive 3D Perspective Tilt & Full-Card Crimson Glow on Service Cards
    const tiltCards = servicesSection.querySelectorAll('.fl-tilt-card');
    tiltCards.forEach(card => {
        let ticking = false;

        card.addEventListener('mouseenter', () => {
            if (!isTouchOrMobile) {
                card.classList.add('is-hovered');
            }
            card.style.transition = 'transform 0.12s ease-out, background 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('mousemove', (e) => {
            if (isTouchOrMobile || prefersReducedMotion || _perfTier === 'low') return;
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = card.getBoundingClientRect();
                const mx = e.clientX - rect.left;
                const my = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${mx}px`);
                card.style.setProperty('--mouse-y', `${my}px`);

                const normX = (mx / rect.width - 0.5);
                const normY = (my / rect.height - 0.5);
                card.style.transform = `perspective(1000px) rotateY(${normX * 8}deg) rotateX(${-normY * 6}deg) translateY(-8px) scale3d(1.015, 1.015, 1)`;
                ticking = false;
            });
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('is-hovered');
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), background 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        card.addEventListener('touchstart', () => {
            card.classList.remove('is-hovered');
        }, { passive: true });
    });

    // 3. Magnetic Hover Physics for Interactive Action Buttons
    if (!isTouchOrMobile && !prefersReducedMotion) {
        const magneticElements = servicesSection.querySelectorAll('.fl-magnetic');
        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = (e.clientX - cx) * 0.28;
                const dy = (e.clientY - cy) * 0.28;
                btn.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
            }, { passive: true });

            btn.addEventListener('mouseleave', () => {
                btn.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
                btn.style.transform = 'translate3d(0, 0, 0)';
            });

            btn.addEventListener('mouseenter', () => {
                btn.style.transition = 'none';
            });
        });
    }
}

// === 9.10 REALISTIC PROCEDURAL WATER & CINEMATIC RAINFALL SIMULATION ===
function initFreelanceRainfall() {
    const servicesSection = document.getElementById('services');
    const rainCanvas = document.getElementById('fl-rain-canvas');
    const waterCanvas = document.getElementById('fl-water-canvas');
    if (!servicesSection || !rainCanvas) return;

    const rCtx = rainCanvas.getContext('2d', { alpha: true });
    const wCtx = waterCanvas ? waterCanvas.getContext('2d', { alpha: true }) : null;
    if (!rCtx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 768;
    const isLowPerf = typeof _perfTier !== 'undefined' && _perfTier === 'low';

    // Particle capacity limits: Dense Heavy Monsoon downpour
    const MAX_DROPS = isMobile ? 180 : (isLowPerf ? 260 : 500);
    const MAX_CROWNS = isMobile ? 24 : 52;
    const MAX_SPLASHES = isMobile ? 70 : 180;
    const MAX_RIPPLES = isMobile ? 45 : 110;
    const MAX_GLASS_DROPS = isMobile ? 4 : 10;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = 1;

    // Simulation states
    let rainIntensity = 0.0;
    let targetIntensity = 0.0;
    let puddleGrowth = 0.0;
    let isSectionVisible = false;
    let animId = null;
    let mistPhase = 0;

    // Viewport-pinned canvas sizing
    function resize() {
        width = Math.max(320, window.innerWidth);
        height = Math.max(480, window.innerHeight);
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        rainCanvas.width = Math.floor(width * dpr);
        rainCanvas.height = Math.floor(height * dpr);
        rainCanvas.style.width = width + 'px';
        rainCanvas.style.height = height + 'px';
        rCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (waterCanvas && wCtx) {
            waterCanvas.width = Math.floor(width * dpr);
            waterCanvas.height = Math.floor(height * dpr);
            waterCanvas.style.width = width + 'px';
            waterCanvas.style.height = height + 'px';
            wCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── 1. PROCEDURAL MONSOON RAINDROPS (TEARDROP MORPHOLOGY) ──
    const drops = [];
    for (let i = 0; i < MAX_DROPS; i++) {
        // Layer 0: Back (40%), Layer 1: Mid (38%), Layer 2: Front (22%)
        const rand = Math.random();
        const layer = rand < 0.40 ? 0 : (rand < 0.78 ? 1 : 2);
        drops.push({
            x: Math.random() * (width + 320) - 160,
            y: Math.random() * height,
            vy: layer === 0 ? (50 + Math.random() * 18) : (layer === 1 ? (42 + Math.random() * 15) : (36 + Math.random() * 14)),
            vx: layer === 0 ? (-3.0 - Math.random() * 1.2) : (layer === 1 ? (-2.4 - Math.random() * 1.0) : (-1.8 - Math.random() * 0.9)),
            length: layer === 0 ? (35 + Math.random() * 20) : (layer === 1 ? (28 + Math.random() * 20) : (35 + Math.random() * 30)),
            headRadius: layer === 0 ? 0.9 : (layer === 1 ? 1.5 : 2.5),
            layer: layer,
            alpha: layer === 0 ? (0.22 + Math.random() * 0.12) : (layer === 1 ? (0.45 + Math.random() * 0.20) : (0.78 + Math.random() * 0.22))
        });
    }

    // ── 2. CROWN SPLASH POOL ──
    const crowns = [];
    for (let i = 0; i < MAX_CROWNS; i++) {
        crowns.push({
            active: false,
            x: 0,
            y: 0,
            r: 2,
            maxR: 12,
            growth: 0.9,
            spikes: 6,
            height: 10,
            alpha: 0,
            fade: 0.05
        });
    }

    function spawnCrown(x, y, layer) {
        for (let i = 0; i < MAX_CROWNS; i++) {
            const c = crowns[i];
            if (!c.active) {
                c.active = true;
                c.x = x;
                c.y = y;
                c.r = 2;
                c.maxR = layer === 2 ? (11 + Math.random() * 7) : (7 + Math.random() * 5);
                c.growth = 1.1 + Math.random() * 0.45;
                c.spikes = Math.floor(Math.random() * 3) + 5;
                c.height = layer === 2 ? (13 + Math.random() * 7) : (8 + Math.random() * 5);
                c.alpha = layer === 2 ? 0.90 : 0.65;
                c.fade = 0.048 + Math.random() * 0.02;
                break;
            }
        }
    }

    // ── 3. SECONDARY PROJECTILE DROPLETS ──
    const splashes = [];
    for (let i = 0; i < MAX_SPLASHES; i++) {
        splashes.push({
            active: false,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            radius: 1,
            alpha: 0,
            decay: 0.04
        });
    }

    function spawnSecondaryDroplets(x, y, layer) {
        let count = layer === 2 ? 5 : (layer === 1 ? 3 : 2);
        for (let i = 0; i < MAX_SPLASHES && count > 0; i++) {
            const s = splashes[i];
            if (!s.active) {
                s.active = true;
                s.x = x;
                s.y = y;
                const angle = (Math.random() * Math.PI) - Math.PI; // Eject upward
                const speed = (Math.random() * 4.2 + 1.5) * (layer === 2 ? 1.3 : 0.95);
                s.vx = Math.cos(angle) * speed - 0.6;
                s.vy = Math.sin(angle) * speed;
                s.radius = layer === 2 ? (1.5 + Math.random() * 1.1) : (1.0 + Math.random() * 0.7);
                s.alpha = layer === 2 ? 0.85 : 0.60;
                s.decay = 0.035 + Math.random() * 0.022;
                count--;
            }
        }
    }

    // ── 4. EXPANDING SURFACE RIPPLES ──
    const ripples = [];
    for (let i = 0; i < MAX_RIPPLES; i++) {
        ripples.push({
            active: false,
            x: 0,
            y: 0,
            rx: 1,
            ry: 0.32,
            growth: 0.8,
            maxRx: 26,
            alpha: 0,
            fade: 0.018,
            inPuddle: false
        });
    }

    function spawnRipple(x, y, layer, inPuddle) {
        for (let i = 0; i < MAX_RIPPLES; i++) {
            const r = ripples[i];
            if (!r.active) {
                r.active = true;
                r.x = x;
                r.y = y;
                r.rx = 1.0;
                r.ry = 0.32; // Perspective flattening
                r.growth = layer === 2 ? (1.1 + Math.random() * 0.6) : (0.75 + Math.random() * 0.4);
                r.maxRx = layer === 2 ? (30 + Math.random() * 20) : (18 + Math.random() * 10);
                r.alpha = layer === 2 ? 0.75 : 0.48;
                r.fade = 0.015 + Math.random() * 0.008;
                r.inPuddle = inPuddle;
                break;
            }
        }
    }

    // ── 5. FOREGROUND LENS CONDENSATION DROPLETS ──
    const glassDrops = [];
    for (let i = 0; i < MAX_GLASS_DROPS; i++) {
        glassDrops.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.8 + 40,
            r: 2.2 + Math.random() * 2.8,
            slipCountdown: Math.floor(Math.random() * 160) + 40,
            slipSpeed: 0,
            alpha: 0.45 + Math.random() * 0.35
        });
    }

    // ── 6. DISTRIBUTED SHALLOW PUDDLE SEEDS (THROUGHOUT FREELANCE SECTION) ──
    // Puddles span across all 6 horizontal ground tiers of the Freelance section
    const puddleSeeds = [
        // ── Tier 1: Hero Ground Shelf (yRatio ~ 0.055 - 0.09) ──
        { xRatio: 0.20, yRatio: 0.065, maxR: 170, aspect: 0.32, seed: 1.1 },
        { xRatio: 0.37, yRatio: 0.075, maxR: 220, aspect: 0.30, seed: 2.3 }, // merges with 1st
        { xRatio: 0.68, yRatio: 0.070, maxR: 190, aspect: 0.34, seed: 3.7 },
        { xRatio: 0.84, yRatio: 0.082, maxR: 150, aspect: 0.31, seed: 4.9 }, // merges with 3rd

        // ── Tier 2: Services Shelf & Margins (yRatio ~ 0.22 - 0.37) ──
        { xRatio: 0.12, yRatio: 0.230, maxR: 160, aspect: 0.32, seed: 1.8 },
        { xRatio: 0.88, yRatio: 0.250, maxR: 180, aspect: 0.30, seed: 3.2 },
        { xRatio: 0.50, yRatio: 0.310, maxR: 240, aspect: 0.33, seed: 5.1 }, // center ground pool
        { xRatio: 0.22, yRatio: 0.355, maxR: 170, aspect: 0.29, seed: 6.4 },
        { xRatio: 0.78, yRatio: 0.365, maxR: 200, aspect: 0.31, seed: 7.8 },

        // ── Tier 3: Transition to Process (yRatio ~ 0.43 - 0.48) ──
        { xRatio: 0.22, yRatio: 0.445, maxR: 230, aspect: 0.33, seed: 2.5 },
        { xRatio: 0.45, yRatio: 0.455, maxR: 270, aspect: 0.31, seed: 4.2 }, // merges with left
        { xRatio: 0.68, yRatio: 0.450, maxR: 250, aspect: 0.32, seed: 5.9 }, // merges with center
        { xRatio: 0.86, yRatio: 0.468, maxR: 180, aspect: 0.28, seed: 8.1 },

        // ── Tier 4: Process to Inquiry Ground Band (yRatio ~ 0.57 - 0.63) ──
        { xRatio: 0.18, yRatio: 0.585, maxR: 190, aspect: 0.32, seed: 3.4 },
        { xRatio: 0.36, yRatio: 0.595, maxR: 250, aspect: 0.30, seed: 4.8 }, // merges
        { xRatio: 0.65, yRatio: 0.590, maxR: 230, aspect: 0.33, seed: 6.2 },
        { xRatio: 0.82, yRatio: 0.605, maxR: 170, aspect: 0.29, seed: 7.7 }, // merges

        // ── Tier 5: Inquiry Margins & FAQ Ground (yRatio ~ 0.72 - 0.78) ──
        { xRatio: 0.14, yRatio: 0.735, maxR: 200, aspect: 0.32, seed: 2.9 },
        { xRatio: 0.86, yRatio: 0.745, maxR: 210, aspect: 0.31, seed: 5.3 },
        { xRatio: 0.50, yRatio: 0.770, maxR: 270, aspect: 0.34, seed: 8.4 }, // wide center pool

        // ── Tier 6: Base Ground Plane & CTA Banner (yRatio ~ 0.88 - 0.98) ──
        { xRatio: 0.18, yRatio: 0.895, maxR: 260, aspect: 0.32, seed: 1.4 },
        { xRatio: 0.40, yRatio: 0.915, maxR: 310, aspect: 0.30, seed: 3.8 }, // grand merged
        { xRatio: 0.64, yRatio: 0.910, maxR: 300, aspect: 0.31, seed: 6.5 }, // grand merged
        { xRatio: 0.84, yRatio: 0.925, maxR: 240, aspect: 0.29, seed: 7.9 }, // grand merged
        { xRatio: 0.50, yRatio: 0.965, maxR: 400, aspect: 0.35, seed: 9.2 }  // bottom mega pool
    ];

    // Helper: Draw organic irregular puddle perimeter using harmonic perturbations
    function drawOrganicPuddle(ctx, cx, cy, rx, ry, seed) {
        ctx.beginPath();
        const steps = 18;
        for (let i = 0; i <= steps; i++) {
            const theta = (i / steps) * Math.PI * 2;
            const noise = 1.0 + 0.12 * Math.sin(3 * theta + seed) + 0.08 * Math.cos(5 * theta + seed * 1.3);
            const px = cx + Math.cos(theta) * rx * noise;
            const py = cy + Math.sin(theta) * ry * noise;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
    }

    // Scroll Observer: Smoothly activate rain & track exact clipping boundaries
    function checkScrollTransition() {
        if (!servicesSection) return;
        const rect = servicesSection.getBoundingClientRect();
        const winH = window.innerHeight;

        // In view whenever section overlaps viewport
        if (rect.bottom > 0 && rect.top < winH) {
            isSectionVisible = true;
            // Ramp in intensity at top edge of services
            const progress = Math.min(1.0, Math.max(0.0, (winH - rect.top) / (winH * 0.45)));
            targetIntensity = Math.max(0.3, progress);
            servicesSection.classList.add('fl-rain-active', 'fl-in-view');
        } else {
            targetIntensity = 0.0;
            isSectionVisible = false;
            servicesSection.classList.remove('fl-in-view');
            if (rect.top >= winH) {
                servicesSection.classList.remove('fl-rain-active');
            }
        }
    }

    window.addEventListener('scroll', checkScrollTransition, { passive: true });
    checkScrollTransition();

    if ('IntersectionObserver' in window) {
        const obs = new IntersectionObserver((entries) => {
            isSectionVisible = entries[0].isIntersecting;
            if (isSectionVisible && !animId) {
                animId = requestAnimationFrame(loop);
            }
        }, { threshold: 0.01 });
        obs.observe(servicesSection);
    }

    // Active collision surfaces cache (updated dynamically in loop)
    let visibleSurfaces = [];
    let visiblePuddles = [];

    // ── RENDER LOOP ──
    function loop() {
        if (!_pageVisible || !isSectionVisible) {
            animId = null;
            return;
        }

        const secRect = servicesSection.getBoundingClientRect();
        const winH = window.innerHeight;

        // Ensure visibility and precise clipping within #services boundary
        if (secRect.bottom <= 0 || secRect.top >= winH) {
            rainCanvas.style.visibility = 'hidden';
            if (waterCanvas) waterCanvas.style.visibility = 'hidden';
            animId = requestAnimationFrame(loop);
            return;
        }

        rainCanvas.style.visibility = 'visible';
        if (waterCanvas) waterCanvas.style.visibility = 'visible';

        const topClip = Math.max(0, Math.floor(secRect.top));
        const bottomClip = Math.max(0, Math.floor(winH - secRect.bottom));
        const clipStyle = `inset(${topClip}px 0px ${bottomClip}px 0px)`;
        rainCanvas.style.clipPath = clipStyle;
        rainCanvas.style.webkitClipPath = clipStyle;
        if (waterCanvas) {
            waterCanvas.style.clipPath = clipStyle;
            waterCanvas.style.webkitClipPath = clipStyle;
        }

        // Smooth intensity ramp
        rainIntensity += (targetIntensity - rainIntensity) * 0.055;
        if (targetIntensity > 0.05 && rainIntensity < 0.35) {
            rainIntensity += 0.02;
        }

        // Gradual puddle accumulation over time
        if (rainIntensity > 0.15) {
            puddleGrowth = Math.min(1.0, puddleGrowth + 0.0018);
        }

        rCtx.clearRect(0, 0, width, height);
        if (wCtx) wCtx.clearRect(0, 0, width, height);

        // Reduced motion fallback: static subtle wet sheen
        if (prefersReducedMotion) {
            if (wCtx) {
                wCtx.fillStyle = 'rgba(18, 5, 14, 0.45)';
                wCtx.fillRect(0, 0, width, height);
            }
            animId = requestAnimationFrame(loop);
            return;
        }

        if (rainIntensity > 0.02) {
            const secH = secRect.height;
            const secW = secRect.width;
            const pLvl = puddleGrowth * rainIntensity;

            // ══════════════════════════════════════════════════════════════════
            // 1. GROUND WATER ACCUMULATION & PUDDLES (fl-water-canvas)
            // ══════════════════════════════════════════════════════════════════
            visiblePuddles = [];
            visibleSurfaces = [];

            if (wCtx && pLvl > 0.02) {
                wCtx.save();
                for (let i = 0; i < puddleSeeds.length; i++) {
                    const p = puddleSeeds[i];
                    // Compute puddle coordinates in active viewport space
                    const screenY = secRect.top + p.yRatio * secH;
                    const screenX = secRect.left + p.xRatio * secW;

                    // Frustum culling: only draw puddles currently inside visible screen
                    const maxR = p.maxR * (0.32 + 0.68 * pLvl);
                    const rx = maxR;
                    const ry = maxR * p.aspect;

                    if (screenY + ry < -50 || screenY - ry > winH + 50) continue;

                    visiblePuddles.push({
                        cx: screenX,
                        cy: screenY,
                        rx: rx,
                        ry: ry,
                        puddle: p
                    });

                    // Register puddle as active rain collision plane
                    visibleSurfaces.push({
                        x1: screenX - rx * 0.92,
                        x2: screenX + rx * 0.92,
                        y: screenY,
                        type: 'puddle'
                    });

                    // A: Wet Ground Absorption Perimeter
                    drawOrganicPuddle(wCtx, screenX, screenY, rx * 1.15, ry * 1.15, p.seed);
                    wCtx.fillStyle = `rgba(28, 8, 18, ${0.42 * pLvl})`;
                    wCtx.fill();

                    // B: Deep Obsidian Water Pool Body
                    drawOrganicPuddle(wCtx, screenX, screenY, rx, ry, p.seed);
                    wCtx.fillStyle = `rgba(4, 2, 6, ${0.84 * pLvl})`;
                    wCtx.fill();

                    // C: Ambient Dark Crimson Reflection Sheen
                    const refGrad = wCtx.createRadialGradient(screenX, screenY - ry * 0.2, 0, screenX, screenY, rx);
                    refGrad.addColorStop(0, `rgba(220, 38, 38, ${0.22 * pLvl})`);
                    refGrad.addColorStop(0.55, `rgba(220, 38, 38, ${0.06 * pLvl})`);
                    refGrad.addColorStop(1, 'rgba(220, 38, 38, 0)');
                    wCtx.fillStyle = refGrad;
                    drawOrganicPuddle(wCtx, screenX, screenY, rx * 0.94, ry * 0.94, p.seed);
                    wCtx.fill();

                    // D: Specular Edge Tension Highlight
                    wCtx.strokeStyle = `rgba(240, 248, 255, ${0.16 * pLvl})`;
                    wCtx.lineWidth = 1.1;
                    wCtx.stroke();
                }
                wCtx.restore();

                // Surface ripples inside puddle water (on fl-water-canvas)
                wCtx.save();
                for (let i = 0; i < MAX_RIPPLES; i++) {
                    const r = ripples[i];
                    if (!r.active || !r.inPuddle) continue;
                    if (r.y < -30 || r.y > winH + 30) continue;

                    wCtx.beginPath();
                    wCtx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
                    wCtx.strokeStyle = `rgba(225, 238, 255, ${r.alpha * 0.75 * pLvl})`;
                    wCtx.lineWidth = Math.max(0.6, 1.4 * (1 - r.rx / r.maxRx));
                    wCtx.stroke();

                    // Concentric Crimson Secondary Wave Ring
                    if (r.rx > 8) {
                        wCtx.beginPath();
                        wCtx.ellipse(r.x, r.y, r.rx * 0.68, r.ry * 0.68, 0, 0, Math.PI * 2);
                        wCtx.strokeStyle = `rgba(220, 38, 38, ${r.alpha * 0.50 * pLvl})`;
                        wCtx.lineWidth = 0.8;
                        wCtx.stroke();
                    }
                }
                wCtx.restore();
            }

            // ══════════════════════════════════════════════════════════════════
            // 2. CARD TOPS COLLISION PLANES IN VIEWPORT SPACE
            // ══════════════════════════════════════════════════════════════════
            const cards = servicesSection.querySelectorAll('.fl-service-card, .fl-process-card, .fl-inquiry-wrap, .fl-cta-banner');
            for (let i = 0; i < cards.length; i++) {
                const cRect = cards[i].getBoundingClientRect();
                if (cRect.top > -40 && cRect.top < winH + 40) {
                    visibleSurfaces.push({
                        x1: cRect.left,
                        x2: cRect.right,
                        y: cRect.top,
                        type: 'card'
                    });
                }
            }

            // Bottom ground plane fallback
            if (secRect.bottom <= winH + 120) {
                visibleSurfaces.push({
                    x1: -100,
                    x2: width + 100,
                    y: Math.min(winH - 12, secRect.bottom - 18),
                    type: 'ground'
                });
            }

            // ══════════════════════════════════════════════════════════════════
            // 3. AIR RIPPLES & IMPACTS (fl-rain-canvas)
            // ══════════════════════════════════════════════════════════════════
            rCtx.save();
            for (let i = 0; i < MAX_RIPPLES; i++) {
                const r = ripples[i];
                if (!r.active) continue;

                r.rx += r.growth;
                r.ry = r.rx * 0.32;
                r.alpha -= r.fade;

                if (r.alpha <= 0 || r.rx >= r.maxRx) {
                    r.active = false;
                    continue;
                }

                // Air ripples on card tops / dry ground
                if (!r.inPuddle) {
                    rCtx.beginPath();
                    rCtx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
                    rCtx.strokeStyle = `rgba(225, 238, 255, ${r.alpha * 0.65})`;
                    rCtx.lineWidth = Math.max(0.6, 1.2 * (1 - r.rx / r.maxRx));
                    rCtx.stroke();
                }
            }
            rCtx.restore();

            // Crown Splashes
            rCtx.save();
            for (let i = 0; i < MAX_CROWNS; i++) {
                const c = crowns[i];
                if (!c.active) continue;

                c.r += c.growth;
                c.alpha -= c.fade;
                if (c.alpha <= 0 || c.r >= c.maxR) {
                    c.active = false;
                    continue;
                }

                const progress = c.r / c.maxR;
                const spikeLift = c.height * (1 - Math.pow(progress - 0.4, 2));

                // Crown base ring
                rCtx.beginPath();
                rCtx.ellipse(c.x, c.y, c.r, c.r * 0.35, 0, 0, Math.PI * 2);
                rCtx.strokeStyle = `rgba(240, 248, 255, ${c.alpha * 0.70})`;
                rCtx.lineWidth = 1.0;
                rCtx.stroke();

                // Upward crown droplet spikes
                rCtx.fillStyle = `rgba(255, 255, 255, ${c.alpha * 0.90})`;
                for (let k = 0; k < c.spikes; k++) {
                    const angle = (k / c.spikes) * Math.PI * 2;
                    const sx = c.x + Math.cos(angle) * c.r;
                    const sy = c.y + Math.sin(angle) * (c.r * 0.35) - spikeLift;

                    rCtx.beginPath();
                    rCtx.arc(sx, sy, 1.3, 0, Math.PI * 2);
                    rCtx.fill();

                    // Connecting droplet stem
                    rCtx.beginPath();
                    rCtx.strokeStyle = `rgba(225, 238, 255, ${c.alpha * 0.42})`;
                    rCtx.lineWidth = 0.8;
                    rCtx.moveTo(sx, sy);
                    rCtx.lineTo(c.x + Math.cos(angle) * (c.r * 0.8), c.y + Math.sin(angle) * (c.r * 0.28));
                    rCtx.stroke();
                }
            }
            rCtx.restore();

            // Secondary Projectile Droplets
            rCtx.save();
            for (let i = 0; i < MAX_SPLASHES; i++) {
                const s = splashes[i];
                if (!s.active) continue;

                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.28; // Gravity
                s.alpha -= s.decay;

                if (s.alpha <= 0 || s.y > winH + 20) {
                    s.active = false;
                    continue;
                }

                // Secondary water bead
                rCtx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.92})`;
                rCtx.beginPath();
                rCtx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                rCtx.fill();

                // Directional motion tail
                rCtx.strokeStyle = `rgba(235, 242, 255, ${s.alpha * 0.55})`;
                rCtx.lineWidth = s.radius * 0.8;
                rCtx.beginPath();
                rCtx.moveTo(s.x, s.y);
                rCtx.lineTo(s.x - s.vx * 1.5, s.y - s.vy * 1.5);
                rCtx.stroke();
            }
            rCtx.restore();

            // ══════════════════════════════════════════════════════════════════
            // 4. HEAVY MONSOON DROPLET SIMULATION (3-TIER OPTICAL DEPTH)
            // ══════════════════════════════════════════════════════════════════
            const activeLimit = Math.floor(MAX_DROPS * rainIntensity);

            for (let i = 0; i < activeLimit; i++) {
                const d = drops[i];

                d.x += d.vx;
                d.y += d.vy;

                // Collision detection against visible surfaces (cards & puddles)
                let collided = false;
                for (let sIdx = 0; sIdx < visibleSurfaces.length; sIdx++) {
                    const s = visibleSurfaces[sIdx];
                    if (d.x >= s.x1 && d.x <= s.x2 && d.y >= s.y - 12 && d.y <= s.y + d.vy + 4) {
                        const hitPuddle = s.type === 'puddle';
                        // Probability of triggering visible impact
                        if (d.layer === 2 || Math.random() < (hitPuddle ? 0.70 : 0.40)) {
                            spawnCrown(d.x, s.y, d.layer);
                            spawnSecondaryDroplets(d.x, s.y, d.layer);
                            spawnRipple(d.x, s.y, d.layer, hitPuddle);
                        }

                        // Reset drop to sky above viewport
                        d.x = Math.random() * (width + 320) - 100;
                        d.y = -d.length - Math.random() * 90;
                        collided = true;
                        break;
                    }
                }

                if (collided) continue;

                // Off-screen boundary recycle
                if (d.y > winH + d.length) {
                    d.x = Math.random() * (width + 320) - 100;
                    d.y = -d.length - Math.random() * 90;
                    continue;
                }
                if (d.x < -140) {
                    d.x = width + 80;
                }

                // ── RENDER INDIVIDUAL DROPLET ──
                const headX = d.x;
                const headY = d.y;
                const tailX = d.x - d.vx * (d.length / d.vy);
                const tailY = d.y - d.length;

                // Optical refraction gradient along droplet body
                const grad = rCtx.createLinearGradient(tailX, tailY, headX, headY);
                grad.addColorStop(0, 'rgba(215, 230, 255, 0)');
                grad.addColorStop(0.65, `rgba(220, 235, 255, ${d.alpha * 0.50 * rainIntensity})`);
                grad.addColorStop(0.9, `rgba(255, 255, 255, ${d.alpha * 0.90 * rainIntensity})`);
                grad.addColorStop(1, `rgba(255, 248, 250, ${d.alpha * rainIntensity})`);

                rCtx.beginPath();
                rCtx.strokeStyle = grad;
                rCtx.lineWidth = d.headRadius * (d.layer === 2 ? 1.6 : (d.layer === 1 ? 1.2 : 0.9));
                rCtx.lineCap = 'round';
                rCtx.moveTo(tailX, tailY);
                rCtx.lineTo(headX, headY);
                rCtx.stroke();

                // Rounded bulbous droplet head with specular apex
                if (d.layer >= 1) {
                    rCtx.fillStyle = `rgba(255, 255, 255, ${d.alpha * rainIntensity})`;
                    rCtx.beginPath();
                    rCtx.arc(headX, headY, d.headRadius * 0.85, 0, Math.PI * 2);
                    rCtx.fill();

                    // Ambient crimson light refraction glint
                    if (d.layer === 2) {
                        rCtx.fillStyle = `rgba(220, 38, 38, ${0.50 * d.alpha * rainIntensity})`;
                        rCtx.beginPath();
                        rCtx.arc(headX + 0.6, headY - 0.4, d.headRadius * 0.45, 0, Math.PI * 2);
                        rCtx.fill();
                    }
                }
            }

            // ══════════════════════════════════════════════════════════════════
            // 5. ATMOSPHERIC RAIN MIST (DRIFTING VOLUMETRIC HAZE)
            // ══════════════════════════════════════════════════════════════════
            mistPhase += 0.008;
            rCtx.save();
            const mistX1 = (Math.sin(mistPhase) * 120) + (width * 0.3);
            const mistY1 = height * 0.35;
            const mistGrad1 = rCtx.createRadialGradient(mistX1, mistY1, 40, mistX1, mistY1, width * 0.65);
            mistGrad1.addColorStop(0, `rgba(215, 230, 255, ${0.038 * rainIntensity})`);
            mistGrad1.addColorStop(0.6, `rgba(220, 38, 38, ${0.022 * rainIntensity})`);
            mistGrad1.addColorStop(1, 'transparent');
            rCtx.fillStyle = mistGrad1;
            rCtx.fillRect(0, 0, width, height);
            rCtx.restore();

            // ══════════════════════════════════════════════════════════════════
            // 6. FOREGROUND LENS CONDENSATION DROPLETS
            // ══════════════════════════════════════════════════════════════════
            if (!isMobile && rainIntensity > 0.30) {
                rCtx.save();
                for (let i = 0; i < MAX_GLASS_DROPS; i++) {
                    const g = glassDrops[i];
                    g.slipCountdown--;

                    if (g.slipCountdown <= 0) {
                        g.slipSpeed = Math.min(5.2, g.slipSpeed + 0.42);
                        g.y += g.slipSpeed;

                        // Temporary water streak trail
                        rCtx.strokeStyle = `rgba(255, 255, 255, ${0.15 * rainIntensity})`;
                        rCtx.lineWidth = g.r * 0.75;
                        rCtx.beginPath();
                        rCtx.moveTo(g.x, g.y - 20);
                        rCtx.lineTo(g.x, g.y);
                        rCtx.stroke();

                        if (g.y > height - 60) {
                            g.y = Math.random() * 260 + 40;
                            g.x = Math.random() * width;
                            g.slipCountdown = Math.floor(Math.random() * 240) + 120;
                            g.slipSpeed = 0;
                        } else if (Math.random() < 0.04) {
                            g.slipCountdown = Math.floor(Math.random() * 180) + 90;
                            g.slipSpeed = 0;
                        }
                    }

                    // Glass droplet bead
                    rCtx.fillStyle = `rgba(255, 255, 255, ${g.alpha * rainIntensity * 0.85})`;
                    rCtx.beginPath();
                    rCtx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
                    rCtx.fill();

                    // Micro ambient crimson glint
                    rCtx.fillStyle = `rgba(220, 38, 38, ${0.35 * rainIntensity})`;
                    rCtx.beginPath();
                    rCtx.arc(g.x + 0.6, g.y + 0.6, g.r * 0.45, 0, Math.PI * 2);
                    rCtx.fill();
                }
                rCtx.restore();
            }
        }

        animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);
}

// === 10. BOOTSTRAP ===
function boot() {
    initPreloader();
    initHeroSmoke();
    initPricingShader();
    initProjectSlider();
    initSkillsRainbow();
    initParticleText();
    initStarsSnow();
    initCursor();
    initNavbar();
    initLenis();
    initCounters();
    initCardTilt();
    initFreelanceInquiry();
    initFreelanceMotion();
    initFreelanceRainfall();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}

document.addEventListener('visibilitychange', () => {
    _pageVisible = !document.hidden;
});
