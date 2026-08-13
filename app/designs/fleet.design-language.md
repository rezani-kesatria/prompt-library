# MoveIQ — Logistics & Fleet Management Workbench

**Design mood:** operational product UI · hairline tables · reserved status colour

| | |
|---|---|
| **Source** | Dribbble — *"Logistics & Fleet Management Dashboard UI"*, **Ronas IT \| UI/UX Team** — [`/shots/26849863`](https://dribbble.com/shots/26849863-Logistics-Fleet-Management-Dashboard-UI) · [credits](CREDITS.md) |
| **Recreation** | [`fleet.html`](fleet.html) — light + dark |
| **Format** | single still, **3200 × 2400**, shown inside a straight-on tablet bezel |
| **Palette / description** | none published; every value sampled from the source pixels |

> The library's **operational workbench** — the second dashboard, and deliberately the *other* species from [Numéro](finance.design-language.md). Orders are rows you act on; the charts serve the table.

> ⚠️ **Presentation layers to ignore: the tablet bezel AND the grey mat (`#C4C7CE`).** Neither is a token. Same trap as HireLaw's poster and Numéro's `#E1E1E1` backdrop — a shot's outermost rectangle usually belongs to the presentation, not the product. Crucially the bezel here is **straight-on, not angled**, so measurements taken inside it are valid. (An angled mockup — as in the rejected ShiftPulse shot — makes a reference unusable, because perspective corrupts every proportion and radius.)

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`**, **`inferred`**, or **`authored`**.

---

# Core dimensions

## 0 · Intent 🔒 `observed`
**An operational workbench.** Orders are rows you act on — assign, track, expand. Everything above the table exists to contextualise it. If the brief is *reading* numbers rather than *working through* records, this is the wrong language; use Numéro's.

## 1 · Separation 🔒 `observed` — **hairline rules**
`#E6E6E6` rules between table rows **and** between list items inside cards. **No vertical rules, no zebra striping, no row fills, no shadows.** Cards carry a 1px border; tiles inside them separate by fill instead.

> Numéro answers this dimension with tint and *zero* rules. Two dashboards, opposite answers — the separation model is contested *within* the species, not just across species.

## 2 · Semantic status colour 🔑 🔒 `observed`
A **reserved set, independent of the brand hue**, always rendered as **dot + label — never colour alone**:

| State | Value |
|---|---|
| in transit | `#F37833` |
| delivered | `#51D060` |
| picked up | `#ACABAA` |

Note the brand olive (`#D2D88F`) and the status green (`#51D060`) are deliberately different greens. This is the correct resolution of the warning in Blockio's spec about a brand accent squatting in signal colour space.

## 3 · Counts travel with their control 🔒 `observed`
Filter tabs carry their own counts — `Pending 70` · `Responded 85` · **`Assigned 53`** (solid black) · `Completed 56` — and the section title carries a count chip (`Orders 264`). Counts are never broken out as separate stat tiles.

## 4 · Navigation 🔒 `observed` — **only the active item is labelled**
A centred button group: the active item is a solid-black pill **with its label**, every other item is a grey icon-only square. Labels collapse for everything you're not looking at.

> Same "active = solid black" device as EcoVolt's nav. That pattern is now at three references and heading toward baseline.

## 5 · Elevation 🔒 `observed`
None. **8/8 across the library** — no longer a dimension, it is the baseline of this aesthetic. Same for gradient (None) and iconography (Line).

## 6 · Colour space 🔒 rules · 🎨 hues `observed`
Near-black ink `#0C0D0D` (not pure black — Numéro's is), paper `#FFFFFF`, one surface tone `#F0F0F0`, hairline `#E6E6E6`. A soft olive `#D2D88F` used **decoratively only**, on a single promo card. Plus a **full-width dark feature panel `#18181A` inside a light UI** — dark treatment without a dark theme.

## 7 · Geometry 🔒 `observed`
Cards ~24px · tiles/icon squares ~16px · buttons and tabs ~12px rounded rects · avatars circular. No pills on buttons.

## 8 · Row anatomy 🔒 `observed`
Generous row height (~100px logical). A stacked two-line **Route cell** with circular flag marks and a curved connector glyph. Paired row actions: an outlined "See more" plus a kebab in a bordered square.

## 9 · Theme 🔒 both required
Light-native `observed`; dark is a token re-skin `authored`. The dark feature panel **inverts to light**, and the brand and status hues **do not re-skin** — status colour must stay recognisable in both themes.

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#FFFFFF` | `#0E0E0F` |
| `--surface` | `#F0F0F0` | `#1A1A1C` |
| `--ink` | `#0C0D0D` | `#F2F2F2` |
| `--line` | `#E6E6E6` | `rgba(255,255,255,.12)` |
| `--panel` | `#18181A` | `#F2F2F2` ← inverts |
| `--brand`, status set | unchanged | unchanged |

---

# Charts 🔒 `observed` shape · 🎚 `authored` implementation

Two charts, **both built with a real charting library (ApexCharts), not hand-rolled**:

- **Dense bar chart** — ~60 readings across 10 months, **month labels ABOVE the bars**, and a vertical marker line with a value pill (`87%`) implemented as an **xaxis annotation** so it stays anchored to its data index at any width.
- **Semicircle gauge** — a 5-segment donut (`startAngle:-90 / endAngle:90`) with a **slim ring** and an external legend beside it, not underneath.

**The bars' baseline and the gauge's flat edge sit on one line.** This is a real rule of the composition, not a coincidence — the two charts read as a single band.

### ⚠️ Implementation notes — all three cost a debugging round

1. **Never size an Apex chart with `height:'100%'` inside flex/stretch layout.** The percentage resolves before layout settles: the gauge's radius got capped at half the width, and the bar chart rendered a **333px SVG inside a 176px div**, putting its baseline out of view. Pass explicit pixels and recompute on resize.
2. **A semicircle needs a SQUARE container.** Apex derives pie radius from `min(width,height)`, so a 2:1 box throttles the arc to half the available width. Render into a square and clip the unused half with a wrapper.
3. **Aligning two charts by comparing their positions feeds back.** Moving one changes the row height, which moves the other. Seed from a measurement taken *within one chart only* (its label-strip height), then run a short fixed-point loop that reads layout back each pass. Comparing directly oscillated: −82 → −47 → −134.
4. Apex reserves a **15px `parentHeightOffset`** plus a bottom-axis strip even when labels are moved to the top. Zero the offset and use negative `grid.padding.bottom` to reclaim it, or the panel gains a ~40px dead band.

---

# Motion brief 🎚 `authored` — **GSAP · ScrollTrigger · Motion · Lenis**

The first recreation in the library built on real animation libraries rather than CSS transitions.

| Library | Owns |
|---|---|
| **GSAP** | the entry timeline — chrome → cards → tiles → dark panel → orders |
| **ScrollTrigger** | the table rows, staggered in at `top 92%`, `once` |
| **Motion** | spring hover and press on every interactive control |
| **Lenis** | the scroll itself — driven off `gsap.ticker`, with `lenis.on('scroll', ScrollTrigger.update)` |

**A workbench is scanned, not scrolled through** — the entry lands in one beat. The rows animate last and separately, because the rows are what the page is for.

**Lenis is tuned SHORT here (`duration: 0.7`).** Inertial scrolling fights a data table — you overshoot the row you were aiming at. Editorial pages want considerably more.

### ⚠️ Two motion gotchas

- **`gsap.from({opacity:0})` breaks against a CSS pre-hide.** `.from()` tweens *from* the given value *to the element's current computed value* — which is also 0 if CSS hid it. The tween becomes a no-op and the page never appears. **Use `fromTo()` with explicit end values.**
- **Every pre-hidden selector must be animated back.** A `[data-r]` element the timeline forgets stays invisible forever — this hid the entire Orders table on first build. Add a structural guard: drop the pre-hide class on timeline completion so a missed selector can never permanently hide content.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- An OPERATIONAL WORKBENCH, not an analytics readout. Rows are things you ACT ON — assign, track,
  expand. Everything above the table exists to contextualise it. Include a real data table with row
  actions; if the brief is about READING numbers rather than WORKING THROUGH records, use a
  different language.
- SEPARATION IS HAIRLINE RULES: between table rows AND between list items inside cards. NO vertical
  rules, NO zebra striping, NO row fills, NO shadows. Cards carry a 1px border; tiles inside them
  separate by fill instead.
- ZERO elevation anywhere.
- RESERVE A SEMANTIC STATUS COLOUR SET, independent of the brand hue, and always render it as
  DOT + LABEL — never colour alone. Keep the brand hue and any status hue visibly distinct even when
  they are the same family (a soft olive brand alongside a signal green).
- COUNTS TRAVEL WITH THEIR CONTROL: filter tabs carry their own counts (Pending 70, Responded 85,
  Assigned 53, Completed 56) and the section title carries a count chip. Never break counts out into
  separate stat tiles. The ACTIVE tab is SOLID BLACK.
- NAV: a centred button group where ONLY THE ACTIVE ITEM IS LABELLED — active is a solid-black pill
  with its label, everything else is a grey icon-only square.
- Put a FULL-WIDTH DARK FEATURE PANEL inside the light UI — dark treatment without a dark theme.
- Geometry: cards ~24px, tiles and icon squares ~16px, buttons and tabs ~12px ROUNDED RECTS (not
  pills), avatars circular.
- Row anatomy: generous height (~100px), a stacked two-line route/pair cell with small circular
  marks and a curved connector glyph, and paired row actions (an outlined button plus a kebab).
- CHARTS: use a REAL CHARTING LIBRARY, never hand-rolled divs. A dense bar chart with MONTH LABELS
  ABOVE THE BARS and a vertical marker line whose value pill is a DATA-ANCHORED ANNOTATION; and a
  SEMICIRCLE gauge with a SLIM ring and its legend BESIDE it, not underneath.
- THE BARS' BASELINE AND THE GAUGE'S FLAT EDGE SIT ON ONE LINE. The two charts read as a single band.
- COMPONENT ANATOMY — where each part sits:
  · THE TOP BAR IS THREE-PART: logo LEFT, the centred icon-button group in the MIDDLE, then a bell,
    the theme toggle and the user (avatar + name/role stacked) on the RIGHT.
  · THE LEFT COLUMN IS ONE BORDERED CARD, not a stack of cards: a heading, then a 2×2 GRID OF
    FILLED STAT TILES inside it, then a hairline-separated list (top driver with a rating chip, then
    alert rows with a chevron). Below that card — and separate from it — sits the brand-coloured
    promo card.
  · THE ORDERS SECTION IS BARE, NOT A CARD: title + count chip and the filter tabs sit directly on
    the page, and the table follows with no surrounding container.
  · THERE IS NO FOOTER. The page ends on the last table row.
  · Section order: top bar / [left card + promo | dark feature panel, then bare orders table].
- Ship BOTH themes. The dark feature panel INVERTS to light; the brand and status hues DO NOT
  re-skin — status colour must stay recognisable in both.

MOTION — use real libraries (GSAP + ScrollTrigger, Motion, Lenis), not CSS transitions:
- A workbench is SCANNED, not scrolled through: the entry timeline lands in ONE BEAT — chrome,
  cards, tiles, dark panel, orders.
- The table rows animate LAST and SEPARATELY, on their own ScrollTrigger, because the rows are what
  the page is for.
- Motion handles spring hover/press on every interactive control. Lenis handles scroll, driven off
  gsap.ticker with lenis.on('scroll', ScrollTrigger.update) so triggers stay in sync.
- TUNE LENIS SHORT on data-dense UI (~0.7s) — inertia makes you overshoot the row you aimed at.
- gsap.from({opacity:0}) is a TRAP against a CSS pre-hide: .from() tweens to the CURRENT computed
  value, which is also 0, so nothing appears. Use fromTo() with explicit end values.
- EVERY pre-hidden selector must be animated back, and drop the pre-hide class on timeline complete
  as a guard — one forgotten selector hides a whole section permanently.

CHART IMPLEMENTATION: never size a chart with height:'100%' inside flex/stretch layout — the
percentage resolves before layout settles and the SVG can render far taller than its container.
A semicircle gauge needs a SQUARE container clipped to half. Aligning two charts by comparing their
positions FEEDS BACK and oscillates — measure within one chart, then converge with a short loop.

TUNABLE: padding/gap magnitude, motion intensity, breakpoints, chart data.
SWAPPABLE: logo, brand name, brand hue, typeface, photography. NOT the status set.
```
