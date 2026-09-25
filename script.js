/* ============================================================
   OCSTEN — Youssef
   script.js · Ultra-Luxury Interface Runtime
   File 3 of 3 · Engineered for Vercel Static Deployment
   ============================================================ */

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
  const rand = (a, b) => a + Math.random() * (b - a);
  const raf = WIN.requestAnimationFrame.bind(WIN);
  const caf = WIN.cancelAnimationFrame.bind(WIN);

  const REDUCED = WIN.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FINE = WIN.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const COARSE = WIN.matchMedia("(pointer: coarse)").matches;
  const TOUCH = "ontouchstart" in WIN || navigator.maxTouchPoints > 0;

  const STORAGE_KEY = "ocsten.lang";
  const ROOT_ATTR = "data-lang";

  const LEXICON = {
    en: {
      "preloader.label": "Calibrating language architecture",
      "nav.available": "Available — 2026",
      "nav.menu": "Menu",
      "menu.index": "Index",
      "menu.manifesto": "Manifesto",
      "menu.manifesto.sub": "Why language is structure",
      "menu.capabilities": "Capabilities",
      "menu.capabilities.sub": "What is engineered",
      "menu.work": "Selected Work",
      "menu.work.sub": "Six systems, six proofs",
      "menu.process": "Process",
      "menu.process.sub": "Audit to autonomy",
      "menu.voices": "Voices",
      "menu.voices.sub": "What partners say",
      "menu.contact": "Contact",
      "menu.contact.sub": "Open the door",
      "menu.location": "Location",
      "menu.location.value": "Algiers — Worldwide",
      "menu.practice": "Practice",
      "menu.practice.value": "UX Copy · Voice · Architecture",
      "menu.doctrine": "Doctrine",
      "menu.doctrine.value": "Systems over emotions.",
      "hud.status": "SYS.STATUS",
      "hud.time": "LOC.TIME",
      "hud.scroll": "SCROLL.PCT",
      "hud.lang": "LANG",
      "hero.eyebrow": "OCSTEN — YOUSSEF",
      "hero.role": "UX Copywriter & Digital Architect.",
      "hero.tagline": "Systems over emotions.",
      "hero.cta.work": "View the work",
      "hero.cta.doctrine": "Read the doctrine",
      "hero.badge.text": "SYSTEMS OVER EMOTIONS · DIGITAL ARCHITECT · LANGUAGE ENGINEER ·",
      "hero.est": "Est.",
      "hero.craft": "Craft",
      "hero.craft.value": "Copy · Systems",
      "hero.scroll": "SCROLL",
      "marquee.1": "UX Copywriting",
      "marquee.2": "Digital Architecture",
      "marquee.3": "Brand Voice",
      "marquee.4": "Interface Poetry",
      "marquee.5": "Content Systems",
      "marquee.6": "Information Design",
      "manifesto.label": "Manifesto",
      "manifesto.note": "Doctrine · Six principles",
      "manifesto.title.1": "I build",
      "manifesto.title.clarity": "clarity",
      "manifesto.title.2": "out of",
      "manifesto.title.noise": "noise",
      "manifesto.title.3": ".",
      "manifesto.body.1": "Words are architecture. Every interface is a room; every sentence a load-bearing wall. I design the language that holds digital products together — precise, deliberate, engineered to move people without them ever noticing the engineering.",
      "manifesto.body.2": "The work is not decoration. It is structure. It is the quiet system beneath the surface that makes a product feel inevitable.",
      "tenet.1.title": "Precision over decoration",
      "tenet.1.text": "Every word earns its place or it is removed. No ornament survives without function.",
      "tenet.2.title": "Systems over emotions",
      "tenet.2.text": "Structure scales; feelings fade. A voice system outlives any single campaign.",
      "tenet.3.title": "Silence over noise",
      "tenet.3.text": "The best copy is the line you never had to read. Restraint is the highest craft.",
      "tenet.4.title": "Structure over style",
      "tenet.4.text": "Tone is adjustable. Architecture is not. Build the frame first, then paint it.",
      "tenet.5.title": "Clarity over cleverness",
      "tenet.5.text": "A clever line is remembered once. A clear line is used a thousand times.",
      "tenet.6.title": "Longevity over trend",
      "tenet.6.text": "Trends expire. Systems compound. I build for the version of the product that outlasts me.",
      "services.label": "Capabilities",
      "services.note": "Six disciplines · One system",
      "services.title.1": "What gets",
      "services.title.em": "engineered",
      "services.lede": "Each discipline is a component. Together they form a single, self-sustaining language system that any team can operate without me in the room.",
      "service.1.name": "UX Copywriting",
      "service.1.desc": "Microcopy, flows, empty states and error handling that guide without friction.",
      "service.1.tag.1": "Microcopy",
      "service.1.tag.2": "Flows",
      "service.1.tag.3": "Error states",
      "service.2.name": "Brand Voice",
      "service.2.desc": "A distinct, scalable voice system that survives every touchpoint and every writer.",
      "service.2.tag.1": "Tone system",
      "service.2.tag.2": "Lexicon",
      "service.2.tag.3": "Guidelines",
      "service.3.name": "Content Systems",
      "service.3.desc": "Structured content models that scale across products, platforms and languages.",
      "service.3.tag.1": "Content models",
      "service.3.tag.2": "Taxonomy",
      "service.3.tag.3": "Governance",
      "service.4.name": "Digital Architecture",
      "service.4.desc": "Information design and narrative structure for products too complex to explain twice.",
      "service.4.tag.1": "IA",
      "service.4.tag.2": "Narrative",
      "service.4.tag.3": "Onboarding",
      "service.5.name": "Product Storytelling",
      "service.5.desc": "Narrative arcs that turn features into consequences, and consequences into decisions.",
      "service.5.tag.1": "Narrative",
      "service.5.tag.2": "Positioning",
      "service.5.tag.3": "Launch",
      "service.6.name": "Language Audits",
      "service.6.desc": "A forensic read of your existing product language, delivered as an actionable system map.",
      "service.6.tag.1": "Audit",
      "service.6.tag.2": "Scorecard",
      "service.6.tag.3": "Roadmap",
      "work.label": "Selected Work",
      "work.filter.all": "All",
      "work.filter.voice": "Voice",
      "work.filter.ux": "UX",
      "work.filter.systems": "Systems",
      "work.filter.editorial": "Editorial",
      "project.1.name": "Narrative Systems",
      "project.1.meta": "Brand Voice Architecture · Fintech · 2025",
      "project.1.desc": "A complete voice system for a cross-border payments platform operating in eleven markets.",
      "project.2.name": "Interface Poetry",
      "project.2.meta": "UX Microcopy · Health · 2024",
      "project.2.desc": "Rewriting 400+ strings to remove fear from a clinical onboarding flow.",
      "project.3.name": "Signal / Noise",
      "project.3.meta": "Content Strategy · SaaS · 2024",
      "project.3.desc": "A taxonomy and content model that cut support tickets by a third.",
      "project.4.name": "The Quiet Grid",
      "project.4.meta": "Design System · Infrastructure · 2023",
      "project.4.desc": "Language foundations for a design system now used by four product teams.",
      "project.5.name": "Monochrome",
      "project.5.meta": "Editorial Voice · Media · 2023",
      "project.5.desc": "A restrained editorial voice for a publication that refuses to shout.",
      "project.6.name": "Zero State",
      "project.6.meta": "Onboarding System · Marketplace · 2022",
      "project.6.desc": "Turning a cold start into a guided first minute.",
      "work.foot": "More case studies available on request.",
      "stat.1": "Projects shipped",
      "stat.2": "Industries served",
      "stat.3": "Years of craft",
      "stat.4": "Partner retention",
      "process.label": "Process",
      "process.note": "Four movements",
      "process.title.1": "How the work",
      "process.title.em": "gets built",
      "step.1.name": "Audit",
      "step.1.desc": "I read the product, the users, and the silence between them. Nothing is assumed; everything is observed.",
      "step.2.name": "Architect",
      "step.2.desc": "I design the language system that will hold everything together — hierarchy, voice, rules, exceptions.",
      "step.3.name": "Write",
      "step.3.desc": "I craft every line with intent, then cut until only intent remains. The editing is the work.",
      "step.4.name": "Refine",
      "step.4.desc": "I test, measure and sharpen until the system runs without me. Autonomy is the deliverable.",
      "voices.label": "Voices",
      "voices.note": "Selected words from partners",
      "voice.1.quote": "“He removed half our words and doubled our clarity. The product finally sounds like a product.”",
      "voice.1.name": "Product Lead",
      "voice.1.role": "Fintech Platform · Berlin",
      "voice.2.quote": "“The voice system survived three rebrands and two acquisitions. That is the point.”",
      "voice.2.name": "Head of Brand",
      "voice.2.role": "Infrastructure Group · Dubai",
      "voice.3.quote": "“Rare to find someone who thinks in systems and still writes like a human being.”",
      "voice.3.name": "Founder",
      "voice.3.role": "Health SaaS · Paris",
      "contact.label": "Contact",
      "contact.title.1": "Let's build something",
      "contact.title.em": "quietly powerful.",
      "contact.lede": "I take on a small number of engagements per year. If your product deserves language that works as hard as its engineering, the door is below.",
      "contact.cta": "Open the door",
      "contact.meta.response": "Response",
      "contact.meta.response.value": "Within 48 hours",
      "contact.meta.based": "Based in",
      "contact.meta.based.value": "Algiers — Worldwide",
      "contact.meta.engagements": "Engagements",
      "contact.meta.engagements.value": "Limited · 2026",
      "footer.tagline": "Systems over emotions.",
      "footer.nav.manifesto": "Manifesto",
      "footer.nav.services": "Capabilities",
      "footer.nav.work": "Work",
      "footer.nav.process": "Process",
      "footer.nav.contact": "Contact",
      "footer.rights": "All rights reserved.",
      "footer.location": "Algiers — Worldwide",
      "footer.credit": "Designed & engineered in the dark."
    },
    ar: {
      "preloader.label": "تهيئة معمارية اللغة",
      "nav.available": "متاح — 2026",
      "nav.menu": "القائمة",
      "menu.index": "الفهرس",
      "menu.manifesto": "البيان",
      "menu.manifesto.sub": "لماذا اللغة بنية",
      "menu.capabilities": "القدرات",
      "menu.capabilities.sub": "ما يتم هندسته",
      "menu.work": "أعمال مختارة",
      "menu.work.sub": "ستة أنظمة، ستة براهين",
      "menu.process": "المنهجية",
      "menu.process.sub": "من التدقيق إلى الاستقلالية",
      "menu.voices": "أصوات",
      "menu.voices.sub": "ما يقوله الشركاء",
      "menu.contact": "تواصل",
      "menu.contact.sub": "افتح الباب",
      "menu.location": "الموقع",
      "menu.location.value": "الجزائر — عالميًا",
      "menu.practice": "الممارسة",
      "menu.practice.value": "كتابة تجربة المستخدم · الصوت · المعمارية",
      "menu.doctrine": "العقيدة",
      "menu.doctrine.value": "الأنظمة قبل المشاعر.",
      "hud.status": "حالة النظام",
      "hud.time": "التوقيت المحلي",
      "hud.scroll": "نسبة التمرير",
      "hud.lang": "اللغة",
      "hero.eyebrow": "أوكتسن — يوسف",
      "hero.role": "كاتب تجربة المستخدم والمهندس الرقمي.",
      "hero.tagline": "الأنظمة قبل المشاعر.",
      "hero.cta.work": "شاهد الأعمال",
      "hero.cta.doctrine": "اقرأ البيان",
      "hero.badge.text": "الأنظمة قبل المشاعر · المهندس الرقمي · مهندس اللغة ·",
      "hero.est": "التأسيس",
      "hero.craft": "الحرفة",
      "hero.craft.value": "كتابة · أنظمة",
      "hero.scroll": "مرر",
      "marquee.1": "كتابة تجربة المستخدم",
      "marquee.2": "المعمارية الرقمية",
      "marquee.3": "صوت العلامة",
      "marquee.4": "شعر الواجهات",
      "marquee.5": "أنظمة المحتوى",
      "marquee.6": "تصميم المعلومات",
      "manifesto.label": "البيان",
      "manifesto.note": "عقيدة · ستة مبادئ",
      "manifesto.title.1": "أبني",
      "manifesto.title.clarity": "الوضوح",
      "manifesto.title.2": "من",
      "manifesto.title.noise": "الضجيج",
      "manifesto.title.3": ".",
      "manifesto.body.1": "الكلمات معمارية. كل واجهة غرفة؛ وكل جملة جدار حامل. أصمم اللغة التي تُمسك المنتجات الرقمية معًا — دقيقة، مدروسة، مهندسة لتحريك الناس دون أن يلاحظوا الهندسة أبدًا.",
      "manifesto.body.2": "العمل ليس زخرفة. إنه بنية. إنه النظام الهادئ تحت السطح الذي يجعل المنتج يبدو حتميًا.",
      "tenet.1.title": "الدقة قبل الزخرفة",
      "tenet.1.text": "كل كلمة تستحق مكانها أو تُحذف. لا زخرفة تنجو بدون وظيفة.",
      "tenet.2.title": "الأنظمة قبل المشاعر",
      "tenet.2.text": "البنية تتوسع؛ المشاعر تتلاشى. نظام صوتي يعيش أطول من أي حملة.",
      "tenet.3.title": "الصمت قبل الضجيج",
      "tenet.3.text": "أفضل نص هو السطر الذي لم تكن مضطرًا لقراءته. الانضباط هو أعلى الحرف.",
      "tenet.4.title": "البنية قبل الأسلوب",
      "tenet.4.text": "النبرة قابلة للتعديل. المعمارية لا. ابنِ الإطار أولًا، ثم ارسمه.",
      "tenet.5.title": "الوضوح قبل الذكاء",
      "tenet.5.text": "السطر الذكي يُتذكر مرة. السطر الواضح يُستخدم ألف مرة.",
      "tenet.6.title": "الاستمرارية قبل الصيحة",
      "tenet.6.text": "الصيحات تنتهي. الأنظمة تتراكم. أبني للنسخة التي تبقى بعدي.",
      "services.label": "القدرات",
      "services.note": "ستة تخصصات · نظام واحد",
      "services.title.1": "ما يتم",
      "services.title.em": "هندسته",
      "services.lede": "كل تخصص مكوّن. معًا يشكّلون نظامًا لغويًا واحدًا مستدامًا ذاتيًا يمكن لأي فريق تشغيله بدوني في الغرفة.",
      "service.1.name": "كتابة تجربة المستخدم",
      "service.1.desc": "نصوص دقيقة، تدفقات، حالات فارغة ومعالجة أخطاء توجه دون احتكاك.",
      "service.1.tag.1": "نصوص دقيقة",
      "service.1.tag.2": "تدفقات",
      "service.1.tag.3": "حالات الخطأ",
      "service.2.name": "صوت العلامة",
      "service.2.desc": "نظام صوتي مميز وقابل للتوسع ينجو من كل نقطة تواصل وكل كاتب.",
      "service.2.tag.1": "نظام النبرة",
      "service.2.tag.2": "المعجم",
      "service.2.tag.3": "الإرشادات",
      "service.3.name": "أنظمة المحتوى",
      "service.3.desc": "نماذج محتوى منظمة تتوسع عبر المنتجات والمنصات واللغات.",
      "service.3.tag.1": "نماذج المحتوى",
      "service.3.tag.2": "التصنيف",
      "service.3.tag.3": "الحوكمة",
      "service.4.name": "المعمارية الرقمية",
      "service.4.desc": "تصميم المعلومات والبنية السردية للمنتجات المعقدة جدًا لتُشرح مرتين.",
      "service.4.tag.1": "معمارية المعلومات",
      "service.4.tag.2": "السرد",
      "service.4.tag.3": "الإعداد",
      "service.5.name": "سرد المنتج",
      "service.5.desc": "أقواس سردية تحول الميزات إلى نتائج، والنتائج إلى قرارات.",
      "service.5.tag.1": "السرد",
      "service.5.tag.2": "التموضع",
      "service.5.tag.3": "الإطلاق",
      "service.6.name": "تدقيق اللغة",
      "service.6.desc": "قراءة جنائية للغة منتجك الحالية، تُسلّم كخريطة نظام قابلة للتنفيذ.",
      "service.6.tag.1": "تدقيق",
      "service.6.tag.2": "بطاقة الأداء",
      "service.6.tag.3": "خارطة الطريق",
      "work.label": "أعمال مختارة",
      "work.filter.all": "الكل",
      "work.filter.voice": "الصوت",
      "work.filter.ux": "التجربة",
      "work.filter.systems": "الأنظمة",
      "work.filter.editorial": "التحرير",
      "project.1.name": "أنظمة السرد",
      "project.1.meta": "معمارية صوت العلامة · تقنية مالية · 2025",
      "project.1.desc": "نظام صوتي كامل لمنصة مدفوعات عابرة للحدود تعمل في أحد عشر سوقًا.",
      "project.2.name": "شعر الواجهات",
      "project.2.meta": "نصوص تجربة المستخدم · صحة · 2024",
      "project.2.desc": "إعادة كتابة أكثر من 400 نص لإزالة الخوف من تدفق إعداد سريري.",
      "project.3.name": "إشارة / ضجيج",
      "project.3.meta": "استراتيجية المحتوى · برمجيات · 2024",
      "project.3.desc": "تصنيف ونموذج محتوى خفّض تذاكر الدعم بالثلث.",
      "project.4.name": "الشبكة الهادئة",
      "project.4.meta": "نظام تصميم · بنية تحتية · 2023",
      "project.4.desc": "أسس لغوية لنظام تصميم تستخدمه الآن أربعة فرق منتجات.",
      "project.5.name": "أحادي اللون",
      "project.5.meta": "صوت تحريري · إعلام · 2023",
      "project.5.desc": "صوت تحريري منضبط لمنشور يرفض الصراخ.",
      "project.6.name": "الحالة الصفرية",
      "project.6.meta": "نظام إعداد · سوق · 2022",
      "project.6.desc": "تحويل البداية الباردة إلى أول دقيقة موجهة.",
      "work.foot": "المزيد من دراسات الحالة متاحة عند الطلب.",
      "stat.1": "مشاريع منجزة",
      "stat.2": "قطاعات مخدومة",
      "stat.3": "سنوات حرفة",
      "stat.4": "احتفاظ الشركاء",
      "process.label": "المنهجية",
      "process.note": "أربع حركات",
      "process.title.1": "كيف يتم",
      "process.title.em": "بناء العمل",
      "step.1.name": "التدقيق",
      "step.1.desc": "أقرأ المنتج والمستخدمين والصمت بينهم. لا شيء مفترض؛ كل شيء ملاحظ.",
      "step.2.name": "التعميد",
      "step.2.desc": "أصمم النظام اللغوي الذي سيمسك كل شيء معًا — التسلسل، الصوت، القواعد، الاستثناءات.",
      "step.3.name": "الكتابة",
      "step.3.desc": "أصيغ كل سطر بنية، ثم أقطع حتى تبقى النية فقط. التحرير هو العمل.",
      "step.4.name": "الصقل",
      "step.4.desc": "أختبر وأقيس وأشحذ حتى يعمل النظام بدوني. الاستقلالية هي المُخرَج.",
      "voices.label": "أصوات",
      "voices.note": "كلمات مختارة من الشركاء",
      "voice.1.quote": "«أزال نصف كلماتنا وضاعف وضوحنا. المنتج أخيرًا يبدو كمنتج.»",
      "voice.1.name": "قائد المنتج",
      "voice.1.role": "منصة تقنية مالية · برلين",
      "voice.2.quote": "«نجا النظام الصوتي من ثلاث عمليات إعادة تسمية واستحواذين. هذه هي النقطة.»",
      "voice.2.name": "رئيس العلامة",
      "voice.2.role": "مجموعة بنية تحتية · دبي",
      "voice.3.quote": "«نادرًا ما تجد شخصًا يفكر بأنظمة وما زال يكتب كإنسان.»",
      "voice.3.name": "مؤسس",
      "voice.3.role": "برمجيات صحية · باريس",
      "contact.label": "تواصل",
      "contact.title.1": "لنبنِ شيئًا",
      "contact.title.em": "قويًا بهدوء.",
      "contact.lede": "أتولى عددًا محدودًا من الارتباطات سنويًا. إذا كان منتجك يستحق لغة تعمل بجد مثل هندسته، فالباب في الأسفل.",
      "contact.cta": "افتح الباب",
      "contact.meta.response": "الرد",
      "contact.meta.response.value": "خلال 48 ساعة",
      "contact.meta.based": "مقر",
      "contact.meta.based.value": "الجزائر — عالميًا",
      "contact.meta.engagements": "الارتباطات",
      "contact.meta.engagements.value": "محدود · 2026",
      "footer.tagline": "الأنظمة قبل المشاعر.",
      "footer.nav.manifesto": "البيان",
      "footer.nav.services": "القدرات",
      "footer.nav.work": "الأعمال",
      "footer.nav.process": "المنهجية",
      "footer.nav.contact": "تواصل",
      "footer.rights": "جميع الحقوق محفوظة.",
      "footer.location": "الجزائر — عالميًا",
      "footer.credit": "مصمم ومهندس في الظلام."
    }
  };

  /* ============================================================
     LANGUAGE ENGINE
     ============================================================ */
  const Language = (() => {
    let current = "en";
    let onSwitch = null;

    const readStored = () => {
      try {
        const stored = WIN.localStorage.getItem(STORAGE_KEY);
        if (stored === "en" || stored === "ar") return stored;
      } catch (_) {}
      const nav = (navigator.language || "en").toLowerCase();
      return nav.startsWith("ar") ? "ar" : "en";
    };

    const write = (lang) => {
      try { WIN.localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
    };

    const paint = (lang) => {
      const dict = LEXICON[lang];
      if (!dict) return;

      $$("[data-i18n]").forEach((node) => {
        const key = node.getAttribute("data-i18n");
        const value = dict[key];
        if (value === undefined) return;
        if (node.tagName === "TEXTPATH") node.textContent = value;
        else node.textContent = value;
      });

      const hudLang = $("[data-hud-lang]");
      if (hudLang) hudLang.textContent = lang === "ar" ? "AR / EN" : "EN / AR";

      HTML.setAttribute("lang", lang);
      HTML.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
      HTML.setAttribute(ROOT_ATTR, lang);
      BODY.setAttribute(ROOT_ATTR, lang);

      DOC.title = lang === "ar"
        ? "أوكتسن — يوسف · كاتب تجربة المستخدم والمهندس الرقمي"
        : "OCSTEN — Youssef · UX Copywriter & Digital Architect";
    };

    const apply = (lang, silent = false) => {
      current = lang === "ar" ? "ar" : "en";
      paint(current);
      write(current);
      if (!silent && typeof onSwitch === "function") onSwitch(current);
    };

    const toggle = () => apply(current === "en" ? "ar" : "en");

    const init = (opts = {}) => {
      onSwitch = opts.onSwitch || null;
      apply(readStored(), true);

      const btn = $("[data-lang-toggle]");
      if (btn) btn.addEventListener("click", toggle);
    };

    return { init, toggle, apply, get current() { return current; } };
  })();

  /* ============================================================
     PRELOADER
     ============================================================ */
  const Preloader = (() => {
    const ROOTS = ["OCSTEN", "YOUSSEF", "SYSTEMS", "OVER", "EMOTIONS"];

    const run = () => {
      const root = $("[data-preloader]");
      if (!root) {
        BODY.classList.remove("is-loading");
        return;
      }

      const word = $("[data-preloader-word]", root);
      const count = $("[data-preloader-count]", root);
      const fill = $("[data-preloader-fill]", root);

      let idx = 0;
      let progress = 0;
      let wordTimer = null;

      if (word) {
        word.style.transition = "opacity 0.35s cubic-bezier(0.22,1,0.36,1)";
        wordTimer = WIN.setInterval(() => {
          idx = (idx + 1) % ROOTS.length;
          word.style.opacity = "0";
          WIN.setTimeout(() => {
            word.textContent = ROOTS[idx];
            word.style.opacity = "1";
          }, 180);
        }, 520);
      }

      const tick = () => {
        const delta = (100 - progress) * 0.055 + 0.85;
        progress = Math.min(progress + delta, 100);

        if (count) count.textContent = String(Math.floor(progress)).padStart(3, "0");
        if (fill) fill.style.width = progress + "%";

        if (progress < 100) {
          raf(tick);
        } else {
          WIN.setTimeout(() => {
            if (wordTimer) WIN.clearInterval(wordTimer);
            root.classList.add("is-hidden");
            BODY.classList.remove("is-loading");
            BODY.classList.add("is-ready");
            WIN.setTimeout(() => root.remove(), 1100);
          }, 380);
        }
      };

      WIN.setTimeout(tick, 260);
    };

    return { run };
  })();

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  const Cursor = (() => {
    let rafId = null;
    let running = false;

    const start = () => {
      if (!FINE || REDUCED) return;
      const cursor = $("[data-cursor]");
      if (!cursor) return;

      const label = $("[data-cursor-label]", cursor);
      let mx = WIN.innerWidth / 2;
      let my = WIN.innerHeight / 2;
      let rx = mx;
      let ry = my;
      let visible = false;

      const onMove = (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!visible) {
          cursor.style.opacity = "1";
          visible = true;
        }
      };

      const onLeave = () => {
        cursor.style.opacity = "0";
        visible = false;
      };

      WIN.addEventListener("pointermove", onMove, { passive: true });
      DOC.addEventListener("mouseleave", onLeave);

      const loop = () => {
        rx = lerp(rx, mx, 0.18);
        ry = lerp(ry, my, 0.18);
        cursor.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0)`;
        rafId = raf(loop);
      };

      if (!running) {
        running = true;
        loop();
      }

      const attachHover = (root = DOC) => {
        $$("[data-cursor-hover], a, button", root).forEach((node) => {
          if (node.__cursorBound) return;
          node.__cursorBound = true;

          node.addEventListener("pointerenter", () => {
            cursor.classList.add("is-hover");
            const txt = node.getAttribute("data-cursor-text");
            if (label) label.textContent = txt || "";
          });

          node.addEventListener("pointerleave", () => {
            cursor.classList.remove("is-hover");
            if (label) label.textContent = "";
          });
        });
      };

      attachHover();

      Language.init({
        onSwitch: () => {}
      });

      return { attachHover };
    };

    const destroy = () => {
      if (rafId) caf(rafId);
      running = false;
    };

    return { start, destroy };
  })();

  /* ============================================================
     NAVIGATION
     ============================================================ */
  const Nav = (() => {
    const run = () => {
      const nav = $("[data-nav]");
      if (!nav) return;

      let ticking = false;

      const update = () => {
        nav.classList.toggle("is-scrolled", WIN.scrollY > 40);
        ticking = false;
      };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        raf(update);
      };

      WIN.addEventListener("scroll", onScroll, { passive: true });
      update();
    };

    return { run };
  })();

  /* ============================================================
     MENU PANEL
     ============================================================ */
  const Menu = (() => {
    let bound = false;

    const bind = () => {
      if (bound) return;
      bound = true;

      const nav = $("[data-nav]");
      const menu = $("[data-menu]");
      const toggle = $("[data-menu-toggle]");
      if (!menu || !toggle) return;

      let scrollY = 0;

      const open = () => {
        scrollY = WIN.scrollY;
        menu.classList.add("is-open");
        menu.setAttribute("aria-hidden", "false");
        toggle.setAttribute("aria-expanded", "true");
        nav && nav.classList.add("is-menu-open");
        HTML.classList.add("is-locked");
        BODY.classList.add("is-locked");
        BODY.style.top = `-${scrollY}px`;
      };

      const close = () => {
        menu.classList.remove("is-open");
        menu.setAttribute("aria-hidden", "true");
        toggle.setAttribute("aria-expanded", "false");
        nav && nav.classList.remove("is-menu-open");
        HTML.classList.remove("is-locked");
        BODY.classList.remove("is-locked");
        BODY.style.top = "";
        WIN.scrollTo({ top: scrollY, behavior: "instant" });
      };

      toggle.addEventListener("click", () => {
        menu.classList.contains("is-open") ? close() : open();
      });

      $$("[data-menu-close]").forEach((n) => n.addEventListener("click", close));
      $$("[data-menu-link]").forEach((n) => n.addEventListener("click", close));

      DOC.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("is-open")) close();
      });
    };

    return { bind };
  })();

  /* ============================================================
     SMOOTH SCROLL
     ============================================================ */
  const SmoothScroll = (() => {
    const run = () => {
      if (REDUCED) return;

      $$('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");
          if (!id || id === "#" || id.length < 2) return;
          const target = DOC.getElementById(id.slice(1));
          if (!target) return;
          e.preventDefault();
          const top = target.getBoundingClientRect().top + WIN.scrollY - 60;
          WIN.scrollTo({ top, behavior: "smooth" });
        });
      });
    };

    return { run };
  })();

  /* ============================================================
     REVEAL OBSERVER
     ============================================================ */
  const Reveal = (() => {
    const run = () => {
      const nodes = $$("[data-reveal]");
      if (!nodes.length) return;

      if (REDUCED || !("IntersectionObserver" in WIN)) {
        nodes.forEach((n) => n.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      }, {
        threshold: 0.14,
        rootMargin: "0px 0px -6% 0px"
      });

      nodes.forEach((n) => observer.observe(n));
    };

    return { run };
  })();

  /* ============================================================
     COUNTERS
     ============================================================ */
  const Counters = (() => {
    const run = () => {
      const nodes = $$("[data-counter]");
      if (!nodes.length) return;

      if (!("IntersectionObserver" in WIN)) {
        nodes.forEach((n) => {
          n.textContent = n.getAttribute("data-counter");
        });
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target;
          const target = parseFloat(node.getAttribute("data-counter")) || 0;
          const pad = parseInt(node.getAttribute("data-counter-pad"), 10) || 0;
          const duration = 1800;
          const start = WIN.performance.now();

          const step = (now) => {
            const t = clamp((now - start) / duration, 0, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            const value = Math.round(target * eased);
            node.textContent = pad ? String(value).padStart(pad, "0") : String(value);
            if (t < 1) raf(step);
          };

          raf(step);
          obs.unobserve(node);
        });
      }, { threshold: 0.55 });

      nodes.forEach((n) => observer.observe(n));
    };

    return { run };
  })();

  /* ============================================================
     3D TILT — PHYSICS BASED (MOUSE + TOUCH)
     ============================================================ */
  const Tilt = (() => {
    let rafId = null;
    let running = false;
    const state = new WeakMap();

    const bind = (node) => {
      const strength = parseFloat(node.getAttribute("data-tilt-strength")) || 10;
      state.set(node, { rx: 0, ry: 0, trx: 0, try: 0, strength, active: false });

      const onMove = (e) => {
        if (e.pointerType === "touch" && COARSE) return;
        const rect = node.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        const s = state.get(node);
        if (!s) return;
        s.try = nx * s.strength;
        s.trx = -ny * s.strength;
        s.active = true;
        node.style.setProperty("--mx", (e.clientX - rect.left).toFixed(1) + "px");
        node.style.setProperty("--my", (e.clientY - rect.top).toFixed(1) + "px");
      };

      const onLeave = () => {
        const s = state.get(node);
        if (!s) return;
        s.trx = 0;
        s.try = 0;
        s.active = false;
      };

      node.addEventListener("pointermove", onMove, { passive: true });
      node.addEventListener("pointerleave", onLeave);
      node.addEventListener("pointercancel", onLeave);
      node.addEventListener("blur", onLeave);
    };

    const tick = () => {
      state.forEach ? null : null;
    };

    const run = () => {
      if (REDUCED) return;
      const nodes = $$("[data-tilt]");
      if (!nodes.length) return;
      nodes.forEach(bind);

      const loop = () => {
        nodes.forEach((node) => {
          const s = state.get(node);
          if (!s) return;
          const isIdle = !s.active && Math.abs(s.rx) < 0.02 && Math.abs(s.ry) < 0.02;
          if (isIdle) {
            if (node.style.transform) node.style.transform = "";
            return;
          }
          s.rx = lerp(s.rx, s.trx, 0.14);
          s.ry = lerp(s.ry, s.try, 0.14);
          node.style.transform = `perspective(1100px) rotateX(${s.rx.toFixed(2)}deg) rotateY(${s.ry.toFixed(2)}deg)`;
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

  /* ============================================================
     MAGNETIC BUTTONS
     ============================================================ */
  const Magnetic = (() => {
    const run = () => {
      if (REDUCED || COARSE) return;
      const nodes = $$("[data-magnetic]");
      if (!nodes.length) return;

      nodes.forEach((node) => {
        let mx = 0, my = 0, tx = 0, ty = 0;
        const strength = 0.32;
        const radius = 130;

        const onMove = (e) => {
          const rect = node.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const reach = radius + Math.max(rect.width, rect.height) / 2;

          if (dist < reach) {
            tx = dx * strength;
            ty = dy * strength;
          } else {
            tx = 0;
            ty = 0;
          }
        };

        const onLeave = () => {
          tx = 0;
          ty = 0;
        };

        WIN.addEventListener("pointermove", onMove, { passive: true });
        node.addEventListener("pointerleave", onLeave);

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

  /* ============================================================
     PARTICLE CANVAS — MORPHING TEXT FIELD
     ============================================================ */
  const Particles = (() => {
    let rafId = null;
    let destroy = null;

    const run = () => {
      const canvas = DOC.getElementById("particles");
      if (!canvas || REDUCED) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      let W = 0;
      let H = 0;
      let dpr = 1;
      let particles = [];
      let targetPoints = [];
      let pointerX = 0, pointerY = 0;
      let targetPX = 0, targetPY = 0;
      let mode = "float";
      let morph = 0;
      let started = WIN.performance.now();

      const buildTargetPoints = () => {
        const off = DOC.createElement("canvas");
        const oW = 720;
        const oH = 200;
        off.width = oW;
        off.height = oH;
        const octx = off.getContext("2d");
        octx.fillStyle = "#ffffff";
        octx.font = `900 ${Math.min(112, oW / 6.1)}px "Unbounded", system-ui, sans-serif`;
        octx.textAlign = "center";
        octx.textBaseline = "middle";
        octx.fillText("YOUSSEF", oW / 2, oH / 2);

        const data = octx.getImageData(0, 0, oW, oH).data;
        const gap = 5;
        const scale = Math.min(W / oW, H / oH) * 0.72;
        const points = [];

        for (let y = 0; y < oH; y += gap) {
          for (let x = 0; x < oW; x += gap) {
            const i = (y * oW + x) * 4;
            if (data[i + 3] > 128) {
              points.push({
                x: (x - oW / 2) * scale + W / 2,
                y: (y - oH / 2) * scale + H / 2
              });
            }
          }
        }
        targetPoints = points;
      };

      const buildParticles = () => {
        const count = Math.min(170, Math.floor((W * H) / 13500));
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.32,
            vy: (Math.random() - 0.5) * 0.32,
            r: Math.random() * 1.55 + 0.35,
            a: Math.random() * 0.5 + 0.14,
            hue: Math.random() > 0.86 ? "gold" : "cyber",
            tx: 0,
            ty: 0,
            cx: 0,
            cy: 0
          });
        }

        particles.forEach((p, i) => {
          if (targetPoints.length) {
            const tp = targetPoints[i % targetPoints.length];
            p.tx = tp.x;
            p.ty = tp.y;
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
        buildTargetPoints();
        buildParticles();
      };

      const onPointer = (e) => {
        targetPX = (e.clientX / WIN.innerWidth - 0.5) * 2;
        targetPY = (e.clientY / WIN.innerHeight - 0.5) * 2;
      };

      WIN.addEventListener("pointermove", onPointer, { passive: true });

      let resizeTimer = null;
      const onResize = () => {
        if (resizeTimer) WIN.clearTimeout(resizeTimer);
        resizeTimer = WIN.setTimeout(resize, 180);
      };
      WIN.addEventListener("resize", onResize);

      const frame = (now) => {
        ctx.clearRect(0, 0, W, H);

        pointerX = lerp(pointerX, targetPX, 0.05);
        pointerY = lerp(pointerY, targetPY, 0.05);

        if (mode === "float" && targetPoints.length && now - started > 3600) {
          morph = Math.min(morph + 0.0075, 1);
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
            const gx = p.tx + pointerX * 22 * depth;
            const gy = p.ty + pointerY * 16 * depth;

            p.x = lerp(p.x, gx, 0.065);
            p.y = lerp(p.y, gy, 0.065);

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

      destroy = () => {
        if (rafId) caf(rafId);
        WIN.removeEventListener("pointermove", onPointer);
        WIN.removeEventListener("resize", onResize);
      };
    };

    const destroyFn = () => {
      if (typeof destroy === "function") destroy();
    };

    return { run, destroy: destroyFn };
  })();

  /* ============================================================
     MARQUEE
     ============================================================ */
  const Marquee = (() => {
    const run = () => {
      const track = $("[data-marquee]");
      if (!track || REDUCED) return;

      let x = 0;
      const speed = 0.55;
      const baseWidth = track.scrollWidth;
      const half = baseWidth / 2;

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

  /* ============================================================
     WORK FILTERS
     ============================================================ */
  const Filters = (() => {
    const run = () => {
      const buttons = $$("[data-filter]");
      const projects = $$("[data-category]");
      const current = $("[data-work-current]");

      if (!buttons.length || !projects.length) return;

      const refreshCounter = () => {
        if (!current) return;
        const visible = projects.filter((p) => !p.classList.contains("is-hidden"));
        current.textContent = String(visible.length).padStart(2, "0");
      };

      refreshCounter();

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          buttons.forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");
          const cat = btn.getAttribute("data-filter");

          projects.forEach((p) => {
            const match = cat === "all" || p.getAttribute("data-category") === cat;
            if (match) {
              p.classList.remove("is-hidden");
              p.style.opacity = "0";
              p.style.transform = "translateY(14px)";
              raf(() => {
                p.style.transition = "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)";
                p.style.opacity = "1";
                p.style.transform = "translateY(0)";
              });
            } else {
              p.classList.add("is-hidden");
            }
          });

          WIN.setTimeout(refreshCounter, 120);
        });
      });
    };

    return { run };
  })();

  /* ============================================================
     HUD — TIME · SCROLL · STATUS
     ============================================================ */
  const Hud = (() => {
    let timer = null;

    const run = () => {
      const timeNode = $("[data-hud-time]");
      const scrollNode = $("[data-hud-scroll]");
      const statusNode = $("[data-hud-status]");

      if (statusNode) statusNode.textContent = "ONLINE";

      if (timeNode) {
        const tick = () => {
          const now = new Date();
          const h = String(now.getHours()).padStart(2, "0");
          const m = String(now.getMinutes()).padStart(2, "0");
          const s = String(now.getSeconds()).padStart(2, "0");
          timeNode.textContent = `${h}:${m}:${s}`;
        };
        tick();
        timer = WIN.setInterval(tick, 1000);
      }

      if (scrollNode) {
        const update = () => {
          const max = HTML.scrollHeight - WIN.innerHeight;
          const pct = max > 0 ? Math.round((WIN.scrollY / max) * 100) : 0;
          scrollNode.textContent = String(pct).padStart(3, "0") + "%";
        };
        WIN.addEventListener("scroll", update, { passive: true });
        update();
      }
    };

    const destroy = () => {
      if (timer) WIN.clearInterval(timer);
    };

    return { run, destroy };
  })();

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  const ScrollProgress = (() => {
    const run = () => {
      const fill = $("[data-scroll-fill]");
      if (!fill) return;

      let ticking = false;

      const update = () => {
        const max = HTML.scrollHeight - WIN.innerHeight;
        const pct = max > 0 ? (WIN.scrollY / max) * 100 : 0;
        fill.style.width = pct.toFixed(2) + "%";
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

  /* ============================================================
     BACK TO TOP
     ============================================================ */
  const BackToTop = (() => {
    const run = () => {
      const btn = $("[data-back-to-top]");
      if (!btn) return;

      const update = () => {
        btn.classList.toggle("is-visible", WIN.scrollY > WIN.innerHeight * 0.75);
      };

      WIN.addEventListener("scroll", update, { passive: true });

      btn.addEventListener("click", () => {
        WIN.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
      });

      update();
    };

    return { run };
  })();

  /* ============================================================
     CTA REVEAL
     ============================================================ */
  const CtaReveal = (() => {
    const run = () => {
      const cta = $("[data-cta]");
      const contact = DOC.getElementById("contact");
      if (!cta || !contact) return;

      if (!("IntersectionObserver" in WIN)) {
        cta.classList.add("is-visible");
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          cta.classList.add("is-visible");
          obs.disconnect();
        });
      }, { threshold: 0.32 });

      observer.observe(contact);
    };

    return { run };
  })();

  /* ============================================================
     HERO CHARACTER PARALLAX
     ============================================================ */
  const HeroChars = (() => {
    const run = () => {
      if (REDUCED || COARSE) return;
      const chars = $$(".hero__char");
      if (!chars.length) return;

      let tx = 0, ty = 0, px = 0, py = 0;

      WIN.addEventListener("pointermove", (e) => {
        tx = (e.clientX / WIN.innerWidth - 0.5) * 2;
        ty = (e.clientY / WIN.innerHeight - 0.5) * 2;
      }, { passive: true });

      const state = chars.map((node, i) => ({
        node,
        depth: parseFloat(node.getAttribute("data-depth")) || 1,
        x: 0,
        y: 0,
        center: (i - (chars.length - 1) / 2) / chars.length
      }));

      const loop = () => {
        px = lerp(px, tx, 0.065);
        py = lerp(py, ty, 0.065);

        state.forEach((s) => {
          const targetX = px * 26 * s.depth * (1 + Math.abs(s.center));
          const targetY = py * 18 * s.depth;
          s.x = lerp(s.x, targetX, 0.09);
          s.y = lerp(s.y, targetY, 0.09);
          s.node.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0)`;
        });

        raf(loop);
      };

      raf(loop);
    };

    return { run };
  })();

  /* ============================================================
     PARALLAX SCENE
     ============================================================ */
  const ParallaxScene = (() => {
    const run = () => {
      if (REDUCED || COARSE) return;
      const scene = $("[data-parallax-scene]");
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

        layers.forEach((node) => {
          const d = parseFloat(node.getAttribute("data-depth")) || 1;
          node.style.transform = `translate3d(${(px * 12 * d).toFixed(2)}px, ${(py * 8 * d).toFixed(2)}px, 0)`;
        });

        raf(loop);
      };

      raf(loop);
    };

    return { run };
  })();

  /* ============================================================
     YEAR
     ============================================================ */
  const Year = (() => {
    const run = () => {
      const node = DOC.getElementById("year");
      if (node) node.textContent = new Date().getFullYear();
    };

    return { run };
  })();

  /* ============================================================
     PAGE VISIBILITY — FREEZE ANIMATIONS
     ============================================================ */
  const Visibility = (() => {
    const run = () => {
      DOC.addEventListener("visibilitychange", () => {
        if (DOC.hidden) {
          BODY.classList.add("is-paused");
        } else {
          BODY.classList.remove("is-paused");
        }
      });
    };

    return { run };
  })();

  /* ============================================================
     BOOTSTRAP
     ============================================================ */
  const boot = () => {
    Language.init();
    Preloader.run();
    Cursor.start();
    Nav.run();
    Menu.bind();
    SmoothScroll.run();
    Reveal.run();
    Counters.run();
    Tilt.run();
    Magnetic.run();
    Particles.run();
    Marquee.run();
    Filters.run();
    Hud.run();
    ScrollProgress.run();
    BackToTop.run();
    CtaReveal.run();
    HeroChars.run();
    ParallaxScene.run();
    Year.run();
    Visibility.run();
  };

  if (DOC.readyState === "loading") {
    DOC.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
