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
        const contactSec = document.getElementById('contact');

        const projectsTop = projectsSec ? projectsSec.offsetTop : 1150;
        const skillsTop = skillsSec ? skillsSec.offsetTop : 2250;
        const contactTop = contactSec ? contactSec.offsetTop : 3630;

        let currentId = 'about';

        // 1. Bottom of page or footer clearly visible -> Contact
        if ((scrollY + windowHeight >= scrollHeight - 80) || (contactSec && scrollY + windowHeight >= contactTop + 140)) {
            currentId = 'contact';
        } else {
            // Viewport focus line ~ 38% down the screen
            const focusY = scrollY + windowHeight * 0.38;

            if (focusY >= skillsTop) {
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

            const sectionName = targetId.replace('#', '');
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

        let fontSize = Math.min(
            canvas.width  / (word.length * 0.62),
            canvas.height * 0.60
        );
        fontSize = Math.max(fontSize, 40);

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

// === 10. BOOTSTRAP ===
function boot() {
    initPreloader();
    initHeroSmoke();
    initPricingShader();
    initProjectSlider();
    initSkillsRainbow();
    initParticleText();
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
