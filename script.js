(() => {
  "use strict";

  const doc = document;
  const win = window;
  const root = doc.documentElement;
  const body = doc.body;

  const $ = (s, c = doc) => c.querySelector(s);
  const $$ = (s, c = doc) => Array.from(c.querySelectorAll(s));

  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const lerp = (a, b, t) => a + (b - a) * t;
  const raf = win.requestAnimationFrame.bind(win);
  const caf = win.cancelAnimationFrame.bind(win);

  const RM = win.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = win.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const TOUCH = win.matchMedia("(pointer: coarse)").matches;
  const LANG_KEY = "youssef.lang.v1";
  const SOUND_KEY = "youssef.sound.v1";

  const TEXT = {
    en: {
      "boot": "LANGUAGE ARCHITECT",
      "nav": ["Principles", "Practice", "Files", "Method", "Signals", "Contact"]
    },
    ar: {
      "boot": "مهندس اللغة",
      "nav": ["المبادئ", "الممارسة", "الملفات", "المنهجية", "الإشارات", "التواصل"]
    }
  };

  /* ============================================================
     AUDIO — UI Sounds via Web Audio API
     ============================================================ */
  const Audio = (() => {
    let ctx = null;
    let master = null;
    let on = false;

    const load = () => {
      try { on = win.localStorage.getItem(SOUND_KEY) === "1"; }
      catch (_) { on = false; }
    };

    const save = () => {
      try { win.localStorage.setItem(SOUND_KEY, on ? "1" : "0"); }
      catch (_) {}
    };

    const ready = () => {
      if (ctx) return true;
      try {
        const C = win.AudioContext || win.webkitAudioContext;
        if (!C) return false;
        ctx = new C();
        master = ctx.createGain();
        master.gain.value = 0.16;
        master.connect(ctx.destination);
        return true;
      } catch (_) { return false; }
    };

    const tone = (freq, dur, type, gain, glide) => {
      if (!on || !ready()) return;
      if (ctx.state === "suspended") ctx.resume();
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, t);
      if (glide) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(glide, 40),
          t + dur
        );
      }
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gain || 0.3, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(g);
      g.connect(master);
      osc.start(t);
      osc.stop(t + dur + 0.02);
    };

    const hover = () => tone(1180, 0.05, "sine", 0.08);
    const click = () => tone(720, 0.09, "triangle", 0.2, 480);
    const nav = () => {
      tone(520, 0.16, "sine", 0.22, 820);
    };
    const open = () => {
      tone(640, 0.12, "sine", 0.22, 920);
      win.setTimeout(() => tone(960, 0.1, "sine", 0.16, 720), 55);
    };
    const close = () => {
      tone(920, 0.11, "sine", 0.2, 640);
      win.setTimeout(() => tone(640, 0.1, "sine", 0.15, 480), 55);
    };
    const toggle = () => {
      tone(680, 0.08, "triangle", 0.24);
      win.setTimeout(() => tone(1040, 0.1, "triangle", 0.18), 65);
    };

    const set = (v) => {
      on = !!v;
      save();
      if (on && !ready()) on = false;
      return on;
    };

    const init = () => {
      load();
      const btn = $("[data-sound]");
      if (!btn) return;
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.addEventListener("click", () => {
        const next = !on;
        set(next);
        btn.setAttribute("aria-pressed", next ? "true" : "false");
        if (next) toggle();
      });

      const unlock = () => {
        if (on) ready();
        win.removeEventListener("pointerdown", unlock);
        win.removeEventListener("keydown", unlock);
      };
      win.addEventListener("pointerdown", unlock, { once: true });
      win.addEventListener("keydown", unlock, { once: true });
    };

    return { init, hover, click, nav, open, close, toggle, set, get on() { return on; } };
  })();

  /* ============================================================
     BOOT
     ============================================================ */
  const Boot = (() => {
    const run = () => {
      const node = $("[data-boot]");
      if (!node) {
        body.classList.remove("is-booting");
        return;
      }
      const bar = $("[data-boot-bar]", node);
      const pct = $("[data-boot-pct]", node);
      let progress = 0;

      const tick = () => {
        const delta = (100 - progress) * 0.06 + 0.85;
        progress = Math.min(progress + delta, 100);

        if (pct) pct.textContent = String(Math.floor(progress)).padStart(3, "0");
        if (bar) bar.style.width = progress + "%";

        if (progress < 100) {
          raf(tick);
        } else {
          win.setTimeout(() => {
            node.classList.add("is-done");
            body.classList.remove("is-booting");
            win.setTimeout(() => node.remove(), 1200);
          }, 320);
        }
      };

      win.setTimeout(tick, 240);
    };

    return { run };
  })();

  /* ============================================================
     CURSOR
     ============================================================ */
  const Cursor = (() => {
    let rafId = null;
    let running = false;

    const start = () => {
      if (!FINE || RM) return;
      const node = $("[data-cursor]");
      if (!node) return;

      const label = $("[data-cursor-label]", node);
      let mx = win.innerWidth / 2;
      let my = win.innerHeight / 2;
      let rx = mx;
      let ry = my;
      let visible = false;

      const move = (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!visible) {
          node.style.opacity = "1";
          visible = true;
        }
      };

      const leave = () => {
        node.style.opacity = "0";
        visible = false;
      };

      win.addEventListener("pointermove", move, { passive: true });
      doc.addEventListener("mouseleave", leave);

      const loop = () => {
        rx = lerp(rx, mx, 0.22);
        ry = lerp(ry, my, 0.22);
        node.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
        rafId = raf(loop);
      };

      if (!running) {
        running = true;
        loop();
      }

      const bind = () => {
        $$("[data-cursor], a, button").forEach((el) => {
          if (el.__cursorBound) return;
          el.__cursorBound = true;

          el.addEventListener("pointerenter", () => {
            node.classList.add("is-hover");
            const t = el.getAttribute("data-cursor-text");
            if (label) label.textContent = t || "";
            if (Audio.on) Audio.hover();
          });

          el.addEventListener("pointerleave", () => {
            node.classList.remove("is-hover");
            if (label) label.textContent = "";
          });
        });
      };

      bind();
      return { bind };
    };

    return { start };
  })();

  /* ============================================================
     LANGUAGE
     ============================================================ */
  const Lang = (() => {
    let current = "en";

    const load = () => {
      try {
        const s = win.localStorage.getItem(LANG_KEY);
        if (s === "en" || s === "ar") return s;
      } catch (_) {}
      const n = (navigator.language || "en").toLowerCase();
      return n.startsWith("ar") ? "ar" : "en";
    };

    const save = (l) => {
      try { win.localStorage.setItem(LANG_KEY, l); } catch (_) {}
    };

    const paint = (l) => {
      const t = TEXT[l] || TEXT.en;
      root.setAttribute("lang", l);
      root.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
      root.setAttribute("data-lang", l);
      body.setAttribute("data-lang", l);

      const navBtns = $$("[data-nav-jump]");
      navBtns.forEach((btn) => {
        const idx = parseInt(btn.getAttribute("data-nav-jump"), 10);
        if (idx >= 1 && idx <= 6) {
          const label = t.nav[idx - 1];
          const title = btn.querySelector(".topbar__link, .drawer__row-title");
          if (title) title.textContent = label;
        }
      });

      const bootLabel = $(".boot__meta span:first-child");
      if (bootLabel) bootLabel.textContent = t.boot;

      doc.title = l === "ar"
        ? "يوسف — مهندس اللغة"
        : "Youssef — Language Architect";
    };

    const apply = (l, silent) => {
      current = l === "ar" ? "ar" : "en";
      paint(current);
      save(current);
      if (!silent && Audio.on) Audio.toggle();
    };

    const toggle = () => apply(current === "en" ? "ar" : "en");

    const init = () => {
      apply(load(), true);
      const btn = $("[data-lang]");
      if (btn) btn.addEventListener("click", toggle);
    };

    return { init, toggle, apply, get current() { return current; } };
  })();

  /* ============================================================
     NAVIGATION ENGINE
     ============================================================ */
  const Nav = (() => {
    const sections = [];
    let currentIdx = 0;
    let locked = false;

    const build = () => {
      $$("section[data-section]").forEach((s) => {
        const idx = parseInt(s.getAttribute("data-section"), 10);
        sections[idx] = s;
      });
    };

    const buildDots = () => {
      const host = $("[data-pager-dots]");
      if (!host) return;
      host.innerHTML = "";
      sections.forEach((_, i) => {
        const btn = doc.createElement("button");
        btn.className = "pager__dot";
        btn.type = "button";
        btn.setAttribute("aria-label", `Section ${i}`);
        btn.dataset.dotIdx = String(i);
        btn.addEventListener("click", () => go(i));
        btn.addEventListener("pointerenter", () => { if (Audio.on) Audio.hover(); });
        host.appendChild(btn);
      });
    };

    const paintDots = () => {
      $$(".pager__dot").forEach((d) => {
        const idx = parseInt(d.dataset.dotIdx, 10);
        d.classList.toggle("is-active", idx === currentIdx);
      });
    };

    const paintNav = () => {
      $$("[data-nav-jump]").forEach((btn) => {
        const idx = parseInt(btn.getAttribute("data-nav-jump"), 10);
        btn.classList.toggle("is-active", idx === currentIdx);
      });
    };

    const paintPager = () => {
      const prev = $("[data-nav-prev]");
      const next = $("[data-nav-next]");
      if (prev) prev.disabled = currentIdx <= 0;
      if (next) next.disabled = currentIdx >= sections.length - 1;
    };

    const paintProgress = () => {
      const fill = $("[data-progress]");
      if (!fill) return;
      const pct = ((currentIdx + 1) / sections.length) * 100;
      fill.style.width = pct + "%";
    };

    const revealSection = (idx) => {
      const node = sections[idx];
      if (!node) return;
      const targets = node.querySelectorAll("[data-reveal], .law, .craft, .file, .move, .figure, .signal");
      targets.forEach((t, i) => {
        t.classList.remove("is-revealed");
        win.setTimeout(() => t.classList.add("is-revealed"), 90 + i * 55);
      });
    };

    const go = (idx) => {
      if (locked) return;
      if (idx < 0 || idx >= sections.length) return;
      if (idx === currentIdx && sections[idx].classList.contains("is-active")) return;

      locked = true;
      const direction = idx > currentIdx ? "from-right" : "from-left";
      const old = sections[currentIdx];
      const next = sections[idx];

      if (old) {
        old.classList.remove("is-active", "from-right", "from-left");
      }

      next.classList.add(direction);
      void next.offsetWidth;
      next.classList.add("is-active");

      win.setTimeout(() => {
        next.classList.remove("from-right", "from-left");
      }, 950);

      currentIdx = idx;
      paintDots();
      paintNav();
      paintPager();
      paintProgress();
      revealSection(idx);

      if (Audio.on) Audio.nav();

      const scroller = next.querySelector(".panel__grid");
      if (scroller) scroller.scrollTop = 0;

      win.setTimeout(() => { locked = false; }, 750);
    };

    const next = () => go(currentIdx + 1);
    const prev = () => go(currentIdx - 1);

    const bindWheel = () => {
      let acc = 0;
      let cooldown = false;
      const panel = () => sections[currentIdx];
      const atEdge = (dir) => {
        const scroller = panel()?.querySelector(".panel__grid");
        if (!scroller) return true;
        const top = scroller.scrollTop;
        const max = scroller.scrollHeight - scroller.clientHeight;
        if (dir > 0) return top >= max - 2;
        return top <= 2;
      };

      win.addEventListener("wheel", (e) => {
        if (cooldown) return;
        acc += e.deltaY;
        if (Math.abs(acc) < 40) return;
        const dir = acc > 0 ? 1 : -1;
        if (!atEdge(dir)) {
          acc = 0;
          return;
        }
        cooldown = true;
        acc = 0;
        dir > 0 ? next() : prev();
        win.setTimeout(() => { cooldown = false; }, 900);
      }, { passive: true });
    };

    const bindKeys = () => {
      doc.addEventListener("keydown", (e) => {
        const t = e.target;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;

        if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
          e.preventDefault();
          next();
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault();
          prev();
        } else if (e.key === "Home") {
          e.preventDefault();
          go(0);
        } else if (e.key === "End") {
          e.preventDefault();
          go(sections.length - 1);
        } else if ((e.metaKey || e.ctrlKey) && /^[1-9]$/.test(e.key)) {
          const n = parseInt(e.key, 10);
          if (n <= sections.length) {
            e.preventDefault();
            go(n - 1);
          }
        } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "l") {
          e.preventDefault();
          Lang.toggle();
        } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
          e.preventDefault();
          const btn = $("[data-sound]");
          if (btn) btn.click();
        }
      });
    };

    const bindTouch = () => {
      if (!TOUCH) return;
      let startY = 0;
      let startX = 0;
      let startT = 0;
      const threshold = 60;

      doc.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        startY = t.clientY;
        startX = t.clientX;
        startT = Date.now();
      }, { passive: true });

      doc.addEventListener("touchend", (e) => {
        const t = e.changedTouches[0];
        const dy = t.clientY - startY;
        const dx = t.clientX - startX;
        const dt = Date.now() - startT;
        if (dt > 500) return;
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > threshold) {
          const scroller = sections[currentIdx]?.querySelector(".panel__grid");
          if (scroller) {
            const top = scroller.scrollTop;
            const max = scroller.scrollHeight - scroller.clientHeight;
            if (dy < 0 && top < max - 2) return;
            if (dy > 0 && top > 2) return;
          }
          dy < 0 ? next() : prev();
        }
      }, { passive: true });
    };

    const bindButtons = () => {
      const nextBtn = $("[data-nav-next]");
      const prevBtn = $("[data-nav-prev]");
      if (nextBtn) nextBtn.addEventListener("click", next);
      if (prevBtn) prevBtn.addEventListener("click", prev);

      $$("[data-nav-jump]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = parseInt(btn.getAttribute("data-nav-jump"), 10);
          if (!isNaN(idx)) {
            go(idx);
            const drawer = $("[data-drawer]");
            if (drawer && drawer.classList.contains("is-open")) {
              win.setTimeout(() => {
                const close = drawer.querySelector("[data-drawer-close]");
                if (close) close.click();
              }, 220);
            }
          }
        });
      });
    };

    const init = () => {
      build();
      buildDots();
      paintDots();
      paintNav();
      paintPager();
      paintProgress();
      bindButtons();
      bindWheel();
      bindKeys();
      bindTouch();
      sections[0].classList.add("is-active");
      revealSection(0);

      const obs = new MutationObserver(() => {
        if (root.getAttribute("dir") === "rtl") {
          sections.forEach((s) => { s.style.direction = "rtl"; });
        } else {
          sections.forEach((s) => { s.style.direction = "ltr"; });
        }
      });
      obs.observe(root, { attributes: true, attributeFilter: ["dir"] });
    };

    return { init, go, next, prev, get current() { return currentIdx; } };
  })();

  /* ============================================================
     DRAWER
     ============================================================ */
  const Drawer = (() => {
    let bound = false;

    const bind = () => {
      if (bound) return;
      bound = true;

      const node = $("[data-drawer]");
      const opener = $("[data-drawer-open]");
      if (!node || !opener) return;

      const open = () => {
        node.classList.add("is-open");
        node.setAttribute("aria-hidden", "false");
        root.classList.add("is-locked");
        body.classList.add("is-locked");
        if (Audio.on) Audio.open();
      };

      const close = () => {
        node.classList.remove("is-open");
        node.setAttribute("aria-hidden", "true");
        root.classList.remove("is-locked");
        body.classList.remove("is-locked");
        if (Audio.on) Audio.close();
      };

      opener.addEventListener("click", open);
      $$("[data-drawer-close]").forEach((el) => el.addEventListener("click", close));

      doc.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && node.classList.contains("is-open")) close();
      });
    };

    return { bind };
  })();

  /* ============================================================
     PARTICLE FIELD
     ============================================================ */
  const Field = (() => {
    let rafId = null;
    let destroyFn = null;

    const run = () => {
      const canvas = doc.getElementById("field");
      if (!canvas || RM) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let W = 0, H = 0, dpr = 1;
      let particles = [];
      let targets = [];
      let px = 0, py = 0, tpx = 0, tpy = 0;
      let mode = "float";
      let morph = 0;
      const startT = win.performance.now();

      const buildTargets = () => {
        const off = doc.createElement("canvas");
        const oW = 900;
        const oH = 240;
        off.width = oW;
        off.height = oH;
        const octx = off.getContext("2d");
        octx.fillStyle = "#fff";
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        const size = Math.min(160, oW / 6);
        octx.font = `500 ${size}px "Instrument Sans", system-ui, sans-serif`;
        octx.fillText("YOUSSEF", oW / 2, oH / 2);

        const data = octx.getImageData(0, 0, oW, oH).data;
        const gap = 5;
        const scale = Math.min(W / oW, H / oH) * 0.78;
        const pts = [];

        for (let y = 0; y < oH; y += gap) {
          for (let x = 0; x < oW; x += gap) {
            const i = (y * oW + x) * 4;
            if (data[i + 3] > 128) {
              pts.push({
                x: (x - oW / 2) * scale + W / 2,
                y: (y - oH / 2) * scale + H / 2
              });
            }
          }
        }
        targets = pts;
      };

      const buildParticles = () => {
        const count = Math.min(200, Math.floor((W * H) / 12000));
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.4 + 0.3,
            a: Math.random() * 0.55 + 0.15,
            tx: 0,
            ty: 0
          });
        }
        particles.forEach((p, i) => {
          if (targets.length) {
            const t = targets[i % targets.length];
            p.tx = t.x;
            p.ty = t.y;
          }
        });
      };

      const resize = () => {
        dpr = Math.min(win.devicePixelRatio || 1, 2);
        W = canvas.offsetWidth;
        H = canvas.offsetHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildTargets();
        buildParticles();
      };

      const onMove = (e) => {
        tpx = (e.clientX / win.innerWidth - 0.5) * 2;
        tpy = (e.clientY / win.innerHeight - 0.5) * 2;
      };
      win.addEventListener("pointermove", onMove, { passive: true });

      let rzT = null;
      const onResize = () => {
        if (rzT) win.clearTimeout(rzT);
        rzT = win.setTimeout(resize, 180);
      };
      win.addEventListener("resize", onResize);

      const frame = (now) => {
        ctx.clearRect(0, 0, W, H);

        px = lerp(px, tpx, 0.05);
        py = lerp(py, tpy, 0.05);

        if (mode === "float" && targets.length && now - startT > 3200) {
          morph = Math.min(morph + 0.009, 1);
          if (morph >= 1) mode = "text";
        }

        const len = particles.length;

        if (mode === "float") {
          for (let i = 0; i < len; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < -4) p.x = W + 4;
            if (p.x > W + 4) p.x = -4;
            if (p.y < -4) p.y = H + 4;
            if (p.y > H + 4) p.y = -4;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
            ctx.fill();
          }

          ctx.lineWidth = 0.4;
          for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
              const a = particles[i];
              const b = particles[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 13000) {
                const alpha = (1 - d2 / 13000) * 0.09;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.stroke();
              }
            }
          }
        } else {
          for (let i = 0; i < len; i++) {
            const p = particles[i];
            const depth = 1 + (i % 9) * 0.055;
            const gx = p.tx + px * 22 * depth;
            const gy = p.ty + py * 14 * depth;
            p.x = lerp(p.x, gx, 0.07);
            p.y = lerp(p.y, gy, 0.07);

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.a * 0.92})`;
            ctx.fill();
          }
        }

        rafId = raf(frame);
      };

      resize();
      rafId = raf(frame);

      destroyFn = () => {
        if (rafId) caf(rafId);
        win.removeEventListener("pointermove", onMove);
        win.removeEventListener("resize", onResize);
      };
    };

    const destroy = () => {
      if (typeof destroyFn === "function") destroyFn();
    };

    return { run, destroy };
  })();

  /* ============================================================
     COUNTERS
     ============================================================ */
  const Counters = (() => {
    const run = () => {
      const nodes = $$("[data-count]");
      if (!nodes.length) return;

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count")) || 0;
          const dur = 1600;
          const start = win.performance.now();

          const step = (now) => {
            const t = clamp((now - start) / dur, 0, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const v = Math.round(target * eased);
            el.textContent = String(v).padStart(2, "0");
            if (t < 1) raf(step);
          };
          raf(step);
          obs.unobserve(el);
        });
      }, { threshold: 0.4 });

      nodes.forEach((n) => io.observe(n));
    };
    return { run };
  })();

  /* ============================================================
     CLOCK
     ============================================================ */
  const Clock = (() => {
    const run = () => {
      const nodes = $$("[data-clock]");
      if (!nodes.length) return;

      const tick = () => {
        const d = new Date();
        const h = String(d.getHours()).padStart(2, "0");
        const m = String(d.getMinutes()).padStart(2, "0");
        nodes.forEach((n) => { n.textContent = `${h}:${m}`; });
      };

      tick();
      win.setInterval(tick, 30000);
    };
    return { run };
  })();

  /* ============================================================
     YEAR
     ============================================================ */
  const Year = (() => {
    const run = () => {
      const el = $("[data-year]");
      if (el) el.textContent = new Date().getFullYear();
    };
    return { run };
  })();

  /* ============================================================
     TOPBAR SCROLL STATE
     ============================================================ */
  const Topbar = (() => {
    const run = () => {
      const node = $("[data-topbar]");
      if (!node) return;

      const update = () => {
        node.classList.toggle("is-scrolled", win.scrollY > 20);
      };
      win.addEventListener("scroll", update, { passive: true });
      update();
    };
    return { run };
  })();

  /* ============================================================
     VISIBILITY
     ============================================================ */
  const Visibility = (() => {
    const run = () => {
      doc.addEventListener("visibilitychange", () => {
        body.classList.toggle("is-hidden", doc.hidden);
      });
    };
    return { run };
  })();

  /* ============================================================
     BOOTSTRAP
     ============================================================ */
  const boot = () => {
    Audio.init();
    Lang.init();
    Boot.run();
    Cursor.start();
    Nav.init();
    Drawer.bind();
    Field.run();
    Counters.run();
    Clock.run();
    Year.run();
    Topbar.run();
    Visibility.run();
  };

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
