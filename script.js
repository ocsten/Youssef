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
  const KEY = "ocsten.lang.v3";

  const dict = {
    en: {
      "masthead.available": "AVAILABLE — 2026",
      "masthead.menu": "INDEX",
      "drawer.title": "INDEX",
      "drawer.location": "LOCATED",
      "drawer.creed": "CREED",
      "drawer.creed.v": "Systems over emotions.",
      "nav.manifesto": "Manifesto",
      "nav.manifesto.cap": "Why language is structure",
      "nav.capabilities": "Capabilities",
      "nav.capabilities.cap": "What gets engineered",
      "nav.work": "Selected Work",
      "nav.work.cap": "Six engagements, six proofs",
      "nav.process": "Process",
      "nav.process.cap": "Audit to autonomy",
      "nav.voices": "Voices",
      "nav.voices.cap": "Words from partners",
      "nav.contact": "Contact",
      "nav.contact.cap": "Open the door",
      "hero.file": "FILE",
      "hero.issue": "ISSUE",
      "hero.role.1": "UX COPYWRITER",
      "hero.role.2": "DIGITAL ARCHITECT",
      "hero.bio.1": "I design the language systems that hold digital products together.",
      "hero.bio.2": "Every interface is a room. Every sentence is a load-bearing wall.",
      "hero.bio.3": "My work is invisible when it succeeds.",
      "hero.creed": "Systems over emotions.",
      "hero.cta.work": "VIEW THE WORK",
      "hero.cta.manifesto": "READ THE MANIFESTO",
      "hero.scroll": "SCROLL",
      "manifesto.chapter": "MANIFESTO",
      "manifesto.side": "DOCTRINE — SIX PRINCIPLES",
      "manifesto.title.a": "Words",
      "manifesto.title.b": "are",
      "manifesto.title.c": "architecture.",
      "manifesto.p1": "I build language systems. Not taglines. Not campaigns. Systems that hold a product together under real conditions.",
      "manifesto.p2": "Precise. Deliberate. Engineered to move people without them noticing the engineering underneath.",
      "doctrine.1.n": "PRECISION OVER DECORATION",
      "doctrine.1.b": "Every word earns its place or it is removed. No ornament survives without function.",
      "doctrine.2.n": "SYSTEMS OVER EMOTIONS",
      "doctrine.2.b": "Structure scales. Feelings fade. A voice system outlives any single campaign.",
      "doctrine.3.n": "SILENCE OVER NOISE",
      "doctrine.3.b": "The best copy is the line you never had to read. Restraint is the highest craft.",
      "doctrine.4.n": "STRUCTURE OVER STYLE",
      "doctrine.4.b": "Tone is adjustable. Architecture is not. Build the frame first, then paint it.",
      "doctrine.5.n": "CLARITY OVER CLEVERNESS",
      "doctrine.5.b": "A clever line is remembered once. A clear line is used a thousand times.",
      "doctrine.6.n": "LONGEVITY OVER TREND",
      "doctrine.6.b": "Trends expire. Systems compound. I build for the version that outlasts me.",
      "capabilities.chapter": "CAPABILITIES",
      "capabilities.side": "SIX DISCIPLINES — ONE SYSTEM",
      "capabilities.title.a": "What gets",
      "capabilities.title.b": "engineered.",
      "capabilities.intro": "Each discipline is a component. Together they form one language engine any team can operate without me in the room.",
      "service.1.n": "UX Copywriting",
      "service.1.b": "Microcopy, flows, empty states and error handling that guide without friction.",
      "service.1.t": "MICROCOPY · FLOWS · ERRORS",
      "service.2.n": "Brand Voice",
      "service.2.b": "A distinct voice system that survives every touchpoint and every writer.",
      "service.2.t": "TONE · LEXICON · GUIDELINES",
      "service.3.n": "Content Systems",
      "service.3.b": "Structured content models that scale across products, platforms and languages.",
      "service.3.t": "MODELS · TAXONOMY · GOVERNANCE",
      "service.4.n": "Digital Architecture",
      "service.4.b": "Information design for products too complex to explain twice.",
      "service.4.t": "IA · NARRATIVE · ONBOARDING",
      "service.5.n": "Product Storytelling",
      "service.5.b": "Narrative arcs that turn features into consequences and decisions.",
      "service.5.t": "NARRATIVE · POSITIONING · LAUNCH",
      "service.6.n": "Language Audits",
      "service.6.b": "A forensic read of your product language, delivered as an actionable map.",
      "service.6.t": "AUDIT · SCORECARD · ROADMAP",
      "work.chapter": "SELECTED WORK",
      "work.entries": "ENTRIES",
      "work.title.a": "Selected",
      "work.title.b": "engagements.",
      "work.filter.all": "ALL",
      "work.filter.voice": "VOICE",
      "work.filter.ux": "UX",
      "work.filter.systems": "SYSTEMS",
      "work.filter.editorial": "EDITORIAL",
      "project.1.n": "Narrative Systems",
      "project.1.d": "A complete voice system for a cross-border payments platform operating in eleven markets.",
      "project.1.m": "FINTECH · 2025",
      "project.2.n": "Interface Poetry",
      "project.2.d": "Rewriting four hundred strings to remove fear from a clinical onboarding flow.",
      "project.2.m": "HEALTH · 2024",
      "project.3.n": "Signal / Noise",
      "project.3.d": "A taxonomy and content model that cut support tickets by a third.",
      "project.3.m": "SAAS · 2024",
      "project.4.n": "The Quiet Grid",
      "project.4.d": "Language foundations for a design system now used by four product teams.",
      "project.4.m": "INFRASTRUCTURE · 2023",
      "project.5.n": "Monochrome",
      "project.5.d": "A restrained editorial voice for a publication that refuses to shout.",
      "project.5.m": "MEDIA · 2023",
      "project.6.n": "Zero State",
      "project.6.d": "Turning a cold start into a guided first minute.",
      "project.6.m": "MARKETPLACE · 2022",
      "work.foot": "Full case studies available under NDA.",
      "figure.1.k": "PROJECTS DELIVERED",
      "figure.2.k": "INDUSTRIES SERVED",
      "figure.3.k": "YEARS OF CRAFT",
      "figure.4.k": "PARTNER RETENTION",
      "process.chapter": "PROCESS",
      "process.side": "FOUR MOVEMENTS",
      "process.title.a": "How the work",
      "process.title.b": "gets built.",
      "stage.1.n": "Audit",
      "stage.1.d": "I read the product, the users, and the silence between them. Nothing is assumed.",
      "stage.2.n": "Architect",
      "stage.2.d": "I design the system that will hold everything together. Hierarchy. Voice. Rules.",
      "stage.3.n": "Write",
      "stage.3.d": "I craft every line with intent, then cut until only intent remains.",
      "stage.4.n": "Refine",
      "stage.4.d": "I test, measure, and sharpen until the system runs without me. Autonomy is the deliverable.",
      "voices.chapter": "VOICES",
      "voices.side": "WORDS FROM PARTNERS",
      "voice.1.q": "He removed half our words and doubled our clarity. The product finally sounds like a product.",
      "voice.1.n": "Product Lead",
      "voice.1.r": "FINTECH PLATFORM · BERLIN",
      "voice.2.q": "The voice system survived three rebrands and two acquisitions. That is the point.",
      "voice.2.n": "Head of Brand",
      "voice.2.r": "INFRASTRUCTURE GROUP · DUBAI",
      "voice.3.q": "Rare to find someone who thinks in systems and still writes like a human being.",
      "voice.3.n": "Founder",
      "voice.3.r": "HEALTH SAAS · PARIS",
      "contact.chapter": "CONTACT",
      "contact.side": "TWO DOORS",
      "contact.title.a": "Let us build",
      "contact.title.b": "something quiet.",
      "contact.lede": "A small number of engagements per year. If your product deserves language that works as hard as its engineering, the door is open.",
      "contact.cta": "OPEN THE DOOR",
      "ledger.1.k": "RESPONSE",
      "ledger.1.v": "Within 48 hours",
      "ledger.2.k": "BASED IN",
      "ledger.2.v": "Algiers — Worldwide",
      "ledger.3.k": "CAPACITY",
      "ledger.3.v": "Limited · 2026",
      "footer.creed": "Systems over emotions.",
      "footer.rights": "All rights reserved.",
      "footer.credit": "Engineered in the dark."
    },
    ar: {
      "masthead.available": "متاح — 2026",
      "masthead.menu": "الفهرس",
      "drawer.title": "الفهرس",
      "drawer.location": "الموقع",
      "drawer.creed": "العقيدة",
      "drawer.creed.v": "الأنظمة قبل المشاعر.",
      "nav.manifesto": "البيان",
      "nav.manifesto.cap": "لماذا اللغة بنية",
      "nav.capabilities": "القدرات",
      "nav.capabilities.cap": "ما يتم هندسته",
      "nav.work": "أعمال مختارة",
      "nav.work.cap": "ستة ارتباطات، ستة براهين",
      "nav.process": "المنهجية",
      "nav.process.cap": "من التدقيق إلى الاستقلالية",
      "nav.voices": "أصوات",
      "nav.voices.cap": "كلمات من الشركاء",
      "nav.contact": "تواصل",
      "nav.contact.cap": "افتح الباب",
      "hero.file": "ملف",
      "hero.issue": "إصدار",
      "hero.role.1": "كاتب تجربة المستخدم",
      "hero.role.2": "المهندس الرقمي",
      "hero.bio.1": "أصمم أنظمة اللغة التي تُمسك المنتجات الرقمية معًا.",
      "hero.bio.2": "كل واجهة غرفة. وكل جملة جدار حامل.",
      "hero.bio.3": "عملي غير مرئي حين ينجح.",
      "hero.creed": "الأنظمة قبل المشاعر.",
      "hero.cta.work": "شاهد الأعمال",
      "hero.cta.manifesto": "اقرأ البيان",
      "hero.scroll": "مرر",
      "manifesto.chapter": "البيان",
      "manifesto.side": "عقيدة — ستة مبادئ",
      "manifesto.title.a": "الكلمات",
      "manifesto.title.b": "هي",
      "manifesto.title.c": "معمارية.",
      "manifesto.p1": "أبني أنظمة لغوية. لا شعارات. لا حملات. أنظمة تمسك المنتج معًا في ظروف حقيقية.",
      "manifesto.p2": "دقيقة. مدروسة. مهندسة لتحريك الناس دون أن يلاحظوا الهندسة تحتها.",
      "doctrine.1.n": "الدقة قبل الزخرفة",
      "doctrine.1.b": "كل كلمة تستحق مكانها أو تُحذف. لا زخرفة تنجو بدون وظيفة.",
      "doctrine.2.n": "الأنظمة قبل المشاعر",
      "doctrine.2.b": "البنية تتوسع. المشاعر تتلاشى. نظام صوتي يعيش أطول من أي حملة.",
      "doctrine.3.n": "الصمت قبل الضجيج",
      "doctrine.3.b": "أفضل نص هو السطر الذي لم تكن مضطرًا لقراءته. الانضباط هو أعلى الحرف.",
      "doctrine.4.n": "البنية قبل الأسلوب",
      "doctrine.4.b": "النبرة قابلة للتعديل. المعمارية لا. ابنِ الإطار أولًا، ثم ارسمه.",
      "doctrine.5.n": "الوضوح قبل الذكاء",
      "doctrine.5.b": "السطر الذكي يُتذكر مرة. السطر الواضح يُستخدم ألف مرة.",
      "doctrine.6.n": "الاستمرارية قبل الصيحة",
      "doctrine.6.b": "الصيحات تنتهي. الأنظمة تتراكم. أبني للنسخة التي تبقى بعدي.",
      "capabilities.chapter": "القدرات",
      "capabilities.side": "ستة تخصصات — نظام واحد",
      "capabilities.title.a": "ما يتم",
      "capabilities.title.b": "هندسته.",
      "capabilities.intro": "كل تخصص مكوّن. معًا يشكّلون محرك لغة واحدًا يمكن لأي فريق تشغيله بدوني في الغرفة.",
      "service.1.n": "كتابة تجربة المستخدم",
      "service.1.b": "نصوص دقيقة، تدفقات، حالات فارغة ومعالجة أخطاء توجه دون احتكاك.",
      "service.1.t": "نصوص · تدفقات · أخطاء",
      "service.2.n": "صوت العلامة",
      "service.2.b": "نظام صوتي مميز ينجو من كل نقطة تواصل وكل كاتب.",
      "service.2.t": "النبرة · المعجم · الإرشادات",
      "service.3.n": "أنظمة المحتوى",
      "service.3.b": "نماذج محتوى منظمة تتوسع عبر المنتجات والمنصات واللغات.",
      "service.3.t": "النماذج · التصنيف · الحوكمة",
      "service.4.n": "المعمارية الرقمية",
      "service.4.b": "تصميم المعلومات للمنتجات المعقدة جدًا لتُشرح مرتين.",
      "service.4.t": "المعمارية · السرد · الإعداد",
      "service.5.n": "سرد المنتج",
      "service.5.b": "أقواس سردية تحول الميزات إلى نتائج وقرارات.",
      "service.5.t": "السرد · التموضع · الإطلاق",
      "service.6.n": "تدقيق اللغة",
      "service.6.b": "قراءة جنائية للغة منتجك، تُسلّم كخريطة قابلة للتنفيذ.",
      "service.6.t": "تدقيق · بطاقة · خارطة",
      "work.chapter": "أعمال مختارة",
      "work.entries": "مدخلات",
      "work.title.a": "ارتباطات",
      "work.title.b": "مختارة.",
      "work.filter.all": "الكل",
      "work.filter.voice": "الصوت",
      "work.filter.ux": "التجربة",
      "work.filter.systems": "الأنظمة",
      "work.filter.editorial": "التحرير",
      "project.1.n": "أنظمة السرد",
      "project.1.d": "نظام صوتي كامل لمنصة مدفوعات عابرة للحدود تعمل في أحد عشر سوقًا.",
      "project.1.m": "تقنية مالية · 2025",
      "project.2.n": "شعر الواجهات",
      "project.2.d": "إعادة كتابة أربعمئة نص لإزالة الخوف من تدفق إعداد سريري.",
      "project.2.m": "صحة · 2024",
      "project.3.n": "إشارة / ضجيج",
      "project.3.d": "تصنيف ونموذج محتوى خفّض تذاكر الدعم بالثلث.",
      "project.3.m": "برمجيات · 2024",
      "project.4.n": "الشبكة الهادئة",
      "project.4.d": "أسس لغوية لنظام تصميم تستخدمه الآن أربعة فرق منتجات.",
      "project.4.m": "بنية تحتية · 2023",
      "project.5.n": "أحادي اللون",
      "project.5.d": "صوت تحريري منضبط لمنشور يرفض الصراخ.",
      "project.5.m": "إعلام · 2023",
      "project.6.n": "الحالة الصفرية",
      "project.6.d": "تحويل البداية الباردة إلى أول دقيقة موجهة.",
      "project.6.m": "سوق · 2022",
      "work.foot": "دراسات الحالة الكاملة متاحة بموجب اتفاقية سرية.",
      "figure.1.k": "مشاريع مُنجزة",
      "figure.2.k": "قطاعات مخدومة",
      "figure.3.k": "سنوات حرفة",
      "figure.4.k": "احتفاظ الشركاء",
      "process.chapter": "المنهجية",
      "process.side": "أربع حركات",
      "process.title.a": "كيف يتم",
      "process.title.b": "بناء العمل.",
      "stage.1.n": "التدقيق",
      "stage.1.d": "أقرأ المنتج والمستخدمين والصمت بينهم. لا شيء مفترض.",
      "stage.2.n": "التعميد",
      "stage.2.d": "أصمم النظام الذي سيمسك كل شيء معًا. التسلسل. الصوت. القواعد.",
      "stage.3.n": "الكتابة",
      "stage.3.d": "أصيغ كل سطر بنية، ثم أقطع حتى تبقى النية فقط.",
      "stage.4.n": "الصقل",
      "stage.4.d": "أختبر وأقيس وأشحذ حتى يعمل النظام بدوني. الاستقلالية هي المُخرَج.",
      "voices.chapter": "أصوات",
      "voices.side": "كلمات من الشركاء",
      "voice.1.q": "أزال نصف كلماتنا وضاعف وضوحنا. المنتج أخيرًا يبدو كمنتج.",
      "voice.1.n": "قائد المنتج",
      "voice.1.r": "منصة تقنية مالية · برلين",
      "voice.2.q": "نجا النظام الصوتي من ثلاث عمليات إعادة تسمية واستحواذين. هذه هي النقطة.",
      "voice.2.n": "رئيس العلامة",
      "voice.2.r": "مجموعة بنية تحتية · دبي",
      "voice.3.q": "نادرًا ما تجد شخصًا يفكر بأنظمة وما زال يكتب كإنسان.",
      "voice.3.n": "مؤسس",
      "voice.3.r": "برمجيات صحية · باريس",
      "contact.chapter": "تواصل",
      "contact.side": "بابان",
      "contact.title.a": "لنبنِ شيئًا",
      "contact.title.b": "هادئًا.",
      "contact.lede": "عدد محدود من الارتباطات سنويًا. إذا كان منتجك يستحق لغة تعمل بجد مثل هندسته، فالباب مفتوح.",
      "contact.cta": "افتح الباب",
      "ledger.1.k": "الرد",
      "ledger.1.v": "خلال 48 ساعة",
      "ledger.2.k": "المقر",
      "ledger.2.v": "الجزائر — عالميًا",
      "ledger.3.k": "السعة",
      "ledger.3.v": "محدود · 2026",
      "footer.creed": "الأنظمة قبل المشاعر.",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.credit": "مصمم ومهندس في الظلام."
    }
  };

  const lang = (() => {
    let current = "en";

    const read = () => {
      try {
        const stored = win.localStorage.getItem(KEY);
        if (stored === "en" || stored === "ar") return stored;
      } catch (_) {}
      const nav = (navigator.language || "en").toLowerCase();
      return nav.startsWith("ar") ? "ar" : "en";
    };

    const write = (l) => {
      try { win.localStorage.setItem(KEY, l); } catch (_) {}
    };

    const paint = (l) => {
      const d = dict[l] || dict.en;
      $$("[data-i18n]").forEach((el) => {
        const k = el.getAttribute("data-i18n");
        const v = d[k];
        if (v === undefined) return;
        el.textContent = v;
      });
      root.setAttribute("lang", l);
      root.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
      root.setAttribute("data-lang", l);
      body.setAttribute("data-lang", l);
      doc.title = l === "ar"
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
      const btn = $("[data-lang-switch]");
      if (btn) btn.addEventListener("click", toggle);
    };

    return { init, toggle, apply, get current() { return current; } };
  })();

  const loader = (() => {
    const run = () => {
      const node = $("[data-loader]");
      if (!node) {
        body.classList.remove("is-booting");
        return;
      }

      const bar = $("[data-loader-bar]", node);
      const count = $("[data-loader-count]", node);
      let progress = 0;

      const tick = () => {
        const delta = (100 - progress) * 0.055 + 0.9;
        progress = Math.min(progress + delta, 100);

        if (count) count.textContent = String(Math.floor(progress)).padStart(3, "0");
        if (bar) bar.style.width = progress + "%";

        if (progress < 100) {
          raf(tick);
        } else {
          win.setTimeout(() => {
            node.classList.add("is-done");
            body.classList.remove("is-booting");
            body.classList.add("is-ready");
            win.setTimeout(() => node.remove(), 1100);
          }, 380);
        }
      };

      win.setTimeout(tick, 260);
    };

    return { run };
  })();

  const cursor = (() => {
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
        rx = lerp(rx, mx, 0.2);
        ry = lerp(ry, my, 0.2);
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

    const destroy = () => {
      if (rafId) caf(rafId);
      running = false;
    };

    return { start, destroy };
  })();

  const masthead = (() => {
    const run = () => {
      const node = $("[data-masthead]");
      if (!node) return;
      let ticking = false;

      const update = () => {
        node.classList.toggle("is-scrolled", win.scrollY > 40);
        ticking = false;
      };

      win.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        raf(update);
      }, { passive: true });

      update();
    };

    return { run };
  })();

  const drawer = (() => {
    let bound = false;

    const bind = () => {
      if (bound) return;
      bound = true;

      const node = $("[data-drawer]");
      const trigger = $("[data-menu-open]");
      if (!node || !trigger) return;

      let y = 0;

      const open = () => {
        y = win.scrollY;
        node.classList.add("is-open");
        node.setAttribute("aria-hidden", "false");
        trigger.setAttribute("aria-expanded", "true");
        root.classList.add("is-locked");
        body.classList.add("is-locked");
        body.style.top = `-${y}px`;
      };

      const close = () => {
        node.classList.remove("is-open");
        node.setAttribute("aria-hidden", "true");
        trigger.setAttribute("aria-expanded", "false");
        root.classList.remove("is-locked");
        body.classList.remove("is-locked");
        body.style.top = "";
        win.scrollTo({ top: y, behavior: "instant" });
      };

      trigger.addEventListener("click", () => {
        node.classList.contains("is-open") ? close() : open();
      });

      $$("[data-menu-close]").forEach((n) => n.addEventListener("click", close));
      $$("[data-menu-link]").forEach((n) => n.addEventListener("click", close));

      doc.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && node.classList.contains("is-open")) close();
      });
    };

    return { bind };
  })();

  const smooth = (() => {
    const run = () => {
      if (RM) return;
      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const href = a.getAttribute("href");
          if (!href || href === "#" || href.length < 2) return;
          const target = doc.getElementById(href.slice(1));
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + win.scrollY - 70;
          win.scrollTo({ top, behavior: "smooth" });
        });
      });
    };
    return { run };
  })();

  const reveal = (() => {
    const run = () => {
      const nodes = $$("[data-reveal]");
      if (!nodes.length) return;

      if (RM || !("IntersectionObserver" in win)) {
        nodes.forEach((n) => n.classList.add("is-live"));
        return;
      }

      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-live");
          obs.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      nodes.forEach((n) => io.observe(n));
    };
    return { run };
  })();

  const counters = (() => {
    const run = () => {
      const nodes = $$("[data-count]");
      if (!nodes.length) return;

      const animate = (el) => {
        const target = parseFloat(el.getAttribute("data-count")) || 0;
        const dur = 1900;
        const start = win.performance.now();

        const step = (now) => {
          const t = clamp((now - start) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - t, 4);
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
      }, { threshold: 0.5 });

      nodes.forEach((n) => io.observe(n));
    };
    return { run };
  })();

  const tilt = (() => {
    let rafId = null;
    let running = false;
    const state = new WeakMap();
    const MAX_DEG = 10;

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
          node.style.transform = `perspective(1200px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg) translateZ(12px)`;
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

  const magnet = (() => {
    const run = () => {
      if (RM || TOUCH) return;
      const nodes = $$("[data-magnetic]");
      if (!nodes.length) return;

      nodes.forEach((node) => {
        let mx = 0, my = 0, tx = 0, ty = 0;
        const strength = 0.32;
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

        win.addEventListener("pointermove", move, { passive: true });
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

  const field = (() => {
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
      const startTime = win.performance.now();

      const buildTargets = () => {
        const off = doc.createElement("canvas");
        const oW = 800;
        const oH = 220;
        off.width = oW;
        off.height = oH;
        const octx = off.getContext("2d");
        octx.fillStyle = "#fff";
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        const size = Math.min(140, oW / 6.2);
        octx.font = `800 ${size}px "Archivo", system-ui, sans-serif`;
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
        const count = Math.min(180, Math.floor((W * H) / 13000));
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.32,
            vy: (Math.random() - 0.5) * 0.32,
            r: Math.random() * 1.5 + 0.3,
            a: Math.random() * 0.5 + 0.15,
            hue: Math.random() > 0.86 ? "gold" : "cyber",
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

      const onPointer = (e) => {
        tpx = (e.clientX / win.innerWidth - 0.5) * 2;
        tpy = (e.clientY / win.innerHeight - 0.5) * 2;
      };

      win.addEventListener("pointermove", onPointer, { passive: true });

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

        if (mode === "float" && targets.length && now - startTime > 3600) {
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
              if (d2 < 12500) {
                const alpha = (1 - d2 / 12500) * 0.11;
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
            const depth = 1 + (i % 9) * 0.055;
            const gx = p.tx + px * 24 * depth;
            const gy = p.ty + py * 16 * depth;

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
        win.removeEventListener("pointermove", onPointer);
        win.removeEventListener("resize", onResize);
      };
    };

    const destroy = () => {
      if (typeof destroyFn === "function") destroyFn();
    };

    return { run, destroy };
  })();

  const ticker = (() => {
    const run = () => {
      const track = $("[data-ticker]");
      if (!track || RM) return;
      let x = 0;
      const speed = 0.55;
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

  const filters = (() => {
    const run = () => {
      const chips = $$("[data-filter]");
      const projects = $$(".project");
      const counter = $("[data-work-count]");
      if (!chips.length || !projects.length) return;

      const refresh = () => {
        if (!counter) return;
        const visible = projects.filter((p) => !p.classList.contains("is-off"));
        counter.textContent = String(visible.length).padStart(2, "0");
      };

      refresh();

      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((c) => c.classList.remove("is-on"));
          chip.classList.add("is-on");
          const tag = chip.getAttribute("data-filter");

          projects.forEach((p) => {
            const match = tag === "*" || p.getAttribute("data-tag") === tag;
            if (match) {
              p.classList.remove("is-off");
            } else {
              p.classList.add("is-off");
            }
          });

          win.setTimeout(refresh, 60);
        });
      });
    };
    return { run };
  })();

  const clock = (() => {
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

  const ascend = (() => {
    const run = () => {
      const btn = $("[data-ascend]");
      if (!btn) return;

      const update = () => {
        btn.classList.toggle("is-live", win.scrollY > win.innerHeight * 0.7);
      };

      win.addEventListener("scroll", update, { passive: true });
      btn.addEventListener("click", () => {
        win.scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
      });

      update();
    };
    return { run };
  })();

  const glyphs = (() => {
    const run = () => {
      if (RM || TOUCH) return;
      const chars = $$(".hero__name .ch");
      if (!chars.length) return;

      let tx = 0, ty = 0, px = 0, py = 0;

      win.addEventListener("pointermove", (e) => {
        tx = (e.clientX / win.innerWidth - 0.5) * 2;
        ty = (e.clientY / win.innerHeight - 0.5) * 2;
      }, { passive: true });

      const state = chars.map((el, i) => ({
        el,
        x: 0,
        y: 0,
        center: (i - (chars.length - 1) / 2) / chars.length
      }));

      const loop = () => {
        px = lerp(px, tx, 0.06);
        py = lerp(py, ty, 0.06);

        state.forEach((s) => {
          const tX = px * 28 * (1 + Math.abs(s.center));
          const tY = py * 18;
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

  const year = (() => {
    const run = () => {
      const el = $("[data-year]");
      if (el) el.textContent = new Date().getFullYear();
    };
    return { run };
  })();

  const visibility = (() => {
    const run = () => {
      doc.addEventListener("visibilitychange", () => {
        body.classList.toggle("is-hidden", doc.hidden);
      });
    };
    return { run };
  })();

  const keyboard = (() => {
    const run = () => {
      doc.addEventListener("keydown", (e) => {
        const t = e.target;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
        if (e.key.toLowerCase() === "l" && !e.metaKey && !e.ctrlKey && !e.altKey) {
          lang.toggle();
        }
      });
    };
    return { run };
  })();

  const boot = () => {
    lang.init();
    loader.run();
    cursor.start();
    masthead.run();
    drawer.bind();
    smooth.run();
    reveal.run();
    counters.run();
    tilt.run();
    magnet.run();
    field.run();
    ticker.run();
    filters.run();
    clock.run();
    ascend.run();
    glyphs.run();
    year.run();
    visibility.run();
    keyboard.run();
  };

  if (doc.readyState === "loading") {
    doc.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
