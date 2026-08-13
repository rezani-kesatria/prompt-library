# 07 · Review & QA (responsive / reduced-motion / a11y / live verify)

Prove the page holds up: responsive across the charter's breakpoints, the
reduced-motion contract honoured, accessibility clean, performance within the
"ready for {year}" bar, and the live Divi import verified with the skill's own
probes. Every fix lands **in source**, never in the exported JSON.

**Hand-off**
- **In:** the built page (**05**) and/or the live Divi import (**06**).
- **Out:** a pass/fail QA record + fixes applied in source (static CSS/JS or the
  reconcile CSS), re-verified.
- **Next:** **08** deploys once QA is green; a regression loops back to **05**
  (static) or **06** (reconcile).

**When to use** — after 05 (static QA) and again after 06 (live-import QA). The
second pass uses `divi5-native-convert`'s `references/verify.md` probes.

---

## Fill-in template

```
Run QA on the {home} page of {Company} at {live URL} and fix what fails, in source.

Responsive — check {1800 / 1280 / 1024 / 768 / 390}px: no horizontal overflow, no
broken grids, tap targets ≥44px, images right-sized per breakpoint.

Reduced-motion — with `prefers-reduced-motion: reduce`: confirm NO content is
stranded invisible (no bare opacity:0), animations suppressed, scroll works with
Lenis off. Then re-check the animated path with motion on.

A11y — exactly one H1 + logical heading order; text contrast ≥{4.5:1}; every image
has real alt (from 03); visible focus states; full keyboard nav; labelled form
fields; aria only where needed. Run {axe} and record findings.

Performance — {LCP <2.5s, CLS <0.1}; image weights within the 04 budget; fonts
`font-display:swap`; no layout shift from late assets.

Live verify (post-Divi import) — use the divi5-native-convert verify.md probes:
z-index/overlap band scan, "which rule wins", grid/module state, SVG viewBox.

Deliver: a pass/fail checklist + fixes folded into {assets/css/ggis.css /
assets/js/motion.js / css/ggis-divi.css}, re-verified.
```

## Filled example — GreenGarden

```
Run QA on the GreenGarden home page at https://greengarden.kesatria.my/?page_id=108
and fix failures in source.

- Responsive at 1800 / 1280 / 1024 / 768 / 390: hero holds, services grid 3→1,
  showcase degrades gracefully, no horizontal scroll.
- Reduced-motion: prefers-reduced-motion: reduce — hero + reveals show fully, Lenis
  off, nothing blank; then re-check with motion on.
- A11y: single H1, one H2 per section, evergreen #1B4332 on sand passes AA,
  alt-text present, focus rings visible, keyboard-navigable, form labelled.
  axe: 0 criticals.
- Performance: LCP 2.1s, CLS 0.02, hero WebP 280KB, Fraunces + Inter with
  font-display:swap.
- Live verify: ran the verify.md band scan (clean — nav not overlapped), grid-state
  probe (rows render as grid, not stripped-to-flex), tightened the SVG logo viewBox.

Fixes folded into assets/css/ggis.css + css/ggis-divi.css and re-verified.
```

## Do's

- **DO** fix in the **source** (static CSS/JS or the reconcile CSS), then
  re-export/re-zip/re-verify — never patch the exported JSON.
- **DO** test reduced-motion as a first-class path — the charter promised it;
  confirm nothing is stranded invisible.
- **DO** verify the live import with the skill's `verify.md` probes (z-index band
  scan, which-rule-wins, grid/module state), not by eyeballing.
- **DO** measure Core Web Vitals against the "ready for {year}" bar; when imagery
  is the culprit, loop back to **04**.

## Don'ts

- **DON'T** declare "responsive" from one desktop resize — check the named
  breakpoints and orientation.
- **DON'T** read a computed style **mid-transition** and conclude a rule is wrong —
  settle the state or set `transition:none` first.
- **DON'T** wave axe/Lighthouse criticals through for velocity — contrast,
  headings, and alt are the brand's SEO and legal surface too.
- **DON'T** skip the logged-out check — WP admin-bar hits in the band scan are
  false positives; verify as a visitor.
