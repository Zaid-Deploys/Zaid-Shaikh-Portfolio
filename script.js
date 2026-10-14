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
        preloader.classList.add('pl-ready');

        // Brief pause at 100% so the user sees the charged seam line before tearing
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'visible';
            // Allow 1.5s door opening transition to complete before removing from DOM
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.remove();
                }
            }, 1600);
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

// === 8. HERO SMOKE SHADER (SCRIPT KITTENS 1:1 WEBGL2 FLUID ENGINE) ===
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
    const color = [0.863, 0.149, 0.149]; // Script-Kittens signature crimson

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

// === 9. MOVING PLASMA WAVE SHADER (SCRIPT KITTENS 1:1 HARMONIC THREADS) ===
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
const vec4 lineColor = vec4(0.48, 0.22, 0.88, 1.0); // Vibrant neon violet/purple from Script-Kittens
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
    lines += line * lineColor * r;
  }
  vec4 bg1 = vec4(0.0, 0.0, 0.0, 0.0);
  vec4 bg2 = vec4(0.02, 0.01, 0.05, 0.0);
  vec4 fragColor = mix(bg1, bg2, uv.x);
  fragColor *= vf;
  fragColor += lines;
  gl_FragColor = fragColor;
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

    const uRes = gl.getUniformLocation(prog, 'iResolution');
    const uTime = gl.getUniformLocation(prog, 'iTime');
    const startTime = Date.now();

    function resize() {
        const pEl = canvas.parentElement || document.body;
        const w = pEl.offsetWidth || window.innerWidth;
        const h = pEl.offsetHeight || 600;
        canvas.width = Math.min(w, 1400);
        canvas.height = Math.min(h, 700);
        gl.viewport(0, 0, canvas.width, canvas.height);
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
            gl.useProgram(prog);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, t);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

// === 10. BOOTSTRAP ===
function boot() {
    initPreloader();
    initHeroSmoke();
    initPricingShader();
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
