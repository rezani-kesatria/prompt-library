# EcoVolt — Solar Energy Landing Page

**Design mood:** clean utility-tech · two-tone typography · blue-accent white

| | |
|---|---|
| **Source** | Dribbble — *"Ecovolt – Solar Energy Landing Page"*, **Irfanaffian** for One Week Wonders — [`/shots/25062959`](https://dribbble.com/shots/25062959-Ecovolt-Solar-Energy-Landing-Page) · [credits](CREDITS.md) |
| **Recreation** | [`solar.html`](solar.html) — light + dark |
| **Format** | **25.5s video walkthrough**, 1440×1080 |
| **Palette / description** | none published; everything read off the video |

> ⚠️ **Source-finding notes.** (1) The shot is a **video**, not a still — the "image" on the page is only its poster frame. (2) Dribbble serves shots by **ID, ignoring the slug**, so a stale URL can silently return a completely different design: `/shots/25111403-Ecovolt-…` now returns *PureGlow – Skincare*. (3) The main media lives in a `<video>` / `<source srcset>`, **not** an `<img src>` — the `<img>` tags on a shot page are "More by" thumbnails.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (read off the source video — binding), **`inferred`** (proposal, overrulable), or **`authored`** (deliberately added, not present in the source).

---

# Core dimensions

## 0 · Intent 🔒 `observed`
**Conversion-led consumer solar marketing.** Everything funnels toward *"Get Solar Estimate" / "Custom Estimate"*, with a savings calculator as the headline feature and heavy trust-building around it (user count, testimonials, press logos).

## 1 · Signature 🔒 `observed` — **two-tone headlines**
Headlines mix **dark and grey words inside the same sentence**, the grey carrying the non-essential words:

> **Go Solar, Save More:** *Clean and Renewable* **Energy** *for a Brighter Tomorrow*
> **Solar energy systems reduce carbon emissions by over 3,000** *pounds per year*

This is the identifying feature. It does the emphasis work that bold weight would normally do — which is why **every heading can sit at a light weight (500)** and still read with hierarchy.

Use it as **one deliberate drop per headline**, not alternating bands.

## 2 · Colour space 🔒 rules · 🎨 hues `observed`
White canvas · near-black ink · **one royal-blue accent** on CTAs, labels and icon badges · a distinct **grey** for the second tone of headlines · warm photography supplying all other colour. Flat, **no gradients**.

## 3 · Separation 🔒 `observed` — **hairlines in both directions**
Column groups are divided by **vertical 1px rules**; sections by **horizontal 1px rules**. Both run **full bleed**, edge to edge across the viewport — only the *content* inside them is padded.

> Directly contradicts Art Course, which uses **bottom borders only and no vertical rules**. Two references, opposite answers → border *direction* is a genuinely contested dimension, not a constant.

**Exception 🔒 `observed`:** the two dark blocks (testimonials/press → footer → marquee) carry **no rule between them**. They read as one continuous dark field, not three stacked sections.

## 4 · Elevation 🔒 `observed`
None. Flat throughout. No shadows anywhere, including on the floating nav pill.

## 5 · Geometry 🔒 `observed`
- **Photo cards** — large radius (`clamp(16px,1.8vw,26px)`)
- **Buttons** — pills
- **Icon badges** — perfect circles, each with a small dot indicator
- **Stat rings** — large **dashed circles**, with the badge overlapping the ring's base by half its own height
- **Everything structural** — the section blocks, the dark fields, the marquee — carries **no radius at all**

## 6 · Composition 🔒 `observed` — **full bleed, inset by padding**
**FULL viewport width, no max-width.** The inset comes from **inside padding on the container** — *not* from a narrower column. `width:100%; padding-inline: clamp(18px,4vw,76px)`.

**NO MARGINS ANYWHERE.** Everything is separated by **borders and solid background blocks**. This applies to the *light* sections just as much as the dark ones: About Us, the calculator heading band and the Property Type → Current Shades row are **all full bleed**, with their borders running edge to edge and only their contents padded.

> The distinction matters: a 95%-wide centred column and a 100%-wide container with padding look similar at one viewport and diverge everywhere else. This design is the latter.

**⚠️ Corollary 🔒 — the stacking trap.** Because the entire inset lives in padding, a grid cell that sits *inside* a padded container needs no horizontal padding of its own — until the columns collapse on mobile, at which point that cell becomes the outermost box and its content goes flush to the viewport edge. **Every cell that stacks must re-apply the container's inside padding at the breakpoint.** This is a direct and non-obvious consequence of the zero-margin model, and it is silent: nothing overflows, the page just loses its inset.

## 7 · Typography 🔒 `observed`
Large **sentence-case** sans (not all-caps, unlike Art Course), **weight 500** throughout, tight tracking (`-.03em`). The two-tone device carries emphasis, so weight never needs to.

## 8 · Section heading bands 🔒 `observed`
A section title sits in its **own tall full-bleed band** above the content it introduces, paired with a circular icon button on the far right. The band's height comes from **bottom padding** — heading and button are pinned to the **top**, never optically centred. Generous: the empty space below the title is roughly twice the title's own height.

## 9 · Nav behaviour 🎚 `authored`
The source nav does not scroll. The recreation makes it **sticky and direction-aware** ("headroom"): it slides away on scroll-down and returns immediately on scroll-up, staying **fully transparent** — the pill floats over the content and never grows a band or a rule beneath it.

> **This dimension is newly contested.** None of the other four references in the library have a sticky nav at all. Record nav behaviour explicitly from now on: *static in flow* / *always sticky* / *direction-aware* / *transparent vs banded when stuck*.

## 10 · Distinctive components 🔒 `observed` unless noted
- **Floating pill nav** — deliberately **narrow and centred**, not full-width. Burger + wordmark, then a pill group. **The current page is a SOLID BLACK pill**; the other items are white circles on the grey bar
- **Oversized stat** using the two-tone device at display scale — `450` in accent, `K` in ink
- **Column labels with a trailing accent arrow** above each calculator ring
- **Dashed rings** around stat labels, with a circular icon badge overlapping the ring's base
- **Carousel prev/next** circular buttons — one accent (active), one ghost
- **Avatar cluster + "23K User"** social proof above the headline, centre avatar enlarged
- **Overlapping avatar stack** as closing social proof, each avatar ringed in the block's own background colour, sat beside the "Read More Reviews" CTA — *not* a single photo block
- **Press logo bar** — real brand SVGs, knocked to a single colour at low opacity, in a **tight centred cluster** (never spread edge to edge)
- **Paired CTA** — filled pill + circular arrow button, used consistently
- **A giant marquee closes the page**, below the footer, **on the same dark field** — at display scale
- **A data chart in the about column** `authored` — see the rule below

### ⚠️ Rule of thumb — illegible micro-widgets in a reference
The source's about-column contains a small dashboard mockup whose labels are placeholder noise at video resolution (`73%`, `Roof Old`, a bar strip, a vertical edge label). **Do not trace an unreadable widget.** Replace it with a **contextually meaningful equivalent built from the same tokens** — here, a *"Average monthly bill — before vs after installation"* twelve-month bar chart with the `73%` recovered as a real figure ("average reduction in the first year"). Same hairlines, same accent, same zero radius, same flatness; the widget now carries information instead of imitating the shape of information.

This is the sibling of the *separate the screenshot from the design* rule: there, you discard the mockup's **styling**; here, you discard its **content** and keep its **slot**.

## 11 · Theme 🔒 both required
Light-native `observed`; dark is a token re-skin `inferred`. The dark blocks **invert to light** in dark mode, as every other design in this library does.

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FFFFFF` | `#0A0B0C` |
| `--surface` *(nav pill)* | `#F2F3F5` | `#15171A` |
| `--ink` | `#0B0B0C` | `#F2F3F5` |
| `--ink-2` *(body copy)* | `#54585F` | `#B2B7BE` |
| `--muted` *(2nd tone)* | `#B9BDC4` | `#5F646C` |
| `--line` | `rgba(11,11,12,.12)` | `rgba(242,243,245,.14)` |
| `--accent` | `#2F5BFF` | `#5B7BFF` |
| `--dark` *(blocks)* | `#080809` | `#F2F3F5` ← inverts |

## 12 · Section rhythm 🔒 `observed`
sticky nav → hero (avatars → proof line → two-tone headline → CTA pair) → wide photo card → about split (copy + oversized stat + chart) → calculator heading band → stats row + calculator CTA → **dark testimonials + press bar → dark footer → dark marquee**, with no rules between the three dark blocks.

---

# Motion brief 🔒 — the only design in the library read from **real motion**

Every other design's motion was inferred from a still. Here the source is a video, so the `observed` rules are **binding**. The rest is authored from the library's standing rule: *derive motion from hierarchy — what carries the message arrives last and arrives loudest.*

**Character `observed`** — staggered, calm, precise. Elements arrive at partial opacity and slightly under-scale, then settle. **Never slide far.** Nothing bounces or overshoots except round objects, which get a slight overshoot curve. A marquee ticker runs continuously.

**Signature `observed` — the circular button ROLLS OUT from behind its pill.** It starts hidden *behind* the filled pill (z-index below it), offset left, rotated ~-300° and under-scaled, then spins into its final position a beat after the pair lands. This is the one motion detail that identifies the design; it applies to every filled-pill + circle pair, and to the lone circle beside a section heading.

**Per-element treatment `authored`:**

| Element type | Treatment |
|---|---|
| Display headings | **Word rise** — each word rises from behind its own baseline, ~42ms apart |
| Imagery | **Wipe** — the picture opens upward while settling out of a ~1.09 over-scale |
| Charts / data | Bars **grow off the baseline**; the "before" series sweeps first, the "after" series follows ~300ms behind, the summary figure lands last — the saving reads as a second beat |
| Rings | **Unwind** into place (under-scaled and rotated), then the badge lands on the overshoot curve |
| Peer sets (avatars, logos, footer columns) | **Stagger** in reading order, ~70ms apart; round peers pop rather than rise |
| Supporting blocks | Quiet fade + rise |

All of it is **scroll-triggered**, once, and fully disabled under `prefers-reduced-motion`.

### ⚠️ Implementation gotcha — the clip-path / IntersectionObserver deadlock
A wipe implemented as `clip-path: inset(0 0 100%)` **on the observed element itself** collapses its intersection rect to zero area, so IntersectionObserver never reports it as intersecting and the reveal never fires. The hidden state hides the element from the observer meant to reveal it. It fails silently — no error, just a permanently blank space. **Put the clip on an inner child** and let the frame's own `overflow:hidden` do the masking.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- Conversion-led consumer solar marketing page. Everything funnels to a "Get Estimate" CTA, with a
  savings calculator as the headline feature and trust-building around it.
- SIGNATURE: TWO-TONE HEADLINES. Mix dark and grey words inside the SAME sentence, the grey carrying
  the non-essential words ("Go Solar, Save More:" dark / "Clean and Renewable" grey / "Energy" dark).
  ONE deliberate grey drop per headline, not alternating bands. This device does the emphasis work
  bold weight normally would.
- Because of that, EVERY heading sits at a LIGHT weight (500), sentence case, tight tracking — never
  all-caps, never bold. Hierarchy comes from scale and the two-tone device.
- Colour: white canvas, near-black ink, ONE royal-blue accent on CTAs/labels/icon badges, plus a
  distinct grey for the headline's second tone. Flat colour, NO gradients.
- Width: FULL viewport, no max-width. The inset comes from INSIDE PADDING on the container, never
  from a narrower centred column.
- NO MARGINS ANYWHERE. Separate everything with BORDERS and SOLID BACKGROUND BLOCKS: horizontal 1px
  rules between sections, vertical 1px rules between column groups. EVERY section is FULL BLEED —
  the light ones too — with the rules running edge to edge and only the contents padded.
- Because the whole inset lives in padding, EVERY grid cell that collapses to full width on mobile
  MUST re-apply the container's inside padding at the breakpoint, or its content goes flush to the
  viewport edge. This failure is silent — nothing overflows, the page just loses its inset.
- ZERO elevation. No shadows, including under the floating nav.
- Geometry: large radius (~16-26px) on photo cards ONLY; PILL buttons; PERFECT-CIRCLE icon badges
  each with a small dot indicator; LARGE DASHED circular rings around stat labels with the badge
  overlapping the ring's base by half its own height. Structural blocks carry NO radius at all.
- Section titles sit in their own TALL full-bleed band with a circular icon button on the far right.
  The band's height comes from BOTTOM padding — title and button pinned to the TOP, never centred.
- Punctuate with FULL-BLEED DARK BLOCKS: testimonials + press bar, footer, and the closing marquee.
  NO rule between them — they read as ONE continuous dark field.
- Components: a DELIBERATELY NARROW, CENTRED pill nav (burger + wordmark, then a pill group) where
  the CURRENT PAGE IS A SOLID BLACK PILL and the other items are white circles; an avatar cluster
  with a "23K User" social-proof line above the headline, centre avatar enlarged; an OVERSIZED STAT
  using the two-tone device at display scale (number in accent, unit in ink); a data chart built
  from the same hairlines and accent; column labels with a trailing accent arrow above each ring;
  carousel prev/next circular buttons (one accent, one ghost); a TIGHT CENTRED cluster of press
  logos knocked to one colour at low opacity; an OVERLAPPING AVATAR STACK beside the closing CTA,
  each avatar ringed in the block's own background colour; a paired CTA of filled pill + circular
  arrow used throughout; and A GIANT MARQUEE CLOSING THE PAGE on the same dark field.
- The nav is STICKY and DIRECTION-AWARE ("headroom"): it slides away on scroll-down and returns
  immediately on scroll-up, staying FULLY TRANSPARENT — no band, no rule beneath it when stuck.
- If the reference contains a small widget whose labels are illegible, do NOT trace it. Replace it
  with a contextually meaningful equivalent built from the SAME tokens — keep the slot, discard the
  content.
- Section order: nav / hero / wide photo card / about split / calculator heading band / stats row +
  calculator CTA / dark testimonials + press bar / dark footer / dark marquee.
- COMPONENT ANATOMY — where each part sits:
  · THE ABOUT SPLIT IS TWO CELLS OF ONE FULL-BLEED ROW divided by a vertical hairline: copy on the
    left, oversized stat + chart on the right. Not two cards with a gap.
  · THE CALCULATOR IS ONE FULL-BLEED ROW cut into four cells by vertical rules — three ring columns
    then the CTA column. The rules run the full row height; the cells are not cards.
  · THE TESTIMONIAL BLOCK, THE PRESS BAR, THE FOOTER AND THE MARQUEE ARE ONE CONTINUOUS DARK FIELD
    with NO rule between them. The press logos sit as a TIGHT CENTRED CLUSTER inside it, never
    spread edge to edge.
  · THE CLOSING MARQUEE IS BELOW THE FOOTER, on that same dark field, at display scale.
  · Section order: sticky nav / hero / wide photo card / about split / calculator heading band /
    calculator row / dark testimonials + press / dark footer / dark marquee.
- Ship BOTH themes; the dark blocks INVERT to light in dark mode.

MOTION (character and signature OBSERVED from the source video, not inferred):
- Calm, staggered, precise. Elements arrive at partial opacity and slightly under-scale, then
  settle. NEVER slide far. Nothing bounces except round objects, which get a slight overshoot.
- SIGNATURE: the circular button ROLLS OUT FROM BEHIND ITS PILL — hidden behind the filled pill
  (lower z-index), offset left, rotated ~-300deg and under-scaled, spinning into place a beat after
  the pair lands. Applies to every pill + circle pair.
- Display headings rise WORD BY WORD from behind their own baseline (~42ms apart).
- Imagery WIPES open upward while settling out of a ~1.09 over-scale.
- Chart bars GROW OFF THE BASELINE: the "before" series sweeps first, "after" follows ~300ms later,
  the summary figure lands last, so the saving reads as a second beat.
- Rings unwind into place, then their badges land on the overshoot curve.
- Peer sets (avatars, logos, footer columns) stagger ~70ms apart in reading order.
- A live marquee ticker runs continuously. All scroll-triggered, once, disabled under
  prefers-reduced-motion.
- IMPLEMENTATION: never put the wipe's clip-path on the element you are observing — inset(0 0 100%)
  collapses its intersection rect to zero and IntersectionObserver will never fire. Clip an inner
  child instead.

BUILD MOTION WITH REAL LIBRARIES, NEVER HAND-ROLLED CSS TRANSITIONS: GSAP + ScrollTrigger for the
reveal choreography, Lenis for smooth scroll, Motion (motion.dev) for hover/press springs. Two traps
that cost a debugging round each: gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP because
.from() tweens TO the current computed value, which is also 0 — use fromTo() with explicit end
values; and every pre-hidden selector must be animated back, so drop the pre-hide class on timeline
complete as a structural guard. Disable all of it under prefers-reduced-motion.

TUNABLE: padding/gap magnitude, motion intensity, breakpoints, nav scroll behaviour.
SWAPPABLE: logo, brand name, accent hue, typeface, photography.
```
