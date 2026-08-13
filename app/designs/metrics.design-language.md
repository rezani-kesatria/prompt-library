# Metric — SaaS Growth Analytics Board

**Design mood:** dark-native analytics · zero radius · two tones doing three jobs

| | |
|---|---|
| **Source** | Dribbble — *"Dark Dashboard UI — SaaS Startup Metrics & Analytics Panel"*, **Igor Zeru** — [`/shots/27207977`](https://dribbble.com/shots/27207977-Dark-Dashboard-UI-SaaS-Startup-Metrics-Analytics-Panel) · [credits](CREDITS.md) |
| **Recreation** | [`metrics.html`](metrics.html) — dark (native) + light |
| **Format** | **two images**, 3200×2400 (a zoomed crop) and **3200×2120 (the full page — use this one)** |
| **Palette / description** | none published; every value sampled from the source pixels |

> **The library's second dark-native reference** (after VITA) and the only one with **zero border-radius**.

> ⚠️ **Source-finding note — a shot can hold MORE THAN ONE image, and the later ones lazy-load.** Extracting media before scrolling returns only the first. Here that first image is a *zoomed crop* that cuts off a KPI, half a chart and a table column; the real full-page view is the **second** upload. Both are ~4:3 with the same filename pattern, so nothing looks obviously wrong. **Scroll the shot, then extract.**

> ⚠️ The photograph surrounding the UI is presentation backdrop. Not a token.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`**, **`inferred`**, or **`authored`**. Measurements are **logical px at a 1440 artboard** (the source is @2x of 1440), taken by pixel scan.

---

# Core dimensions

## 0 · Signature 🔒 `observed` — **ZERO RADIUS. Everywhere.**

**There is not one curve in this design.** Panels, the search field, nav items, the segmented control, dropdowns, buttons, KPI delta chips, status chips, icon wells, kebabs, legend swatches, chart bars — all square.

*Verified at the pixel:* a delta chip's fill measures **exactly 48px tall at its very first column and stays 48px all the way across**. A rounded corner starts shorter and grows over the radius distance. Same test at a panel corner: a clean 90° meeting of `#171717` and `#1F1F1F`.

> This is the design's identity, and it is the easiest thing in the world to get wrong — "dark SaaS dashboard" pulls almost every builder toward rounded cards by reflex. **Set radius to 0 globally and add no exceptions**, including the chart library's tooltips, which ship with their own.

> Radius is **contested inside the dashboard species**: Numéro 34px, MoveIQ 24px, Metric 0. It is not a constant.

## 1 · Tone system 🔒 `observed` — **two tones, one doing three jobs**

| Token | Dark (native) | Light |
|---|---|---|
| canvas | `#1F1F1F` | `#FFFFFF` |
| panel | `#171717` | `#F7F7F7` |
| **step** — dividers **and** active fills | `#1F1F1F` | `#FFFFFF` |

Only two values do all the structural work, and **the canvas tone returns as both the divider colour and the active-state fill**. Dividers are literally the page showing through the panel. No borders are used for structure anywhere.

**PANELS RECEDE — they never lift.** The panel is a step *away* from the canvas, not toward the viewer. (True of every dashboard in this library, in both themes — a genuine constant.)

## 2 · Semantic pairs 🔑 🔒 `observed`
**Tinted fill + saturated text**, square, never a dot and never a pill:

| | text | fill |
|---|---|---|
| positive | `#09A55A` | `#16251E` |
| warning | `#C39E09` | `#282516` |
| neutral | muted | the step tone |

**The same green pair serves BOTH the KPI delta chips and the table's "Active" status chip** — one semantic system used in two contexts, not two lookalike systems.

## 3 · Delta polarity 🔑 🔒 `observed`
**Colour encodes GOOD/BAD, never direction.** Churn rate shows `↓ 0.3%` in **green**, because falling churn is good. An arrow indicates direction; the colour indicates whether you should be pleased.

## 4 · Chrome 🔒 `observed`
- **The header is a SOLID BAND in the panel tone** (68px), not a transparent strip with a rule under it. A border isn't in this design's structural vocabulary at all.
- **Sidebar (216px, 15%):** nav-group dividers **bleed the full sidebar width**, while the nav items themselves are **inset**. Rules bleed, items don't.
- Active nav item = the step fill, with **both label and icon** going full-strength white.

## 5 · Component anatomy 🔒 `observed`

> Every rule here was missed in the first transfer test. They were things I knew from building the page and never wrote down — the payload described how the design *looks* but not how its parts are *assembled*.

**The KPI strip is ONE panel containing N cells — not N cards.**
No gaps between cells, no dividers, no borders. A scan straight across the boundary between two KPIs returns solid `#171717` the whole way. The cells are evenly distributed inside a single continuous surface.

**The breadcrumb lives in the HEADER BAND, not in the content column.**
Band contents: breadcrumb on the **left**, status text + actions on the **right**. The band sits above and outside the scrolling content — the page title (`Growth overview`) is the *first thing inside* the content column, and the breadcrumb is never part of it.

**The sidebar's collapse toggle sits in the SIDEBAR header, beside the wordmark.**
It belongs to the sidebar, not the top bar. The sidebar header and the page header band are the same height and read as one continuous strip across the top.

**Header buttons take the step tone (`#1F1F1F`), never a white or full-contrast fill.**
Measured on the Edit button. In this design the only full-contrast element is *text* — no button anywhere is filled white. A white button reads as a primary CTA, and this UI has none.

## 5 · Spacing 🔒 model · 🎚 magnitude `observed`
Content inset **40px** · panel inset **27px** · panel gap **12px** · table row pitch **58px**.

> The first build ran these at roughly two-thirds and read tight and busy against the original's calm. Under-spacing is the most common way to miss this design.

## 6 · Elevation 🔒 `observed`
None. **9/9 across the library** — a baseline constant of this aesthetic, not a per-design axis.

## 7 · Charts 🔒 shape · 🎚 `authored` implementation
Built with a real charting library (**ApexCharts**), never hand-rolled divs.

- **Area chart** — white line, straight segments (no curve), **fill is white at ~10% fading to ~1.5%** (measured `#2E2E2E` under the line → `#1A1A1A` at the baseline over a `#171717` panel). Dotted horizontal gridlines only. Both axes labelled, no axis borders or ticks.
- **Grouped bars** — **square**, `#F8F8F8` + `#999999`, bars 16px wide with a 4px pair gap on a 113px group pitch (**~32% column width**). External legend with square swatches, beside the title.

## 8 · Iconography 🔒 `observed`
**Lucide, stroke-width 2** (the set shadcn/ui ships) — the source uses it directly: `house`, `shapes`, `download`, `plug`, `refresh-cw`, `target`, `trending-up`, `tag`, `dollar-sign`, `workflow`, `search`, `panel-left`, `pencil`, `calendar`, `chevron-down`, `plus`, `arrow-up`, `arrow-down`, `ellipsis-vertical`. One system, one grid, one weight.

## 9 · Typography 🔒 rules · 🎨 face `observed`
Neo-grotesque. Page title ~37px at weight 500, tight tracking (-.03em). Labels muted, values full-strength. Numerals are the loudest thing on the page.

## 10 · Theme 🔒 both required
**Dark-native** `observed`; light is a token re-skin `authored`. The rule that must survive the flip: **the panel still recedes from the canvas, and the step tone is still the canvas tone**.

---

# Motion brief 🎚 `authored` — GSAP · ScrollTrigger · Motion · Lenis

An analytics board is **scanned, not scrolled through** — the entry lands in one beat: header band → title → range control → KPI strip → charts → table. The **table rows** get their own ScrollTrigger and arrive last, staggered.

Motion handles spring hover/press on controls. Lenis is tuned **short (0.7s)** — inertia makes you overshoot the row you were aiming at.

### ⚠️ Implementation traps, all of which cost a debugging round

1. **`gsap.from({opacity:0})` against a CSS pre-hide is a no-op.** `.from()` tweens *to the element's current computed value* — which is also 0 if CSS hid it. Use **`fromTo()` with explicit end values**.
2. **Every pre-hidden selector must be animated back.** One `[data-r]` the timeline forgets stays invisible forever. Drop the pre-hide class on timeline complete as a structural guard.
3. **Never size an Apex chart with `height:'100%'` inside flex/stretch layout** — the percentage resolves before layout settles and the SVG can render far taller than its container. Pass explicit pixels; recompute on resize.
4. **Apex tilts x-axis labels diagonally when the plot narrows.** Pin `rotate: 0, rotateAlways: false`.
5. A loose descendant selector will silently eat a semantic colour: `.kpi span` (0,1,1) outranks `.chip--ok` (0,1,0) and repaints the chips grey. Scope to `>`.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- A DARK-NATIVE SaaS analytics BOARD — a saved, shareable view. Breadcrumb, page title + one-line
  subtitle, a date-range segmented control, then KPI strip → charts → activity table.
- ⚠️ ZERO BORDER-RADIUS. EVERYWHERE. There is not one curve in this design: panels, search field,
  nav items, segmented control, dropdowns, buttons, KPI delta chips, status chips, icon wells,
  kebabs, legend swatches and chart bars are ALL square. Set radius to 0 globally and add NO
  exceptions — including your chart library's tooltips, which ship with their own radius. Do not
  reach for rounded cards because it is a dark dashboard; that reflex is exactly what this design
  refuses.
- TWO TONES DO ALL THE STRUCTURAL WORK, and one of them does THREE JOBS: a CANVAS tone and a PANEL
  tone, where THE CANVAS TONE IS ALSO THE DIVIDER COLOUR AND THE ACTIVE-STATE FILL. Dividers are the
  page showing through the panel. Use NO borders for structure anywhere.
- PANELS RECEDE FROM THE CANVAS — they step away from the viewer, never lift toward them.
- ZERO elevation. No shadows on anything.
- SEMANTIC PAIRS: tinted fill + saturated text, SQUARE — never a dot, never a pill. A positive pair
  and a warning pair. THE SAME POSITIVE PAIR MUST SERVE BOTH the KPI delta chips AND the table's
  status chip — one semantic system used in two contexts, not two lookalike systems.
- DELTA COLOUR ENCODES GOOD/BAD, NEVER DIRECTION. A falling churn rate is GREEN with a DOWN arrow.
  The arrow says which way; the colour says whether to be pleased.
- COMPONENT ANATOMY — get these wrong and it reads as a different product:
  · THE KPI STRIP IS **ONE PANEL CONTAINING N CELLS — NOT N SEPARATE CARDS**. No gaps between the
    cells, no dividers, no borders between them. They are evenly distributed inside a single
    continuous surface. Do not render them as a grid of cards with gutters.
  · THE HEADER IS A SOLID BAND in the panel tone (~68px), NOT a transparent strip with a rule
    beneath. It holds the BREADCRUMB ON THE LEFT and status text + actions ON THE RIGHT.
  · THE BREADCRUMB BELONGS TO THAT BAND, NOT TO THE CONTENT COLUMN. The page TITLE is the first
    thing inside the content; the breadcrumb sits above and outside it.
  · THE SIDEBAR'S COLLAPSE TOGGLE SITS IN THE SIDEBAR HEADER, BESIDE THE WORDMARK — not in the top
    bar. The sidebar header and the page header band share a height and read as one strip.
  · HEADER BUTTONS TAKE THE STEP TONE, NEVER A WHITE OR FULL-CONTRAST FILL. In this design the only
    full-contrast element is TEXT — no button anywhere is filled white. A white button reads as a
    primary CTA and this UI has none.
- SIDEBAR (~15% width): nav-group dividers BLEED THE FULL SIDEBAR WIDTH while the nav items
  themselves are INSET. Rules bleed, items don't. The active item takes the step fill and turns BOTH
  its label AND its icon full-strength white.
- SPACING, and be generous: content inset 40px, panel inset 27px, panel gap 12px, table row pitch
  58px at a 1440 artboard. Under-spacing is the most common way to miss this design.
- ICONS: LUCIDE at stroke-width 2 (the set shadcn/ui ships) — house, shapes, download, plug,
  refresh-cw, target, trending-up, tag, dollar-sign, workflow, search, panel-left, pencil, calendar,
  chevron-down, plus, arrow-up, arrow-down, ellipsis-vertical. One system, one grid, one weight.
  Never hand-draw icon paths.
- Typography: neo-grotesque, title ~37px weight 500, tight tracking. Labels muted, values
  full-strength. The NUMERALS are the loudest thing on the page.
- CHARTS — use a REAL CHARTING LIBRARY, never hand-rolled divs:
  · an AREA chart with a white line, STRAIGHT segments (no curve), a fill of white at ~10% fading to
    ~1.5%, DOTTED horizontal gridlines only, both axes labelled, no axis borders or ticks;
  · GROUPED BARS, SQUARE-cornered, in white + mid-grey, ~32% column width with a small pair gap,
    and an external legend with SQUARE swatches beside the title.
- Ship BOTH themes. Dark is native. The rule that must survive the flip: the panel still RECEDES
  from the canvas, and the step tone is still the canvas tone.

MOTION — use real libraries (GSAP + ScrollTrigger, Motion, Lenis), not CSS transitions:
- An analytics board is SCANNED, not scrolled through: the entry lands in ONE BEAT — header, title,
  range control, KPI strip, charts, table.
- The TABLE ROWS get their own ScrollTrigger and arrive LAST, staggered.
- Motion handles spring hover/press on controls. Lenis handles scroll, driven off gsap.ticker with
  lenis.on('scroll', ScrollTrigger.update). TUNE LENIS SHORT (~0.7s) — inertia makes you overshoot
  the row you aimed at.

IMPLEMENTATION TRAPS:
- gsap.from({opacity:0}) against a CSS pre-hide tweens 0 → 0 and nothing appears. Use fromTo() with
  explicit end values.
- EVERY pre-hidden selector must be animated back; drop the pre-hide class on timeline complete as a
  guard, or one forgotten selector hides a section permanently.
- Never size a chart with height:'100%' inside flex/stretch layout — the percentage resolves before
  layout settles and the SVG can render far taller than its container.
- Chart libraries tilt x-axis labels diagonally when the plot narrows; pin rotate:0.
- A loose descendant selector will silently eat a semantic colour (.kpi span beats .chip--ok and
  repaints it grey). Scope with >.

TUNABLE: padding/gap magnitude, motion intensity, breakpoints, chart data.
SWAPPABLE: logo, brand name, typeface, the two neutral tones. NOT the zero radius, NOT the semantic
pairs, NOT the good/bad delta rule.
```
