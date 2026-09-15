#!/usr/bin/env node
/* ===========================================================================
   Payload conformance checker
   ---------------------------------------------------------------------------
   Asserts a design-language spec's rules MECHANICALLY against the built page,
   instead of by eye. Every rule here corresponds to a line in that design's
   *.design-language.md payload — if a check fails, either the build drifted
   or the payload was ambiguous. Both are worth knowing.

   Usage:
     node tools/conformance.js              # every design that has rules
     node tools/conformance.js atelier      # one design
     node tools/conformance.js --port 5183  # if the dev server moved

   Requires the dev server running (node app/serve.js) and Chrome installed.
   Exits non-zero if any check fails, so it can gate a commit.
   =========================================================================== */

const { spawn } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

/* ---------------------------------------------------------------------------
   RULES — `_common` applies to every design; the rest key off the design id
   used in app/assets/js/data.js. Add a block here when a new reference lands.
--------------------------------------------------------------------------- */
const RULES = {
  _common: {
    /* documented as a genuine constant of this aesthetic — 10/10 designs */
    zeroElevation: true
  },

  atelier: {
    url: "designs/atelier.html",
    rootFontSize: "15px",
    spacingBase: 3.75,                      /* 0.25rem at a 15px root */
    scaleTokens: ["--s1","--s2","--s3","--s4","--s5","--s6","--s8","--s10","--s12","--s16","--s20","--s28"],
    allowedRadii: ["0px", "9999px", "50%"],
    inkNotPureWhite: "--ink",
    noPureWhiteText: true,
    accent: {
      token: "--accent", ink: "--ink", canvas: "--canvas",
      maxVsInk: 1.1,                        /* matched luminance, hue-only */
      minVsCanvas: 15,
      onlyOn: ["lbl", "pill--fill"]
    },
    microLabels: { selector: ".lbl", pattern: "^\\(\\s[\\s\\S]*\\s\\)$", uppercase: true },
    splitText: { selector: "#manifesto", minChars: 40, wordWrapper: ".word" },
    display: {
      selector: "#manifesto", weight: "400", lineHeight: 1.1,
      noTracking: true, family: "Instrument Serif"
    },
    noCanvas: true,
    pinnedDock: { selector: ".dock", atBottom: true, centred: true },
    unboxed: [".quad__cell"],
    present: [".cross-v", ".cross-h"],
    monochromeDegrades: { set: "--accent", to: "--ink" }
  },

  saas: {
    url: "designs/saas.html",
    /* 9999px = search pill, 50% = avatar/circles/donut, 75px = the bar sweep.
       Everything structural must still be 0. */
    allowedRadii: ["0px", "9999px", "50%", "75px"],
    inkNotPureWhite: "--ink",
    noPureWhiteText: true,
    /* ARCHE inverts the "panels recede" rule that Metric states as a constant */
    panelDirection: { canvas: "--canvas", panel: "--panel", expect: "lift",
                      /* the flip must not invert the relationship */
                      alsoUnder: [{ attr: "data-theme", value: "light" }] },
    /* the accent is a FOCUS MARKER: exactly one per grouping, never a series */
    singletons: { ".card--accent": 1, ".fill--accent": 1, ".chip--accent": 1 },
    /* bars: one large top-LEFT radius, square top-right — an asymmetric sweep */
    asymmetricRadius: { selector: ".fill", minTopLeft: 20, topRight: "0px" },
    /* hatch is an ENCODING, not decoration — it must actually be applied */
    /* NB: the ACCENT chip must NOT be hatched -- hatch means "not highlighted",
       so requiring it on every .chip would assert the opposite of the rule. */
    texture: { selectors: [".track", ".chip:not(.chip--accent)", ".sw__box--hatch"], contains: "repeating-linear-gradient" },
    present: [".kpis", ".ticks", ".bars", ".circles"]
  },

  /* key matches the design id in app/assets/js/data.js — "luma", not the
     file stem "assistant" (the HANDOFF §6 discrepancy). */
  luma: {
    url: "designs/assistant.html",
    /* LUMA is the library's ONE elevated design — 11/12 are flat — so the
       _common zeroElevation baseline is deliberately switched off here and
       replaced by the opposite assertion. */
    zeroElevation: false,
    requireElevation: [".panel", ".cluster"],
    inkNotPureWhite: "--ink",
    panelDirection: { canvas: "--canvas", panel: "--panel", expect: "lift",
                      alsoUnder: [{ attr: "data-theme", value: "dark" }] },
    /* THE signature rule: the accent marks state, never affordance. Put it on
       a button and it reads as a call-to-action and the signal collapses. */
    accentNotOn: { token: "--accent", selectors: ["button"] },
    /* the rail is two floating clusters, never one continuous sidebar */
    singletons: { ".rail__mid": 1, ".note": 1, ".toast": 1 },
    exactCount: { ".cluster": 2, ".cards .card": 4 },
    present: [".wave", ".listen", ".mic", ".send", ".ask", ".metric", ".viz__bar", ".cards", ".badge"]
  },

  /* RIVA — dark workbench. The tone order itself is the signature:
     sidebar is the LIGHTEST surface, the content canvas the darkest,
     and cards lift off the canvas. */
  riva: {
    url: "designs/riva.html",
    inkNotPureWhite: "--ink",
    panelDirection: { canvas: "--canvas", panel: "--card", expect: "lift" },
    /* the sidebar must be LIGHTER than the canvas — RIVA's inversion */
    ladderOrder: { light: "--sidebar", mid: "--card", dark: "--canvas" },
    /* gradient is the brand: only on the mark, the active nav glow, the pills */
    singletons: { ".mark": 1, ".ava": 1 },
    exactCount: { ".nav button.on": 1, ".card": 6 },
    /* the state/affordance split: dot carries the boolean, pill the verb */
    present: [".side", ".hist", ".search", ".card__rule", ".state", ".dot", ".pill", ".tile"],
    gradientOn: ["mark", "ava", "pill"]
  },

  /* Numéro — the analytics/overview species: a two-step tint ladder whose
     separation is done by GUTTERS alone, framed panels, concentric radii.
     Its colour law is the library's only PURE ink. ("numero" is the data.js
     id; the file stem is finance.html, like luma/assistant.) */
  numero: {
    url: "designs/finance.html",
    /* loop BOTH themes explicitly: the base check runs in whatever
       prefers-color-scheme the headless browser reports, so without this
       the light #000000 case may never execute. */
    pureInk: { token: "--ink",
               alsoUnder: [{ attr: "data-theme", value: "light" }, { attr: "data-theme", value: "dark" }] },
    /* the ladder HOLDS direction in both themes: surface recedes from paper */
    panelDirection: { canvas: "--paper", panel: "--surface", expect: "recede",
                      alsoUnder: [{ attr: "data-theme", value: "light" }, { attr: "data-theme", value: "dark" }] },
    /* THE signature: a paper panel framed by a sliver of the card's own
       surface on all four sides, the surface opening out into a footer */
    framedPanel: { card: ".card--split", panel: ".panel", frame: "--frame" },
    /* the header band and the cards are the SAME tone */
    sameTone: [".top", ".card"],
    /* concentric radius ladder: card > panel (= card - frame) > inner cards */
    radiusLadder: [[".card", ".panel"], [".card", ".inner"]],
    /* hairlines live ONLY on interactive controls — zero divider rules */
    bordersOnlyOn: [".sel", ".chip", ".delta", ".date", ".rail", ".circ--ghost", ".faces button", ".card--bare"],
    /* flat: the only CSS gradient is the faint hairline grid under the pins */
    noGradients: { except: [".pins__grid"] },
    /* the currency glyph is split from its number: "$" carries the accent */
    accentOn: { selector: ".val i", token: "--accent" },
    /* an overview, not a workbench: no nav sidebar, no data table */
    absent: ["nav", "table"],
    exactCount: { ".card--split": 2 },
    present: [".rail", ".dots", ".pins", ".bub", ".donut", ".wave", ".sticks", ".tl", ".burst", ".faces"]
  },

  /* Metric — the ZERO-radius analytics board. Two tones do three jobs:
     the canvas tone is also the divider colour and the active-state fill.
     Dark is native (the page hardcodes data-theme="dark" at load).
     ("metric" is the data.js id; the file stem is metrics.html.) */
  metric: {
    url: "designs/metrics.html",
    allowedRadii: ["0px"],                 /* the identity rule: not one curve */
    inkNotPureWhite: "--ink",
    panelDirection: { canvas: "--canvas", panel: "--panel", expect: "recede",
                      alsoUnder: [{ attr: "data-theme", value: "light" }] },
    /* the header is a SOLID band in the panel tone, not a strip with a rule */
    sameTone: [".bar", ".panel"],
    /* the canvas tone returns as the active fill and the control fill */
    fillWith: { token: "--canvas", selectors: [".nav--on", ".seg button.on", ".btn", ".search"] },
    /* dividers bleed the sidebar and rule the table rows — nowhere else,
       and always painted in the step (= canvas) tone */
    bordersOnlyOn: { selectors: [".navgrp", ".side__me", "tbody tr"], withToken: "--step" },
    /* ONE panel of five cells, not five cards; single active states */
    exactCount: { ".kpis .kpi": 5, ".seg button.on": 1, ".nav--on": 1 },
    unboxed: [".kpi"],
    present: [".side", ".bar", ".crumb", ".kpis", ".seg", ".chip--ok", "table"]
  },

  /* MoveIQ — the operational workbench: hairline rules, a reserved status
     set rendered as dot + label, the solid-ink active device, one dark
     feature panel inside a light UI. ("moveiq" is the data.js id; the
     file stem is fleet.html.) */
  moveiq: {
    url: "designs/fleet.html",
    inkNotPureWhite: "--ink",
    /* cards > tiles > controls: three rounded-rect scales — never pills */
    radiusLadder: [[".card", ".tile"], [".tile", ".nv"]],
    /* the solid-ink active device, on nav AND filter tabs */
    fillWith: { token: "--ink", selectors: [".nv--on", ".tab--on"] },
    exactCount: { ".nv--on": 1, ".tab--on": 1, ".tiles .tile": 4 },
    /* the page ends on the last table row — no footer exists */
    absent: ["footer"],
    present: [".top", ".navgrp", ".tiles", ".tile", ".promo", ".panel", ".tabs",
              ".st--move", ".st--done", ".acts", ".kebab"]
  }
};

/* --------------------------------------------------------------------------- */
const argv = process.argv.slice(2);
const portArg = argv.indexOf("--port");
const PORT = portArg > -1 ? argv[portArg + 1] : "5183";
const targets = argv.filter(a => !a.startsWith("--") && a !== PORT);
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const CDP_PORT = 9333;
const sleep = ms => new Promise(r => setTimeout(r, ms));

/* ---------------------------------------------------------------------------
   The in-page runner. Serialised and evaluated in the page, so it must be
   self-contained — no closures over anything out here except `cfg`.
--------------------------------------------------------------------------- */
function PAGE_RUNNER(cfg) {
  const R = [];
  const ok = (n, p, d) => R.push({ n, pass: !!p, d: d == null ? "" : String(d) });
  const all = () => [...document.querySelectorAll("body *")];
  const css = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim();
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const L = v => 0.2126 * lin(v[0]) + 0.7152 * lin(v[1]) + 0.0722 * lin(v[2]);
  const ratio = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

  /* --- root font-size --- */
  if (cfg.rootFontSize) {
    const got = getComputedStyle(document.documentElement).fontSize;
    ok("root font-size is " + cfg.rootFontSize, got === cfg.rootFontSize, got);
  }

  /* --- spacing grid, checked against AUTHORED declarations ---------------
     Computed values are useless here: `margin-inline:auto` resolves to
     whatever centres the box. We walk the stylesheet instead, which is also
     the more meaningful test — it asks whether the author used the scale.  */
  if (cfg.spacingBase) {
    const SP = ["margin","margin-top","margin-bottom","margin-left","margin-right","margin-inline","margin-block",
      "padding","padding-top","padding-bottom","padding-left","padding-right","padding-inline","padding-block",
      "gap","row-gap","column-gap"];
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let viaToken = 0, styleRules = 0; const onGrid = [], offGrid = [];
    const scan = rules => {
      for (const r of rules || []) {
        /* NB: with CSS Nesting, r.cssRules is truthy on PLAIN STYLE RULES too,
           so it cannot be used to detect a grouping rule. Use conditionText. */
        if (r.conditionText !== undefined && r.cssRules) { scan(r.cssRules); continue; }
        if (!r.style || !r.selectorText) continue;
        styleRules++;
        if (r.cssRules && r.cssRules.length) scan(r.cssRules);
        for (const p of SP) {
          const v = r.style.getPropertyValue(p); if (!v) continue;
          v.trim().split(/\s+/).forEach(t => {
            if (/^var\(/.test(t)) { viaToken++; return; }
            if (/^(auto|0|0px|inherit|initial|unset)$/i.test(t)) return;
            if (/^(calc|clamp|min|max)\(/.test(t) || /(%|vh|vw|em)$/.test(t)) return;
            const px = t.endsWith("rem") ? parseFloat(t) * root : (t.endsWith("px") ? parseFloat(t) : null);
            if (px === null || Number.isNaN(px)) return;
            const m = px / cfg.spacingBase;
            (Math.abs(m - Math.round(m)) <= 0.001 ? onGrid : offGrid).push(r.selectorText + " {" + p + ":" + t + "}");
          });
        }
      }
    };
    for (const ss of document.styleSheets) { let c; try { c = ss.cssRules; } catch (e) { continue; } scan(c); }
    ok("authored spacing is on the " + cfg.spacingBase + "px grid", offGrid.length === 0,
      offGrid.length ? offGrid.length + " off-grid: " + offGrid.slice(0, 4).join(" | ")
        : styleRules + " rules, " + viaToken + " via tokens, " + onGrid.length + " literals, 0 off-grid");
  }

  /* --- the scale tokens themselves --- */
  if (cfg.scaleTokens && cfg.spacingBase) {
    const root = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const bad = [], missing = [];
    cfg.scaleTokens.forEach(k => {
      const v = css(k); if (!v) { missing.push(k); return; }
      const px = v.endsWith("rem") ? parseFloat(v) * root : parseFloat(v);
      const m = px / cfg.spacingBase;
      if (Math.abs(m - Math.round(m)) > 0.001) bad.push(k + "=" + v);
    });
    ok("scale tokens are all on the grid", bad.length === 0 && missing.length === 0,
      missing.length ? "UNDEFINED: " + missing.join(", ")
        : (bad.length ? bad.join(", ") : cfg.scaleTokens.length + " tokens clean"));
  }

  /* --- radius --- */
  if (cfg.allowedRadii) {
    const found = new Set();
    all().forEach(el => {
      const r = getComputedStyle(el).borderRadius;
      if (r) r.split(/[\s/]+/).forEach(v => { if (v && v !== "0px") found.add(v); });
    });
    const bad = [...found].filter(v => cfg.allowedRadii.indexOf(v) === -1);
    ok("radius limited to " + cfg.allowedRadii.join(" / "), bad.length === 0, bad.length ? bad.join(", ") : "clean");
  }

  /* --- ink is never pure white --- */
  if (cfg.inkNotPureWhite) {
    ok("ink token is not #FFFFFF", css(cfg.inkNotPureWhite).toUpperCase() !== "#FFFFFF", css(cfg.inkNotPureWhite));
  }
  /* --- the library's only PURE ink: exactly #000000 light / #FFFFFF dark.
     Numéro alone refuses the near-black every other reference uses. --- */
  if (cfg.pureInk) {
    const check = label => {
      const v = css(cfg.pureInk.token).toUpperCase();
      ok("ink token is exactly #000000 or #FFFFFF" + label, v === "#000000" || v === "#FFFFFF", v);
    };
    check("");
    (cfg.pureInk.alsoUnder || []).forEach(t => {
      const root = document.documentElement;
      const prev = root.getAttribute(t.attr);
      root.setAttribute(t.attr, t.value);
      check(" [" + t.attr + "=" + t.value + "]");
      if (prev === null) root.removeAttribute(t.attr); else root.setAttribute(t.attr, prev);
    });
  }

  /* Separate, opt-in. Bundling this with the token check was wrong: a design
     whose PANEL is #FFFFFF paints white text on its ink-filled buttons by
     design, and that is not the same failure as a white ink TOKEN. */
  if (cfg.noPureWhiteText) {
    const w = all().filter(el => getComputedStyle(el).color === "rgb(255, 255, 255)" && (el.textContent || "").trim());
    ok("nothing renders pure-white text", w.length === 0, w.length ? w.length + " elements" : "clean");
  }

  /* --- the accent slot --- */
  if (cfg.accent) {
    const a = hex(css(cfg.accent.token)), i = hex(css(cfg.accent.ink)), c = hex(css(cfg.accent.canvas));
    const vsInk = ratio(a, i), vsCanvas = ratio(a, c);
    ok("accent within " + cfg.accent.maxVsInk + " of ink (hue-only separation)", vsInk <= cfg.accent.maxVsInk, vsInk.toFixed(3));
    ok("accent >= " + cfg.accent.minVsCanvas + ":1 on canvas", vsCanvas >= cfg.accent.minVsCanvas, vsCanvas.toFixed(2));
    const str = "rgb(" + a.join(", ") + ")";
    const users = all().filter(el => { const s = getComputedStyle(el); return s.color === str || s.backgroundColor === str; });
    const illegal = users.filter(el => !cfg.accent.onlyOn.some(cl => el.classList.contains(cl)));
    ok("accent only on " + cfg.accent.onlyOn.map(c => "." + c).join(" + "),
      illegal.length === 0 && users.length > 0,
      users.length === 0 ? "VACUOUS — the accent is used nowhere"
        : (illegal.length ? illegal.slice(0, 3).map(e => e.tagName + "." + e.className).join(" | ") : users.length + " legal users"));
  }

  /* --- micro-label grammar --- */
  if (cfg.microLabels) {
    const re = new RegExp(cfg.microLabels.pattern);
    const els = [...document.querySelectorAll(cfg.microLabels.selector)];
    const bad = els.filter(el => {
      const t = (el.textContent || "").trim();
      if (!re.test(t)) return true;
      return cfg.microLabels.uppercase && getComputedStyle(el).textTransform !== "uppercase";
    });
    ok("micro-labels match the grammar", bad.length === 0 && els.length > 0,
      els.length === 0 ? "VACUOUS — no " + cfg.microLabels.selector + " found"
        : (bad.length ? bad.slice(0, 3).map(e => JSON.stringify(e.textContent.trim())).join(" | ") : els.length + " labels clean"));
  }

  /* --- split text --- */
  if (cfg.splitText) {
    const host = document.querySelector(cfg.splitText.selector);
    const chars = host ? host.querySelectorAll(".char") : [];
    ok("headline is split per-character", chars.length >= cfg.splitText.minChars, chars.length + " char spans");
    if (cfg.splitText.wordWrapper) {
      const words = host ? host.querySelectorAll(cfg.splitText.wordWrapper) : [];
      ok("words wrapped so lines cannot break mid-word", words.length > 0, words.length + " word wrappers");
    }
    ok("parent keeps aria-label, split spans hidden from AT",
      !!(host && host.getAttribute("aria-label") && host.querySelector("[aria-hidden='true']")), "");
  }

  /* --- display type --- */
  if (cfg.display) {
    const el = document.querySelector(cfg.display.selector);
    if (el) {
      const s = getComputedStyle(el);
      if (cfg.display.weight) ok("display weight " + cfg.display.weight, s.fontWeight === cfg.display.weight, s.fontWeight);
      if (cfg.display.lineHeight) {
        const lh = parseFloat(s.lineHeight) / parseFloat(s.fontSize);
        ok("display line-height " + cfg.display.lineHeight, Math.abs(lh - cfg.display.lineHeight) < 0.03, lh.toFixed(3));
      }
      if (cfg.display.noTracking) ok("display has no tracking", s.letterSpacing === "normal" || parseFloat(s.letterSpacing) === 0, s.letterSpacing);
      if (cfg.display.family) ok("display family is " + cfg.display.family, s.fontFamily.indexOf(cfg.display.family) > -1, s.fontFamily.slice(0, 36));
    }
  }

  /* --- rendering --- */
  if (cfg.noCanvas) {
    ok("zero <canvas>", document.querySelectorAll("canvas").length === 0, document.querySelectorAll("canvas").length);
    ok("no THREE.js", typeof window.THREE === "undefined", "");
  }
  if (cfg.zeroElevation) {
    const sh = all().filter(el => { const s = getComputedStyle(el).boxShadow; return s && s !== "none"; });
    ok("zero elevation", sh.length === 0, sh.length ? sh.length + " shadowed" : "clean");
  }

  /* --- the inverse of zeroElevation, for the one design that lifts --- */
  if (cfg.requireElevation) {
    cfg.requireElevation.forEach(sel => {
      const els = [...document.querySelectorAll(sel)];
      const flat = els.filter(el => {
        const sh = getComputedStyle(el).boxShadow;
        return !sh || sh === "none";
      });
      ok(sel + " carries a real shadow", flat.length === 0 && els.length > 0,
        els.length === 0 ? "VACUOUS — no " + sel + " found"
          : (flat.length ? flat.length + " flat" : els.length + " elevated"));
    });
  }

  /* --- the accent must NOT appear on the given selectors --- */
  if (cfg.accentNotOn) {
    const a = hex(css(cfg.accentNotOn.token));
    const str = "rgb(" + a.join(", ") + ")";
    const offenders = [];
    cfg.accentNotOn.selectors.forEach(sel => {
      [...document.querySelectorAll(sel)].forEach(el => {
        const st = getComputedStyle(el);
        if (st.backgroundColor === str || st.color === str)
          offenders.push(el.tagName + "." + (el.className || "").toString().slice(0, 24));
      });
    });
    ok("accent never appears on " + cfg.accentNotOn.selectors.join(", "),
      offenders.length === 0,
      offenders.length ? offenders.slice(0, 4).join(" | ") : "clean — accent is state, not affordance");
  }

  /* --- the accent must BE on the given selector: e.g. Numéro's currency
     glyph is split from its number, "$" carrying the coral. --- */
  if (cfg.accentOn) {
    const a = hex(css(cfg.accentOn.token));
    const str = "rgb(" + a.join(", ") + ")";
    const els = [...document.querySelectorAll(cfg.accentOn.selector)];
    const off = els.filter(el => {
      const s = getComputedStyle(el);
      return s.color !== str && s.backgroundColor !== str;
    });
    ok("accent on every " + cfg.accentOn.selector, els.length > 0 && off.length === 0,
      els.length === 0 ? "VACUOUS — no " + cfg.accentOn.selector + " found"
        : (off.length ? off.length + " without it" : els.length + " carry it"));
  }

  /* --- one token returning as a FILL: the canvas tone that is also the
     active-state fill (Metric's three-jobs rule), or the solid-ink
     active device (MoveIQ). Every matched element must carry it. --- */
  if (cfg.fillWith) {
    const str = "rgb(" + hex(css(cfg.fillWith.token)).join(", ") + ")";
    const bad = [];
    let n = 0;
    cfg.fillWith.selectors.forEach(sel => {
      const els = [...document.querySelectorAll(sel)];
      if (!els.length) { bad.push(sel + " (none found)"); return; }
      els.forEach(el => {
        n++;
        if (getComputedStyle(el).backgroundColor !== str) bad.push(sel);
      });
    });
    ok(cfg.fillWith.token + " fills " + cfg.fillWith.selectors.join(" + "),
      n > 0 && bad.length === 0,
      bad.length ? bad.slice(0, 3).join(" | ") : n + " elements on tone");
  }

  /* --- an exact element count (two rail clusters, not one sidebar) --- */
  if (cfg.exactCount) {
    Object.keys(cfg.exactCount).forEach(sel => {
      const want = cfg.exactCount[sel], got = document.querySelectorAll(sel).length;
      ok("exactly " + want + " of " + sel, got === want, got + " found");
    });
  }

  /* --- pinned dock. Measure against clientWidth: innerWidth includes the
         scrollbar and reports a false ~half-scrollbar offset. --- */
  if (cfg.pinnedDock) {
    const d = document.querySelector(cfg.pinnedDock.selector);
    let pass = false, detail = "not found";
    if (d) {
      const r = d.getBoundingClientRect(), s = getComputedStyle(d);
      const cw = document.documentElement.clientWidth;
      const off = Math.abs((r.left + r.width / 2) - cw / 2);
      const centred = !cfg.pinnedDock.centred || off < 2;
      const bottom = !cfg.pinnedDock.atBottom || r.top > innerHeight * 0.6;
      pass = s.position === "fixed" && centred && bottom;
      detail = s.position + ", off-centre " + off.toFixed(2) + "px, top " + Math.round(r.top) + "/" + innerHeight;
    }
    ok("nav pinned bottom-centre", pass, detail);
  }

  /* --- cells that must carry no box of their own --- */
  if (cfg.unboxed) {
    cfg.unboxed.forEach(sel => {
      const els = [...document.querySelectorAll(sel)];
      const boxed = els.filter(el => {
        const s = getComputedStyle(el);
        const bg = s.backgroundColor !== "rgba(0, 0, 0, 0)" && s.backgroundColor !== "transparent";
        const bd = ["Top", "Right", "Bottom", "Left"].some(k => parseFloat(s["border" + k + "Width"]) > 0);
        return bg || bd;
      });
      ok(sel + " carries no bg or border", boxed.length === 0 && els.length > 0,
        els.length === 0 ? "VACUOUS — no " + sel + " found"
          : (boxed.length ? boxed.length + " boxed" : els.length + " clean"));
    });
  }

  /* --- hairlines are an AFFORDANCE: any bordered element must be one of the
     sanctioned controls. Layout separation must never come from borders. --- */
  if (cfg.bordersOnlyOn) {
    /* array form: placement only. object form adds withToken: every
       sanctioned rule must ALSO be painted in that token — Metric's
       "dividers are the canvas tone showing through" rule. */
    const bo = Array.isArray(cfg.bordersOnlyOn) ? { selectors: cfg.bordersOnlyOn } : cfg.bordersOnlyOn;
    const tokenStr = bo.withToken ? "rgb(" + hex(css(bo.withToken)).join(", ") + ")" : null;
    const offenders = all().filter(el => {
      const s = getComputedStyle(el);
      const bordered = ["Top", "Right", "Bottom", "Left"].some(k =>
        parseFloat(s["border" + k + "Width"]) > 0 && s["border" + k + "Style"] !== "none" &&
        s["border" + k + "Color"] !== "rgba(0, 0, 0, 0)");
      if (!bordered) return false;
      const legal = bo.selectors.some(sel => { try { return el.matches(sel); } catch (e) { return false; } });
      if (!legal) return true;
      return !!tokenStr && s.borderTopColor !== tokenStr;
    });
    ok("borders only on " + bo.selectors.join(" ") + (tokenStr ? " in " + bo.withToken : ""),
      offenders.length === 0,
      offenders.length ? offenders.slice(0, 4).map(e => e.tagName + "." + (e.className || "").toString().slice(0, 24)).join(" | ")
        : (tokenStr ? "clean — every rule in " + bo.withToken : "clean — separation is gutters only"));
  }

  if (cfg.present) {
    cfg.present.forEach(sel => ok("present: " + sel, !!document.querySelector(sel), ""));
  }

  /* --- things that must NOT exist (a nav sidebar, a data table, ...): the
     absence IS the rule, so its violation must be a failure, not a shrug --- */
  if (cfg.absent) {
    cfg.absent.forEach(sel => {
      const got = document.querySelectorAll(sel).length;
      ok("absent: " + sel, got === 0, got + " found");
    });
  }

  /* --- an explicit TONE ORDER: lightest > mid > dark tokens. RIVA's
     signature is that the sidebar is the lightest surface and the
     content canvas the darkest — the inverse of most dashboards. --- */
  if (cfg.ladderOrder) {
    const l = css(cfg.ladderOrder.light), m = css(cfg.ladderOrder.mid), d = css(cfg.ladderOrder.dark);
    const lum = h => { const v = hex(h); return L(v); };
    const okOrder = lum(l) > lum(m) && lum(m) > lum(d);
    ok("tone ladder order light>mid>dark holds (sidebar lightest, canvas darkest)",
      okOrder,
      "L" + Math.round(lum(l)*255) + " > M" + Math.round(lum(m)*255) + " > D" + Math.round(lum(d)*255));
  }

  /* --- gradient as identity: it may appear ONLY on the sanctioned
     elements (mark, active nav glow, pills, ava). Everything else
     must be flat. --- */
  if (cfg.gradientOn) {
    const gradEls = all().filter(el => {
      const bi = getComputedStyle(el).backgroundImage;
      return bi && bi !== "none" && bi.indexOf("gradient") > -1;
    });
    const legal = gradEls.filter(el => cfg.gradientOn.some(cl => el.classList.contains(cl)));
    const illegal = gradEls.filter(el => !cfg.gradientOn.some(cl => el.classList.contains(cl)));
    ok("gradient only on " + cfg.gradientOn.join(" + "),
      illegal.length === 0 && gradEls.length > 0,
      gradEls.length === 0 ? "VACUOUS — no gradient anywhere"
        : (illegal.length ? illegal.slice(0, 4).map(e => e.tagName + "." + (e.className||"").toString().slice(0,20)).join(" | ")
           : gradEls.length + " gradient elements, all legal"));
  }

  /* --- the inverse of gradientOn: a flat design must carry NO gradients
     apart from sanctioned functional textures (hairline grids etc.). --- */
  if (cfg.noGradients) {
    const gradEls = all().filter(el => {
      const bi = getComputedStyle(el).backgroundImage;
      return bi && bi !== "none" && bi.indexOf("gradient") > -1;
    });
    const illegal = gradEls.filter(el => !cfg.noGradients.except.some(sel => el.matches(sel)));
    ok("no gradients outside " + cfg.noGradients.except.join(" + "),
      illegal.length === 0,
      illegal.length ? illegal.slice(0, 4).map(e => e.tagName + "." + (e.className || "").toString().slice(0, 20)).join(" | ")
        : (gradEls.length ? gradEls.length + " gradient element(s), all sanctioned" : "flat — none at all"));
  }

  /* --- THE FRAMED PANEL: a paper panel framed by a hairline of the card's
     own surface on all four sides, the surface opening out into a footer
     below. Radius stays concentric: panel = card - frame. --- */
  if (cfg.framedPanel) {
    const fp = cfg.framedPanel;
    const framePx = parseFloat(css(fp.frame));
    const cards = [...document.querySelectorAll(fp.card)];
    const bad = [];
    cards.forEach(card => {
      const panels = card.querySelectorAll(fp.panel);
      if (panels.length !== 1) { bad.push(card.className + ": " + panels.length + " panels"); return; }
      const p = panels[0];
      const cs = getComputedStyle(card), ps = getComputedStyle(p);
      if (ps.backgroundColor === cs.backgroundColor) bad.push("panel tone == card tone");
      const cr = card.getBoundingClientRect(), pr = p.getBoundingClientRect();
      const inL = pr.left - cr.left, inR = cr.right - pr.right,
            inT = pr.top - cr.top, inB = cr.bottom - pr.bottom;
      const tol = 0.75;
      if (Math.abs(inL - framePx) > tol || Math.abs(inR - framePx) > tol || Math.abs(inT - framePx) > tol)
        bad.push("frame L" + inL.toFixed(1) + " R" + inR.toFixed(1) + " T" + inT.toFixed(1) + " vs " + framePx);
      if (inB <= framePx) bad.push("no footer zone below the panel");
      const wantR = parseFloat(cs.borderTopLeftRadius) - framePx;
      if (Math.abs(parseFloat(ps.borderTopLeftRadius) - wantR) > tol)
        bad.push("radius not concentric: panel " + ps.borderTopLeftRadius + " vs card " + cs.borderTopLeftRadius);
    });
    ok("panels are framed by the card's own surface, radius concentric",
      cards.length > 0 && bad.length === 0,
      cards.length === 0 ? "VACUOUS — no " + fp.card + " found"
        : (bad.length ? bad.slice(0, 3).join(" | ") : cards.length + " framed panels clean"));
  }

  /* --- two zones that must share ONE tone (header band == card surface) --- */
  if (cfg.sameTone) {
    const tones = cfg.sameTone.map(s => {
      const el = document.querySelector(s);
      return el ? getComputedStyle(el).backgroundColor : null;
    });
    const missing = tones.indexOf(null);
    const same = tones.every(t => t === tones[0]);
    ok(cfg.sameTone.join(" == ") + " share one tone", missing === -1 && same,
      missing > -1 ? "VACUOUS — " + cfg.sameTone[missing] + " not found" : tones[0]);
  }

  /* --- an explicit radius LADDER: each [outer, inner] pair must step DOWN.
     Pairs are global — the relation, not per-card nesting, is the rule. --- */
  if (cfg.radiusLadder) {
    const bad = [];
    let pairs = 0;
    cfg.radiusLadder.forEach(pr => {
      const o = document.querySelector(pr[0]), i = document.querySelector(pr[1]);
      if (!o || !i) { bad.push("missing " + (!o ? pr[0] : pr[1])); return; }
      pairs++;
      const ro = parseFloat(getComputedStyle(o).borderTopLeftRadius),
            ri = parseFloat(getComputedStyle(i).borderTopLeftRadius);
      if (ri >= ro) bad.push(pr[1] + " (" + ri + ") !< " + pr[0] + " (" + ro + ")");
    });
    ok("radius ladder steps down: " + cfg.radiusLadder.map(p => p.join(" > ")).join(", "),
      pairs > 0 && bad.length === 0,
      bad.length ? bad.slice(0, 3).join(" | ") : pairs + " pairs ordered");
  }

  /* --- does the panel step toward the viewer or away from it? Metric states
         "panels recede" as a library constant; ARCHE disproves it, so the
         direction is asserted per design rather than assumed. --- */
  if (cfg.panelDirection) {
    const want = cfg.panelDirection.expect === "lift";
    const check = label => {
      const c = hex(css(cfg.panelDirection.canvas)), p = hex(css(cfg.panelDirection.panel));
      const lifts = L(p) > L(c);
      ok("panels " + cfg.panelDirection.expect + " relative to the canvas" + label, lifts === want,
        "canvas lum " + Math.round(L(c) * 255) + " vs panel " + Math.round(L(p) * 255) +
        " => " + (lifts ? "lift" : "recede"));
    };
    check("");
    /* re-assert under every other theme: a token re-skin must not invert
       the panel/canvas relationship. */
    (cfg.panelDirection.alsoUnder || []).forEach(t => {
      const root = document.documentElement;
      const prev = root.getAttribute(t.attr);
      root.setAttribute(t.attr, t.value);
      check(" [" + t.attr + "=" + t.value + "]");
      if (prev === null) root.removeAttribute(t.attr); else root.setAttribute(t.attr, prev);
    });
  }

  /* --- accent as a focus marker: exactly N of each, never more --- */
  if (cfg.singletons) {
    Object.keys(cfg.singletons).forEach(sel => {
      const want = cfg.singletons[sel], got = document.querySelectorAll(sel).length;
      ok("exactly " + want + " of " + sel, got === want, got + " found");
    });
  }

  /* --- the asymmetric bar sweep: large top-left radius, square top-right --- */
  if (cfg.asymmetricRadius) {
    const els = [...document.querySelectorAll(cfg.asymmetricRadius.selector)];
    const bad = els.filter(el => {
      const s = getComputedStyle(el);
      return parseFloat(s.borderTopLeftRadius) < cfg.asymmetricRadius.minTopLeft ||
             s.borderTopRightRadius !== cfg.asymmetricRadius.topRight;
    });
    ok("bars sweep top-left and stay square top-right", bad.length === 0 && els.length > 0,
      els.length === 0 ? "VACUOUS — no " + cfg.asymmetricRadius.selector + " found"
        : (bad.length ? bad.length + " wrong" : els.length + " bars, TL " +
           getComputedStyle(els[0]).borderTopLeftRadius + " / TR " + getComputedStyle(els[0]).borderTopRightRadius));
  }

  /* --- texture is an encoding: it must be present where the spec says --- */
  if (cfg.texture) {
    const missing = [];
    let checked = 0;
    cfg.texture.selectors.forEach(sel => {
      const els = [...document.querySelectorAll(sel)];
      if (!els.length) { missing.push(sel + " (none found)"); return; }
      els.forEach(el => {
        checked++;
        if (getComputedStyle(el).backgroundImage.indexOf(cfg.texture.contains) === -1) {
          if (missing.indexOf(sel) === -1) missing.push(sel);
        }
      });
    });
    ok("hatch texture applied where the encoding requires it", missing.length === 0 && checked > 0,
      missing.length ? "missing on " + missing.join(", ") : checked + " elements carry the hatch");
  }

  /* --- graceful degradation: collapsing the accent must not move anything --- */
  if (cfg.monochromeDegrades) {
    const geo = () => all().map(el => { const r = el.getBoundingClientRect(); return r.top + "," + r.left + "," + r.width + "," + r.height; }).join(";");
    const before = geo();
    const prev = document.documentElement.style.getPropertyValue(cfg.monochromeDegrades.set);
    document.documentElement.style.setProperty(cfg.monochromeDegrades.set, css(cfg.monochromeDegrades.to));
    void document.body.offsetHeight;
    const after = geo();
    if (prev) document.documentElement.style.setProperty(cfg.monochromeDegrades.set, prev);
    else document.documentElement.style.removeProperty(cfg.monochromeDegrades.set);
    ok(cfg.monochromeDegrades.set + " -> " + cfg.monochromeDegrades.to + " causes ZERO layout shift",
      before === after, before === after ? "identical geometry" : "LAYOUT SHIFTED");
  }

  return JSON.stringify({ passed: R.filter(r => r.pass).length, total: R.length, results: R });
}

/* --------------------------------------------------------------------------- */
async function main() {
  const ids = (targets.length ? targets : Object.keys(RULES).filter(k => k !== "_common"));
  const unknown = ids.filter(id => !RULES[id]);
  if (unknown.length) {
    console.error("No rules defined for: " + unknown.join(", "));
    console.error("Known: " + Object.keys(RULES).filter(k => k !== "_common").join(", "));
    process.exit(2);
  }

  const userDir = path.join(os.tmpdir(), "conformance-" + process.pid);
  const chrome = spawn(CHROME, ["--headless=new", "--remote-debugging-port=" + CDP_PORT,
    "--remote-allow-origins=*", "--user-data-dir=" + userDir, "--hide-scrollbars",
    "--no-first-run", "--no-default-browser-check", "about:blank"], { stdio: "ignore" });

  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    try { const r = await fetch(`http://localhost:${CDP_PORT}/json/version`); wsUrl = (await r.json()).webSocketDebuggerUrl; }
    catch (e) { await sleep(250); }
  }
  if (!wsUrl) { console.error("Chrome DevTools never came up"); chrome.kill(); process.exit(2); }

  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.addEventListener("open", res); ws.addEventListener("error", rej); });
  let mid = 0; const pending = new Map();
  ws.addEventListener("message", ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { const { resolve, reject } = pending.get(m.id); pending.delete(m.id);
      m.error ? reject(new Error(m.error.message)) : resolve(m.result); }
  });
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++mid; pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

  const { targetId } = await send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
  await send("Page.enable", {}, sessionId);
  await send("Runtime.enable", {}, sessionId);
  await send("Emulation.setDeviceMetricsOverride", { width: 1600, height: 1000, deviceScaleFactor: 1, mobile: false }, sessionId);

  let failures = 0;
  for (const id of ids) {
    const cfg = Object.assign({}, RULES._common, RULES[id]);
    const url = `http://localhost:${PORT}/${cfg.url}`;
    await send("Page.navigate", { url }, sessionId);
    for (let i = 0; i < 40; i++) {
      await sleep(200);
      const r = await send("Runtime.evaluate", { expression: "document.readyState", returnByValue: true }, sessionId);
      if (r.result.value === "complete") break;
    }
    await sleep(2600);   /* let the entry timeline finish before measuring */

    const expr = `(${PAGE_RUNNER.toString()})(${JSON.stringify(cfg)})`;
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
    if (r.exceptionDetails) {
      console.error(`\n${id}: runner threw — ${r.exceptionDetails.exception && r.exceptionDetails.exception.description}`);
      failures++; continue;
    }
    const out = JSON.parse(r.result.value);
    const bad = out.results.filter(x => !x.pass);
    failures += bad.length;

    console.log(`\n  ${id}  —  ${out.passed}/${out.total}   ${url}`);
    console.log("  " + "-".repeat(66));
    out.results.forEach(x => console.log(`  ${x.pass ? "PASS" : "FAIL"}  ${x.n}${x.d ? "  [" + x.d + "]" : ""}`));
  }

  ws.close(); chrome.kill();
  console.log(failures ? `\n${failures} check(s) FAILED\n` : "\nAll checks passed\n");
  setTimeout(() => process.exit(failures ? 1 : 0), 200);
}

main().catch(e => { console.error("ERROR: " + e.message); process.exit(2); });
