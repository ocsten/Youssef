(() => {
  "use strict";

  const DOC = document;
  const WIN = window;
  const HTML = DOC.documentElement;
  const BODY = DOC.body;

  const $ = (s, ctx = DOC) => ctx.querySelector(s);
  const $$ = (s, ctx = DOC) => Array.from(ctx.querySelectorAll(s));

  const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
  const lerp = (a, b, t) => a + (b - a) * t;
  const raf = WIN.requestAnimationFrame.bind(WIN);
  const caf = WIN.cancelAnimationFrame.bind(WIN);

  const RM = WIN.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = WIN.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const COARSE = WIN.matchMedia("(pointer: coarse)").matches;
  const STORE = "ocsten.lang.v2";

  const LEX = {
    en: {
      "topbar.status": "OPEN FOR WORK",
      "topbar.year": "2026",
      "overlay.label": "NAVIGATION",
      "overlay.located": "LOCATED",
      "overlay.engaged": "ENGAGED",
      "overlay.creed": "CREED",
      "overlay.creed.v": "Systems over emotions.",
      "nav.doctrine": "Doctrine",
      "nav.doctrine.cap": "Why language is structure",
      "nav.arsenal": "Arsenal",
      "nav.arsenal.cap": "Six disciplines, one system",
      "nav.vault": "Vault",
      "nav.vault.cap": "Selected engagements",
      "nav.method": "Method",
      "nav.method.cap": "Audit to autonomy",
      "nav.dispatch": "Dispatch",
      "nav.dispatch.cap": "Open the door",
      "intro.role.1": "UX COPYWRITER",
      "intro.role.2": "DIGITAL ARCHITECT",
      "intro.creed": "Systems over emotions.",
      "intro.bio": "I design the language that holds digital products together. Precise. Deliberate. Engineered to move people without them ever noticing the engineering.",
      "intro.cta.work": "ENTER THE VAULT",
      "intro.cta.doctrine": "READ DOCTRINE",
      "intro.scroll": "SCROLL",
      "doctrine.chapter": "DOCTRINE",
      "doctrine.p1": "Every interface is a room. Every sentence a load-bearing wall. I design the language that holds digital products together.",
      "doctrine.p2": "The work is not decoration. It is structure — the quiet system beneath the surface that makes a product feel inevitable.",
      "canon.1.t": "PRECISION > DECORATION",
      "canon.1.x": "Every word earns its place or it is removed. No ornament survives without function.",
      "canon.2.t": "SYSTEMS > EMOTIONS",
      "canon.2.x": "Structure scales; feelings fade. A voice system outlives any single campaign.",
      "canon.3.t": "SILENCE > NOISE",
      "canon.3.x": "The best copy is the line you never had to read. Restraint is the highest craft.",
      "canon.4.t": "STRUCTURE > STYLE",
      "canon.4.x": "Tone is adjustable. Architecture is not. Build the frame first, then paint it.",
      "canon.5.t": "CLARITY > CLEVERNESS",
      "canon.5.x": "A clever line is remembered once. A clear line is used a thousand times.",
      "canon.6.t": "LONGEVITY > TREND",
      "canon.6.x": "Trends expire. Systems compound. I build for the version of the product that outlasts me.",
      "arsenal.chapter": "ARSENAL",
      "arsenal.h.1": "Six disciplines.",
      "arsenal.h.2": "One system.",
      "arsenal.lede": "Each discipline is a component. Together they form a self-sustaining language engine any team can operate without me in the room.",
      "weapon.1.n": "UX Copywriting",
      "weapon.1.d": "Microcopy, flows, empty states and error handling that guide without friction.",
      "weapon.1.f": "Microcopy · Flows · Errors",
      "weapon.2.n": "Brand Voice",
      "weapon.2.d": "A distinct, scalable voice system that survives every touchpoint and every writer.",
      "weapon.2.f": "Tone · Lexicon · Guidelines",
      "weapon.3.n": "Content Systems",
      "weapon.3.d": "Structured content models that scale across products, platforms and languages.",
      "weapon.3.f": "Models · Taxonomy · Governance",
      "weapon.4.n": "Digital Architecture",
      "weapon.4.d": "Information design and narrative structure for products too complex to explain twice.",
      "weapon.4.f": "IA · Narrative · Onboarding",
      "weapon.5.n": "Product Storytelling",
      "weapon.5.d": "Narrative arcs that turn features into consequences, and consequences into decisions.",
      "weapon.5.f": "Narrative · Positioning · Launch",
      "weapon.6.n": "Language Audits",
      "weapon.6.d": "A forensic read of your existing product language, delivered as an actionable system map.",
      "weapon.6.f": "Audit · Scorecard · Roadmap",
      "vault.chapter": "VAULT",
      "vault.h.1": "Selected",
      "vault.h.2": "engagements.",
      "vault.f.all": "ALL",
      "vault.f.voice": "VOICE",
      "vault.f.ux": "UX",
      "vault.f.systems": "SYSTEMS",
      "vault.f.editorial": "EDITORIAL",
      "entry.1.tag": "VOICE",
      "entry.1.n": "Narrative Systems",
      "entry.1.c": "Brand Voice Architecture · Fintech · 2025",
      "entry.1.d": "A complete voice system for a cross-border payments platform operating in eleven markets.",
      "entry.2.tag": "UX",
      "entry.2.n": "Interface Poetry",
      "entry.2.c": "UX Microcopy · Health · 2024",
      "entry.2.d": "Rewriting 400+ strings to remove fear from a clinical onboarding flow.",
      "entry.3.tag": "SYSTEMS",
      "entry.3.n": "Signal / Noise",
      "entry.3.c": "Content Strategy · SaaS · 2024",
      "entry.3.d": "A taxonomy and content model that cut support tickets by a third.",
      "entry.4.tag": "SYSTEMS",
      "entry.4.n": "The Quiet Grid",
      "entry.4.c": "Design System · Infrastructure · 2023",
      "entry.4.d": "Language foundations for a design system now used by four product teams.",
      "entry.5.tag": "EDITORIAL",
      "entry.5.n": "Monochrome",
      "entry.5.c": "Editorial Voice · Media · 2023",
      "entry.5.d": "A restrained editorial voice for a publication that refuses to shout.",
      "entry.6.tag": "UX",
      "entry.6.n": "Zero State",
      "entry.6.c": "Onboarding System · Marketplace · 2022",
      "entry.6.d": "Turning a cold start into a guided first minute.",
      "vault.sign": "Full case studies available under NDA.",
      "fig.1.k": "PROJECTS",
      "fig.2.k": "INDUSTRIES",
      "fig.3.k": "YEARS",
      "fig.4.k": "RETENTION",
      "method.chapter": "METHOD",
      "method.h.1": "Four movements.",
      "method.h.2": "One outcome.",
      "stage.1.n": "Audit",
      "stage.1.d": "I read the product, the users, and the silence between them. Nothing is assumed; everything is observed.",
      "stage.2.n": "Architect",
      "stage.2.d": "I design the language system that will hold everything together — hierarchy, voice, rules, exceptions.",
      "stage.3.n": "Write",
      "stage.3.d": "I craft every line with intent, then cut until only intent remains. The editing is the work.",
      "stage.4.n": "Refine",
      "stage.4.d": "I test, measure and sharpen until the system runs without me. Autonomy is the deliverable.",
      "testimony.chapter": "TESTIMONY",
      "witness.1.q": "He removed half our words and doubled our clarity. The product finally sounds like a product.",
      "witness.1.n": "Product Lead",
      "witness.1.r": "Fintech Platform · Berlin",
      "witness.2.q": "The voice system survived three rebrands and two acquisitions. That is the point.",
      "witness.2.n": "Head of Brand",
      "witness.2.r": "Infrastructure Group · Dubai",
      "witness.3.q": "Rare to find someone who thinks in systems and still writes like a human being.",
      "witness.3.n": "Founder",
      "witness.3.r": "Health SaaS · Paris",
      "dispatch.chapter": "DISPATCH",
      "dispatch.h.1": "Let's build something",
      "dispatch.h.2": "quietly powerful.",
      "dispatch.lede": "A small number of engagements per year. If your product deserves language that works as hard as its engineering, the door is below.",
      "dispatch.cta": "OPEN THE DOOR",
      "dispatch.k.1": "RESPONSE",
      "dispatch.v.1": "Within 48 hours",
      "dispatch.k.2": "BASE",
      "dispatch.v.2": "Algiers — Worldwide",
      "dispatch.k.3": "CAPACITY",
      "dispatch.v.3": "Limited · 2026",
      "colophon.creed": "Systems over emotions.",
      "colophon.rights": "All rights reserved.",
      "colophon.credit": "Engineered in the dark."
    },
    ar: {
      "topbar.status": "متاح للعمل",
      "topbar.year": "2026",
      "overlay.label": "التنقل",
      "overlay.located": "الموقع",
      "overlay.engaged": "مشغول",
      "overlay.creed": "العقيدة",
      "overlay.creed.v": "الأنظمة قبل المشاعر.",
      "nav.doctrine": "البيان",
      "nav.doctrine.cap": "لماذا اللغة بنية",
      "nav.arsenal": "الترسانة",
      "nav.arsenal.cap": "ستة تخصصات، نظام واحد",
      "nav.vault": "الخزانة",
      "nav.vault.cap": "أعمال مختارة",
      "nav.method": "المنهجية",
      "nav.method.cap": "من التدقيق إلى الاستقلالية",
      "nav.dispatch": "البريد",
      "nav.dispatch.cap": "افتح الباب",
      "intro.role.1": "كاتب تجربة المستخدم",
      "intro.role.2": "المهندس الرقمي",
      "intro.creed": "الأنظمة قبل المشاعر.",
      "intro.bio": "أصمم اللغة التي تُمسك المنتجات الرقمية معًا. دقيقة، مدروسة، مهندسة لتحريك الناس دون أن يلاحظوا الهندسة أبدًا.",
      "intro.cta.work": "ادخل الخزانة",
      "intro.cta.doctrine": "اقرأ البيان",
      "intro.scroll": "مرر",
      "doctrine.chapter": "البيان",
      "doctrine.p1": "كل واجهة غرفة. وكل جملة جدار حامل. أصمم اللغة التي تُمسك المنتجات الرقمية معًا.",
      "doctrine.p2": "العمل ليس زخرفة. إنه بنية — النظام الهادئ تحت السطح الذي يجعل المنتج يبدو حتميًا.",
      "canon.1.t": "الدقة > الزخرفة",
      "canon.1.x": "كل كلمة تستحق مكانها أو تُحذف. لا زخرفة تنجو بدون وظيفة.",
      "canon.2.t": "الأنظمة > المشاعر",
      "canon.2.x": "البنية تتوسع؛ المشاعر تتلاشى. نظام صوتي يعيش أطول من أي حملة.",
      "canon.3.t": "الصمت > الضجيج",
      "canon.3.x": "أفضل نص هو السطر الذي لم تكن مضطرًا لقراءته. الانضباط هو أعلى الحرف.",
      "canon.4.t": "البنية > الأسلوب",
      "canon.4.x": "النبرة قابلة للتعديل. المعمارية لا. ابنِ الإطار أولًا، ثم ارسمه.",
      "canon.5.t": "الوضوح > الذكاء",
      "canon.5.x": "السطر الذكي يُتذكر مرة. السطر الواضح يُستخدم ألف مرة.",
      "canon.6.t": "الاستمرارية > الصيحة",
      "canon.6.x": "الصيحات تنتهي. الأنظمة تتراكم. أبني للنسخة التي تبقى بعدي.",
      "arsenal.chapter": "الترسانة",
      "arsenal.h.1": "ستة تخصصات.",
      "arsenal.h.2": "نظام واحد.",
      "arsenal.lede": "كل تخصص مكوّن. معًا يشكّلون محرك لغة مستدامًا ذاتيًا يمكن لأي فريق تشغيله بدوني في الغرفة.",
      "weapon.1.n": "كتابة تجربة المستخدم",
      "weapon.1.d": "نصوص دقيقة، تدفقات، حالات فارغة ومعالجة أخطاء توجه دون احتكاك.",
      "weapon.1.f": "نصوص · تدفقات · أخطاء",
      "weapon.2.n": "صوت العلامة",
      "weapon.2.d": "نظام صوتي مميز وقابل للتوسع ينجو من كل نقطة تواصل وكل كاتب.",
      "weapon.2.f": "النبرة · المعجم · الإرشادات",
      "weapon.3.n": "أنظمة المحتوى",
      "weapon.3.d": "نماذج محتوى منظمة تتوسع عبر المنتجات والمنصات واللغات.",
      "weapon.3.f": "النماذج · التصنيف · الحوكمة",
      "weapon.4.n": "المعمارية الرقمية",
      "weapon.4.d": "تصميم المعلومات والبنية السردية للمنتجات المعقدة جدًا لتُشرح مرتين.",
      "weapon.4.f": "المعمارية · السرد · الإعداد",
      "weapon.5.n": "سرد المنتج",
      "weapon.5.d": "أقواس سردية تحول الميزات إلى نتائج، والنتائج إلى قرارات.",
      "weapon.5.f": "السرد · التموضع · الإطلاق",
      "weapon.6.n": "تدقيق اللغة",
      "weapon.6.d": "قراءة جنائية للغة منتجك الحالية، تُسلّم كخريطة نظام قابلة للتنفيذ.",
      "weapon.6.f": "تدقيق · بطاقة · خارطة",
      "vault.chapter": "الخزانة",
      "vault.h.1": "أعمال",
      "vault.h.2": "مختارة.",
      "vault.f.all": "الكل",
      "vault.f.voice": "الصوت",
      "vault.f.ux": "التجربة",
      "vault.f.systems": "الأنظمة",
      "vault.f.editorial": "التحرير",
      "entry.1.tag": "الصوت",
      "entry.1.n": "أنظمة السرد",
      "entry.1.c": "معمارية صوت العلامة · تقنية مالية · 2025",
      "entry.1.d": "نظام صوتي كامل لمنصة مدفوعات عابرة للحدود تعمل في أحد عشر سوقًا.",
      "entry.2.tag": "التجربة",
      "entry.2.n": "شعر الواجهات",
      "entry.2.c": "نصوص تجربة المستخدم · صحة · 2024",
      "entry.2.d": "إعادة كتابة أكثر من 400 نص لإزالة الخوف من تدفق إعداد سريري.",
      "entry.3.tag": "الأنظمة",
      "entry.3.n": "إشارة / ضجيج",
      "entry.3.c": "استراتيجية المحتوى · برمجيات · 2024",
      "entry.3.d": "تصنيف ونموذج محتوى خفّض تذاكر الدعم بالثلث.",
      "entry.4.tag": "الأنظمة",
      "entry.4.n": "الشبكة الهادئة",
      "entry.4.c": "نظام تصميم · بنية تحتية · 2023",
      "entry.4.d": "أسس لغوية لنظام تصميم تستخدمه الآن أربعة فرق منتجات.",
      "entry.5.tag": "التحرير",
      "entry.5.n": "أحادي اللون",
      "entry.5.c": "صوت تحريري · إعلام · 2023",
      "entry.5.d": "صوت تحريري منضبط لمنشور يرفض الصراخ.",
      "entry.6.tag": "التجربة",
      "entry.6.n": "الحالة الصفرية",
      "entry.6.c": "نظام إعداد · سوق · 2022",
      "entry.6.d": "تحويل البداية الباردة إلى أول دقيقة موجهة.",
      "vault.sign": "دراسات الحالة الكاملة متاحة بموجب اتفاقية سرية.",
      "fig.1.k": "مشاريع",
      "fig.2.k": "قطاعات",
      "fig.3.k": "سنوات",
      "fig.4.k": "احتفاظ",
      "method.chapter": "المنهجية",
      "method.h.1": "أربع حركات.",
      "method.h.2": "نتيجة واحدة.",
      "stage.1.n": "التدقيق",
      "stage.1.d": "أقرأ المنتج والمستخدمين والصمت بينهم. لا شيء مفترض؛ كل شيء ملاحظ.",
      "stage.2.n": "التعميد",
      "stage.2.d": "أصمم النظام اللغوي الذي سيمسك كل شيء معًا — التسلسل، الصوت، القواعد، الاستثناءات.",
      "stage.3.n": "الكتابة",
      "stage.3.d": "أصيغ كل سطر بنية، ثم أقطع حتى تبقى النية فقط. التحرير هو العمل.",
      "stage.4.n": "الصقل",
      "stage.4.d": "أختبر وأقيس وأشحذ حتى يعمل النظام بدوني. الاستقلالية هي المُخرَج.",
      "testimony.chapter": "شهادات",
      "witness.1.q": "أزال نصف كلماتنا وضاعف وضوحنا. المنتج أخيرًا يبدو كمنتج.",
      "witness.1.n": "قائد المنتج",
      "witness.1.r": "منصة تقنية مالية · برلين",
      "witness.2.q": "نجا النظام الصوتي من ثلاث عمليات إعادة تسمية واستحواذين. هذه هي النقطة.",
      "witness.2.n": "رئيس العلامة",
      "witness.2.r": "مجموعة بنية تحتية · دبي",
      "witness.3.q": "نادرًا ما تجد شخصًا يفكر بأنظمة وما زال يكتب كإنسان.",
      "witness.3.n": "مؤسس",
      "witness.3.r": "برمجيات صحية · باريس",
      "dispatch.chapter": "البريد",
      "dispatch.h.1": "لنبنِ شيئًا",
      "dispatch.h.2": "قويًا بهدوء.",
      "dispatch.lede": "أتولى عددًا محدودًا من الارتباطات سنويًا. إذا كان منتجك يستحق لغة تعمل بجد مثل هندسته، فالباب في الأسفل.",
      "dispatch.cta": "افتح الباب",
      "dispatch.k.1": "الرد",
      "dispatch.v.1": "خلال 48 ساعة",
      "dispatch.k.2": "المقر",
      "dispatch.v.2": "الجزائر — عالميًا",
      "dispatch.k.3": "السعة",
      "dispatch.v.3": "محدود · 2026",
      "colophon.creed": "الأنظمة قبل المشاعر.",
      "colophon.rights": "جميع الحقوق محفوظة.",
      "colophon.credit": "مصمم ومهندس في الظلام."
    }
  };

  const LANG = (() => {
    let current = "en";

    const read = () => {
      try {
        const s = WIN.localStorage.getItem(STORE);
        if (s === "en" || s === "ar") return s;
      } catch (_) {}
      const n = (navigator.language || "en").toLowerCase();
      return n.startsWith("ar") ? "ar" : "en";
    };

    const write = (l) => {
      try { WIN.localStorage.setItem(STORE, l); } catch (_) {}
    };

    const paint = (l) => {
      const dict = LEX[l] || LEX.en;
      $$("[data-i18n]").forEach((el) => {
        const k = el.getAttribute("data-i18n");
        const v = dict[k];
        if (v === undefined) return;
        if (el.tagName === "TEXTPATH") el.textContent = v;
        else el.textContent = v;
      });
      HTML.setAttribute("lang", l);
      HTML.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
      HTML.setAttribute("data-lang", l);
      BODY.setAttribute("data-lang", l);
      DOC.title = l === "ar"
        ? "أوكتسن — يوسف · كاتب تجربة المستخدم والمهندس الرقمي"
        : "OCSTEN — Youssef · UX Copywriter & Digital Architect";
    };

    const apply = (l) => {
      current = l === "ar" ? "ar" : "en";
      paint(current);
      write(current);
    };

    const toggle = () => apply(current === "en" ? "ar" : "en");

    const init = () => {
      apply(read());
      const btn = $("[data-lang-btn]");
      if (btn) btn.addEventListener("click", toggle);
    };

    return { init, toggle, apply, get current() { return current; } };
  })();

  const BOOT = (() => {
    const WORDS = ["LANGUAGE", "SYSTEMS", "ARCHITECT", "COPY", "VOICE", "OCSTEN"];
    let cancelled = false;

    const run = () => {
      const root = $("[data-boot]");
      if (!root) {
        BODY.classList.remove("boot");
        return;
      }
      const word = $("[data-boot-word]", root);
      const bar = $("[data-boot-bar]", root);
      const pct = $("[data-boot-percent]", root);
      let i = 0;
      let progress = 0;

      const wordTimer = WIN.setInterval(() => {
        if (cancelled) return;
        i = (i + 1) % WORDS.length;
        if (word) {
          word.style.opacity = "0";
          WIN.setTimeout(() => {
            word.textContent = WORDS[i];
            word.style.opacity = "1";
          }, 180);
        }
      }, 420);
      if (word) word.style.transition = "opacity 0.35s cubic-bezier(0.22,1,0.36,1)";

      const tick = () => {
        if (cancelled) return;
        progress = Math.min(progress + (100 - progress) * 0.06 + 0.9, 100);
        if (pct) pct.textContent = String(Math.floor(progress)).padStart(3, "0");
        if (bar) bar.style.width = progress + "%";

        if (progress < 100) {
          raf(tick);
        } else {
          WIN.clearInterval(wordTimer);
          WIN.setTimeout(() => {
            root.classList.add("is-done");
            BODY.classList.remove("boot");
            BODY.classList.add("is-ready");
            WIN.setTimeout(() => root.remove(), 1000);
          }, 340);
        }
      };

      WIN.setTimeout(tick, 280);
    };

    return { run, cancel: () => { cancelled = true; } };
  })();

  const POINTER = (() => {
    let rafId = null;
    let running = false;

    const start = () => {
      if (!FINE || RM) return;
      const root = $("[data-pointer]");
      if (!root) return;

      const verb = $("[data-pointer-verb]", root);
      let mx = WIN.innerWidth / 2;
      let my = WIN.innerHeight / 2;
      let rx = mx;
      let ry = my;
      let visible = false;

      const onMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!visible) {
          root.style.opacity = "1";
          visible = true;
        }
      };

      const onLeave = () => {
        root.style.opacity = "0";
        visible = false;
      };

      WIN.addEventListener("pointermove", onMove, { passive: true });
      DOC.addEventListener("mouseleave", onLeave);

      const loop = () => {
        rx = lerp(rx, mx, 0.2);
        ry = lerp(ry, my, 0.2);
        root.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
        rafId = raf(loop);
      };

      if (!running) {
        running = true;
        loop();
      }

      const bind = () => {
        $$("[data-cursor], a, button").forEach((el) => {
          if (el.__pointerBound) return;
          el.__pointerBound = true;

          el.addEventListener("pointerenter", () => {
            root.classList.add("is-hover");
            const t = el.getAttribute("data-cursor-text");
            if (verb) verb.textContent = t || "";
          });

          el.addEventListener("pointerleave", () => {
            root.classList.remove("is-hover");
            if (verb) verb.textContent = "";
          });
        });
      };

      bind();
      return { bind };
    };

    const destroy = () => {
      if (rafId) caf(rafId);
      running = false;
    };

    return { start, destroy };
  })();

  const TOPBAR = (() => {
    const run = () => {
      const bar = $("[data-topbar]");
      if (!bar) return;
      let ticking = false;

      const update = () => {
        bar.classList.toggle("is-scrolled", WIN.scrollY > 40);
        ticking = false;
      };

      WIN.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        raf(update);
      }, { passive: true });

      update();
    };

    return { run };
  })();

  const OVERLAY = (() => {
    let bound = false;

    const bind = () => {
      if (bound) return;
      bound = true;

      const root = $("[data-overlay]");
      const burger = $("[data-burger]");
      if (!root || !burger) return;

      let y = 0;

      const open = () => {
        y = WIN.scrollY;
        root.classList.add("is-open");
        root.setAttribute("aria-hidden", "false");
        burger.classList.add("is-open");
        burger.setAttribute("aria-expanded", "true");
        HTML.classList.add("is-locked");
        BODY.classList.add("is-locked");
        BODY.style.top = `-${y}px`;
      };

      const close = () => {
        root.classList.remove("is-open");
        root.setAttribute("aria-hidden", "true");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        HTML.classList.remove("is-locked");
        BODY.classList.remove("is-locked");
        BODY.style.top = "";
        WIN.scrollTo({ top: y, behavior: "instant" });
      };

      burger.addEventListener("click", () => {
        root.classList.contains("is-open") ? close() : open();
      });

      $$("[data-overlay-close], [data-overlay-veil]").forEach((n) => n.addEventListener("click", close));
      $$("[data-overlay-link]").forEach((n) => n.addEventListener("click", close));

      DOC.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && root.classList.contains("is-open")) close();
      });
    };

    return { bind };
  })();

  const SCROLLER = (() => {
    const run = () => {
      if (RM) return;
      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = a.getAttribute("href");
          if (!href || href === "#" || href.length < 2) return;
          const target = DOC.getElementById(href.slice(1));
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + WIN.scrollY - 70;
          WIN.scrollTo({ top, behavior: "smooth" });
        });
      });
    };
    return { run };
  })();

  const REVEAL = (() => {
    const run = () => {
      const nodes = $$("[data-reveal]");
      if (!nodes.length) return;

      if (RM || !("IntersectionObserver" in WIN)) {
        nodes.forEach((n) => n.classList.add("is-visible"));
        return;
      }

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      nodes.forEach((n) => io.observe(n));
    };
    return { run };
  })();

  const FIGURES = (() => {
    const run = () => {
      const nodes = $$("[data-count]");
      if (!nodes.length) return;

      const runCount = (el) => {
        const target = parseFloat(el.getAttribute("data-count")) || 0;
        const dur = 1900;
        const start = WIN.performance.now();

        const step = (now) => {
          const t = clamp((now - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - t, 4);
          const v = Math.round(target * eased);
          el.textContent = String(v).padStart(2, "0");
          if (t < 1) raf(step);
        };

        raf(step);
      };

      if (!("IntersectionObserver" in WIN)) {
        nodes.forEach(runCount);
        return;
      }

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const fig = entry.target.closest(".figure");
          if (fig) fig.classList.add("is-live");
          runCount(entry.target);
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.5 });

      nodes.forEach((n) => io.observe(n));
    };
    return { run };
  })();

  const TILT = (() => {
    let rafId = null;
    let running = false;
    const state = new WeakMap();

    const bind = (node) => {
      const strength = parseFloat(node.getAttribute("data-tilt-strength")) || 8;
      state.set(node, { rx: 0, ry: 0, trx: 0, try: 0, strength, active: false });

      const move = (e) => {
        if (e.pointerType === "touch" && COARSE) return;
        const r = node.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        const s = state.get(node);
        if (!s) return;
        s.try = nx * s.strength;
        s.trx = -ny * s.strength;
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
          if (!s.active && Math.abs(s.rx) < 0.02 && Math.abs(s.ry) < 0.02) {
            if (node.style.transform) node.style.transform = "";
            return;
          }
          s.rx = lerp(s.rx, s.trx, 0.14);
          s.ry = lerp(s.ry, s.try, 0.14);
          node.style.transform = `perspective(1200px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
        });
        rafId = raf(loop);
      };

      if (!running) {
        running = true;
        loop();
      }
    };

    const destroy = () => {
      if (rafId) caf(rafId);
      running = false;
    };

    return { run, destroy };
  })();

  const MAGNET = (() => {
    const run = () => {
      if (RM || COARSE) return;
      const nodes = $$("[data-magnetic]");
      if (!nodes.length) return;

      nodes.forEach((node) => {
        let mx = 0, my = 0, tx = 0, ty = 0;
        const strength = 0.34;
        const radius = 140;

        const move = (e) => {
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

        const leave = () => { tx = 0; ty = 0; };

        WIN.addEventListener("pointermove", move, { passive: true });
        node.addEventListener("pointerleave", leave);

        const loop = () => {
          if (Math.abs(mx - tx) > 0.05 || Math.abs(my - ty) > 0.05) {
            mx = lerp(mx, tx, 0.16);
            my = lerp(my, ty, 0.16);
            node.style.transform = `translate3d(${mx.toFixed(2)}px, ${my.toFixed(2)}px, 0)`;
          }
          raf(loop);
        };

        loop();
      });
    };
    return { run };
  })();

  const STAGE = (() => {
    let rafId = null;
    let destroyFn = null;

    const run = () => {
      const canvas = DOC.getElementById("stage");
      if (!canvas || RM) return;
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let W = 0, H = 0, dpr = 1;
      let particles = [];
      let targets = [];
      let px = 0, py = 0, tpx = 0, tpy = 0;
      let mode = "float";
      let morph = 0;
      const start = WIN.performance.now();

      const buildTargets = () => {
        const off = DOC.createElement("canvas");
        const oW = 800;
        const oH = 240;
        off.width = oW;
        off.height = oH;
        const octx = off.getContext("2d");
        octx.fillStyle = "#fff";
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        const size = Math.min(160, oW / 5.2);
        octx.font = `900 ${size}px "Anton", Impact, sans-serif`;
        octx.fillText("YOUSSEF", oW / 2, oH / 2);

        const data = octx.getImageData(0, 0, oW, oH).data;
        const gap = 6;
        const scale = Math.min(W / oW, H / oH) * 0.72;
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
            r: Math.random() * 1.6 + 0.35,
            a: Math.random() * 0.55 + 0.16,
            hue: Math.random() > 0.85 ? "gold" : "cyber",
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
        dpr = Math.min(WIN.devicePixelRatio || 1, 2);
        W = canvas.offsetWidth;
        H = canvas.offsetHeight;
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        buildTargets();
        buildParticles();
      };

      const onMove = (e) => {
        tpx = (e.clientX / WIN.innerWidth - 0.5) * 2;
        tpy = (e.clientY / WIN.innerHeight - 0.5) * 2;
      };

      WIN.addEventListener("pointermove", onMove, { passive: true });

      let rzT = null;
      const onResize = () => {
        if (rzT) WIN.clearTimeout(rzT);
        rzT = WIN.setTimeout(resize, 180);
      };
      WIN.addEventListener("resize", onResize);

      const frame = (now) => {
        ctx.clearRect(0, 0, W, H);

        px = lerp(px, tpx, 0.05);
        py = lerp(py, tpy, 0.05);

        if (mode === "float" && targets.length && now - start > 3600) {
          morph = Math.min(morph + 0.008, 1);
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
            const rgb = p.hue === "gold" ? "212, 175, 55" : "0, 229, 255";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb}, ${p.a})`;
            ctx.fill();
          }

          ctx.lineWidth = 0.5;
          for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
              const a = particles[i];
              const b = particles[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const d2 = dx * dx + dy * dy;
              if (d2 < 13000) {
                const alpha = (1 - d2 / 13000) * 0.12;
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                ctx.stroke();
              }
            }
          }
        } else {
          for (let i = 0; i < len; i++) {
            const p = particles[i];
            const depth = 1 + (i % 9) * 0.06;
            const gx = p.tx + px * 26 * depth;
            const gy = p.ty + py * 18 * depth;

            p.x = lerp(p.x, gx, 0.07);
            p.y = lerp(p.y, gy, 0.07);

            const rgb = p.hue === "gold" ? "212, 175, 55" : "0, 229, 255";
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb}, ${p.a * 0.92})`;
            ctx.fill();
          }
        }

        rafId = raf(frame);
      };

      resize();
      rafId = raf(frame);

      destroyFn = () => {
        if (rafId) caf(rafId);
        WIN.removeEventListener("pointermove", onMove);
        WIN.removeEventListener("resize", onResize);
      };
    };

    const destroy = () => {
      if (typeof destroyFn === "function") destroyFn();
    };

    return { run, destroy };
  })();

  const TICKER = (() => {
    const run = () => {
      const track = $("[data-ticker]");
      if (!track || RM) return;
      let x = 0;
      const speed = 0.6;
      const half = track.scrollWidth / 2;

      const loop = () => {
        x -= speed;
        if (-x >= half) x += half;
        track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
        raf(loop);
      };
      raf(loop);
    };
    return { run };
  })();

  const VAULT = (() => {
    const run = () => {
      const chips = $$("[data-chip]");
      const entries = $$(".entry");
      const countEl = $("[data-vault-count]");
      if (!chips.length || !entries.length) return;

      const refresh = () => {
        if (!countEl) return;
        const visible = entries.filter((e) => !e.classList.contains("is-gone"));
        countEl.textContent = String(visible.length).padStart(2, "0");
      };

      refresh();

      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("is-on"));
          chip.classList.add("is-on");
          const tag = chip.getAttribute("data-chip");

          entries.forEach((e) => {
            const match = tag === "*" || e.getAttribute("data-tag") === tag;
            if (match) {
              e.classList.remove("is-gone");
              e.style.opacity = "0";
              e.style.transform = "translateY(14px)";
              raf(() => {
                e.style.transition = "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)";
                e.style.opacity = "1";
                e.style.transform = "translateY(0)";
              });
            } else {
              e.classList.add("is-gone");
            }
          });

          WIN.setTimeout(refresh, 120);
        });
      });
    };
    return { run };
  })();

  const RAIL = (() => {
    const run = () => {
      const num = $("[data-rail-num]");
      if (!num || !("IntersectionObserver" in WIN)) return;

      const sections = $$("section[id]");
      if (!sections.length) return;

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const idx = sections.indexOf(entry.target);
            num.textContent = String(Math.max(idx, 0)).padStart(2, "0");
          }
        });
      }, { threshold: [0.3, 0.6] });

      sections.forEach((s) => io.observe(s));
    };
    return { run };
  })();

  const CLOCK = (() => {
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
      WIN.setInterval(tick, 30000);
    };
    return { run };
  })();

  const ASCEND = (() => {
    const run = () => {
      const btn = $("[data-ascend]");
      if (!btn) return;

      const update = () => {
        btn.classList.toggle("is-live", WIN.scrollY > WIN.innerHeight * 0.7);
      };

      WIN.addEventListener("scroll", update, { passive: true });
      btn.addEventListener("click", () => {
        WIN.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
      });

      update();
    };
    return { run };
  })();

  const CTA_REVEAL = (() => {
    const run = () => {
      const cta = $("[data-dispatch-cta]");
      const section = DOC.getElementById("dispatch");
      if (!cta || !section) return;

      if (!("IntersectionObserver" in WIN)) {
        cta.classList.add("is-live");
        return;
      }

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cta.classList.add("is-live");
          obs.disconnect();
        });
      }, { threshold: 0.3 });

      io.observe(section);
    };
    return { run };
  })();

  const GLYPHS = (() => {
    const run = () => {
      if (RM || COARSE) return;
      const glyphs = $$(".glyph");
      if (!glyphs.length) return;

      let tx = 0, ty = 0, px = 0, py = 0;

      WIN.addEventListener("pointermove", (e) => {
        tx = (e.clientX / WIN.innerWidth - 0.5) * 2;
        ty = (e.clientY / WIN.innerHeight - 0.5) * 2;
      }, { passive: true });

      const state = glyphs.map((el, i) => ({
        el,
        x: 0,
        y: 0,
        center: (i - (glyphs.length - 1) / 2) / glyphs.length
      }));

      const loop = () => {
        px = lerp(px, tx, 0.06);
        py = lerp(py, ty, 0.06);

        state.forEach((s) => {
          const tX = px * 30 * (1 + Math.abs(s.center));
          const tY = py * 20;
          s.x = lerp(s.x, tX, 0.09);
          s.y = lerp(s.y, tY, 0.09);
          s.el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
        });

        raf(loop);
      };
      raf(loop);
    };
    return { run };
  })();

  const PARALLAX = (() => {
    const run = () => {
      if (RM || COARSE) return;
      const scene = $("[data-parallax]");
      if (!scene) return;
      const layers = $$("[data-depth]", scene);
      if (!layers.length) return;

      let tx = 0, ty = 0, px = 0, py = 0;

      WIN.addEventListener("pointermove", (e) => {
        tx = (e.clientX / WIN.innerWidth - 0.5) * 2;
        ty = (e.clientY / WIN.innerHeight - 0.5) * 2;
      }, { passive: true });

      const loop = () => {
        px = lerp(px, tx, 0.05);
        py = lerp(py, ty, 0.05);

        layers.forEach((el) => {
          const d = parseFloat(el.getAttribute("data-depth")) || 1;
          el.style.transform = `translate3d(${(px * 14 * d).toFixed(2)}px, ${(py * 10 * d).toFixed(2)}px, 0)`;
        });

        raf(loop);
      };
      raf(loop);
    };
    return { run };
  })();

  const SCRAMBLE = (() => {
    const run = () => {
      const nodes = $$("[data-scramble]");
      if (!nodes.length || RM) return;

      const CHARS = "!<>-_\\/[]{}—=+*^?#________";

      nodes.forEach((node) => {
        const original = node.textContent;
        let frame = 0;
        let rafId = null;

        const scramble = () => {
          const len = original.length;
          const progress = frame / 40;
          let out = "";

          for (let i = 0; i < len; i++) {
            if (i < progress * len) {
              out += original[i];
            } else if (original[i] === " ") {
              out += " ";
            } else {
              out += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }

          node.textContent = out;
          frame++;

          if (frame <= 40) {
            rafId = raf(scramble);
          } else {
            node.textContent = original;
          }
        };

        if (!("IntersectionObserver" in WIN)) return;

        const io = new IntersectionObserver((entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            frame = 0;
            scramble();
            obs.disconnect();
          });
        }, { threshold: 0.4 });

        io.observe(node);
      });
    };
    return { run };
  })();

  const FOOT_YEAR = (() => {
    const run = () => {
      const el = DOC.getElementById("foot-year");
      if (el) el.textContent = new Date().getFullYear();
    };
    return { run };
  })();

  const VISIBILITY = (() => {
    const run = () => {
      DOC.addEventListener("visibilitychange", () => {
        BODY.classList.toggle("is-hidden", DOC.hidden);
      });
    };
    return { run };
  })();

  const KEYBOARD = (() => {
    const run = () => {
      DOC.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          const overlay = $("[data-overlay]");
          if (overlay && overlay.classList.contains("is-open")) return;
        }
        if (e.key.toLowerCase() === "l" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          const target = e.target;
          if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
          LANG.toggle();
        }
      });
    };
    return { run };
  })();

  const boot = () => {
    LANG.init();
    BOOT.run();
    POINTER.start();
    TOPBAR.run();
    OVERLAY.bind();
    SCROLLER.run();
    REVEAL.run();
    FIGURES.run();
    TILT.run();
    MAGNET.run();
    STAGE.run();
    TICKER.run();
    VAULT.run();
    RAIL.run();
    CLOCK.run();
    ASCEND.run();
    CTA_REVEAL.run();
    GLYPHS.run();
    PARALLAX.run();
    SCRAMBLE.run();
    FOOT_YEAR.run();
    VISIBILITY.run();
    KEYBOARD.run();
  };

  if (DOC.readyState === "loading") {
    DOC.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
