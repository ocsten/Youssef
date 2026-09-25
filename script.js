/* ============================================================
   OCSTEN — Youssef · Ultra-Luxury Dark Portfolio
   script.js — vanilla JS, zero dependencies
   ============================================================ */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ==========================================================
     1. REVEAL — Intersection Observer fade-in on scroll
     ========================================================== */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ==========================================================
     2. CTA — reveal hidden button when contact is in view
     ========================================================== */
  const cta = document.querySelector("[data-cta]");
  const contact = document.getElementById("contact");

  if (cta && contact) {
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) cta.classList.add("is-visible");
        });
      },
      { threshold: 0.4 }
    );
    ctaObserver.observe(contact);
  }

  /* ==========================================================
     3. DYNAMIC YEAR
     ========================================================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ==========================================================
     4. TILT — physics-based 3D tilt (mouse + touch)
     ========================================================== */
  const tiltEls = document.querySelectorAll("[data-tilt]");

  // per-element state
  const tiltState = new Map();

  tiltEls.forEach((el) => {
    tiltState.set(el, {
      rx: 0, ry: 0,      // current rotation (lerped)
      trx: 0, try: 0,    // target rotation
      active: false,
    });
  });

  function setTiltTarget(el, px, py) {
    const rect = el.getBoundingClientRect();
    const nx = (px - rect.left) / rect.width - 0.5;   // -0.5 .. 0.5
    const ny = (py - rect.top) / rect.height - 0.5;
    const s = tiltState.get(el);
    if (!s) return;
    s.try = nx * 14;   // max 7deg
    s.trx = -ny * 14;
    s.active = true;
  }

  function resetTilt(el) {
    const s = tiltState.get(el);
    if (!s) return;
    s.trx = 0;
    s.try = 0;
    s.active = false;
  }

  if (!prefersReducedMotion) {
    tiltEls.forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        setTiltTarget(el, e.clientX, e.clientY);
        // cursor-tracked glow (used by .project__link::after)
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
      el.addEventListener("pointerleave", () => resetTilt(el));
      el.addEventListener("pointerdown", () => resetTilt(el));
    });
  }

  /* ==========================================================
     5. PARTICLE TEXT — hero characters respond to pointer
     ========================================================== */
  const heroChars = document.querySelectorAll(".hero__char");
  const charState = heroChars.length
    ? Array.from(heroChars).map(() => ({ x: 0, y: 0, tx: 0, ty: 0 }))
    : [];

  let pointerX = 0;
  let pointerY = 0;

  if (!prefersReducedMotion) {
    window.addEventListener("pointermove", (e) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;   // -1 .. 1
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  /* ==========================================================
     6. AMBIENT CANVAS — floating particles behind hero
     ========================================================== */
  const canvas = document.getElementById("particles");
  const ctx = canvas ? canvas.getContext("2d") : null;

  let particles = [];
  let canvasW = 0;
  let canvasH = 0;

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = canvas.offsetWidth;
    canvasH = canvas.offsetHeight;
    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initParticles() {
    if (!ctx) return;
    const count = Math.min(90, Math.floor((canvasW * canvasH) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvasW,
      y: Math.random() * canvasH,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      a: Math.random() * 0.5 + 0.1,
      hue: Math.random() > 0.85 ? "gold" : "accent",
    }));
  }

  function drawParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasW, canvasH);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvasW;
      if (p.x > canvasW) p.x = 0;
      if (p.y < 0) p.y = canvasH;
      if (p.y > canvasH) p.y = 0;

      const color =
        p.hue === "gold" ? "212, 175, 55" : "0, 229, 255";

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, ${p.a})`;
      ctx.fill();
    }
  }

  if (canvas && ctx && !prefersReducedMotion) {
    resizeCanvas();
    initParticles();
    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles();
    });
  }

  /* ==========================================================
     7. RENDER LOOP — single rAF, zero-latency
     ========================================================== */
  function render() {
    // tilt lerp
    if (!prefersReducedMotion) {
      tiltEls.forEach((el) => {
        const s = tiltState.get(el);
        if (!s) return;
        s.rx += (s.trx - s.rx) * 0.12;
        s.ry += (s.try - s.ry) * 0.12;
        el.style.transform = `perspective(900px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
      });

      // particle text lerp
      heroChars.forEach((char, i) => {
        const s = charState[i];
        if (!s) return;
        const depth = (i - (heroChars.length - 1) / 2) * 0.12;
        s.tx = pointerX * 18 * (1 + depth);
        s.ty = pointerY * 12 * (1 + depth);
        s.x += (s.tx - s.x) * 0.08;
        s.y += (s.ty - s.y) * 0.08;
        char.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
      });

      drawParticles();
    }

    requestAnimationFrame(render);
  }

  render();
})(); 
