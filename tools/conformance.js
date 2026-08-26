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

  if (cfg.present) {
    cfg.present.forEach(sel => ok("present: " + sel, !!document.querySelector(sel), ""));
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
