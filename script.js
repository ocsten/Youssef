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

  const LANG_KEY = "ocsten.lang.v5";
  const SOUND_KEY = "ocsten.sound.v5";

  const I18N = {
    en: {
      nav: ["Principles", "Practice", "Files", "Method", "Signals", "Contact"],
      drawer: [
        { title: "Principles", cap: "Why language is structure" },
        { title: "Practice", cap: "What gets engineered" },
        { title: "Case Files", cap: "Six engagements" },
        { title: "Method", cap: "Audit to autonomy" },
        { title: "Signals", cap: "Words from the field" },
        { title: "Contact", cap: "Open the door" }
      ],
      heroRole: "Language Architect",
      heroCreed: "Systems over emotions.",
      heroLede: "I design the language systems that hold digital products together. Every interface is a room. Every sentence, a load-bearing wall.",
      heroBegin: "BEGIN",
      heroDoor: "OPEN THE DOOR",
      heroHint: "Navigate with arrows or scroll",
      heroFile: "001 / PORTFOLIO",
      panels: [
        { name: "Principles", note: "SIX LAWS" },
        { name: "Practice", note: "SIX DISCIPLINES" },
        { name: "Case Files", note: "06 ENTRIES" },
        { name: "Method", note: "FOUR MOVEMENTS" },
        { name: "Signals", note: "WORDS FROM THE FIELD" },
        { name: "Contact", note: "TWO DOORS" }
      ],
      title: "Youssef — Language Architect",
      boot: "LANGUAGE ARCHITECT"
    },
    ar: {
      nav: ["المبادئ", "الممارسة", "الملفات", "المنهجية", "الإشارات", "التواصل"],
      drawer: [
        { title: "المبادئ", cap: "لماذا اللغة بنية" },
        { title: "الممارسة", cap: "ما يتم هندسته" },
        { title: "ملفات الأعمال", cap: "ستة ارتباطات" },
        { title: "المنهجية", cap: "من التدقيق إلى الاستقلالية" },
        { title: "الإشارات", cap: "كلمات من الميدان" },
        { title: "التواصل", cap: "افتح الباب" }
      ],
      heroRole: "مهندس اللغة",
      heroCreed: "الأنظمة قبل المشاعر.",
      heroLede: "أصمم أنظمة اللغة التي تُمسك المنتجات الرقمية معًا. كل واجهة غرفة. وكل جملة جدار حامل.",
      heroBegin: "ابدأ",
      heroDoor: "افتح الباب",
      heroHint: "تنقّل بالأسهم أو مرر",
      heroFile: "001 / الأعمال",
      panels: [
        { name: "المبادئ", note: "ستة قوانين" },
        { name: "الممارسة", note: "ستة تخصصات" },
        { name: "ملفات الأعمال", note: "06 مدخلات" },
        { name: "المنهجية", note: "أربع حركات" },
        { name: "الإشارات", note: "كلمات من الميدان" },
        { name: "التواصل", note: "بابان" }
      ],
      title: "يوسف — مهندس اللغة",
      boot: "مهندس اللغة"
    }
  };

  /* ============================================================
     AUDIO — Advanced Web Audio Synthesis
     ============================================================ */
  const Audio = (() => {
    let ctx = null;
    let master = null;
    let reverb = null;
    let on = false;

    const load = () => {
      try { on = win.localStorage.getItem(SOUND_KEY) === "1"; }
      catch (_) { on = false; }
    };

    const save = () => {
      try { win.localStorage.setItem(SOUND_KEY, on ? "1" : "0"); }
      catch (_) {}
    };

    const buildReverb = () => {
      if (!ctx) return null;
      try {
        const length = ctx.sampleRate * 1.4;
        const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
        for (let ch = 0; ch < 2; ch++) {
          const d = impulse.getChannelData(ch);
          for (let i = 0; i < length; i++) {
            d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.8);
          }
        }
        const conv = ctx.createConvolver();
        conv.buffer = impulse;
        const wet = ctx.createGain();
        wet.gain.value = 0.22;
        conv.connect(wet);
        wet.connect(ctx.destination);
        return conv;
      } catch (_) { return null; }
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
        reverb = buildReverb();
        return true;
      } catch (_) { return false; }
    };

    const play = (opts) => {
      if (!on || !ready()) return;
      if (ctx.state === "suspended") ctx.resume();

      const t = ctx.currentTime;
      const {
        freq = 660,
        glide = null,
        dur = 0.1,
        type = "sine",
        gain = 0.28,
        withReverb = false,
        attack = 0.006
      } = opts || {};

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 4200;
      filter.Q.value = 0.6;

      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (glide) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(glide, 30), t + dur);
      }

      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(gain, t + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

      osc.connect(filter);
      filter.connect(g);
      g.connect(master);
      if (withReverb && reverb) g.connect(reverb);

      osc.start(t);
      osc.stop(t + dur + 0.04);
    };

    const hover = () => play({
      freq: 1280, dur: 0.05, type: "sine", gain: 0.08, attack: 0.003
    });

    const click = () => {
      play({ freq: 720, glide: 460, dur: 0.09, type: "triangle", gain: 0.24 });
      play({ freq: 1440, dur: 0.04, type: "sine", gain: 0.08 });
    };

    const nav = () => {
      play({ freq: 520, glide: 640, dur: 0.16, type: "sine", gain: 0.22, withReverb: true });
      win.setTimeout(() => play({ freq: 780, dur: 0.14, type: "sine", gain: 0.14, withReverb: true }), 60);
    };

    const open = () => {
      play({ freq: 620, glide: 920, dur: 0.14, type: "sine", gain: 0.22, withReverb: true });
      win.setTimeout(() => play({ freq: 1240, dur: 0.08, type: "sine", gain: 0.1 }), 70);
    };

    const close = () => {
      play({ freq: 980, glide: 620, dur: 0.14, type: "sine", gain: 0.2, withReverb: true });
    };

    const toggleOn = () => {
      play({ freq: 660, dur: 0.08, type: "triangle", gain: 0.24 });
      win.setTimeout(() => play({ freq: 990, dur: 0.1, type: "sine", gain: 0.18 }), 70);
      win.setTimeout(() => play({ freq: 1320, dur: 0.12, type: "sine", gain: 0.12, withReverb: true }), 140);
    };

    const toggleOff = () => {
      play({ freq: 990, dur: 0.08, type: "triangle", gain: 0.2 });
      win.setTimeout(() => play({ freq: 660, dur: 0.1, type: "sine", gain: 0.14 }), 70);
    };

    const bootDone = () => {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((f, i) => {
        win.setTimeout(() => play({
          freq: f, dur: 0.24, type: "sine", gain: 0.16, withReverb: true
        }), i * 90);
      });
    };

    const set = (v) => {
      const next = !!v;
      if (next === on) return on;
      on = next;
      save();
      if (on && !ready()) {
        on = false;
        save();
      }
      if (on) toggleOn();
      else toggleOff();
      return on;
    };

    const init = () => {
      load();
      const btn = $("[data-sound]");
      if (!btn) return;

      btn.setAttribute("aria-pressed", on ? "true" : "false");

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        set(!on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });

      const unlock = () => {
        if (on) ready();
        win.removeEventListener("pointerdown", unlock);
        win.removeEventListener("keydown", unlock);
      };
      win.addEventListener("pointerdown", unlock, { once: true });
      win.addEventListener("keydown", unlock, { once: true });
    };

    return {
      init, hover, click, nav, open, close, bootDone, set,
      get on() { return on; }
    };
  })();

  /* ============================================================
     BOOT SEQUENCE
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
      let finished = false;

      const finish = () => {
        if (finished) return;
        finished = true;
        node.classList.add("is-done");
        body.classList.remove("is-booting");
        if (Audio.on) Audio.bootDone();
        win.setTimeout(() => {
          if (node.parentNode) node.parentNode.removeChild(node);
        }, 1300);
      };

      const tick = () => {
        const delta = (100 - progress) * 0.06 + 0.9;
        progress = Math.min(progress + delta, 100);
        if (pct) pct.textContent = String(Math.floor(progress)).padStart(3, "0");
        if (bar) bar.style.width = progress + "%";
        if (progress < 100) raf(tick);
        else win.setTimeout(finish, 300);
      };

      win.setTimeout(tick, 240);
      win.setTimeout(finish, 6500);
    };

    return { run };
  })();

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  const Cursor = (() => {
    let rafId = null;

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
      rafId = raf(loop);

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
     LANGUAGE — strict scope (only the lang button toggles it)
     ============================================================ */
  const Lang = (() => {
    let current = "en";

    const load = () => {
      try {
        const stored = win.localStorage.getItem(LANG_KEY);
        if (stored === "en" || stored === "ar") return stored;
      } catch (_) {}
      const nav = (navigator.language || "en").toLowerCase();
      return nav.startsWith("ar") ? "ar" : "en";
    };

    const save = (l) => {
      try { win.localStorage.setItem(LANG_KEY, l); } catch (_) {}
    };

    const setText = (el, text) => {
      if (el && text != null) el.textContent = text;
    };

    const paint = (l) => {
      const d = I18N[l] || I18N.en;

      const navBtns = $$(".topbar__link");
      navBtns.forEach((btn, i) => {
        if (d.nav[i]) setText(btn, d.nav[i]);
      });

      const drawerRows = $$(".drawer__row");
      drawerRows.forEach((row, i) => {
        const item = d.drawer[i];
        if (!item) return;
        const title = $(".drawer__row-title", row);
        const cap = $(".drawer__row-cap", row);
        setText(title, item.title);
        setText(cap, item.cap);
      });

      setText($(".hero__role-text"), d.heroRole);
      setText($(".hero__creed"), d.heroCreed);
      setText($(".hero__lede p"), d.heroLede);
      setText($(".hero__foot-note-text"), d.heroHint);
      setText($(".btn--primary .btn__label"), d.heroBegin);
      setText($(".btn--quiet .btn__label"), d.heroDoor);
      setText($(".hero__meta-item:first-child span:last-child"), d.heroFile);

      const heroRole = $(".hero__role-text");
      if (heroRole) heroRole.textContent = d.heroRole;

      const panels = $$("section[data-section]");
      panels.forEach((sec, i) => {
        if (i === 0) return;
        const meta = d.panels[i - 1];
        if (!meta) return;
        const nameEl = $(".panel__name", sec);
        const noteEl = $(".panel__note", sec);
        setText(nameEl, meta.name);
        setText(noteEl, meta.note);
      });

      const bootLabel = $(".boot__meta span:first-child");
      if (bootLabel) setText(bootLabel, d.boot);

      root.setAttribute("lang", l);
      root.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
      root.setAttribute("data-lang", l);
      body.setAttribute("data-lang", l);

      doc.title = d.title;
    };

    const apply = (l) => {
      current = l === "ar" ? "ar" : "en";
      paint(current);
      save(current);
    };

    const toggle = () => {
      apply(current === "en" ? "ar" : "en");
      if (Audio.on) Audio.click();
    };

    const init = () => {
      apply(load());

      const btn = $("[data-lang-switch]");
      if (!btn) return;

      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      });
    };

    return { init, toggle, apply, get current() { return current; } };
  })();

  /* ============================================================
     NAVIGATION — Cinematic Section Switching
     ============================================================ */
  const Nav = (() => {
    const sections = [];
    let currentIdx = 0;
    let locked = false;
    let total = 0;

    const build = () => {
      $$("section[data-section]").forEach((s) => {
        const idx = parseInt(s.getAttribute("data-section"), 10);
        sections[idx] = s;
      });
      total = sections.length;
    };

    const buildDots = () => {
      const host = $("[data-pager-dots]");
      if (!host) return;
      host.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const dot = doc.createElement("button");
        dot.className = "pager__dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Section ${i + 1}`);
        dot.dataset.dotIdx = String(i);
        dot.addEventListener("click", () => go(i));
        dot.addEventListener("pointerenter", () => { if (Audio.on) Audio.hover(); });
        host.appendChild(dot);
      }
    };

    const paintDots = () => {
      $$(".pager__dot").forEach((d) => {
        const idx = parseInt(d.dataset.dotIdx, 10);
        d.classList.toggle("is-active", idx === currentIdx);
      });
    };

    const paintNav = () => {
      const navBtns = $$(".topbar__link");
      navBtns.forEach((btn) => {
        const idx = parseInt(btn.getAttribute("data-nav-jump"), 10);
        btn.classList.toggle("is-active", idx === currentIdx);
      });
    };

    const paintPager = () => {
      const prev = $("[data-nav-prev]");
      const next = $("[data-nav-next]");
      if (prev) prev.disabled = currentIdx <= 0;
      if (next) next.disabled = currentIdx >= total - 1;
    };

    const paintProgress = () => {
      const fill = $("[data-progress]");
      if (!fill) return;
      const pct = total > 1 ? (currentIdx / (total - 1)) * 100 : 0;
      fill.style.width = pct + "%";
    };

    const revealSection = (idx) => {
      const node = sections[idx];
      if (!node) return;
      const targets = node.querySelectorAll(
        "[data-reveal], .law, .craft, .file, .move, .figure, .signal"
      );
      targets.forEach((t, i) => {
        t.classList.remove("is-revealed");
        win.setTimeout(() => t.classList.add("is-revealed"), 90 + i * 55);
      });
    };

    const go = (idx) => {
      if (locked) return;
      if (idx < 0 || idx >= total) return;
      const current = sections[currentIdx];
      if (idx === currentIdx && current && current.classList.contains("is-active")) return;

      locked = true;
      const direction = idx > currentIdx ? "from-right" : "from-left";
      const old = sections[currentIdx];
      const next = sections[idx];

      if (old) old.classList.remove("is-active", "from-right", "from-left");

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

      win.setTimeout(() => { locked = false; }, 720);
    };

    const next = () => go(currentIdx + 1);
    const prev = () => go(currentIdx - 1);

    const bindWheel = () => {
      let acc = 0;
      let cooldown = false;

      const atEdge = (dir) => {
        const sec = sections[currentIdx];
        const scroller = sec ? sec.querySelector(".panel__grid") : null;
        if (!scroller) return true;
        const top = scroller.scrollTop;
        const max = scroller.scrollHeight - scroller.clientHeight;
        if (max <= 2) return true;
        if (dir > 0) return top >= max - 2;
        return top <= 2;
      };

      win.addEventListener("wheel", (e) => {
        if (cooldown) return;
        acc += e.deltaY;
        if (Math.abs(acc) < 45) return;
        const dir = acc > 0 ? 1 : -1;
        if (!atEdge(dir)) {
          acc = 0;
          return;
        }
        cooldown = true;
        acc = 0;
        if (dir > 0) next(); else prev();
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
          go(total - 1);
        } else if ((e.metaKey || e.ctrlKey) && /^[1-9]$/.test(e.key)) {
          const n = parseInt(e.key, 10);
          if (n <= total) {
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
      const threshold = 70;

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
        if (dt > 600) return;
        if (Math.abs(dy) <= Math.abs(dx)) return;
        if (Math.abs(dy) < threshold) return;

        const sec = sections[currentIdx];
        const scroller = sec ? sec.querySelector(".panel__grid") : null;
        if (scroller) {
          const top = scroller.scrollTop;
          const max = scroller.scrollHeight - scroller.clientHeight;
          if (max > 2) {
            if (dy < 0 && top < max - 2) return;
            if (dy > 0 && top > 2) return;
          }
        }

        if (dy < 0) next(); else prev();
      }, { passive: true });
    };

    const bindButtons = () => {
      const nextBtn = $("[data-nav-next]");
      const prevBtn = $("[data-nav-prev]");
      if (nextBtn) nextBtn.addEventListener("click", next);
      if (prevBtn) prevBtn.addEventListener("click", prev);

      $$("[data-nav-jump]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          const idx = parseInt(btn.getAttribute("data-nav-jump"), 10);
          if (isNaN(idx)) return;
          go(idx);
          if (Audio.on) Audio.click();
          const drawer = $("[data-drawer]");
          if (drawer && drawer.classList.contains("is-open")) {
            win.setTimeout(() => {
              const close = drawer.querySelector("[data-drawer-close]");
              if (close) close.click();
            }, 220);
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
      if (sections[0]) {
        sections[0].classList.add("is-active");
        revealSection(0);
      }
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

      opener.addEventListener("click", (e) => {
        e.preventDefault();
        open();
      });

      $$("[data-drawer-close]").forEach((el) => {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          close();
        });
      });

      doc.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && node.classList.contains("is-open")) close();
      });
    };

    return { bind };
  })();

  /* ============================================================
     PARTICLE FIELD — Morphing "YOUSSEF"
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
        octx.font = `500 ${size}px "Inter", system-ui, sans-serif`;
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
        const count = Math.min(210, Math.floor((W * H) / 11500));
        particles = [];
        for (let i = 0; i < count; i++) {
          const isGold = Math.random() > 0.82;
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.4 + 0.3,
            a: Math.random() * 0.55 + 0.16,
            hue: isGold ? "gold" : "pearl",
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

      const colorFor = (hue, alpha) => {
        if (hue === "gold") return `rgba(201, 168, 106, ${alpha})`;
        return `rgba(244, 241, 234, ${alpha})`;
      };

      const frame = (now) => {
        ctx.clearRect(0, 0, W, H);
        px = lerp(px, tpx, 0.05);
        py = lerp(py, tpy, 0.05);

        if (mode === "float" && targets.length && now - startT > 3400) {
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
            ctx.fillStyle = colorFor(p.hue, p.a);
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
              if (d2 < 12500) {
                const alpha = (1 - d2 / 12500) * 0.1;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(201, 168, 106, ${alpha})`;
                ctx.stroke();
              }
            }
          }
        } else {
          for (let i = 0; i < len; i++) {
            const p = particles[i];
            const depth = 1 + (i % 9) * 0.06;
            const gx = p.tx + px * 24 * depth;
            const gy = p.ty + py * 16 * depth;
            p.x = lerp(p.x, gx, 0.075);
            p.y = lerp(p.y, gy, 0.075);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = colorFor(p.hue, p.a * 0.94);
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

      const animate = (el) => {
        if (el.__animated) return;
        el.__animated = true;
        const target = parseFloat(el.getAttribute("data-count")) || 0;
        const dur = 1700;
        const start = win.performance.now();

        const step = (now) => {
          const t = clamp((now - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          const v = Math.round(target * eased);
          el.textContent = String(v).padStart(2, "0");
          if (t < 1) raf(step);
        };
        raf(step);
      };

      if (!("IntersectionObserver" in win)) {
        nodes.forEach(animate);
        return;
      }

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.35 });

      nodes.forEach((n) => io.observe(n));
    };

    return { run };
  })();

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  const Magnetic = (() => {
    const run = () => {
      if (RM || TOUCH) return;
      const nodes = $$("[data-magnetic]");
      if (!nodes.length) return;

      nodes.forEach((node) => {
        let mx = 0, my = 0, tx = 0, ty = 0;
        const strength = 0.28;
        const radius = 130;

        const onMove = (e) => {
          const r = node.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const reach = radius + Math.max(r.width, r.height) / 2;
          if (dist < reach) {
            tx = dx * strength;
            ty = dy * strength;
          } else {
            tx = 0;
            ty = 0;
          }
        };

        const onLeave = () => { tx = 0; ty = 0; };

        win.addEventListener("pointermove", onMove, { passive: true });
        node.addEventListener("pointerleave", onLeave);

        const loop = () => {
          if (Math.abs(mx - tx) > 0.05 || Math.abs(my - ty) > 0.05) {
            mx = lerp(mx, tx, 0.16);
            my = lerp(my, ty, 0.16);
            node.style.transform = `translate3d(${mx.toFixed(2)}px, ${my.toFixed(2)}px, 0)`;
          }
          raf(loop);
        };
        raf(loop);
      });
    };
    return { run };
  })();

  /* ============================================================
     3D TILT
     ============================================================ */
  const Tilt = (() => {
    let rafId = null;
    const state = new WeakMap();
    const MAX_DEG = 8;

    const bind = (node) => {
      const strength = parseFloat(node.getAttribute("data-tilt-strength")) || 1;
      state.set(node, { rx: 0, ry: 0, trx: 0, try: 0, strength, active: false });

      const move = (e) => {
        if (e.pointerType === "touch" && TOUCH) return;
        const r = node.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const xc = r.left + r.width / 2;
        const yc = r.top + r.height / 2;
        const dx = e.clientX - xc;
        const dy = e.clientY - yc;
        const s = state.get(node);
        if (!s) return;
        s.try = clamp((dx / (r.width / 2)) * MAX_DEG * s.strength, -MAX_DEG, MAX_DEG);
        s.trx = clamp((-dy / (r.height / 2)) * MAX_DEG * s.strength, -MAX_DEG, MAX_DEG);
        s.active = true;
        node.style.setProperty("--mx", (e.clientX - r.left).toFixed(1) + "px");
        node.style.setProperty("--my", (e.clientY - r.top).toFixed(1) + "px");
      };

      const leave = () => {
        const s = state.get(node);
        if (!s) return;
        s.trx = 0;
        s.try = 0;
        s.active = false;
      };

      node.addEventListener("pointermove", move, { passive: true });
      node.addEventListener("pointerleave", leave);
      node.addEventListener("pointercancel", leave);
    };

    const run = () => {
      if (RM) return;
      const nodes = $$("[data-tilt]");
      if (!nodes.length) return;
      nodes.forEach(bind);

      const loop = () => {
        nodes.forEach((node) => {
          const s = state.get(node);
          if (!s) return;
          const idle = !s.active && Math.abs(s.rx) < 0.02 && Math.abs(s.ry) < 0.02;
          if (idle) {
            if (node.style.transform) node.style.transform = "";
            return;
          }
          s.rx = lerp(s.rx, s.trx, 0.14);
          s.ry = lerp(s.ry, s.try, 0.14);
          node.style.transform = `perspective(1200px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) translateZ(10px)`;
        });
        rafId = raf(loop);
      };
      rafId = raf(loop);
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
    Magnetic.run();
    Tilt.run();
    Topbar.run();
    Clock.run();
    Year.run();
    Visibility.run();
  };

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
