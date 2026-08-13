# 05 · Build the static site (class-driven HTML/CSS/GSAP)

Build the page as a static, **class-driven** site: semantic HTML + one stylesheet
(the charter tokens) + a class-driven GSAP/Lenis motion layer. This is the
**single source of truth** — the Divi port (**06**) *generates* from it, and it's
authored to the exact contract `divi5-native-convert` expects so the port is clean.

**Hand-off**
- **In:** the section spec (**02**), copy (**03**), imagery (**04**), and the
  charter tokens (**01**).
- **Out:** the running static page — `website/index.html` + `assets/css/ggis.css`
  + `assets/js/motion.js` + `assets/img/*`. Source of truth from here on.
- **Next:** **06** generates Divi JSON from this build; **07** QAs it; **08** can
  also deploy this static build directly.

**Optional aid** — the **`frontend-design`** skill helps push visual quality while
keeping the output class-driven and production-grade.

---

## Fill-in template

```
Build the {home} page for {Company} as a static, class-driven site — the single
source of truth we'll later port to Divi.

From: the 02 section spec, 03 copy, 04 imagery, and the charter tokens
(design-guidelines/design-system.json).

Structure (match the divi5-native-convert contract so the port is clean):
- Semantic HTML at {website/index.html}: real sections → rows → columns.
- ONE stylesheet {assets/css/ggis.css} carrying ALL tokens + layout (grid/flex/
  spacing). Every bespoke class prefixed {ggis-}. No inline styles.
- Motion in {assets/js/motion.js}: {GSAP + ScrollTrigger + Lenis}. Trigger class
  {ggis-reveal} on animated elements; initial hidden states set ONLY in JS inside
  a `prefers-reduced-motion: no-preference` branch (never a bare opacity:0 class).
- Container max {1800px}; fluid clamp() type/space; responsive at {1024 / 640}.
- Full-bleed/hero images as a section/row background + a locked-aspect class (not
  an <img>) where they're decorative.

Keep as isolated blocks (they stay Code at 06): {the contact form}, {the map
iframe}, {the pinned showcase}.

Deliver: the running static page + assets. Serve it over http and confirm motion,
responsive, and reduced-motion all behave.
```

## Filled example — GreenGarden

```
Build the GreenGarden home page as a static, class-driven site — the single source
of truth for the Divi port.

- Semantic HTML at website/index.html; sections → rows → columns.
- One stylesheet assets/css/ggis.css with all tokens + layout; every class ggis-*;
  no inline styles.
- Motion in assets/js/motion.js: GSAP + ScrollTrigger + Lenis. ggis-reveal on
  animated elements; hero parallax; services stagger; hidden states set in JS only
  under prefers-reduced-motion: no-preference.
- Container 1800px; fluid clamp() type/space; breakpoints 1024 / 640.
- Hero + CTA-band images as row backgrounds with a locked-aspect class.

Keep isolated (stay Code at 06): the consultation form, the showcase pinned scroll.

Deliver: running page + assets; served over http; motion + responsive +
reduced-motion verified.
```

## Why the contract matters

These aren't style preferences — each one is what keeps the Divi port (**06**) a
generate-and-verify step instead of a rebuild:

| Rule | What it prevents at the port |
|---|---|
| All layout in CSS classes, not inline | Divi **strips baked Layout Style** on import; classes survive |
| One clean element per logical block | TinyMCE **mangles nested HTML** when the client edits a Text module |
| Hidden motion states in JS, reduced-motion-gated | reduced-motion users get **stranded blank content** otherwise |
| Hero as a row **background**, not `<img>` | ports as an **editable Row background** with a locked aspect |
| Forms/iframes isolated | a Text module **kses-strips** them; they stay Code modules |

## Do's

- **DO** carry **all** layout (flex/grid/spacing) in the `ggis-` classes — never
  inline — so the classes still render the design after Divi strips baked layout.
- **DO** keep **one clean element per logical block** and promote inline
  spans/icons to block elements — future Builder edits don't mangle it.
- **DO** set initial (hidden) motion states in JS inside a
  `prefers-reduced-motion: no-preference` branch — never a bare `opacity:0` class.
- **DO** put full-bleed/hero images as a row/section background + a locked-aspect
  class, and keep content in markup (not generated in JS) so the port maps 1:1.
- **DO** serve over http and verify motion, responsive, and reduced-motion before
  handing to **06**.

## Don'ts

- **DON'T** put `<form>` or `<iframe>` inline in prose blocks — isolate them; they
  stay Code modules.
- **DON'T** use IDs or utility-class soup for layout — semantic sections +
  prefixed classes port cleanly; ad-hoc utilities don't.
- **DON'T** ship a webfont you can't bundle into the child theme (**06**).
- **DON'T** let the static build and the port diverge later — when a pattern or
  motion changes, change **this** source and re-generate the JSON.
