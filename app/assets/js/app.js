/* Prompt Library — prototype app
   Framework-less. View routing + mood-first builder + fill-in/copy + GSAP motion. */
(function () {
  "use strict";

  var motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var g = window.gsap;

  /* ---- icons ------------------------------------------------ */
  /* the hand-drawn ICON map is gone — Lucide is the icon system now */
  /* ICONS — real Lucide (the set shadcn/ui ships), not hand-drawn paths.
     The app's own short names are kept so every call site stays as it is;
     this maps them onto Lucide's catalogue. Stroke stays at 1.7 to preserve
     the app's existing weight — Lucide's own default is 2. */
  var LUCIDE_NAME = {
    "grid": "layout-grid", "mobile": "smartphone", "wand": "wand-sparkles",
    "copy": "copy", "check": "check", "sun": "sun", "moon": "moon",
    "refresh": "refresh-cw", "download": "download", "file": "file-text",
    "braces": "braces", "list": "list", "image": "image", "sparkle": "sparkles",
    "chevron-right": "chevron-right", "chevron-down": "chevron-down",
    "arrow-left": "arrow-left", "arrow-right": "arrow-right"
  };
  function svg(name, size) {
    var n = LUCIDE_NAME[name] || name, s = size || 20;
    return '<i data-lucide="' + n + '" width="' + s + '" height="' + s + '"></i>';
  }
  function hydrateIcons(scope) {
    (scope || document).querySelectorAll("[data-icon]").forEach(function (n) {
      if (n.dataset.done) return;
      n.innerHTML = svg(n.dataset.icon, n.dataset.size ? +n.dataset.size : 20);
      n.dataset.done = "1";
    });
    /* createIcons swaps every <i data-lucide> for its <svg>, including the
       ones written by the direct svg() calls (stepper ticks, theme thumb) */
    if (window.lucide) lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
  }

  /* ---- contextual phase art (geometric, matches the mono language) --- */
  var ART = {
    kickoff: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="60" cy="38" r="6" class="accf" stroke="none"/><line x1="60" y1="20" x2="60" y2="8"/><line x1="60" y1="56" x2="60" y2="68"/><line x1="42" y1="38" x2="30" y2="38"/><line x1="78" y1="38" x2="90" y2="38"/><line x1="47" y1="25" x2="39" y2="17"/><line x1="73" y1="25" x2="81" y2="17"/><line x1="47" y1="51" x2="39" y2="59"/><line x1="73" y1="51" x2="81" y2="59"/></svg>',
    "design-system": '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="34" y="18" width="16" height="16" rx="4"/><rect x="54" y="18" width="16" height="16" rx="4" class="accs"/><rect x="74" y="18" width="16" height="16" rx="4"/><circle cx="42" cy="52" r="6"/><circle cx="62" cy="52" r="6" class="accf" stroke="none"/><circle cx="82" cy="52" r="6"/></svg>',
    page: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="34" y="14" width="52" height="48" rx="4"/><line x1="34" y1="26" x2="86" y2="26"/><rect x="40" y="32" width="18" height="24" rx="2" class="accs"/><line x1="64" y1="34" x2="80" y2="34"/><line x1="64" y1="42" x2="80" y2="42"/><line x1="64" y1="50" x2="74" y2="50"/></svg>',
    content: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="40" y1="22" x2="80" y2="22" class="accs"/><line x1="40" y1="32" x2="80" y2="32"/><line x1="40" y1="40" x2="72" y2="40"/><line x1="40" y1="48" x2="80" y2="48"/><line x1="40" y1="56" x2="64" y2="56"/></svg>',
    imagery: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="34" y="16" width="52" height="44" rx="4"/><circle cx="49" cy="30" r="4" class="accf" stroke="none"/><path d="M38 54 L54 38 L64 48 L74 40 L82 52"/></svg>',
    build: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M50 26 L38 38 L50 50"/><path d="M70 26 L82 38 L70 50"/><line x1="64" y1="22" x2="56" y2="54" class="accs"/></svg>',
    divi: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="38" y="20" width="18" height="16" rx="3"/><rect x="64" y="20" width="18" height="16" rx="3"/><rect x="38" y="42" width="18" height="16" rx="3" class="accs"/><rect x="64" y="42" width="18" height="16" rx="3"/></svg>',
    qa: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="54" cy="34" r="15"/><line x1="65" y1="45" x2="78" y2="58"/><path d="M47 34 L52 39 L62 29" class="accs"/></svg>',
    deploy: '<svg viewBox="0 0 120 76" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><line x1="60" y1="20" x2="60" y2="52" class="accs"/><path d="M48 32 L60 20 L72 32"/><line x1="42" y1="58" x2="78" y2="58"/></svg>'
  };
  function phaseArt(id) { return ART[id] || ART.page; }

  /* ---- colour utils ---------------------------------------- */
  function rgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c; }).join("");
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  function contrast(hex) {
    var c = rgb(hex); var l = (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) / 255;
    return l > 0.6 ? "#141018" : "#ffffff";
  }
  function alpha(hex, a) { var c = rgb(hex); return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }
  function mix(a, b, amt) {
    var ca = rgb(a), cb = rgb(b);
    return "rgb(" + Math.round(ca[0] + (cb[0] - ca[0]) * amt) + "," +
      Math.round(ca[1] + (cb[1] - ca[1]) * amt) + "," + Math.round(ca[2] + (cb[2] - ca[2]) * amt) + ")";
  }
  function isDark(hex) { var c = rgb(hex); return (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2]) < 128; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ---- state ------------------------------------------------ */
  var state = {
    view: "home",
    step: 0,
    target: null,
    audience: "Businesses",
    positioning: ["Trustworthy", "Minimal"],
    moodId: null,
    tokens: null,
    filter: "All",
    sections: [],
    copyStatus: "Need copy",
    stack: "Static (class-driven)",
    deliverable: "Production build",
    a11y: "WCAG AA",
    genTab: "master",
    lib: { level: "cats", catId: null, promptId: null }
  };
  var STEPS = [
    { key: "client", label: "Client" },
    { key: "target", label: "Target" },
    { key: "audience", label: "Audience" },
    { key: "mood", label: "Mood" },
    { key: "refine", label: "Refine" },
    { key: "content", label: "Content" },
    { key: "tech", label: "Tech" },
    { key: "generate", label: "Generate" }
  ];
  var project = loadProject();

  function loadProject() {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem("pl-project") || "{}"); } catch (e) {}
    var out = {}; for (var k in PROJECT_DEFAULTS) out[k] = PROJECT_DEFAULTS[k];
    for (var j in saved) out[j] = saved[j];
    return out;
  }
  function saveProject() { try { localStorage.setItem("pl-project", JSON.stringify(project)); } catch (e) {} }

  /* ---- theme ------------------------------------------------ */
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    document.getElementById("theme-thumb").innerHTML = svg(t === "dark" ? "moon" : "sun", 13);
    if (window.lucide) lucide.createIcons({ attrs: { "stroke-width": 1.7 } });
    try { localStorage.setItem("pl-theme-lite", t); } catch (e) {}
  }
  function toggleTheme() {
    var cur = document.documentElement.getAttribute("data-theme");
    setTheme(cur === "dark" ? "light" : "dark");
    if (motionOK) g.fromTo("#theme-thumb", { scale: 0.6 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
    if (state.view === "library") renderLibrary(true);
  }

  /* ---- motion helpers -------------------------------------- */
  /* GSAP leaves an inline transform (even `translate(0px,0px)`) when a tween
     finishes. A non-none transform CREATES A STACKING CONTEXT, which traps a
     dropdown's z-index inside its own field — later siblings then paint over
     the open menu. clearProps removes the transform once the motion is done,
     so the only thing left behind is the finished visual state. */
  function reveal(scope) {
    if (!motionOK) return;
    var els = scope.querySelectorAll("[data-reveal]");
    g.set(els, { opacity: 0, y: 18 });
    g.to(els, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power3.out", overwrite: true, clearProps: "transform" });
  }
  function stepIn() {
    if (!motionOK) return;
    var host = document.getElementById("wiz-step");
    g.from(host.children, { opacity: 0, y: 22, duration: 0.5, stagger: 0.04, ease: "power3.out", clearProps: "transform" });
    var cells = host.querySelectorAll("[data-pop]");
    if (cells.length) g.from(cells, { opacity: 0, y: 20, scale: 0.96, duration: 0.5, stagger: 0.035, ease: "back.out(1.4)", delay: 0.05, clearProps: "transform" });
  }

  /* ---- navigation ------------------------------------------ */
  function setNav(view) {
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      a.classList.toggle("is-active", a.dataset.go === view);
    });
  }
  function go(view) {
    var cur = document.querySelector(".view.is-active");
    var next = document.getElementById("view-" + view);
    if (cur === next) { renderView(view); return; }
    if (state.view === "library" && view !== "library") killDemos();
    state.view = view; setNav(view);
    var swap = function () {
      cur.classList.remove("is-active"); g.set(cur, { opacity: 1 });
      next.classList.add("is-active"); window.scrollTo(0, 0);
      renderView(view); reveal(next);
    };
    if (!motionOK) { swap(); return; }
    g.to(cur, { opacity: 0, duration: 0.2, ease: "power2.out", onComplete: swap });
  }
  function renderView(view) {
    if (view === "home") renderHomeCats();
    else if (view === "builder") { renderStepper(); renderStep(); }
    else if (view === "library") renderLibrary();
  }

  /* ---- home ------------------------------------------------- */
  function catCard(cat, reveal) {
    return '<div class="card card--link cat-card" data-cat="' + cat.id + '"' + (reveal ? ' data-reveal' : '') + '>' +
      '<span class="icon-badge" data-icon="' + cat.icon + '"></span>' +
      '<h3>' + cat.name + '</h3>' +
      '<span class="meta">' + cat.count + ' · ' + cat.kind + '</span></div>';
  }
  function renderHomeCats() {
    var el = document.getElementById("home-cats");
    if (!el || el.dataset.done) return;
    el.innerHTML = CATEGORIES.map(function (c) { return catCard(c, true); }).join("");
    el.dataset.done = "1"; hydrateIcons(el);
  }

  /* ---- builder: stepper ------------------------------------ */
  function renderStepper() {
    var el = document.getElementById("wiz-stepper");
    el.innerHTML = STEPS.map(function (s, i) {
      var cls = i === state.step ? "is-active" : (i < state.step ? "is-done" : "");
      var mark = i < state.step ? svg("check", 12) : (i + 1);
      return '<div class="stepper__dot ' + cls + '"><span>' + mark + '</span>' + s.label + '</div>';
    }).join("");
  }

  function renderStep() {
    var host = document.getElementById("wiz-step");
    var key = STEPS[state.step].key;
    if (key === "client") host.innerHTML = viewClient();
    else if (key === "target") host.innerHTML = viewTarget();
    else if (key === "audience") host.innerHTML = viewAudience();
    else if (key === "mood") host.innerHTML = viewMood();
    else if (key === "refine") host.innerHTML = viewRefine();
    else if (key === "content") host.innerHTML = viewContent();
    else if (key === "tech") host.innerHTML = viewTech();
    else if (key === "generate") host.innerHTML = viewGenerate();
    hydrateIcons(host);
    applyTilt(host);
    hydrateTemplates(host);
    renderStepper();
    hydrateIcons();   /* the stepper renders after the first pass — its tick
                         icons need converting too */
    stepIn();
  }
  function nextStep() { if (state.step < STEPS.length - 1) { state.step++; renderStep(); window.scrollTo({ top: 0, behavior: motionOK ? "smooth" : "auto" }); } }
  function backStep() { if (state.step > 0) { state.step--; renderStep(); window.scrollTo({ top: 0, behavior: motionOK ? "smooth" : "auto" }); } }

  function wizFoot(backLabel, nextLabel, nextEnabled, note) {
    return '<div class="wiz-foot">' +
      (backLabel ? '<button class="btn btn--ghost" data-wiz="back"><span data-icon="arrow-left"></span><span>' + backLabel + '</span></button>' : '<span></span>') +
      '<span class="muted">' + (note || "") + '</span>' +
      (nextLabel ? '<button class="btn btn--accent" data-wiz="next"' + (nextEnabled ? '' : ' disabled style="opacity:.4;pointer-events:none"') + '><span>' + nextLabel + '</span><span data-icon="arrow-right"></span></button>' : '<span></span>') +
      '</div>';
  }

  /* ---- step 0: client -------------------------------------- */
  /* These values feed the {tokens} in every generated prompt. They used to be
     seeded with the GreenGarden sample, which is why every brief came out
     talking about a landscaping firm. Now they start empty and this is where
     you set them. */
  function clientRows(list) {
    return list.map(function (f, i) {
      var v = project[f.k] || "";
      var input = f.color
        ? '<div class="field-row"><input type="color" data-client="' + escAttr(f.k) + '" value="' + escAttr(v || f.ph) + '" />' +
          '<input type="text" data-client="' + escAttr(f.k) + '" value="' + escAttr(v) + '" placeholder="' + escAttr(f.ph) + '" /></div>'
        : f.long
          ? '<textarea data-client="' + escAttr(f.k) + '" placeholder="' + escAttr(f.ph) + '">' + esc(v) + '</textarea>'
          : '<input type="text" data-client="' + escAttr(f.k) + '" value="' + escAttr(v) + '" placeholder="' + escAttr(f.ph) + '" />';
      return '<div class="field' + (f.wide ? ' field--wide' : '') + '" data-pop style="--i:' + i + '">' +
        '<label>' + esc(f.label) + '</label>' + input + '</div>';
    }).join("");
  }
  function viewClient() {
    var named = !!(project["Company"] || "").trim();
    return '<div class="step">' +
      '<h2 class="step__title">Who is the client, and what are we making?</h2>' +
      '<p class="step__sub">This is the context every generated prompt is built on. The brief matters most — it is what tells an agent what the thing is <em>for</em>.</p>' +
      '<div class="client-bar" data-pop>' +
        '<span class="muted">' + (named
          ? 'Building for <strong>' + esc(project["Company"]) + '</strong> — every generated prompt uses these.'
          : 'Nothing here yet? Load a worked example to see the shape of it.') + '</span>' +
        '<span class="client-bar__btns">' +
          '<button class="btn btn--ghost" data-client-example><span data-icon="sparkle"></span><span>Load example</span></button>' +
          '<button class="btn btn--ghost" data-client-clear><span>Clear all</span></button>' +
        '</span>' +
      '</div>' +
      '<h3 class="group-label" data-pop>This project</h3>' +
      '<div class="fields-grid">' + clientRows(BRIEF_FIELDS) + '</div>' +
      '<h3 class="group-label" data-pop>The client</h3>' +
      '<div class="fields-grid">' + clientRows(CLIENT_FIELDS) + '</div>' +
      '</div>' +
      wizFoot(null, "Target", named, named ? project["Company"] : "name the client to continue");
  }

  /* ---- step 1: target -------------------------------------- */
  function viewTarget() {
    var opts = TARGETS.map(function (t) {
      var on = state.target === t.id ? " is-on" : "";
      return '<button class="opt' + on + '" data-target="' + t.id + '" data-pop>' +
        '<span class="icon-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" width="19" height="19"><path d="' + t.icon + '"/></svg></span>' +
        '<strong>' + t.label + '</strong><small>' + t.hint + '</small></button>';
    }).join("");
    return '<div class="step">' +
      '<h2 class="step__title">What are we designing?</h2>' +
      '<p class="step__sub">This tailors the whole build — the sections, patterns, and the prompt we generate.</p>' +
      '<div class="opt-grid">' + opts + '</div></div>' +
      wizFoot(null, "Audience", !!state.target, state.target ? "" : "pick a target to continue");
  }

  /* ---- step: audience & positioning ------------------------ */
  function viewAudience() {
    var auds = ["Consumers", "Businesses", "Enterprises", "Developers", "Creators", "Internal teams"];
    var poss = ["Premium", "Approachable", "Bold", "Trustworthy", "Playful", "Minimal", "Innovative"];
    var p = poss.map(function (x) { return '<button class="chip' + (state.positioning.indexOf(x) > -1 ? " is-on" : "") + '" data-pos="' + x + '">' + x + '</button>'; }).join("");
    return '<div class="step">' +
      '<h2 class="step__title">Who is it for?</h2>' +
      '<p class="step__sub">Audience and positioning steer the tone, the copy, and the whole prompt.</p>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">Primary audience</span>' + selectHTML('data-wsel="audience"', state.audience, auds) + '</div>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">Positioning — pick a few</span><div class="chips">' + p + '</div></div>' +
      '</div>' +
      wizFoot("Target", "Design mood", true, state.audience.toLowerCase());
  }

  /* ---- step: content & structure --------------------------- */
  function viewContent() {
    var isApp = ["webapp", "portal", "mobile"].indexOf(state.target) > -1;
    var items = isApp
      ? ["Auth", "Dashboard", "Tables", "Charts", "Forms", "Search", "Settings", "Notifications", "Profile"]
      : ["Hero", "About", "Services", "Features", "Pricing", "Testimonials", "Team", "FAQ", "Contact", "CTA"];
    var sec = items.map(function (x) { return '<button class="chip' + (state.sections.indexOf(x) > -1 ? " is-on" : "") + '" data-sec="' + x + '">' + x + '</button>'; }).join("");
    var copies = ["Have copy", "Need copy", "Placeholder"];
    return '<div class="step">' +
      '<h2 class="step__title">' + (isApp ? "Features & structure" : "Sections & structure") + '</h2>' +
      '<p class="step__sub">Pick what the ' + (isApp ? "product" : "page") + ' includes — it drives the composition and the copy plan.</p>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">' + (isApp ? "Core features" : "Sections") + '</span><div class="chips">' + sec + '</div></div>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">Copy status</span>' + selectHTML('data-wsel="copyStatus"', state.copyStatus, copies) + '</div>' +
      '</div>' +
      wizFoot("Refine", "Tech & delivery", true, state.sections.length + " selected");
  }

  /* ---- step: tech & delivery ------------------------------- */
  function viewTech() {
    var stacks = state.target === "mobile"
      ? ["SwiftUI", "Jetpack Compose", "React Native", "Flutter", "Figma prototype"]
      : ["Static (class-driven)", "React / Next", "Vue / Nuxt", "Tailwind", "Divi / WordPress", "Figma mockup"];
    if (stacks.indexOf(state.stack) < 0) state.stack = stacks[0];
    var delivs = ["Mockup", "Production build", "Design tokens", "Full pipeline"];
    var a11ys = ["WCAG AA", "WCAG AAA", "Basic"];
    return '<div class="step">' +
      '<h2 class="step__title">Tech & delivery</h2>' +
      '<p class="step__sub">The stack, the deliverable, and the bar the build has to clear.</p>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">Stack / output</span>' + selectHTML('data-wsel="stack"', state.stack, stacks) + '</div>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">Deliverable</span>' + selectHTML('data-wsel="deliverable"', state.deliverable, delivs) + '</div>' +
      '<div class="wiz-field" data-pop><span class="wiz-field__label">Accessibility</span>' + selectHTML('data-wsel="a11y"', state.a11y, a11ys) + '</div>' +
      '</div>' +
      wizFoot("Content", "Generate kit", true, state.stack);
  }

  /* ---- token-driven design mockup -------------------------- */
  /* One real mini-UI (nav → hero → CTA → cards) rendered entirely from tokens.
     Reused at two sizes: small in the mood grid, large in the Refine preview.
     Scales via CSS container queries (font-size: cqw), so one component fits both. */
  function mockupVars(t) {
    var rad = RAD[t.radius] != null ? RAD[t.radius] : 12;
    var btnRad = t.radius === "Pill" ? 999 : rad;
    var dark = isDark(t.bg);
    var elev = {
      Flat: "none",
      Subtle: "0 1px 2px " + alpha(t.ink, dark ? 0.55 : 0.05) + ", 0 8px 20px " + alpha(t.ink, dark ? 0.45 : 0.08),
      Raised: "0 2px 5px " + alpha(t.ink, dark ? 0.55 : 0.07) + ", 0 16px 38px " + alpha(t.ink, dark ? 0.55 : 0.15),
      High: "0 4px 9px " + alpha(t.ink, dark ? 0.5 : 0.10) + ", 0 30px 66px " + alpha(t.ink, dark ? 0.7 : 0.22)
    }[t.elevation] || "none";
    var fill = t.gradient === "None" ? t.primary
      : t.gradient === "Subtle" ? "linear-gradient(120deg," + t.primary + "," + mix(t.primary, t.accent, 0.45) + ")"
        : "linear-gradient(120deg," + t.primary + "," + t.accent + ")";
    var media = t.imagery === "Abstract" ? "radial-gradient(130% 125% at 15% 12%," + t.accent + "," + t.primary + " 72%)"
      : t.imagery === "3D" ? "conic-gradient(from 210deg at 65% 30%," + t.accent + "," + t.primary + "," + t.accent + ")"
        : t.imagery === "Illustration" ? "linear-gradient(160deg," + mix(t.primary, t.surface, 0.35) + "," + mix(t.accent, t.surface, 0.32) + ")"
          : "linear-gradient(150deg," + t.accent + "," + mix(t.primary, t.ink, 0.6) + ")"; /* Photo → accent/ink duotone */
    var pad = { Compact: 1.0, Balanced: 1.28, Airy: 1.5 }[t.density] || 1.28;
    return {
      bg: t.bg, surface: t.surface, ink: t.ink, muted: mix(t.ink, t.bg, 0.42), border: alpha(t.ink, dark ? 0.16 : 0.1),
      primary: t.primary, accent: t.accent, fill: fill, on: contrast(t.primary), onAcc: contrast(t.accent),
      rad: rad + "px", btnRad: btnRad + "px", shadow: elev, fd: t.fd, fb: t.fb, pad: pad + "em", media: media
    };
  }
  function renderMockup(t) {
    var v = mockupVars(t);
    var s = "--mk-bg:" + v.bg + ";--mk-surface:" + v.surface + ";--mk-ink:" + v.ink + ";--mk-muted:" + v.muted +
      ";--mk-border:" + v.border + ";--mk-primary:" + v.primary + ";--mk-accent:" + v.accent + ";--mk-fill:" + v.fill +
      ";--mk-on:" + v.on + ";--mk-onacc:" + v.onAcc + ";--mk-rad:" + v.rad + ";--mk-btnrad:" + v.btnRad +
      ";--mk-shadow:" + v.shadow + ";--mk-fd:" + v.fd + ";--mk-fb:" + v.fb + ";--mk-pad:" + v.pad + ";--mk-media:" + v.media;
    return '<div class="mk" style="' + s + '">' +
      '<div class="mk__bar"><div class="mk__brand"><span class="mk__logo"></span><b>' + esc(t.moodName) + '</b></div>' +
      '<div class="mk__nav"><span>Work</span><span>Studio</span><span class="mk__pill">Contact</span></div></div>' +
      '<div class="mk__hero"><h4 class="mk__title">Design that<br>moves people.</h4>' +
      '<p class="mk__sub">A considered system for teams who sweat the details.</p>' +
      '<div class="mk__cta"><span class="mk__btn mk__btn--pri">Start now</span><span class="mk__btn mk__btn--gh">Explore</span></div></div>' +
      '<div class="mk__cards"><div class="mk__card mk__card--media"><div class="mk__media"></div>' +
      '<div class="mk__foot"><span class="mk__lab">Featured work</span><span class="mk__dot"></span></div></div>' +
      '<div class="mk__card"><div class="mk__stat">98%</div><span class="mk__lab">faster to ship</span>' +
      '<div class="mk__chips"><span>New</span><span class="mk__chip2">v2</span></div></div></div>' +
      '</div>';
  }

  /* ---- live template engine -------------------------------- */
  /* One real homepage (template/web.html) themed entirely by CSS variables.
     Same-origin, so we reach into the iframe and set the tokens directly —
     small in the mood grid (scaled), full & interactive in Refine (live). */
  var TPL_W = 1280; /* iframe render width; mood tiles scale down from this */
  function templateVars(t) {
    var dark = isDark(t.bg);
    var rad = RAD[t.radius] != null ? RAD[t.radius] : 12;
    var radLg = rad <= 8 ? rad + 5 : Math.min(rad + 8, 34);
    var e = ({
      Flat: ["none", "none"],
      Subtle: ["0 1px 2px " + alpha(t.ink, dark ? 0.5 : 0.05) + ", 0 12px 30px " + alpha(t.ink, dark ? 0.45 : 0.08),
        "0 2px 6px " + alpha(t.ink, dark ? 0.5 : 0.06) + ", 0 30px 60px " + alpha(t.ink, dark ? 0.55 : 0.12)],
      Raised: ["0 2px 5px " + alpha(t.ink, dark ? 0.5 : 0.07) + ", 0 18px 40px " + alpha(t.ink, dark ? 0.55 : 0.13),
        "0 3px 8px " + alpha(t.ink, dark ? 0.55 : 0.08) + ", 0 40px 80px " + alpha(t.ink, dark ? 0.6 : 0.2)],
      High: ["0 4px 9px " + alpha(t.ink, dark ? 0.5 : 0.1) + ", 0 26px 56px " + alpha(t.ink, dark ? 0.6 : 0.18),
        "0 6px 14px " + alpha(t.ink, dark ? 0.6 : 0.12) + ", 0 50px 100px " + alpha(t.ink, dark ? 0.7 : 0.26)]
    })[t.elevation] || ["none", "none"];
    var fill = t.gradient === "None" ? t.primary
      : t.gradient === "Subtle" ? "linear-gradient(120deg," + t.primary + "," + mix(t.primary, t.accent, 0.42) + ")"
        : "linear-gradient(120deg," + t.primary + "," + t.accent + ")";
    return {
      "--t-bg": t.bg, "--t-surface": t.surface, "--t-surface-2": mix(t.bg, t.ink, dark ? 0.08 : 0.045),
      "--t-ink": t.ink, "--t-muted": mix(t.ink, t.bg, 0.42), "--t-border": alpha(t.ink, dark ? 0.15 : 0.1),
      "--t-primary": t.primary, "--t-on-primary": contrast(t.primary), "--t-accent": t.accent, "--t-fill": fill,
      "--t-font-display": t.fd, "--t-font-body": t.fb, "--t-radius": rad + "px", "--t-radius-lg": radLg + "px",
      "--t-shadow": e[0], "--t-shadow-lg": e[1]
    };
  }
  function motionAttr(m) { return m === "Rich" ? "rich" : (m === "Subtle" ? "subtle" : "minimal"); }
  function applyTpl(frame, t, motionOverride) {
    if (!frame) return;
    var doc; try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc || !doc.documentElement) return;
    var root = doc.documentElement, v = templateVars(t);
    for (var k in v) root.style.setProperty(k, v[k]);
    root.setAttribute("data-motion", motionOverride || motionAttr(t.motion));
  }
  function previewCap(t) {
    return t.theme.toLowerCase() + " theme · " + t.radius.toLowerCase() + " radius · " +
      t.elevation.toLowerCase() + " elevation · " + t.gradient.toLowerCase() + " gradient · " + t.motion.toLowerCase() + " motion";
  }
  function scaleTpl(fr) {
    if (!fr || fr.id === "pv-frame" || !fr.parentElement) return;
    var w = fr.parentElement.clientWidth;
    if (w) fr.style.transform = "scale(" + (w / TPL_W) + ")";
  }
  /* The Refine preview renders at a FIXED desktop viewport and is scaled to
     fit, rather than letting the panel width drive the iframe. A design's
     responsive breakpoints are not what this preview is for — it should show
     the desktop composition the design language actually describes. */
  var PV_W = 1600, PV_H = 1080;
  function scalePv() {
    var fr = document.getElementById("pv-frame"), stage = document.getElementById("pv-stage");
    if (!fr || !stage) return;
    var w = stage.clientWidth;
    if (!w) return;
    var s = w / PV_W;
    fr.style.transform = "scale(" + s + ")";
    var cap = Math.min(window.innerHeight * 0.74, 700);
    stage.style.height = Math.min(PV_H * s, cap) + "px";
  }
  function scaleTplFrames() { document.querySelectorAll(".mood__if").forEach(scaleTpl); scalePv(); }
  /* the panel column settles a frame or two after render (sticky + the pop-in
     animation), so re-measure rather than trusting the first read */
  function scalePvSettled() {
    scalePv();
    requestAnimationFrame(scalePv);
    setTimeout(scalePv, 120);
    setTimeout(scalePv, 400);
  }
  function hydrateTemplates(scope) {
    (scope || document).querySelectorAll(".tpl-frame").forEach(function (fr) {
      var tokens, motion = null;
      /* reference frames render a finished page — never repaint their tokens.
         Only pin the theme and scale the tile down to fit. */
      var refTok = fr.dataset.ref === "1" ? state.tokens
        : (fr.dataset.moodId && (moodById(fr.dataset.moodId) || {}).ref ? deriveTokens(moodById(fr.dataset.moodId)) : null);
      if (refTok) {
        var theme = refTheme(refTok);
        var pin = function () { paintRef(fr, theme); scaleTpl(fr); if (fr.id === "pv-frame") scalePvSettled(); };
        fr.addEventListener("load", pin);
        pin();
        return;
      }
      if (fr.id === "pv-frame") { tokens = state.tokens; }
      else if (fr.dataset.moodId) {
        var m = moodById(fr.dataset.moodId);
        if (m) { tokens = deriveTokens(m); motion = "minimal"; }
      }
      if (!tokens) return;
      var apply = function () {
        applyTpl(fr, tokens, motion); scaleTpl(fr);
        if (fr.id === "pv-frame") { scalePvSettled(); var w = fr.contentWindow, z = function () { try { w.scrollTo(0, 0); } catch (e) {} }; z(); setTimeout(z, 60); setTimeout(z, 280); }
      };
      fr.addEventListener("load", apply);
      try { if (fr.contentDocument && fr.contentDocument.readyState === "complete" && fr.contentDocument.body && fr.contentDocument.body.children.length) apply(); } catch (e) {}
    });
    scaleTplFrames();
    if (document.getElementById("pv-stage")) scalePvSettled();
  }

  /* ---- step 2: mood ---------------------------------------- */
  function moodTile(m) {
    var on = state.moodId === m.id ? " is-on" : "";
    /* a reference mood renders its OWN page; a token mood renders the shared
       template repainted with its tokens */
    var src = m.src || "template/web.html";
    var badge = m.ref ? '<span class="mood__tag">' + esc(m.kind) + '</span>' : "";
    if (m.flag) badge += '<span class="mood__tag mood__tag--flag">🚩 ' + esc(m.flag) + '</span>';
    var sub = m.ref ? m.note : m.vibes.join(" · ").toLowerCase();
    return '<div class="mood' + on + (m.ref ? " mood--ref" : "") + '" data-mood="' + m.id + '" data-pop>' +
      '<div class="mood__pic"><iframe class="mood__if tpl-frame" data-mood-id="' + m.id + '" src="' + src + '" title="' + esc(m.name) + ' preview" scrolling="no" tabindex="-1" aria-hidden="true"></iframe>' +
      badge + '<span class="mood__check" data-icon="check" data-size="12"></span></div>' +
      '<div class="mood__body"><strong style="color:var(--text)">' + esc(m.name) + '</strong><small>' + esc(sub) + '</small></div></div>';
  }
  function moodById(id) { return MOODS.filter(function (m) { return m.id === id; })[0]; }
  function viewMood() {
    var filters = VIBES.map(function (v) {
      return '<button class="chip' + (state.filter === v ? " is-on" : "") + '" data-filter="' + v + '">' + v + '</button>';
    }).join("");
    var list = MOODS.filter(function (m) { return state.filter === "All" || m.vibes.indexOf(state.filter) > -1; });
    var grid = list.map(moodTile).join("") || '<p>No moods in this vibe yet.</p>';
    return '<div class="step">' +
      '<h2 class="step__title">Pick a design mood</h2>' +
      '<p class="step__sub">Start from a look you love — it sets the palette, type, spacing and motion. Filter by vibe, or bring your own.</p>' +
      '<div class="inspo" data-inspo><span class="icon-badge" data-icon="image"></span>' +
      '<div class="inspo__txt"><strong>Bring your own inspiration</strong><small>Upload or paste a screenshot — we read the palette in-browser.</small></div>' +
      '<button class="btn" data-inspo-btn><span data-icon="sparkle"></span><span>Upload</span></button></div>' +
      '<div class="filters">' + filters + '</div>' +
      '<div class="mood-grid">' + grid + '</div></div>' +
      wizFoot("Audience", "Refine style", !!state.moodId, state.moodId ? "" : "select a mood to continue");
  }
  function deriveTokens(m) {
    return {
      moodName: m.name, vibes: m.vibes, bg: m.bg, surface: m.surface, ink: m.ink, primary: m.primary, accent: m.accent,
      fd: m.fd, fb: m.fb, type: m.type,
      theme: m.mode === "both" ? "Both" : (m.mode === "dark" ? "Dark" : "Light"),
      radius: m.radius, elevation: m.elevation, gradient: m.gradient,
      icon: m.icon, imagery: m.imagery, density: m.density, motion: m.motion,
      ref: !!m.ref, src: m.src || null, spec: m.spec || null, kind: m.kind || null, note: m.note || null,
      nativeTheme: m.nativeTheme || "light", credit: m.credit || null, source: m.source || null,
      flag: m.flag || null, flagNote: m.flagNote || null
    };
  }
  /* A reference page owns its own theming (toggle + localStorage + system
     preference), which would make the grid non-deterministic — one tile light,
     the next dark, depending on the visitor's OS. Pin each tile to the
     design's NATIVE theme; in Refine, let the theme segment drive it instead. */
  function refTheme(t) {
    return t.theme === "Dark" ? "dark" : t.theme === "Light" ? "light" : (t.nativeTheme || "light");
  }
  function paintRef(fr, theme) {
    try {
      var doc = fr.contentDocument;
      if (doc && doc.documentElement) doc.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  }

  /* ---- design-language payloads ----------------------------------
     Read the "Prompt payload" fenced block straight out of the spec .md so
     the markdown stays the single source of truth. Cached per spec path.
     Fetched on selection, so it is already in hand by the Generate step. */
  var PAYLOADS = {};
  function payloadFor(spec) {
    if (!spec) return Promise.resolve(null);
    if (PAYLOADS[spec]) return PAYLOADS[spec];
    PAYLOADS[spec] = fetch(spec).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    }).then(function (md) {
      /* the payload is the last fenced block in the file */
      var blocks = md.match(/```[a-z]*\n([\s\S]*?)```/g);
      if (!blocks || !blocks.length) return null;
      return blocks[blocks.length - 1].replace(/^```[a-z]*\n/, "").replace(/```$/, "").trim();
    }).catch(function () { return null; });
    return PAYLOADS[spec];
  }
  function payloadNow(t) { /* synchronous read of an already-resolved payload */
    return (t && t.spec && PAYLOADS[t.spec] && PAYLOADS[t.spec].value) || null;
  }
  function primePayload(t) {
    if (!t || !t.spec) return;
    payloadFor(t.spec).then(function (txt) {
      PAYLOADS[t.spec].value = txt;
      /* if the user is already looking at the output, refresh it */
      if (STEPS[state.step] && STEPS[state.step].key === "generate") renderStep();
    });
  }

  /* ---- step 3: refine -------------------------------------- */
  var PANELS = [
    { key: "theme", label: "Colour · theme", opts: ["Light", "Dark", "Both"] },
    { key: "radius", label: "Shape · radius", opts: ["Sharp", "Subtle", "Soft", "Rounded", "Pill"] },
    { key: "elevation", label: "Elevation", opts: ["Flat", "Subtle", "Raised", "High"] },
    { key: "gradient", label: "Gradient", opts: ["None", "Subtle", "Expressive"] },
    { key: "icon", label: "Iconography", opts: ["Line", "Solid", "Duotone"] },
    { key: "imagery", label: "Imagery", opts: ["Photo", "Illustration", "3D", "Abstract"] },
    { key: "density", label: "Spacing", opts: ["Compact", "Balanced", "Airy"] },
    { key: "motion", label: "Motion", opts: ["Minimal", "Subtle", "Rich"] }
  ];
  var RAD = { Sharp: 3, Subtle: 8, Soft: 14, Rounded: 22, Pill: 40 };
  function panelSeg(p) {
    var buttons = p.opts.map(function (o) {
      return '<button data-seg="' + p.key + '" data-val="' + o + '" class="' + (state.tokens[p.key] === o ? "is-on" : "") + '">' + o + '</button>';
    }).join("");
    return '<div class="panel" data-pop><div class="panel__head"><strong>' + p.label + '</strong></div><div class="seg">' + buttons + '</div></div>';
  }
  function previewInner(t) {
    return renderMockup(t) +
      '<div class="preview__cap">' + t.theme.toLowerCase() + ' theme · ' + t.radius.toLowerCase() + ' radius · ' +
      t.elevation.toLowerCase() + ' elevation · ' + t.gradient.toLowerCase() + ' gradient · ' +
      t.icon.toLowerCase() + ' icons · ' + t.imagery.toLowerCase() + ' imagery</div>';
  }
  function viewRefine() {
    var t = state.tokens;
    var refNote = t.ref
      ? '<div class="panel panel--ref" data-pop><div class="panel__head"><strong>Design language</strong><small>' + esc(t.kind) + '</small></div>' +
        (t.flag ? '<p class="panel__flag">🚩 <strong>' + esc(t.flag) + '</strong> — ' + esc(t.flagNote) + '</p>' : "") +
        '<p class="panel__note">The rule set behind ' + esc(t.moodName) + ' — ' + esc(t.note) + ' — travels into your prompt verbatim. ' +
        'The panels below only re-skin it; they never override the structure.</p>' +
        '<div class="panel__links"><a class="btn btn--sm" href="' + t.src + '" target="_blank" rel="noopener">Open the page</a>' +
        '<a class="btn btn--sm" href="' + t.spec + '" target="_blank" rel="noopener">Read the spec</a></div>' +
        (t.credit ? '<p class="panel__credit">Original design by <a href="' + t.source + '" target="_blank" rel="noopener">' +
          esc(t.credit) + '</a> on Dribbble. This is a study recreation — the credit is theirs.</p>' : "") +
        '</div>'
      : "";
    var palette = '<div class="panel" data-pop><div class="panel__head"><strong>Colour · palette</strong><small>from ' + esc(t.moodName) + '</small></div>' +
      '<div class="swatches"><i style="background:' + t.bg + '"></i><i style="background:' + t.surface + '"></i><i style="background:' + t.primary + '"></i><i style="background:' + t.accent + '"></i><i style="background:' + t.ink + '"></i></div></div>';
    var type = '<div class="panel" data-pop><div class="panel__head"><strong>Typography</strong><small>' + esc(t.type) + '</small></div>' +
      '<div style="font-family:' + t.fd + ';font-size:1.55rem;font-weight:700;letter-spacing:-.02em;line-height:1">Ag <span style="font-family:' + t.fb + ';color:var(--text-muted);font-size:.9rem;font-weight:400;letter-spacing:0">the quick brown fox jumps</span></div></div>';
    var segs = PANELS.map(panelSeg).join("");
    return '<div class="step">' +
      '<h2 class="step__title">Refine your style</h2>' +
      '<p class="step__sub">Everything below came from “' + t.moodName + '.” Tweak anything — it becomes your design-system.json.</p>' +
      '<div class="refine">' +
      '<div class="preview" id="pv" data-pop>' +
      '<div class="preview__stage" id="pv-stage">' +
      '<iframe id="pv-frame" class="tpl-frame"' + (t.ref ? ' data-ref="1"' : '') + ' src="' + (t.src || "template/web.html") + '" title="Live design preview"></iframe></div>' +
      '<div class="preview__cap" id="pv-cap">' + previewCap(t) + ' · ' + PV_W + '×' + PV_H + '</div></div>' +
      '<div class="refine__panels">' + refNote + palette + type + segs + '</div>' +
      '</div></div>' +
      wizFoot("Mood", "Content", true, "theme · " + t.theme.toLowerCase());
  }

  /* ---- step 4: generate ------------------------------------ */
  function buildMaster() {
    var t = state.tokens, tgt = TARGETS.filter(function (x) { return x.id === state.target; })[0];
    var company = project["Company"] || "your brand";
    var pos = state.positioning.length ? state.positioning.join(", ").toLowerCase() : "modern";
    var struct = state.sections.length ? state.sections.join(", ") : "the core sections";
    var themeLine = t.theme === "Both"
      ? "Theme: both — CSS custom properties flipping on prefers-color-scheme + a [data-theme] toggle."
      : "Theme: " + t.theme.toLowerCase() + " only.";
    /* The brief goes FIRST — an agent needs to know what the thing is for
       before it is told what it should look like. Sections are omitted
       entirely when empty rather than emitted as hollow headings. */
    var brief = "";
    var pb = (project["project brief"] || "").trim();
    var pg = (project["primary goal"] || "").trim();
    var pa = (project["must avoid"] || "").trim();
    var who = [ (project["business type"] || "").trim(), (project["what they do"] || "").trim() ].filter(Boolean).join(" — ");
    var serves = (project["who they serve"] || "").trim();
    if (pb || pg || pa || who || serves) {
      brief = "## The brief\n" +
        (pb ? pb + "\n" : "") +
        (pg ? "Primary goal: " + pg + "\n" : "") +
        (pa ? "Must NOT be: " + pa + "\n" : "") +
        (who ? "The client: " + who + ".\n" : "") +
        (serves ? "They serve: " + serves + ".\n" : "") +
        "\n";
    }
    return "Design and build a " + (tgt ? tgt.label.toLowerCase() : "site") + " for " + company + " — " + pos + ", for " + state.audience.toLowerCase() + ".\n\n" +
      brief +
      "## Design direction\n" +
      "Mood: " + t.moodName + " (" + t.vibes.join(", ").toLowerCase() + "). Approach: " + t.density.toLowerCase() + " spacing, " +
      t.radius.toLowerCase() + " corners, " + t.elevation.toLowerCase() + " elevation, " +
      (t.gradient === "None" ? "no gradients" : t.gradient.toLowerCase() + " gradients") + ".\n\n" +
      "## Brand identity\n" + themeLine + "\n" +
      "Colour: primary " + t.primary + ", accent " + t.accent + ". Type: " + t.type + ". Icons: " + t.icon.toLowerCase() +
      ". Imagery: " + t.imagery.toLowerCase() + ".\n\n" +
      "## Structure & content\n" + struct + ". Copy: " + state.copyStatus.toLowerCase() + ".\n\n" +
      "## Motion & interaction\n" + t.motion + " motion via GSAP — reveal-on-scroll, hover micro-interactions; always respect prefers-reduced-motion.\n\n" +
      "## Technical & delivery\n" +
      "Stack: " + state.stack + ". Deliverable: " + state.deliverable.toLowerCase() + ". Accessibility: " + state.a11y + " in " +
      (t.theme === "Both" ? "both themes" : "the " + t.theme.toLowerCase() + " theme") + "; Core Web Vitals green. Ready for 2026." +
      languageBlock(t);
  }
  /* The whole point of the reference library: the rule set goes into the brief
     verbatim, so a downstream agent has no gaps to fill with its own defaults. */
  function languageBlock(t) {
    if (!t.ref) return "";
    var p = payloadNow(t);
    if (!p) return "\n\n## Design language\nLoading " + t.moodName + "'s rule set from " + t.spec + " …";
    return "\n\n---\n\n## Design language — " + t.moodName + " (" + t.kind + ")\n" +
      (t.flag ? "> ⚠ " + t.flag.toUpperCase() + ": " + t.flagNote + "\n\n" : "") +
      "These rules are the brief. Where they conflict with anything above, THEY WIN.\n\n" + p +
      (t.credit ? "\n\n---\n\nRule set extracted from a design by " + t.credit + " — " + t.source +
        "\nThese are structural rules, not a copy of that work: build something new that obeys them." : "");
  }
  function radiusScale(r) { var m = { Sharp: [2, 3, 4], Subtle: [4, 8, 12], Soft: [8, 14, 20], Rounded: [14, 22, 30], Pill: [16, 999, 999] }[r] || [4, 8, 12]; return { sm: m[0], md: m[1], lg: m[2] }; }
  function spaceScale(d) { var base = { Compact: 6, Balanced: 8, Airy: 10 }[d] || 8; return { base: base, scale: [1, 2, 3, 4, 6, 8].map(function (n) { return n * base; }) }; }
  function motionMs(mo) { return { Minimal: 150, Subtle: 320, Rich: 560 }[mo] || 320; }
  function buildJSON() {
    var t = state.tokens, tgt = TARGETS.filter(function (x) { return x.id === state.target; })[0];
    var ramp = { bg: t.bg, text: t.ink, primary: t.primary, accent: t.accent };
    var modes = {};
    if (t.theme === "Both") { modes.light = ramp; modes.dark = { bg: t.ink, text: t.bg, primary: t.accent, accent: t.primary }; }
    else modes[t.theme.toLowerCase()] = ramp;
    return JSON.stringify({
      project: {
        client: project["Company"] || null,
        brief: project["project brief"] || null,
        primaryGoal: project["primary goal"] || null,
        mustAvoid: project["must avoid"] || null,
        target: tgt ? tgt.label : "Site",
        audience: state.audience,
        positioning: state.positioning,
        sections: state.sections.length ? state.sections : "core sections (to define)",
        copy: state.copyStatus,
        stack: state.stack,
        deliverable: state.deliverable,
        accessibility: state.a11y
      },
      designSystem: {
        mood: t.moodName,
        reference: t.ref ? {
          kind: t.kind, signature: t.note, page: t.src, spec: t.spec,
          originalDesign: t.credit ? { by: t.credit, source: t.source, note: "Study recreation — credit belongs to the original designer." } : null,
          rules: (payloadNow(t) || "").split("\n").filter(function (l) { return l.trim(); })
        } : null,
        theme: t.theme,
        modes: modes,
        type: t.type,
        radius: radiusScale(t.radius),
        elevation: t.elevation,
        gradient: t.gradient,
        iconography: t.icon,
        imagery: t.imagery,
        spacing: spaceScale(t.density),
        motion: { feel: t.motion, duration: motionMs(t.motion), reducedMotion: "respected" }
      }
    }, null, 2);
  }
  var SECTION_HINTS = {
    Hero: "one-line promise + a single CTA",
    About: "who you are and why it matters, one paragraph",
    Services: "3-4 cards: title + one line each",
    Features: "benefit-led, scannable, not a spec sheet",
    Pricing: "clear tiers, one highlighted",
    Testimonials: "one strong quote + attribution",
    Team: "names, roles, human photos",
    FAQ: "the five real objections, answered plainly",
    Contact: "one field fewer than you think; clear next step",
    CTA: "restate the promise + the action",
    Auth: "trust + speed; social + email",
    Dashboard: "the one metric that matters, first",
    Tables: "scannable, sortable, empty-state ready",
    Charts: "one insight per chart; label clearly",
    Forms: "inline validation, helpful errors",
    Search: "instant, forgiving; recent + suggestions",
    Settings: "grouped, reversible, sensible defaults",
    Notifications: "actionable, dismissible, not noisy",
    Profile: "identity + the few things they control"
  };
  function buildSEO() {
    var t = state.tokens, tgt = TARGETS.filter(function (x) { return x.id === state.target; })[0];
    var company = project["Company"] || "Brand";
    var label = tgt ? tgt.label.toLowerCase() : "site";
    var pos = state.positioning.length ? state.positioning[0].toLowerCase() : "modern";
    var aud = state.audience.toLowerCase();
    var secs = state.sections.length ? state.sections : ["Hero", "About", "Services", "Contact"];
    var out = [];
    out.push("Meta title (<=60): " + company + " — " + pos + " " + label);
    out.push("Meta description (<=155): A " + pos + " " + label + " for " + aud + ", with a " + t.moodName.toLowerCase() + " look and " + t.motion.toLowerCase() + " motion.");
    out.push("Primary keyword: " + pos + " " + label);
    out.push("Secondary: " + label + " for " + aud + "; " + state.positioning.join(", ").toLowerCase());
    out.push("H1: Built " + pos + ", for " + aud + ".");
    out.push("");
    out.push("Section copy:");
    secs.forEach(function (s) { out.push("- " + s + ": " + (SECTION_HINTS[s] || "concise, on-brand copy for this block")); });
    out.push("");
    out.push("Alt-text: describe each image; " + t.imagery.toLowerCase() + " style, graded to the brand.");
    return out.join("\n");
  }
  function highlight(text) {
    return esc(text)
      .replace(/^(##\s.*)$/gm, '<span class="k">$1</span>')
      .replace(/(&quot;[\w$-]+&quot;)(\s*:)/g, '<span class="k">$1</span>$2');
  }
  function genBody() {
    if (state.genTab === "master") return '<div class="codebox">' + highlight(buildMaster()) + '</div>';
    if (state.genTab === "json") return '<div class="codebox">' + highlight(buildJSON()) + '</div>';
    if (state.genTab === "phases") {
      return '<div class="kit-list">' + WEB_PROMPTS.map(function (p) {
        return '<div class="kit-row"><span><span data-icon="file" data-size="17"></span>' + p.order + ' · ' + p.title + '</span><span data-icon="copy" data-size="16" style="color:var(--text-faint)"></span></div>';
      }).join("") + '</div>';
    }
    return '<div class="codebox">' + highlight(buildSEO()) + '</div>';
  }
  function viewGenerate() {
    var tabs = [["master", "Master prompt"], ["json", "design-system.json"], ["phases", "Phase prompts"], ["seo", "Copy & SEO"]];
    var tabHtml = tabs.map(function (x) {
      return '<button class="chip' + (state.genTab === x[0] ? " is-on" : "") + '" data-tab="' + x[0] + '">' + x[1] + '</button>';
    }).join("");
    var kit = [["file", "master-prompt.md"], ["braces", "design-system.json"], ["list", "phase prompts 00–08 · 9 files"], ["copy", "copy & SEO stubs"]]
      .map(function (k) { return '<div class="kit-row" data-pop><span><span data-icon="' + k[0] + '" data-size="17"></span>' + k[1] + '</span><button class="btn btn--ghost" data-kit="' + k[1] + '"><span data-icon="download" data-size="16"></span></button></div>'; }).join("");
    return '<div class="step">' +
      '<h2 class="step__title">Your kit is ready</h2>' +
      '<p class="step__sub">Generated from ' + state.tokens.moodName + ' + your refinements. Copy or download each piece.</p>' +
      '<div class="tabs">' + tabHtml + '</div>' +
      '<div id="gen-body">' + genBody() + '</div>' +
      '<div class="gen-actions"><button class="btn btn--accent" data-copy-gen><span data-icon="copy"></span><span>Copy</span></button>' +
      '<button class="btn" data-restart><span data-icon="refresh"></span><span>Start over</span></button></div>' +
      '<div class="kit-list">' + kit + '</div></div>' +
      wizFoot("Tech", null, true, "saved as a project");
  }
  function currentGenText() {
    if (state.genTab === "json") return buildJSON();
    if (state.genTab === "phases") return WEB_PROMPTS.map(function (p) { return p.order + " · " + p.title; }).join("\n");
    if (state.genTab === "seo") return buildSEO();
    return buildMaster();
  }

  /* ---- library --------------------------------------------- */
  /* global card/tile treatment: 3D tilt on hover.
     For phase cards, the Zdog model rotates in sync with the tilt. */
  function applyTilt(scope) {
    if (!motionOK) return;
    scope.querySelectorAll(".prompt-card__inner, .mood, .opt, .cat-card").forEach(function (el) {
      if (el._tilt) return; el._tilt = true;
      g.set(el, { transformPerspective: 800, transformOrigin: "center", willChange: "transform" });
      var rx = g.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
      var ry = g.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });
      var sc = g.quickTo(el, "scale", { duration: 0.4, ease: "power2.out" });
      var isCard = el.classList.contains("prompt-card__inner");
      var host = isCard ? el.closest(".prompt-card") : el;
      var illo = isCard && host ? host._illo : null, zx = null, zy = null;
      if (illo) {
        zx = g.quickTo(illo.rotate, "x", { duration: 0.5, ease: "power2.out" });
        zy = g.quickTo(illo.rotate, "y", { duration: 0.5, ease: "power2.out", onUpdate: function () { illo.updateRenderGraph(); } });
      }
      host.addEventListener("mousemove", function (e) {
        var r = host.getBoundingClientRect();
        var yr = (e.clientY - r.top) / r.height - 0.5;
        var xr = (e.clientX - r.left) / r.width - 0.5;
        rx(-yr * 7); ry(xr * 9); sc(1.02);
        if (zx) { zx(ZBASE.x + yr * 0.6); zy(ZBASE.y + xr * 0.9); }
      });
      host.addEventListener("mouseleave", function () {
        rx(0); ry(0); sc(1);
        if (zx) { zx(ZBASE.x); zy(ZBASE.y); }
      });
    });
  }

  /* ---- curated 3D art (Zdog vector 3D, one model per phase) --- */
  /* No constant spin — each model rests in a 3/4 pose and rotates
     in sync with its card's tilt (see applyTilt). */
  var ZBASE = { x: -0.42, y: -0.35 };
  function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
  function buildZdog(scope) {
    var canvases = scope.querySelectorAll("canvas[data-shape]");
    if (!window.Zdog) {
      canvases.forEach(function (cv) { var d = document.createElement("div"); d.className = "prompt-card__art"; d.innerHTML = phaseArt(cv.dataset.shape); cv.parentNode.replaceChild(d, cv); });
      return;
    }
    var ink = cssVar("--ink") || "#16150F", acc = cssVar("--accent") || "#6D28D9", bg = cssVar("--bg") || "#F4F3EE";
    canvases.forEach(function (cv) {
      var illo = new Zdog.Illustration({ element: cv, zoom: 4.2 });
      buildShape(illo, cv.dataset.shape, ink, acc, bg);
      illo.rotate.x = ZBASE.x; illo.rotate.y = ZBASE.y;
      illo.updateRenderGraph();
      var card = cv.closest(".prompt-card"); if (card) card._illo = illo;
    });
  }

  /* ---- animation sample demos (cookbook cards) --------------
     Each demo is a small looping GSAP timeline that IS the effect
     the recipe teaches. CSS-var colours, so they theme-adapt. */
  var demoTimelines = [];
  function killDemos() { demoTimelines.forEach(function (t) { t.kill(); }); demoTimelines = []; if (detailTl) { detailTl.kill(); detailTl = null; } }
  var DEMOS = {
    reveal: function (c, o) {
      o = o || {}; var st = o.stagger != null ? o.stagger : 0.16;
      c.innerHTML = '<div class="d-bars"><i class="d-bar"></i><i class="d-bar acc"></i><i class="d-bar"></i></div>';
      var b = c.querySelectorAll(".d-bar");
      var tl = g.timeline({ repeat: -1, repeatDelay: 0.3, paused: true });
      tl.to(b, { opacity: 0, duration: 0.25, stagger: st * 0.6, ease: "power1.in" });
      tl.set(b, { y: 16 });
      tl.to(b, { opacity: 1, y: 0, duration: 0.55, stagger: st, ease: "power3.out" }, "+=0.1");
      return tl;
    },
    stagger: function (c) {
      var h = ""; for (var i = 0; i < 9; i++) h += '<i class="d-dot' + (i === 4 ? " acc" : "") + '"></i>';
      c.innerHTML = '<div class="d-grid">' + h + '</div>';
      var d = c.querySelectorAll(".d-dot");
      var tl = g.timeline({ repeat: -1, repeatDelay: 0.3, paused: true });
      tl.to(d, { scale: 0, duration: 0.3, ease: "power2.in", stagger: { each: 0.04, grid: [3, 3], from: "edges" } });
      tl.to(d, { scale: 1, duration: 0.4, ease: "back.out(2)", stagger: { each: 0.05, grid: [3, 3], from: "center" } }, "+=0.15");
      return tl;
    },
    pin: function (c) {
      c.innerHTML = '<div class="d-track"><i class="d-fill"></i></div>';
      var tl = g.timeline({ repeat: -1, yoyo: true, paused: true });
      tl.fromTo(c.querySelector(".d-fill"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "none" });
      return tl;
    },
    parallax: function (c, o) {
      o = o || {}; var back = o.back != null ? o.back : 18, front = o.front != null ? o.front : 11;
      c.innerHTML = '<div class="d-layers"><i class="d-layer d-back"></i><i class="d-layer d-front"></i></div>';
      var tl = g.timeline({ repeat: -1, yoyo: true, paused: true });
      tl.fromTo(c.querySelector(".d-back"), { x: -back }, { x: back, duration: 1.6, ease: "sine.inOut" }, 0);
      tl.fromTo(c.querySelector(".d-front"), { x: front }, { x: -front, duration: 1.6, ease: "sine.inOut" }, 0);
      return tl;
    },
    transition: function (c, o) {
      c.innerHTML = '<div class="d-stage"><i class="d-panel a"></i><i class="d-panel b"></i></div>';
      var a = c.querySelector(".d-panel.a"), b = c.querySelector(".d-panel.b");
      o = o || {}; var d = o.dur != null ? o.dur : 0.5;
      g.set(b, { xPercent: 110, opacity: 0 });
      var tl = g.timeline({ repeat: -1, repeatDelay: 0.35, paused: true });
      tl.to(a, { xPercent: -34, opacity: 0, duration: d, ease: "power2.in" });
      tl.to(b, { xPercent: 0, opacity: 1, duration: d, ease: "power3.out" }, "-=" + (d * 0.6));
      tl.to(b, { xPercent: -34, opacity: 0, duration: d, ease: "power2.in" }, "+=0.5");
      tl.set(a, { xPercent: 0, opacity: 1 });
      tl.set(b, { xPercent: 110, opacity: 0 });
      return tl;
    },
    marquee: function (c) {
      var h = ""; for (var i = 0; i < 8; i++) h += '<i class="d-chip' + (i % 4 === 1 ? " acc" : "") + '"></i>';
      c.innerHTML = '<div class="d-mask"><div class="d-track2">' + h + '</div></div>';
      var tl = g.timeline({ repeat: -1, paused: true });
      tl.fromTo(c.querySelector(".d-track2"), { xPercent: 0 }, { xPercent: -50, duration: 3, ease: "none" });
      return tl;
    },
    magnetic: function (c, o) {
      o = o || {}; var a = o.amt != null ? o.amt : 16;
      c.innerHTML = '<div class="d-btn"><i></i></div>';
      var btn = c.querySelector(".d-btn");
      var tl = g.timeline({ repeat: -1, repeatDelay: 0.25, paused: true });
      tl.to(btn, { x: a, y: -a * 0.6, duration: 0.5, ease: "power2.out" });
      tl.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      tl.to(btn, { x: -a * 0.85, y: a * 0.55, duration: 0.5, ease: "power2.out" }, "+=0.15");
      tl.to(btn, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
      return tl;
    },
    draw: function (c, o) {
      o = o || {}; var d = o.dur != null ? o.dur : 1.0;
      c.innerHTML = '<svg class="d-svg" viewBox="0 0 96 60"><path class="acc" d="M10 36 L32 52 L56 14 L86 28"/></svg>';
      var p = c.querySelector("path"), len = 120;
      try { len = p.getTotalLength(); } catch (e) {}
      g.set(p, { strokeDasharray: len, strokeDashoffset: 0 });
      var tl = g.timeline({ repeat: -1, repeatDelay: 0.3, paused: true });
      tl.to(p, { strokeDashoffset: len, duration: d * 0.65, ease: "power2.in" });
      tl.to(p, { strokeDashoffset: 0, duration: d, ease: "power2.out" }, "+=0.2");
      return tl;
    },
    lenis: function (c) {
      var h = ""; for (var i = 0; i < 6; i++) h += '<i class="d-line' + (i === 1 ? " acc" : "") + '" style="width:' + (100 - (i % 3) * 22) + '%"></i>';
      c.innerHTML = '<div class="d-scroll"><div class="d-scroll-inner">' + h + '</div></div>';
      var tl = g.timeline({ repeat: -1, yoyo: true, paused: true });
      tl.fromTo(c.querySelector(".d-scroll-inner"), { y: 4 }, { y: -34, duration: 1.9, ease: "power2.inOut" });
      return tl;
    }
  };
  function buildDemos(scope) {
    scope.querySelectorAll(".prompt-card__demo[data-demo]").forEach(function (c) {
      var fn = DEMOS[c.dataset.demo]; if (!fn) return;
      var tl = fn(c); if (!tl) return;
      demoTimelines.push(tl);
      tl.pause(0);
      if (!motionOK) return;
      var card = c.closest(".prompt-card");
      if (card) {
        card.addEventListener("mouseenter", function () { tl.play(); });
        card.addEventListener("mouseleave", function () { tl.pause(0); });
      }
    });
  }

  /* ---- animation live preview (recipe detail page) --------- */
  var detailTl = null, detailRebuildTimer = null;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function demoParams(id) {
    var n = function (k, d) { var v = defaultVal(k); var m = v ? /(-?\d+(?:\.\d+)?)/.exec(v) : null; return m ? parseFloat(m[1]) : d; };
    if (id === "a-reveal") return { stagger: clamp(n("0.08", 0.08), 0.02, 0.4) };
    if (id === "a-parallax") return { back: clamp(n("0.5x", 0.5), 0.1, 1) * 34, front: clamp(n("1.1x", 1.1), 0.1, 1.5) * 13 };
    if (id === "a-transition") return { dur: clamp(n("0.4", 0.4), 0.2, 1.1) };
    if (id === "a-magnetic") return { amt: clamp(n("0.3x", 0.3), 0.1, 1) * 46 };
    if (id === "a-draw") return { dur: clamp(n("1.2", 1.2), 0.5, 2.4) };
    return {};
  }
  function buildDetailPreview() {
    if (detailTl) { detailTl.kill(); detailTl = null; }
    var c = document.querySelector(".detail-demo");
    if (!c || !c.dataset.demo || !DEMOS[c.dataset.demo]) return;
    detailTl = DEMOS[c.dataset.demo](c, demoParams(state.lib.promptId));
    if (!detailTl) return;
    if (motionOK) detailTl.play(); else detailTl.pause(0);
  }
  function scheduleDetailPreview() { clearTimeout(detailRebuildTimer); detailRebuildTimer = setTimeout(buildDetailPreview, 170); }

  function buildShape(illo, id, ink, acc, bg) {
    var Z = window.Zdog, TAU = Z.TAU, add = function (C, o) { o.addTo = illo; return new Z[C](o); };
    if (id === "kickoff") {
      add("Shape", { stroke: 13, color: acc });
      [[16,0,0],[-16,0,0],[0,16,0],[0,-16,0],[0,0,16],[0,0,-16]].forEach(function (p) { add("Shape", { translate: { x: p[0], y: p[1], z: p[2] }, stroke: 6, color: ink }); });
    } else if (id === "design-system") {
      [-16,0,16].forEach(function (x, i) { add("Box", { width: 12, height: 12, depth: 12, translate: { x: x }, stroke: 1, color: i === 1 ? acc : ink }); });
    } else if (id === "page") {
      add("Box", { width: 32, height: 24, depth: 3, translate: { z: -5, x: -5, y: -3 }, stroke: 1, color: ink });
      add("Box", { width: 28, height: 20, depth: 3, translate: { z: 5, x: 5, y: 4 }, stroke: 1, color: acc });
    } else if (id === "content") {
      add("Box", { width: 30, height: 38, depth: 3, stroke: 1, color: ink });
      [-9,-2,5].forEach(function (y, i) { add("Shape", { path: [{ x: -9, y: y }, { x: 9, y: y }], translate: { z: 2 }, stroke: 2.4, color: i === 0 ? acc : bg }); });
    } else if (id === "imagery") {
      add("Box", { width: 34, height: 26, depth: 3, stroke: 1, color: ink });
      add("Shape", { translate: { x: -8, y: -6, z: 2 }, stroke: 8, color: acc });
      add("Shape", { path: [{ x: -13, y: 8 }, { x: -3, y: -2 }, { x: 5, y: 6 }, { x: 13, y: -1 }], translate: { z: 2 }, stroke: 2.2, color: bg, closed: false });
    } else if (id === "build") {
      add("Box", { width: 24, height: 24, depth: 24, stroke: 1, color: ink, frontFace: acc });
    } else if (id === "divi") {
      [[-9,-9],[9,-9],[-9,9],[9,9]].forEach(function (p, i) { add("Box", { width: 14, height: 14, depth: 8, translate: { x: p[0], y: p[1] }, stroke: 1, color: i === 2 ? acc : ink }); });
    } else if (id === "qa") {
      add("Ellipse", { diameter: 24, stroke: 4, color: ink, translate: { x: -3, y: -3 } });
      add("Shape", { path: [{ x: 8, y: 8 }, { x: 19, y: 19 }], stroke: 5, color: acc });
    } else if (id === "deploy") {
      add("Cylinder", { diameter: 7, length: 18, color: ink, rotate: { x: TAU / 4 }, translate: { y: 8 } });
      add("Cone", { diameter: 16, length: 13, color: acc, rotate: { x: -TAU / 4 }, translate: { y: -8 } });
    } else if (id === "flows") {
      add("Shape", { translate: { x: -15, y: 9 }, stroke: 11, color: ink });
      add("Shape", { translate: { x: 15, y: 9 }, stroke: 11, color: ink });
      add("Shape", { translate: { x: 0, y: -13 }, stroke: 11, color: acc });
      add("Shape", { path: [{ x: 0, y: -13 }, { x: -15, y: 9 }], stroke: 2, color: ink });
      add("Shape", { path: [{ x: 0, y: -13 }, { x: 15, y: 9 }], stroke: 2, color: ink });
      add("Shape", { path: [{ x: -15, y: 9 }, { x: 15, y: 9 }], stroke: 2, color: ink });
    } else if (id === "device") {
      add("Box", { width: 22, height: 40, depth: 7, stroke: 3, color: ink });
      add("Shape", { translate: { x: 0, y: -14, z: 4 }, stroke: 3, color: acc });
    } else if (id === "layers") {
      [-9, 0, 9].forEach(function (z, i) { add("Box", { width: 30, height: 22, depth: 2, translate: { z: z, y: -z * 0.5 }, stroke: 1, color: i === 1 ? acc : ink }); });
    } else if (id === "wave") {
      [{ x: -24, y: 7 }, { x: -12, y: -5 }, { x: 0, y: -9 }, { x: 12, y: -5 }, { x: 24, y: 7 }].forEach(function (p, i) { add("Shape", { translate: { x: p.x, y: p.y }, stroke: 8, color: i === 2 ? acc : ink }); });
    } else {
      add("Box", { width: 22, height: 22, depth: 22, stroke: 1, color: ink });
    }
  }

  function renderLibrary(skipIntro) {
    killDemos();
    var host = document.getElementById("lib-content");
    var L = state.lib;
    if (L.level === "cats") host.innerHTML = libCats();
    else if (L.level === "workflow") host.innerHTML = libWorkflow();
    else host.innerHTML = libDetail();
    hydrateIcons(host);
    if (L.level === "workflow") { buildZdog(host); buildDemos(host); }
    else if (L.level === "detail") buildDetailPreview();
    applyTilt(host);
    if (!skipIntro && motionOK) {
      g.from(host.children, { opacity: 0, y: 18, duration: 0.5, stagger: 0.06, ease: "power3.out" });
      if (L.level === "workflow") g.from(host.querySelectorAll(".prompt-card"), { opacity: 0, y: 26, scale: 0.97, duration: 0.55, stagger: 0.05, ease: "back.out(1.3)", delay: 0.12 });
    }
  }
  function libCats() {
    return '<div class="section-head"><div><p class="eyebrow">Library</p><h2>Browse the library</h2><p>Guided pipelines and recipes — grab one and fill in the blanks.</p></div></div>' +
      '<div class="cat-grid">' + CATEGORIES.map(function (c) { return catCard(c, false); }).join("") + '</div>';
  }
  function libWorkflow() {
    var cat = CATEGORIES.filter(function (c) { return c.id === state.lib.catId; })[0];
    if (!cat || !cat.prompts.length) {
      return '<p class="eyebrow" style="cursor:pointer" data-lib-back>&larr; Library</p><div class="section-head"><div><h2>' + (cat ? cat.name : "") + '</h2><p>This pipeline is coming next — the schema and shell are ready for it.</p></div></div>';
    }
    var isDemo = cat.kind === "cookbook";
    var rows = cat.prompts.map(function (p) {
      var tags = p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("");
      var art = isDemo
        ? '<div class="prompt-card__demo" data-demo="' + p.id.replace("a-", "") + '"></div>'
        : '<canvas class="prompt-card__art" data-shape="' + (p.shape || p.id) + '" width="320" height="236"></canvas>';
      return '<div class="prompt-card" data-prompt="' + p.id + '" data-pop><div class="prompt-card__inner">' +
        '<div class="prompt-card__visual"><span class="prompt-card__num">' + p.order + '</span>' + art + '</div>' +
        '<div class="prompt-card__body"><strong>' + p.title + '</strong><small>' + p.purpose + '</small><div class="prompt-card__tags">' + tags + '</div></div>' +
        '</div></div>';
    }).join("");
    return '<p class="eyebrow" style="cursor:pointer" data-lib-back>&larr; Library</p>' +
      '<div class="section-head"><div><h2>' + cat.name + ' — ' + cat.subtitle + '</h2><p>' + cat.blurb + '</p></div></div>' +
      '<div class="workflow-list">' + rows + '</div>';
  }
  function tokensOf(tpl) {
    var out = [], seen = {}, m, re = /\{([^}]+)\}/g;
    while ((m = re.exec(tpl))) { if (!seen[m[1]]) { seen[m[1]] = 1; out.push(m[1]); } }
    return out;
  }
  function tplWithPills(tpl) {
    return esc(tpl).replace(/\{([^}]+)\}/g, function (_, k) { return '<span class="token-pill">{' + esc(k) + '}</span>'; });
  }
  function fillPreview(tpl) {
    return esc(tpl).replace(/\{([^}]+)\}/g, function (_, k) {
      var v = defaultVal(k);
      return v ? '<span class="fill">' + esc(v) + '</span>' : '<span class="token-pill">{' + esc(k) + '}</span>';
    });
  }
  function filledText(tpl) { return tpl.replace(/\{([^}]+)\}/g, function (_, k) { return defaultVal(k) || "{" + k + "}"; }); }
  var EASES = ["power2.out", "power3.out", "power2.inOut", "power4.out", "back.out(1.7)", "back.out(1.4)", "elastic.out(1, 0.5)", "expo.out", "circ.out", "none", "[0.22,1,0.36,1]"];
  var FIELDS = {
    "animation library": { label: "Animation library", type: "select", options: ["GSAP", "Motion", "Anime.js", "GSAP + ScrollTrigger"], def: "GSAP" },
    "smooth-scroll library": { label: "Smooth-scroll library", type: "select", options: ["Lenis", "Locomotive Scroll", "native scroll"], def: "Lenis" },
    "transition tech": { label: "Transition tech", type: "select", options: ["Motion", "View Transitions API", "GSAP Flip"], def: "Motion" },
    "power3.out": { label: "Easing", type: "select", options: EASES, def: "power3.out" },
    "back.out(1.4)": { label: "Easing", type: "select", options: EASES, def: "back.out(1.4)" },
    "elastic.out": { label: "Easing", type: "select", options: EASES, def: "elastic.out(1, 0.5)" },
    "power2.inOut": { label: "Easing", type: "select", options: EASES, def: "power2.inOut" },
    "[0.22,1,0.36,1]": { label: "Easing", type: "select", options: EASES, def: "[0.22,1,0.36,1]" },
    "scroll / enter": { label: "Trigger", type: "select", options: ["scroll", "enter", "load", "hover"], def: "scroll" },
    "0.08": { label: "Stagger (s)" },
    "80%": { label: "Trigger point (viewport)" },
    "1.2": { label: "Duration (s)" },
    "0.4": { label: "Duration (s)" },
    "0.5x": { label: "Background speed" },
    "1.1x": { label: "Foreground speed" },
    "0.3x": { label: "Pull strength" },
    "0.15x": { label: "Label follow" },
    "1.5x": { label: "Scrub distance" },
    "a 40px": { label: "Magnet radius", placeholder: "e.g. 40px" },
    "serif/sans": { label: "Type style", type: "select", options: ["serif", "sans", "serif + sans", "mono"], def: "serif" },
    "light/dark/both": { label: "Theme", type: "select", options: ["light", "dark", "both"], def: "both" },
    "display font": { label: "Display font", type: "select", options: ["Fraunces", "Space Grotesk", "Playfair Display", "Clash Display", "Inter"], def: "Fraunces" },
    "body font": { label: "Body font", type: "select", options: ["Inter", "Work Sans", "Source Sans 3", "IBM Plex Sans"], def: "Inter" },
    "brand colour": { label: "Brand colour", type: "color", def: "#1B4332" },
    "accent colour": { label: "Accent colour", type: "color", def: "#B9A16B" },
    "max width": { label: "Desktop max-width", type: "range", unit: "px", def: "1800px", min: 960, max: 2400, step: 20 },
    "8px": { label: "Base spacing", type: "range", unit: "px", def: "8px", min: 2, max: 16, step: 1 },
    "44px": { label: "Touch target", type: "range", unit: "px", def: "44px", min: 32, max: 64, step: 2 },
    "24px": { label: "Icon grid", type: "range", unit: "px", def: "24px", min: 16, max: 40, step: 2 },
    "feeling": { label: "Brand feeling", type: "select", options: ["elegant", "bold", "playful", "minimal", "editorial", "premium"], def: "elegant" },
    "voice": { label: "Voice", type: "select", options: ["elegant, plain-spoken", "bold, punchy", "warm, human", "technical, precise"], def: "elegant, plain-spoken" },
    "class prefix": { label: "Class prefix", placeholder: "e.g. ggis-" },
    "reveal class": { label: "Reveal trigger class", placeholder: "e.g. ggis-reveal" },
    "2026": { label: "Target year", type: "select", options: ["2025", "2026", "2027"], def: "2026" },
    "home": { label: "First page", type: "select", options: ["home", "landing", "about", "product"], def: "home" },
    "platform": { label: "Platform", type: "select", options: ["cross-platform", "iOS", "Android", "iOS + Android"], def: "cross-platform" },
    "iOS/Android": { label: "Target OS", type: "select", options: ["iOS", "Android", "iOS + Android"], def: "iOS + Android" },
    "line/solid/duotone": { label: "Icon style", type: "select", options: ["line", "solid", "duotone"], def: "line" },
    "SwiftUI / Compose / React Native / Flutter": { label: "Mobile stack", type: "select", options: ["SwiftUI", "Jetpack Compose", "React Native", "Flutter"], def: "SwiftUI" },
    "HIG/Material": { label: "Platform guidelines", type: "select", options: ["Apple HIG", "Material 3", "both"], def: "Apple HIG" },
    "Company": { label: "Company", placeholder: "Company name" },
    "App": { label: "App name", placeholder: "App name" },
    "business type": { label: "Business type", placeholder: "e.g. landscaping firm" },
    "who they serve": { label: "Who they serve", placeholder: "target customers" },
    "what they do": { label: "What they do", type: "textarea", placeholder: "one line on what they do" },
    "brand values": { label: "Brand values", type: "textarea", placeholder: "comma-separated values" },
    "keyword": { label: "Primary keyword", placeholder: "e.g. landscaping Malaysia" },
    "location": { label: "Location", placeholder: "e.g. Klang Valley" }
  };
  function humanLabel(k) { return k.charAt(0).toUpperCase() + k.slice(1); }
  function autoType(k, val) {
    var opts = k.split("/").map(function (s) { return s.trim(); }).filter(Boolean);
    if (opts.length > 1 && opts.length <= 6 && k.replace(/\s/g, "").length <= 46) return "select";
    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val)) return "color";
    if (/^(-?\d+(?:\.\d+)?)\s*(px|%|s|ms|x|deg|em|rem)?$/.test(String(val).trim())) return "range";
    if (isLong(k)) return "textarea";
    return "text";
  }
  function defaultVal(k) {
    var v = project[k];
    if (v != null && v !== "") return v;
    if (FIELDS[k] && FIELDS[k].def != null) return FIELDS[k].def;
    if (/^-?\d/.test(k) || /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(k)) return k;
    return "";
  }
  function isLong(k) { return k === "what they do" || k === "brand values" || k === "section list" || k === "who they serve"; }
  function escAttr(s) { return esc(String(s)).replace(/"/g, "&quot;"); }
  function round1(n) { return Math.round(n * 10) / 10; }
  function rangeSpec(num, unit) {
    if (unit === "%") return { min: 0, max: 100, step: 5 };
    if (unit === "deg") return { min: 0, max: 360, step: 5 };
    if (unit === "s") return { min: 0, max: Math.max(2, round1(num * 2)), step: 0.05 };
    if (unit === "ms") return { min: 0, max: Math.max(500, Math.round(num * 2)), step: 10 };
    if (unit === "x") return { min: 0, max: Math.max(2, round1(num * 2)), step: 0.1 };
    if (unit === "px" || unit === "em" || unit === "rem") return { min: 0, max: Math.max(unit === "px" ? 64 : 4, Math.round(num * 2)), step: num > 100 ? 10 : 1 };
    if (num > 0 && num < 5) return { min: 0, max: Math.max(1, round1(num * 3)), step: 0.01 };
    return { min: 0, max: Math.max(10, Math.round(num * 2)), step: 1 };
  }
  function selectHTML(dataAttr, value, options) {
    var os = options.map(function (o) {
      return '<button type="button" class="ui-select__opt" role="option" aria-selected="' + (value === o ? "true" : "false") + '" data-val="' + escAttr(o) + '"><span>' + esc(o) + '</span><span class="chk" data-icon="check" data-size="15"></span></button>';
    }).join("");
    return '<div class="ui-select" ' + dataAttr + '>' +
      '<button type="button" class="ui-select__trigger" data-ui-select-trigger aria-haspopup="listbox" aria-expanded="false"><span class="ui-select__value">' + esc(value) + '</span><span class="ui-select__chev" data-icon="chevron-down" data-size="16"></span></button>' +
      '<div class="ui-select__menu" role="listbox" hidden>' + os + '</div></div>';
  }
  function smartInput(k) {
    var cfg = FIELDS[k] || {};
    var val = defaultVal(k);
    var lab = '<label>' + esc(cfg.label || humanLabel(k)) + '</label>';
    var type = cfg.type || autoType(k, val);
    if (type === "select") {
      var options = cfg.options ? cfg.options.slice() : k.split("/").map(function (s) { return s.trim(); }).filter(Boolean);
      if (val && options.indexOf(val) < 0) options.unshift(val);
      return lab + selectHTML('data-token="' + escAttr(k) + '"', val, options);
    }
    if (type === "color") {
      var cv = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val) ? val : "#888888";
      return lab + '<div class="field-row"><input type="color" data-token="' + escAttr(k) + '" value="' + cv + '"><span class="field-out">' + esc(val || cv) + '</span></div>';
    }
    if (type === "range") {
      var m = /^(-?\d+(?:\.\d+)?)\s*(px|%|s|ms|x|deg|em|rem)?$/.exec(String(val).trim());
      var num = m ? parseFloat(m[1]) : 0;
      var unit = cfg.unit != null ? cfg.unit : (m ? (m[2] || "") : "");
      var r = (cfg.min != null) ? { min: cfg.min, max: cfg.max, step: cfg.step } : rangeSpec(num, unit);
      return lab + '<div class="field-row"><input type="range" data-token="' + escAttr(k) + '" data-unit="' + unit + '" min="' + r.min + '" max="' + r.max + '" step="' + r.step + '" value="' + num + '"><span class="field-out">' + esc(val || (num + unit)) + '</span></div>';
    }
    if (type === "textarea") return lab + '<textarea data-token="' + escAttr(k) + '" placeholder="' + escAttr(cfg.placeholder || "") + '">' + esc(val) + '</textarea>';
    return lab + '<input type="text" data-token="' + escAttr(k) + '" value="' + escAttr(val) + '" placeholder="' + escAttr(cfg.placeholder || "") + '" />';
  }
  function libDetail() {
    var cat = CATEGORIES.filter(function (c) { return c.id === state.lib.catId; })[0];
    var p = cat.prompts.filter(function (x) { return x.id === state.lib.promptId; })[0];
    var toks = tokensOf(p.template);
    var fields = toks.map(function (k) {
      var wide = (FIELDS[k] && FIELDS[k].type === "textarea") || isLong(k);
      return '<div class="field' + (wide ? ' field--wide' : '') + '">' + smartInput(k) + '</div>';
    }).join("");
    var isAnim = p.id.indexOf("a-") === 0;
    var animPreview = isAnim ? '<div class="detail-preview"><span class="wiz-field__label" style="text-align:left">Live preview — adjust the values</span><div class="prompt-card__demo detail-demo" data-demo="' + p.id.replace("a-", "") + '"></div></div>' : '';
    var ddHtml = p.dos.map(function (d) { return '<span class="do">Do — ' + esc(d) + '</span>'; }).join("") +
      p.donts.map(function (d) { return '<span class="dont">Don\'t — ' + esc(d) + '</span>'; }).join("");
    return '<p class="eyebrow" style="cursor:pointer" data-detail-back>&larr; ' + cat.name + '</p>' +
      '<div class="section-head" style="margin-top:14px"><div><h2>' + p.order + ' · ' + p.title + '</h2><p>' + p.purpose + '</p>' +
      '<div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap">' + p.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join("") + '</div></div></div>' +
      animPreview +
      '<div class="detail-split">' +
      '<div class="prompt-doc"><div class="prompt-doc__head"><span class="eyebrow">Prompt</span>' +
      '<div class="prompt-doc__actions"><button class="btn btn--accent" data-copy-filled><span data-icon="copy"></span><span>Copy filled</span></button>' +
      '<button class="btn" data-copy-tpl><span data-icon="file"></span><span>Copy template</span></button></div></div>' +
      '<div class="detail__tpl" id="fill-out">' + fillPreview(p.template) + '</div>' +
      '<div class="dd">' + ddHtml + '</div></div>' +
      '<div class="prompt-form"><div class="prompt-form__head"><h4>Fill in the blanks</h4><span class="saved" data-icon="check" data-size="12"></span></div>' +
      '<p style="font-size:.78rem;color:var(--text-faint);margin:2px 0 0">Values save across every prompt — pick from the dropdowns and sliders.</p>' +
      '<div class="fields-grid">' + fields + '</div></div>' +
      '</div>';
  }

  /* ---- copy + toast ---------------------------------------- */
  function toast(msg) {
    var t = document.getElementById("toast");
    document.getElementById("toast-msg").textContent = msg;
    if (!motionOK) { g.set(t, { xPercent: -50, yPercent: 0 }); setTimeout(function () { g.set(t, { yPercent: 200 }); }, 1500); return; }
    g.killTweensOf(t);
    g.fromTo(t, { yPercent: 200 }, { yPercent: 0, duration: 0.4, ease: "back.out(1.7)" });
    g.to(t, { yPercent: 200, duration: 0.35, delay: 1.7, ease: "power2.in" });
  }
  function copy(text, msg) {
    var done = function () { toast(msg || "Copied"); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, function () { legacyCopy(text); done(); });
    else { legacyCopy(text); done(); }
  }
  function legacyCopy(text) {
    var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta);
  }

  /* ---- events ---------------------------------------------- */
  function toggleMulti(arr, val) { var i = arr.indexOf(val); if (i > -1) arr.splice(i, 1); else arr.push(val); }
  function sib(el, attr) { el.parentNode.querySelectorAll("[data-" + attr + "]").forEach(function (x) { x.classList.toggle("is-on", x === el); }); }
  document.addEventListener("click", function (e) {
    var uTrig = e.target.closest("[data-ui-select-trigger]");
    if (uTrig) { toggleSelect(uTrig.closest(".ui-select")); return; }
    var uOpt = e.target.closest(".ui-select__opt");
    if (uOpt) { chooseOption(uOpt); return; }
    closeAllSelects();
    var t = e.target.closest("[data-go],[data-cat],[data-target],[data-mood],[data-filter],[data-aud],[data-pos],[data-sec],[data-copy],[data-stack],[data-deliv],[data-a11y],[data-seg],[data-tab],[data-wiz],[data-prompt],[data-lib-back],[data-detail-back],[data-copy-filled],[data-copy-tpl],[data-copy-gen],[data-restart],[data-kit],[data-inspo-btn],[data-inspo],[data-client-example],[data-client-clear]");
    if (!t) return;

    if (t.dataset.go) { e.preventDefault(); go(t.dataset.go); return; }
    if (t.hasAttribute("data-cat")) {
      var cid = t.dataset.cat; state.lib = { level: "workflow", catId: cid, promptId: null };
      if (state.view !== "library") go("library"); else renderLibrary(); return;
    }
    if (t.dataset.target) {
      state.target = t.dataset.target;
      document.querySelectorAll("[data-target]").forEach(function (o) { o.classList.toggle("is-on", o === t); });
      if (motionOK) g.fromTo(t, { scale: 0.94 }, { scale: 1, duration: 0.35, ease: "back.out(2)" });
      setTimeout(nextStep, 220); return;
    }
    if (t.dataset.mood) {
      state.moodId = t.dataset.mood;
      state.tokens = deriveTokens(moodById(t.dataset.mood));
      primePayload(state.tokens);   /* fetch the design-language block now */
      document.querySelectorAll("[data-mood]").forEach(function (o) { o.classList.toggle("is-on", o === t); });
      if (motionOK) g.fromTo(t, { scale: 0.93 }, { scale: 1, duration: 0.4, ease: "back.out(2)" });
      setTimeout(nextStep, 260); return;
    }
    if (t.dataset.filter) { state.filter = t.dataset.filter; renderStep(); return; }
    if (t.dataset.aud) { state.audience = t.dataset.aud; sib(t, "aud"); return; }
    if (t.dataset.pos) { toggleMulti(state.positioning, t.dataset.pos); t.classList.toggle("is-on"); return; }
    if (t.dataset.sec) { toggleMulti(state.sections, t.dataset.sec); t.classList.toggle("is-on"); return; }
    if (t.dataset.copy) { state.copyStatus = t.dataset.copy; sib(t, "copy"); return; }
    if (t.dataset.stack) { state.stack = t.dataset.stack; sib(t, "stack"); return; }
    if (t.dataset.deliv) { state.deliverable = t.dataset.deliv; sib(t, "deliv"); return; }
    if (t.dataset.a11y) { state.a11y = t.dataset.a11y; sib(t, "a11y"); return; }
    if (t.dataset.seg) {
      var key = t.dataset.seg; state.tokens[key] = t.dataset.val;
      t.parentNode.querySelectorAll("button").forEach(function (b) { b.classList.toggle("is-on", b === t); });
      var pvf = document.getElementById("pv-frame");
      /* a reference preview only takes the theme — its other rules are fixed */
      if (state.tokens.ref) paintRef(pvf, refTheme(state.tokens));
      else applyTpl(pvf, state.tokens);
      var cap = document.getElementById("pv-cap"); if (cap) cap.textContent = previewCap(state.tokens);
      return;
    }
    if (t.dataset.tab) { state.genTab = t.dataset.tab; var b = document.getElementById("gen-body"); b.innerHTML = genBody(); hydrateIcons(b); t.parentNode.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("is-on", c === t); }); if (motionOK) g.from(b, { opacity: 0, y: 10, duration: 0.3 }); return; }
    if (t.dataset.wiz === "next") { nextStep(); return; }
    if (t.dataset.wiz === "back") { backStep(); return; }
    if (t.dataset.prompt) { state.lib = { level: "detail", catId: state.lib.catId, promptId: t.dataset.prompt }; renderLibrary(); return; }
    if (t.hasAttribute("data-lib-back")) { state.lib.level = "cats"; renderLibrary(); return; }
    if (t.hasAttribute("data-detail-back")) { state.lib.level = "workflow"; renderLibrary(); return; }
    if (t.hasAttribute("data-copy-filled")) { var p1 = curPrompt(); copy(filledText(p1.template), "Filled prompt copied"); return; }
    if (t.hasAttribute("data-copy-tpl")) { var p2 = curPrompt(); copy(p2.template, "Template copied"); return; }
    if (t.hasAttribute("data-copy-gen")) { copy(currentGenText(), "Copied to clipboard"); return; }
    if (t.dataset.kit) { toast("Downloaded " + t.dataset.kit); return; }
    if (t.hasAttribute("data-client-example")) {
      for (var ek in EXAMPLE_PROJECT) project[ek] = EXAMPLE_PROJECT[ek];
      saveProject(); renderStep(); toast("Loaded the GreenGarden example"); return;
    }
    if (t.hasAttribute("data-client-clear")) {
      CLIENT_FIELDS.forEach(function (f) { delete project[f.k]; });
      saveProject(); renderStep(); toast("Client details cleared"); return;
    }
    if (t.hasAttribute("data-restart")) { state.step = 0; state.target = null; state.moodId = null; state.tokens = null; go("builder"); renderStep(); return; }
    if (t.hasAttribute("data-inspo") || t.hasAttribute("data-inspo-btn")) { toast("Screenshot extraction — wired in the full build"); return; }
  });

  function commitValue(k, v) {
    project[k] = v; saveProject();
    var p = curPrompt();
    var out = document.getElementById("fill-out"); if (p && out) out.innerHTML = fillPreview(p.template);
    if (p && p.id && p.id.indexOf("a-") === 0) scheduleDetailPreview();
  }
  function closeAllSelects() {
    document.querySelectorAll(".ui-select.is-open").forEach(function (s) {
      s.classList.remove("is-open");
      s.querySelector(".ui-select__menu").hidden = true;
      s.querySelector(".ui-select__trigger").setAttribute("aria-expanded", "false");
    });
  }
  function toggleSelect(sel) {
    if (!sel) return;
    var open = sel.classList.contains("is-open");
    closeAllSelects();
    if (!open) {
      sel.classList.add("is-open");
      sel.querySelector(".ui-select__menu").hidden = false;
      sel.querySelector(".ui-select__trigger").setAttribute("aria-expanded", "true");
      var cur = sel.querySelector('.ui-select__opt[aria-selected="true"]');
      if (cur) cur.scrollIntoView({ block: "nearest" });
    }
  }
  function chooseOption(opt) {
    var sel = opt.closest(".ui-select");
    var val = opt.dataset.val;
    sel.querySelector(".ui-select__value").textContent = val;
    sel.querySelectorAll(".ui-select__opt").forEach(function (o) { o.setAttribute("aria-selected", o === opt ? "true" : "false"); });
    closeAllSelects();
    if (sel.dataset.token != null) commitValue(sel.dataset.token, val);
    else if (sel.dataset.wsel) setWizValue(sel.dataset.wsel, val);
  }
  function setWizValue(key, val) {
    if (key === "audience") state.audience = val;
    else if (key === "copyStatus") state.copyStatus = val;
    else if (key === "stack") state.stack = val;
    else if (key === "deliverable") state.deliverable = val;
    else if (key === "a11y") state.a11y = val;
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAllSelects(); });
  /* client fields save as you type, and keep the colour picker and its hex
     field in step with each other */
  document.addEventListener("input", function (e) {
    var c = e.target.closest("[data-client]"); if (!c) return;
    var ck = c.dataset.client, cv = c.value;
    project[ck] = cv; saveProject();
    var row = c.closest(".field-row");
    if (row) row.querySelectorAll('[data-client="' + ck + '"]').forEach(function (o) { if (o !== c && o.value !== cv) o.value = cv; });
    if (ck === "Company") {
      var foot = document.querySelector('[data-wiz="next"]');
      if (foot) {
        var ok = !!cv.trim();
        foot.disabled = !ok;
        foot.style.opacity = ok ? "" : ".4";
        foot.style.pointerEvents = ok ? "" : "none";
      }
    }
  });
  document.addEventListener("input", function (e) {
    var f = e.target.closest("[data-token]"); if (!f) return;
    var k = f.dataset.token, v = f.value;
    if (f.type === "range" && f.dataset.unit !== undefined) v = f.value + f.dataset.unit;
    var fld = f.closest(".field"); if (fld) { var ro = fld.querySelector(".field-out"); if (ro) ro.textContent = v; }
    commitValue(k, v);
  });
  function curPrompt() {
    var cat = CATEGORIES.filter(function (c) { return c.id === state.lib.catId; })[0];
    return cat ? cat.prompts.filter(function (x) { return x.id === state.lib.promptId; })[0] : null;
  }

  document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  window.addEventListener("resize", scaleTplFrames);

  /* ---- brand marks: idle orbit + hover chomp --------------- */
  if (motionOK) {
    g.to(".mark", { rotation: 360, duration: 18, repeat: -1, ease: "none", delay: 1.1 });
    var brand = document.querySelector(".brand");
    if (brand) brand.addEventListener("mouseenter", function () {
      g.fromTo(".mark", { scale: 1 }, { scale: 1.16, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" });
    });
  }

  /* ---- init ------------------------------------------------ */
  function init() {
    if (motionOK) document.body.classList.add("js-motion");
    var savedTheme = "light";
    try { savedTheme = localStorage.getItem("pl-theme-lite") || "light"; } catch (e) {}
    setTheme(savedTheme);
    hydrateIcons(document);
    renderHomeCats();
    g.set("#toast", { xPercent: -50, yPercent: 200 });
    var home = document.getElementById("view-home");
    if (motionOK) {
      var tl = g.timeline({ delay: 0.15 });
      tl.from(".topbar", { y: -68, opacity: 0, duration: 0.5, ease: "power3.out" });
      var els = home.querySelectorAll("[data-reveal]");
      g.set(els, { opacity: 0, y: 22 });
      tl.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power3.out" }, "-=0.2");
      tl.from(".mark", { scale: 0, duration: 0.5, stagger: 0.12, ease: "back.out(2)" }, 0.2);
      tl.from(".tl-line", { scaleX: 0, duration: 0.9, ease: "power3.out" }, "-=0.3");
      tl.from(".node", { scale: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.5");
      tl.from(".node .dot", { scale: 0, duration: 0.4, ease: "back.out(3)" }, "-=0.2");
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
