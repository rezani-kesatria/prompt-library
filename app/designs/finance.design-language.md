# Numéro — Finance Management Dashboard

> ## 🚩 FLAGGED — REVISIT BEFORE RELYING ON THIS
> **Status: provisional.** Held for another pass; treat every rule below as unconfirmed.
>
> Outstanding when this was parked:
> - **No visual audit was ever completed.** Everything here was verified by pixel scan and DOM measurement — the recreation was never compared side by side against the source. Numbers matching is not the same as it reading right.
> - Three specific reads never checked: the **donut's overlap** onto the System Lock stadium (an invented offset), the **concentric bubbles'** scale relative to their card, and whether **header row two** is as generous as the source.
> - The **presentation-frame error** was caught late (see below). Worth re-asking whether any other rule here was read off the poster rather than the product.
> - Dashboards are **on hold** as a category — this is the only one built, so its rules have not been cross-checked against a second dashboard and may be one designer's habits rather than the species' language.

**Design mood:** soft-geometric product UI · tint-ladder separation · coral on pure black

| | |
|---|---|
| **Source** | Dribbble — *"Finance Management Dashboard"*, **Bogdan Falin** for QClay — [`/shots/23245345`](https://dribbble.com/shots/23245345-Finance-Management-Dashboard) · [credits](CREDITS.md) |
| **Recreation** | [`finance.html`](finance.html) — light + dark |
| **Format** | single still, **3200 × 2400** (≈ @2x of a 1600-wide artboard) |
| **Palette / description** | none published; every value sampled from the source pixels |

> The first **product UI** in the library — everything before it is a marketing page or a catalog. It is the *analytics/overview* species of dashboard: glanceable widgets, no data table, no persistent navigation.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (read off the source — binding), **`inferred`** (proposal, overrulable), or **`authored`** (deliberately added, not present in the source).

Measurements below are quoted **logical** (÷2 from the 3200px export) and were taken by scanning pixel rows in the source, not estimated by eye.

---

# ⚠️ Read this before anything else

## The presentation frame is not the design 🔒 `observed`

The source shot is exported **already sitting on its poster**: the UI is inset ~10% on all four sides over a flat `#E1E1E1` field, with a large rounded corner on the outer rectangle.

**That framing belongs to the Dribbble presentation, not to the product.** The real design is full bleed — the app surface *is* the page.

*Concrete failure:* I built the first pass with a floating rounded shell inset from a grey backdrop, and recorded "floating app shell" as this design's standout new dimension. It would have gone into the prompt payload and instructed every downstream agent to build a frame that does not exist.

**The check:** before reading composition, ask whether the outermost rectangle belongs to the product or to the presentation. A shot centred on a flat colour field, with even margins on all four sides and a large outer radius, is almost always a poster mat. `#E1E1E1` is **not a token in this design.**

> This is the sibling of *separate the screenshot from the design* (Art Course), one level further out. There: the mockup **inside** the design is a different system. Here: the mat **around** the design is not part of it at all.

---

# Core dimensions

## 0 · Intent 🔒 `observed`
**Personal/business finance overview with an AI assistant.** Everything is glanceable — balances, totals, growth, activity. Nothing is a row you operate on. No table, no bulk actions, no multi-select. If the brief involves *working through* records rather than *reading* them, this is the wrong language.

## 1 · Composition 🔒 `observed`
**Full bleed.** No outer frame, no outer radius, no page inset. The only structural tone change is the header band against the content zone.

## 2 · Separation 🔒 `observed` — **a two-step tint ladder, no rules at all**

| Level | Light | Dark | Used for |
|---|---|---|---|
| **surface** | `#F8F8F8` | `#141414` | header band **and** cards — one shared tone |
| **paper** | `#FFFFFF` | `#1A1A1A` | content zone **and** inner panels — one shared tone |

Only two tones do all the structural work, and each is used for two different things. **Cards separate by GUTTER — there is not a single divider rule in the layout.** Hairlines exist only on interactive controls (dropdown pills, the date circle, chips, the delta pill, the action rail).

> Directly contradicts VITA and EcoVolt, where borders do everything and gutters do nothing. Border-vs-gutter is firmly a contested dimension.

## 3 · Elevation 🔒 `observed`
**Zero.** Not one shadow anywhere — not on cards, not on panels, not under the (non-existent) shell.

> ⚠️ **Elevation is now unanimous at 6/6 across the library.** By the lens's own rule — a dimension earns its slot by being *contested* — it has stopped being a per-design axis and should be demoted to a **global baseline constant** of this curated aesthetic. The same is now true of gradient (None ×6) and iconography (Line ×6).

## 4 · Geometry 🔒 `observed` — **a concentric radius ladder**
Radius steps down as you nest inward, and the steps are **mathematically tied to the frame width**, not chosen independently:

| Element | Logical radius |
|---|---|
| card | **34px** |
| inner panel | **32px** ( = card − frame ) |
| inner cards (nested one more level) | ~20px |
| buttons | full pill (`999px`) |
| icon badges, avatars, action circles | perfect circle |

Everything is heavily rounded. There is no sharp corner in the design.

## 5 · Signature 🔒 `observed` — **the framed panel**

The identifying component. A card is grey; a **white panel sits on it framed by a 2px sliver of the card's own grey on all four sides**; below the panel the grey opens out into a footer zone.

```
┌─ card  #F8F8F8 ────────────┐
│ ┌─ panel #FFFFFF ────────┐ │   ← 2px of grey on every side
│ │  primary content       │ │
│ └────────────────────────┘ │
│    footer content          │   ← the same grey, opened out
└────────────────────────────┘
```

Measured at the Visa card's left edge: `#FFFFFF` → `#F8F8F8` at x=352 → `#FFFFFF` at x=356. A **4px** band at native = **2px logical**, identical on the right and the top.

**That 2px frame is what makes the ladder legible.** Without it the panel reads as the card's top half and the two-tone anatomy collapses into one flat surface. It is the single easiest detail to omit and the most damaging.

## 6 · Grid 🔒 `observed` — **two independent columns that end flush**
A masonry mosaic, **not** a shared track grid: the right column's rows do not align to the left column's rows. But both columns **finish on the same baseline** — the last card in the shorter column absorbs the difference.

Content-region proportions:

| Region | Share |
|---|---|
| left region / right column | 74.1% / 24.5% |
| *row A:* action rail · card · card · stack | 3.8% · 28.7% · 28.6% · 9.3% |
| *row B:* bubbles · activity | 26.5% · 46.3% |

Gutter: **16px logical**, uniform.

## 7 · Colour space 🔒 rules · 🎨 hues `observed`
- **Ink is pure `#000000`** — not the near-black every other reference in the library uses. Deliberate and worth preserving.
- **ONE accent**, coral `#E16449`, spent on: primary CTA, currency glyphs, chart data, badges, links, the active pager dot.
- **Black is a SECOND action colour.** "Receive" is a solid black pill next to a coral primary CTA — a two-tier action system, not one accent plus neutrals.
- Muted `#B7B7B7` for labels. Flat throughout, **no gradients** — the only gradient in the design is a stroke *opacity* fade on one chart.

## 8 · Typography 🔒 rules · 🎨 face `observed`
Geometric grotesque, weights 500–600, tight tracking (`-.03em`). Labels muted and small; values large and near-black.
**The currency glyph is split from its number** — `$` in accent, digits in ink. Used on every monetary value without exception.

**Two-tone heading:** "Financial" in ink, "Dashboard" in muted, stacked.
> ⚠️ This is the same device EcoVolt's spec calls *"the identifying feature."* With two references using it, it is **no longer EcoVolt's signature** — demote it there to a shared pattern and let EcoVolt's identity rest on full-bleed-inset-by-padding.

## 9 · Circles as a component system 🔒 `observed`
> 🔒 **The rating scale is drawn as BARE ARCS, not as face icons.** Five curves from frowning to smiling, with no circle and no eyes. Lucide has direct equivalents (angry/frown/meh/smile/laugh) and the rest of this library is Lucide throughout — but those are circled faces, and substituting them changes the widget. **Reviewed and kept as arcs deliberately;** this is the one sanctioned exception to the Lucide rule.

One shape, three fills, used everywhere: **panel-filled** (menu, mic, dismiss), **hairline ghost** (add, calendar, search, tools), **solid** (the growth donut, the logo mark). Plus perfect-circle icon badges inside cards. Sizes vary; the shape never does.

## 10 · Data treatment 🔒 `observed` — **the richest in the library**

Nine distinct forms, no two alike:

| Form | Where |
|---|---|
| dot matrix / waffle | days elapsed |
| lollipop pins over a faint grid | year-on-year |
| concentric bubbles, bottom-anchored | annual profits |
| donut gauge on a solid black circle | growth rate |
| wave sparkline, opacity-faded at both ends | stocks |
| candlestick strip | transactions |
| connected timeline list | business plans |
| radial burst mark | wallet verification |
| face rating scale | review prompt |

**Charts BLEED past their container.** Lollipop stems run off the card's bottom edge; the wave runs the full card width and fades out at both ends rather than stopping inside padding. Data is not boxed by its card.

## 11 · Navigation 🔒 `observed`
**There is none.** A hamburger in the header and a slim hairline **action rail** (add, share) down the left of the content — not a nav sidebar. Do not add one; it changes the intent from "overview" to "workbench".

## 12 · Theme 🔒 both required
Light-native `observed`; dark is a token re-skin `authored`.

**The ladder does not invert — it holds direction.** The card is one step *darker* than the paper in both themes (`#F8F8F8` on `#FFFFFF`, `#141414` on `#1A1A1A`). Only the action colour flips: black on light, white on dark. This is a departure from the rest of the library, where dark blocks invert to light.

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#FFFFFF` | `#1A1A1A` |
| `--surface` | `#F8F8F8` | `#141414` |
| `--ink` | `#000000` | `#FFFFFF` |
| `--ink-2` | `#5A5A5A` | `#A2A2A2` |
| `--muted` | `#B7B7B7` | `#5E5E5E` |
| `--line` | `rgba(0,0,0,.11)` | `rgba(255,255,255,.13)` |
| `--accent` | `#E16449` | `#F07555` |
| `--solid` *(2nd action)* | `#000000` | `#FFFFFF` ← inverts |

---

# Motion brief 🎚 `authored`

The source is a still, so none of this is observed. Derived from the library's standing rule — *motion follows hierarchy; what carries the message arrives last.*

**A dashboard is read at a glance, so everything lands within one beat.** No scroll narrative, no long staggers. Order: header → cards in reading order (60ms apart) → then **each chart animates its own data last**, once its card has landed.

| Element | Treatment |
|---|---|
| cards | quiet fade + 14px rise |
| dot matrix | dots pop in sequence, 22ms apart |
| lollipop pins | stems grow down from the label; the current year lands after the past year |
| bubbles | scale up outermost-first, 90ms apart |
| donut | arc sweeps via `stroke-dashoffset` |
| wave | draws left → right |
| candlesticks | grow from the baseline |
| timeline | rows slide in from the left |
| faces | pop in sequence |

### ⚠️ Implementation note
A self-drawing path must take its `stroke-dasharray` from **`getTotalLength()` at runtime**. Hard-coding a value larger than the real path length wastes most of the timeline drawing nothing — my first pass used 2200 on a path measuring 540, so three-quarters of the animation played invisibly.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- An ANALYTICS/OVERVIEW product dashboard — glanceable widgets, not a working surface. NO data table,
  NO bulk actions, NO persistent nav sidebar. A hamburger in the header and a slim hairline ACTION
  RAIL (add, share) down the left of the content is the whole of the navigation.
- FULL BLEED. The app surface IS the page — no outer frame, no outer radius, no page inset.
  ⚠️ If you are working from a reference image, note that shots are often exported already sitting on
  a flat coloured mat with a large outer radius. That mat is the POSTER, not the product. Never turn
  a presentation frame into a layout rule.
- SEPARATION IS A TWO-STEP TINT LADDER AND NOTHING ELSE. Two tones do all the structural work, each
  used for two things: SURFACE (#F8F8F8) = header band AND cards; PAPER (#FFFFFF) = content zone AND
  inner panels. There is NOT ONE divider rule in the layout — cards separate by GUTTER only (16px).
  Hairlines appear ONLY on interactive controls: dropdown pills, chips, the date circle, the delta
  pill, the action rail.
- ZERO elevation. No shadows anywhere, on anything.
- SIGNATURE COMPONENT — THE FRAMED PANEL: a grey card carries a white panel framed by a 2px sliver of
  the card's own grey ON ALL FOUR SIDES, and below the panel the grey opens out into a footer zone.
  That 2px frame is what makes the ladder legible — without it the panel reads as the card's top half
  and the anatomy collapses. Do not omit it.
- Radius is a CONCENTRIC LADDER tied to that frame, not independently chosen: card 34px, inner panel
  32px (= card − frame), nested inner cards ~20px, buttons FULL PILLS, icon badges and action circles
  PERFECT CIRCLES. There is no sharp corner anywhere in the design.
- Grid: a MASONRY MOSAIC of two INDEPENDENT columns (74% / 24.5%) whose rows do NOT align to each
  other — but both columns END FLUSH on the same baseline; the last card in the shorter column
  absorbs the difference.
- Colour: ink is PURE #000000, not near-black. ONE coral accent on CTAs, currency glyphs, chart data,
  badges and links. BLACK IS A SECOND ACTION COLOUR — a solid black pill sits beside the coral primary
  CTA, a two-tier action system. Flat, NO gradients.
- Typography: geometric grotesque, weight 500-600, tight tracking. Labels muted and small, values
  large. THE CURRENCY GLYPH IS SPLIT FROM ITS NUMBER — "$" in accent, digits in ink, on every
  monetary value without exception. Headings may run two-tone (ink word + muted word).
- CIRCLES ARE A COMPONENT SYSTEM: one shape, three fills — panel-filled, hairline ghost, and solid.
  Menu, mic, dismiss, add, calendar, search, tools, icon badges, the logo mark, the growth gauge.
  Sizes vary; the shape never does.
- DATA IS THE POINT. Use a WIDE VOCABULARY of chart forms, no two alike — dot matrix, lollipop pins
  over a faint grid, bottom-anchored concentric bubbles, a donut gauge on a solid black circle, a
  wave sparkline opacity-faded at both ends, a candlestick strip, a connected timeline list, a radial
  burst, a face rating scale.
- CHARTS BLEED PAST THEIR CONTAINER — stems run off the card's bottom edge, the wave spans the full
  card width and fades out at both ends rather than stopping inside padding. Data is not boxed by
  its card.
- Ship BOTH themes; the black action colour INVERTS to white in dark mode.

- COMPONENT ANATOMY — where each part sits:
  · THE HEADER IS TWO ROWS, NOT ONE. Row 1: hamburger, circular mark, two-tone wordmark on the LEFT;
    then pushed RIGHT — an add button, the user avatar with name + role stacked, and a search field.
    Row 2: a large circular date badge, the day/month stacked beside it, a vertical hairline, the
    primary pill CTA, a calendar circle — then pushed RIGHT, the oversized greeting and a large
    circular voice button.
  · THE HEADER BAND AND THE CARD SURFACE ARE THE SAME TONE, so the header reads as chrome rather
    than as a card sitting on the page.
  · THE ACTION RAIL IS A NARROW HAIRLINE COLUMN down the LEFT of the content grid, holding two icon
    buttons. It is NOT navigation and must not gain labels or become a sidebar.
  · THERE IS NO FOOTER. The page ends on the content grid. Do not add one.
  · Section order: two-row header / bento grid (card row: rail, split card, split card, stacked
    stadium + donut · then bubbles card + activity card) — and nothing after it.

MOTION (authored — the source is a still):
- A dashboard is read at a glance, so EVERYTHING LANDS WITHIN ONE BEAT. No scroll narrative, no long
  staggers. Header, then cards in reading order ~60ms apart, then EACH CHART ANIMATES ITS OWN DATA
  last, once its card has landed.
- Dots pop in sequence; lollipop stems grow down with the current year landing after the past year;
  bubbles scale outermost-first; the donut arc sweeps; the wave draws left to right; candlesticks
  grow from the baseline; timeline rows slide in from the left.
- IMPLEMENTATION: a self-drawing path must take its stroke-dasharray from getTotalLength() at
  runtime. A hard-coded value longer than the real path wastes most of the timeline drawing nothing.

BUILD MOTION WITH REAL LIBRARIES, NEVER HAND-ROLLED CSS TRANSITIONS: GSAP + ScrollTrigger for the
reveal choreography, Lenis for smooth scroll, Motion (motion.dev) for hover/press springs. Two traps
that cost a debugging round each: gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP because
.from() tweens TO the current computed value, which is also 0 — use fromTo() with explicit end
values; and every pre-hidden selector must be animated back, so drop the pre-hide class on timeline
complete as a structural guard. Disable all of it under prefers-reduced-motion.

TUNABLE: padding/gap magnitude, motion intensity, breakpoints, chart data.
SWAPPABLE: logo, brand name, accent hue, typeface, avatar.
```
