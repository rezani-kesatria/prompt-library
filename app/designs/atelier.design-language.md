# TENON — Furniture & Objects Atelier

**Design mood:** dark editorial craft · 15px root on a 3.75px grid · hue-only accent · zero radius except pill CTAs

| | |
|---|---|
| **Source** | **ORIGINAL DESIGN.** Content, copy and layout are ours. The *design language* was extracted from [unanim.studio](https://unanim.studio) (Braine-l'Alleud, Belgium) — see [credits](CREDITS.md) |
| **Recreation** | [`atelier.html`](atelier.html) — dark (native only) |
| **Format** | rules measured live in-browser from the DOM, not from a screenshot |
| **Palette** | canvas/ink/muted measured from the source; **accent is a slot, supplied by the brand** |

> **The library's first original reference.** Every other design here recreates someone else's page. This one applies a studied rule set to new content, which makes it the only spec whose payload was **written before the page existed** — and therefore the only one proven to carry a design on its own.

> ⚠️ **The source is a live site, not a static shot.** That means the anatomy is honest — real nav, real responsive behaviour, real footer — but also that the hero's centrepiece is a **pre-rendered MP4 loop we do not have**. The loop is *content*. The rule is "a single dark abstract form behind the manifesto, no hard edge." Do not treat the specific mesh as a token.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (measured off the source), **`inferred`**, or **`authored`** (our decision for this atelier). Measurements are **CSS px at a 15px root**.

---

# Core dimensions

## 0 · Signature 🔒 `observed` — **a 15px root on a 3.75px grid**

The single most important number in this design, and the one nobody guesses.

**`html { font-size: 15px }`** — not 16. Every spacing value is a multiple of **3.75px**, which is `0.25rem` at that root. Measured gaps on the source: `3.75 · 7.5 · 11.25 · 15 · 18.75 · 52.5`. All exact multiples.

> Most of the web is on a 4px or 8px grid. This is on 3.75. Build it on 4px and every measurement lands *almost* right — which is precisely why the result feels off without anyone being able to say where. **Set the root to 15px and express all spacing in `rem`**; the grid then maintains itself.

## 1 · Tone system 🔒 `observed` — **three neutrals, one accent slot**

| Token | Value | Job |
|---|---|---|
| canvas | `#121212` | the page |
| ink | `#EFEFEB` | all body and display text |
| muted | `#979788` | secondary text, metadata, rules |
| accent | *slot — see §2* | micro-labels + primary CTA fill **only** |

**The ink is a warm off-white and is NEVER pure white.** `#EFEFEB` against `#121212` measures **16.25:1**. Swapping in `#FFFFFF` is the fastest way to make this design look cheap — the warmth is what keeps a near-black page from reading as a terminal.

**The muted tone is a warm grey-olive, not a neutral grey.** `#979788` carries the same warmth as the ink one step down.

## 2 · The accent slot 🔑 🔒 `observed` — **matched luminance, hue-only separation**

**The accent is not a colour in this design language. It is a role the brand fills.**

The measured rule, and the best thing this source has to teach: on unanim.studio the accent sits at a **1.03 contrast ratio against the ink** — effectively *identical brightness*. It separates from the ink by **hue alone**.

That is why the page reads as calm. Nothing competes for brightness hierarchy; there is exactly one luminance for "text," and the accent is a hue shift inside it.

Constraints for anything entering the slot:

| Constraint | Value |
|---|---|
| against canvas | **≥ 15:1** (the ink itself is 16.25:1) |
| against ink | **≤ 1.1** — matched luminance |
| separation | **hue only**, never brightness |
| usage | micro-labels and the primary CTA fill. Never a large area fill. |

**A brand colour dropped into this slot unmodified will break it.** Most brand colours are chosen to contrast against white and are far too dark. Tint the brand hue up until it clears the luminance floor, then use it.

**If the brand has no accent, do not invent one.** The role collapses to the ink colour and the design still works — precisely *because* the accent already sits at ink luminance. The page degrades to monochrome with **zero layout change**. Treat that as a conformance test, not a fallback.

**For TENON** 🎨 `authored`: `#FBE9CB` — shellac amber. Measured **15.72:1** on canvas, **1.03 vs ink** — the same structural relationship the source uses, referencing french polish and brass hardware.

## 3 · Radius 🔒 `observed` — **zero, except pill CTAs**

`border-radius: 0` on everything structural — sections, media, the works index, quadrant panels, the footer. The **only** exceptions are `9999px` pills: the primary CTA and the pinned menu. Two states, no middle ground. There is no 4px, no 8px, no "slightly rounded card" anywhere.

## 4 · Typography 🔒 rules · 🎨 face `observed`

**A high-contrast display serif against a neutral neo-grotesque.** Two families, no third.

| Role | Rule |
|---|---|
| Display | serif, weight **400**, line-height **1.1**, **no tracking**, fluid ~4.9–7.5rem |
| Body / UI | neo-grotesque, **1rem = 15px** base |
| Micro-label | see §5 |

**Line-height 1.1 on the display is structural.** The manifesto is meant to read as a dense typographic block, not airy marketing copy. At 1.4 it falls apart.

**The display serif is set at weight 400 and never bolded.** Contrast comes from the typeface's own thick/thin modulation, not from weight.

> 🎨 The source uses **Cardinal Fruit** + **Helvetica Now Display** — both commercially licensed. Free substitutes that hold the same relationship: **Instrument Serif** (display) + **Instrument Sans** (UI). **Name the substitutes explicitly in any prompt** — a generic "high-contrast serif" instruction silently falls back to Times.

## 5 · Micro-label grammar 🔑 🔒 `observed` — **`( PARENTHETICAL UPPERCASE )`**

Every eyebrow, section marker, year stamp and footer heading uses **one** device:

    ( TENON.STUDIO )    ( THE WORKSHOP )    ( @2024 )    ( SOCIAL )    ( CONTACT )

| Property | Value |
|---|---|
| size | `0.6875rem` (10.3125px) |
| tracking | `0.025em` |
| transform | uppercase |
| colour | **accent, always** |
| brackets | literal parentheses, with a space inside each |

**This is the only eyebrow device in the design.** No small-caps headings, no numbered chips, no coloured tags, no icon+label pairs. When something needs a label, it gets parentheses. The consistency is the identity — and it is also what makes the accent legible as a *system* rather than decoration, because the accent appears nowhere else except the CTA.

## 6 · Component anatomy 🔒 `observed`

> The dimension that cost us 20% on the last transfer test. These describe how parts are **assembled**, not how they look.

**THE QUADRANT GRID IS TWO CROSSING HAIRLINES — NOT FOUR CARDS.**
The disciplines section is a 2×2 grid divided by a **full-bleed cross**: one horizontal rule and one vertical rule, each running edge to edge of the section. The quadrants themselves have **no borders, no backgrounds, no gutters** — they are just content positioned in the four regions the cross creates. The **brand mark sits centred on the intersection**, in a filled circular badge that masks the lines passing behind it. Rendering this as four bordered cards with a gap is the single most likely failure.

**THE FIRST LINE OF THE MANIFESTO IS INDENTED TO CLEAR ITS LABEL.**
The `( LABEL )` sits at the far left of the manifesto's first line, and that line alone is indented past it. Every subsequent line returns to the left margin. The label is not stacked above the heading — it is inline with its first line.

**THE PRIMARY NAV IS A PINNED PILL AT BOTTOM CENTRE — NOT A TOP NAV BAR.**
The top of the page carries only three things: a full-width ticker strip, the brand mark **centred**, and a single CTA pill at the right. There is no horizontal nav list up there. Navigation is a fixed pill at the **bottom centre** of the viewport that persists through scroll.

**THE WORKS INDEX IS A METADATA TABLE, NOT A CARD GRID.** 🎚 `authored`
*This is where our content legitimately diverges from the source.* The source shows four full-bleed video-backed project cards. A furniture atelier's work carries material, dimensions, edition and year — that is an **index**. Rows of `name · material · dimensions · edition · year`, separated by hairlines, with the image revealed on row hover. Keeping the source's video-card component here would be cargo-culting.

**SECTION DIVIDERS ARE HAIRLINES IN THE MUTED TONE AT LOW ALPHA — NEVER A TONE STEP.**
There is no second surface colour in this design. Structure is drawn with 1px rules, not with panels. Nothing is ever a lighter grey box on the canvas.

## 7 · Spacing 🔒 model · 🎚 magnitude `observed`

All values are multiples of `0.25rem` (3.75px). Observed section rhythm: **`5rem` / `4rem`** vertical padding (75px/60px) on major sections; gutter `1.25rem` (18.75px); tight pairs at `0.5rem` (7.5px).

> Generous. The source runs a near-black page with a great deal of air, and compressing it is the second most common way to miss this design after getting the grid wrong.

## 8 · Elevation 🔒 `observed`
**None.** No shadows on anything, including the pinned pill. **10/10 across the library** — a genuine constant of this aesthetic.

## 9 · Media & rendering 🔒 `observed`
**Zero WebGL. Zero `<canvas>`.** Verified on the source: `canvas` count is **0**, no THREE.js. The hero's abstract form is a looping MP4 used as a texture; everything else is DOM.

> This matters because "dark studio site with an organic form" reads as a WebGL brief and is not one. Do not reach for a 3D library. 🎚 `authored`: we render the hero form with **CSS/SVG and a slow drift**, keeping the file free of binary assets.

**Media is full-bleed and hard-edged** — no radius, no border, no inset frame. Where an image meets the canvas it simply stops.

## 10 · Theme 🔒 `observed`
**Dark-native, and dark only.** This is the first reference in the library with no light theme, and that is deliberate rather than unfinished: the entire tone system is built on a warm off-white *floating on* near-black, and the accent's matched-luminance rule has no meaning against a light canvas. Inverting it produces a different design, not a light variant.

---

# Motion brief 🔒 grammar · 🎚 magnitude — GSAP · ScrollTrigger · Lenis · Motion

> **The first spec in this library with motion as a FIXED dimension.** On the other nine, motion decorates a layout that already works. Here it is load-bearing: the source's identity is substantially in how type arrives. A pixel-perfect static build of this design reads as dead.

**THE MANIFESTO ARRIVES PER-CHARACTER.** Verified in the source DOM — the statement is split into one `<span>` per character. Each letter rises and fades in on a short stagger, so the sentence *assembles* rather than appearing. This is the design's signature moment.

| Parameter | Value |
|---|---|
| split unit | **character** (not word, not line) |
| per-char stagger | ~`0.012s` |
| per-char duration | ~`0.6s` |
| transform | `y: 0.6em → 0`, `opacity: 0 → 1` |
| ease | `power3.out` |

**Everything else is restrained.** Sections fade and rise `1rem` on a ScrollTrigger as they enter. The quadrant cross **draws** — the two hairlines scale from their centre outward — and the badge scales in after them. The works index staggers by row.

**Lenis is tuned long here (~1.1s)**, the opposite of the dashboards. This is a page to drift down, not to scan; the inertia is part of the calm.

**Motion handles hover/press springs** on the CTA pill and the works rows.

### ⚠️ Implementation traps

1. **`gsap.from({opacity:0})` against a CSS pre-hide is a no-op** — `.from()` tweens *to* the element's current computed value, which is also 0. Use **`fromTo()`** with explicit end values.
2. **Every pre-hidden selector must be animated back.** One forgotten `[data-r]` stays invisible forever. Drop the pre-hide class on timeline complete as a structural guard.
3. **A per-character split destroys text selection and screen-reader flow.** Keep the original string on the parent as `aria-label` and mark the split spans `aria-hidden="true"`.
4. **Splitting on `.split("")` breaks emoji, accents and combining marks.** Use `Array.from()`, and never split across an element boundary.
5. **A `transform` left on an element by GSAP creates a stacking context** that can trap the pinned pill or a dropdown beneath later content. `clearProps:"transform"` when a timeline completes.
6. **Do not animate the ticker with JS.** A CSS `translateX` loop on a duplicated track is smoother and survives tab-throttling.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- A DARK-NATIVE EDITORIAL CRAFT SITE — a maker's studio homepage. Order: ticker strip → centred
  mark with one CTA pill → full-height manifesto → 2x2 discipline quadrants → works index →
  workshop → notes → footer. Plus a nav pill pinned at BOTTOM CENTRE.
- ⚠️ SET THE ROOT FONT-SIZE TO 15px, NOT 16px, and express ALL spacing in rem. Every spacing value
  must be a multiple of 3.75px (= 0.25rem at that root): 3.75 / 7.5 / 11.25 / 15 / 18.75 / 52.5.
  This design is NOT on a 4px or 8px grid. Building it on 4px lands everything ALMOST right, which
  is exactly why the result feels wrong without anyone being able to say where.
- THREE NEUTRALS AND ONE ACCENT SLOT: canvas #121212, ink #EFEFEB, muted #979788.
- ⚠️ THE INK IS A WARM OFF-WHITE AND IS NEVER PURE WHITE. #FFFFFF is the fastest way to make this
  look cheap — the warmth is what stops a near-black page reading as a terminal. The muted tone is
  a warm grey-OLIVE, not a neutral grey.
- ⚠️ THE ACCENT IS A SLOT THE BRAND FILLS, AND IT SEPARATES FROM THE INK BY HUE ONLY — NOT BY
  BRIGHTNESS. It must sit at MATCHED LUMINANCE with the ink: >=15:1 against the canvas, and <=1.1
  contrast against the ink. Most brand colours are picked to contrast against white and are far too
  dark — TINT THE BRAND HUE UP until it clears that floor, then use it. The accent appears in
  EXACTLY TWO PLACES: the micro-labels and the primary CTA fill. Never a large area fill.
  IF THE BRAND HAS NO ACCENT, DO NOT INVENT ONE — collapse the role to the ink colour. The design
  still works, because the accent was already at ink luminance. It must degrade to monochrome with
  ZERO layout change.
- ⚠️ BORDER-RADIUS IS 0 ON EVERYTHING STRUCTURAL — sections, media, index rows, quadrants, footer.
  The ONLY exceptions are 9999px PILLS: the primary CTA and the pinned nav. Two states, no middle
  ground. No 4px, no 8px, no "slightly rounded card" anywhere.
- TYPOGRAPHY — TWO FAMILIES, NO THIRD. A high-contrast DISPLAY SERIF at WEIGHT 400, LINE-HEIGHT 1.1,
  NO TRACKING, fluid ~4.9-7.5rem; and a neutral NEO-GROTESQUE for body/UI at 1rem = 15px.
  Line-height 1.1 is structural — the manifesto is a dense typographic block, not airy marketing
  copy, and at 1.4 it falls apart. NEVER BOLD THE SERIF: contrast comes from the typeface's own
  thick/thin modulation, not from weight. USE INSTRUMENT SERIF (display) + INSTRUMENT SANS (UI) —
  name them explicitly; "a high-contrast serif" silently falls back to Times.
- ⚠️ MICRO-LABEL GRAMMAR — THE ONLY EYEBROW DEVICE IN THE DESIGN. Every eyebrow, section marker,
  year stamp and footer heading is a LITERAL PARENTHETICAL: ( LIKE THIS ) — uppercase, 0.6875rem,
  0.025em tracking, ALWAYS in the accent colour, with a space inside each bracket. NO small-caps
  headings, NO numbered chips, NO coloured tags, NO icon+label pairs. When something needs a label,
  it gets parentheses. This consistency IS the identity, and it is what makes the accent read as a
  system rather than decoration.
- COMPONENT ANATOMY — get these wrong and it reads as a different site:
  · THE QUADRANT GRID IS **TWO CROSSING HAIRLINES, NOT FOUR CARDS**. One horizontal and one vertical
    rule, each running FULL-BLEED edge to edge of the section. The quadrants have NO borders, NO
    backgrounds and NO gutters — they are just content placed in the four regions the cross makes.
    THE BRAND MARK SITS CENTRED ON THE INTERSECTION in a filled circular badge that masks the lines
    behind it. Rendering this as four bordered cards with a gap is the most likely failure.
  · THE FIRST LINE OF THE MANIFESTO IS INDENTED TO CLEAR ITS LABEL. The ( LABEL ) sits at the far
    left, INLINE WITH THE FIRST LINE — not stacked above the heading. Only that line is indented;
    every later line returns to the left margin.
  · THE PRIMARY NAV IS A PILL PINNED AT BOTTOM CENTRE, NOT A TOP NAV BAR. The top carries ONLY a
    ticker strip, the CENTRED brand mark, and ONE CTA pill at the right. There is no horizontal nav
    list up there.
  · THE WORKS INDEX IS A METADATA TABLE, NOT A CARD GRID: rows of name / material / dimensions /
    edition / year separated by hairlines, image revealed on row hover.
  · SECTION DIVIDERS ARE HAIRLINES IN THE MUTED TONE AT LOW ALPHA — NEVER A TONE STEP. There is no
    second surface colour. Structure is drawn with 1px rules, never with panels. Nothing is ever a
    lighter grey box on the canvas.
- SPACING, AND BE GENEROUS: 5rem/4rem vertical padding on major sections, 1.25rem gutters, 0.5rem
  tight pairs. Compressing this is the second most common way to miss the design.
- ZERO ELEVATION. No shadows on anything, including the pinned pill.
- ⚠️ ZERO WEBGL AND ZERO <canvas>. A dark studio site with an organic form READS as a WebGL brief
  and is NOT one. The hero's abstract form is rendered with CSS/SVG on a slow drift. Do not reach
  for a 3D library.
- MEDIA IS FULL-BLEED AND HARD-EDGED — no radius, no border, no inset frame. Where an image meets
  the canvas it simply stops.
- DARK ONLY. Do not build a light theme. The tone system is warm off-white floating on near-black
  and the accent's matched-luminance rule has no meaning on a light canvas — inverting it produces
  a different design, not a light variant.

MOTION (load-bearing here, not decoration — a static build of this reads as dead):
- ⚠️ THE MANIFESTO ARRIVES PER-CHARACTER. Split the statement into ONE SPAN PER CHARACTER and
  stagger them so the sentence ASSEMBLES rather than appears. This is the signature moment:
  stagger ~0.012s, duration ~0.6s, y 0.6em -> 0, opacity 0 -> 1, ease power3.out. Split by
  CHARACTER — not word, not line.
- Keep the original string as aria-label on the parent and mark the split spans aria-hidden="true",
  or you destroy text selection and screen-reader flow. Use Array.from(), never .split(""), or you
  break accents and combining marks.
- Everything else is restrained: sections fade and rise 1rem on a ScrollTrigger as they enter.
- THE QUADRANT CROSS DRAWS — both hairlines scale from their centre outward — and the badge scales
  in after them. The works index staggers by row.
- LENIS TUNED LONG (~1.1s). This is a page to drift down, not to scan; the inertia is part of the
  calm. (The dashboards in this library tune it short — do not copy that here.)
- Use GSAP + ScrollTrigger + Lenis + Motion. Never hand-roll CSS transitions for this.
- Animate the ticker with a CSS translateX loop on a duplicated track, not with JS — smoother and
  it survives tab-throttling.
- gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP — .from() tweens TO the current computed
  value, which is also 0. Use fromTo() with explicit end values. Every pre-hidden selector must be
  animated back, and drop the pre-hide class on complete as a guard.
- clearProps:"transform" when a timeline completes — a leftover transform creates a stacking context
  that traps the pinned pill beneath later content.

ICONS: LUCIDE (the set shadcn/ui ships), stroke-width 1.5 at this scale. Never hand-draw icon paths.
```
