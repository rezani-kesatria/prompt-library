# ARCHE — Commerce &amp; Learning Dashboard

**Design mood:** dark commerce board · zero radius · texture as encoding · one accent, once per grouping

| | |
|---|---|
| **Source** | Dribbble — *"SaaS Dashboard"*, **Juice Lab** (UI/UX Development Agency) — [`/shots/26666273`](https://dribbble.com/shots/26666273-SaaS-Dashboard) · [credits](CREDITS.md) |
| **Recreation** | [`saas.html`](saas.html) — dark (native) + light |
| **Format** | presented inside a **MacBook render**. Measured from the still; the video is the motion reference |
| **Palette** | every value sampled from the source pixels |

> ⚠️ **The MacBook frame is presentation, not design.** Only the screen contents are the design. This is the trap that produced a "floating app shell" for Numéro from a Dribbble grey mat, and it is why ShiftPulse was rejected outright — *that* mockup was angled, and perspective corrupts every proportion.

> ✅ **This mockup is safe, and it was verified rather than assumed.** Two controls were run before trusting any number:
> **No lighting gradient** — the panel surface reads `23,23,23` at five positions across the screen and the accent reads *identically* (`232,59,19`) at two far-apart points, so the UI was composited flat rather than lit. Colours are exact.
> **No keystone** — left edge x=136 at every y sampled, bottom edge y=601 at every x, top y=112, right x=894. Screen 759×490, ratio **1.549** against the MacBook Pro panel's 1.547. Axis-aligned to within a pixel, so geometry is exact too.

> **Measurements below are image px × 2.** The screen measures 759px wide; at a **1512 artboard** (MacBook Pro 14" logical) the scale is 0.502, i.e. 1 image px ≈ 2 design px. That scale makes the gutter land on exactly 12 and the margin on 16, which is the reading that produces whole numbers.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (pixel-measured), **`inferred`**, or **`authored`**.

---

# Core dimensions

## 0 · Signature 🔒 `observed` — **ZERO RADIUS, and texture does the work instead**

Two things define this design, and both are counter-reflexive.

**Every panel is square.** Measured at the corner: the orange panel's top-right has an inset of **0 at every row from the first**; top-left shows 1px, which is antialiasing. The dark panels measure the same. A dark commerce dashboard pulls a builder toward rounded cards by reflex — this design refuses, exactly as Metric does.

**Texture, not tint, marks the unfilled.** Where another design would use a lighter grey to mean "remainder," this uses a **45° hatch**. See §5.

> ⚠️ The radius reflex is strong enough that a first visual read of this design — before measuring — reported "panels rounded 12–16px" and "rounded-top bars." Both were wrong. **Measure the corner; do not trust the impression.**

## 1 · Tone system 🔒 `observed` — **panels LIFT**

| Token | Value | Job |
|---|---|---|
| canvas | `#111111` | the page, visible only in the gaps |
| panel | `#171717` | every surface — sidebar and content panels alike |
| ink | `#FEFEFE` | headings and values |
| muted data | `#616974` | de-emphasised chart series |
| chart yellow | `#FEDE00` | third categorical only |
| accent | `#E83B13` | see §2 |

**The panel is LIGHTER than the canvas.** Canvas luminance 17, panel 23 — panels step *toward* the viewer.

> 🚩 **This breaks a rule the library previously stated as a constant.** The Metric spec asserts *"PANELS RECEDE — they never lift. (True of every dashboard in this library, in both themes — a genuine constant.)"* That was true of the three dashboards that existed when it was written, and it was over-generalised into a law. ARCHE inverts it. **Panel direction is a per-design axis, not a constant** — like radius, which is also contested (Numéro 34px, MoveIQ 24px, Metric 0, ARCHE 0).

**The sidebar is a panel, not a chrome region.** It takes the same `#171717` as the content panels and floats on the canvas with the same margin, so the canvas reads as a grid gap on all four sides.

## 2 · The accent rule 🔑 🔒 `observed` — **one per grouping, never a category fill**

`#E83B13` appears exactly **once in every grouping**:

| Grouping | The one accent item |
|---|---|
| the board as a whole | one panel filled solid (Today's Highlights) |
| bar chart | one bar (Exposure) |
| proportional circles | one circle (Learned) |
| donut | one segment |
| product list | one price chip |

**The accent is a focus marker, not a series colour.** It never colours a whole category or a whole chart — it marks the single item the viewer should land on. Everything else in the same chart takes the muted `#616974`.

**An accent-filled PANEL is the strongest move in the design, and there is exactly one.** Do not add a second.

## 3 · Grid 🔒 `observed` — **four columns, and the wide panel swaps sides**

Measured by scanning for canvas troughs between panels:

| Element | image px | at 1512 |
|---|---|---|
| outer margin | 8 | **16** |
| sidebar width | 133 | **266** |
| column gutter | 6 | **12** |
| content column | 146 | **292** |
| vertical stack gap | 12–16 | **24–32** (≈2× the gutter) |

The content area is a **4-column grid**. Every panel spans 1 or 2 columns, and the two-column panel **changes side between bands**:

- **Band 1** (top): `1 : 1 : 2` — the wide panel is on the **RIGHT** (Lesson Engagement)
- **Band 2** (bottom): `2 : 1 : 1` — the wide panel is on the **LEFT** (Engagements)

*Verified:* band 1 columns measure 146 / 146 / 298 and band 2 measures 299 / 146 / 146, where 298 = 146 + 6 + 146 — a two-column span including the gutter it swallows.

**The vertical gap between stacked panels is about twice the column gutter.** Gutters are not uniform in both axes.

## 4 · Component anatomy 🔒 `observed`

**THE KPI STRIP LIVES IN THE TOP BAR, NOT THE CONTENT.**
Greeting on the left (`Good evening, {name} 👋` over a one-line subtitle), then a row of KPIs — tiny uppercase label, value beneath — split by **vertical hairlines**, then search, notification, avatar. The KPIs are chrome, not content. *(Same anatomy class that cost 20% on the Metric transfer test.)*

**BARS HAVE ONE LARGE TOP-LEFT RADIUS AND A SQUARE TOP-RIGHT.**
This is the detail most likely to be missed. Measured on the Exposure bar: the **right edge is straight at every row (inset 0)**, while the **left edge sweeps in 37px at the top and reaches vertical 39px down**. Bar width 52px. So:

> **top-left corner radius ≈ 75% of the bar width; top-right corner square; bottom square.**

Not a rounded-top bar. Not a pill. An asymmetric sweep, like a wave breaking left.

**EVERY BAR SITS IN A FULL-HEIGHT HATCHED TRACK.** The track shows the whole scale; the fill shows the value. The track is not a gridline and not a background — it is the unfilled remainder, drawn in hatch.

**THE LABEL AND VALUE SIT ABOVE THE FILL, INSIDE THE TRACK** — stacked, name over value. There is **no axis, no gridline and no tick** anywhere in the bar chart.

**PROPORTIONAL CIRCLES ARE BOTTOM-ALIGNED ON A SHARED BASELINE**, not centred, with `%` over label beneath each. Size encodes the value.

**PRODUCT ROWS END IN A PRICE CHIP**, hatched by default; the one highlighted row takes an accent-filled chip.

## 5 · Texture system 🔑 🔒 `observed` — **hatch means "unfilled"**

**45° diagonal hatch, period ≈ 8px** (measured 4.11px image × 2), stripes advancing left as they descend.

Located by variance-mapping the whole screen, hatch appears in exactly four places, and all four mean the same thing:

| Where | What it means |
|---|---|
| bar chart tracks | the unfilled part of the scale |
| collection swatch | the un-selected collection |
| donut segment | the de-emphasised share |
| price chips | the non-highlighted rows |

**Texture is an encoding, not a decoration.** It is the design's answer to "how do I show a remainder without adding a tone?" — which is what lets the tone system stay at two greys. An agent will drop it silently unless told.

**A dot-matrix halftone** appears in the two big-number panels (Today's Highlights, Tasks Completed) and **nowhere else** — a motif bound to one component, forming a soft wedge in the panel's lower-right.

## 6 · Typography 🔒 rules · 🎨 face `observed`
Neo-grotesque throughout. Big numerals are the loudest thing on the board, set light and large. Panel titles are small and regular-weight. KPI labels are tiny uppercase.

**The decimal separator is a comma** (`+65,5%`) and the **`%` is set smaller than the number it follows** — a European convention worth keeping, because it is part of why the figure reads as typeset rather than printed.

## 7 · Elevation 🔒 `observed`
**None.** Separation is done entirely by the canvas showing through the gaps. **11/11 across the library** — this one really is a constant.

## 8 · Theme 🔒 both required — dark-native `observed`, light `authored`

**Dark-native**; light is a **token re-skin** with an identical layout language.

> 📐 **Corrected.** This section first said "dark only", reasoning that the two-grey tone system had no valid inversion. That was carried over from TENON by analogy and does not hold here. TENON is legitimately dark-only because its accent rule is *matched luminance, hue-only separation*, which has no meaning against a light canvas. ARCHE has no such constraint — its rule is simply **panels lift**, and that inverts cleanly.

**The one rule that must survive the flip: the panel stays LIGHTER than the canvas.** Light runs canvas `#EFEFEF` against panel `#FFFFFF` — still lifting, still two tones, same six-point separation inverted.

Two things do **not** flip, and getting either wrong breaks the design:

- **The accent surface keeps light text in both themes.** The orange panel and the accent chip are the same `#E83B13` in light as in dark, so their text must stay near-white. Binding it to the ink token puts near-black text on orange the moment the theme flips.
- **The hatch inverts with the ink, not with the panel.** It is drawn from the ink hue at low alpha, so in light it becomes dark strokes on white. Leaving it white-on-white erases the entire texture encoding.

---

# Motion brief 🎚 `authored` — GSAP · ScrollTrigger · Lenis · Motion

> The source ships a video alongside the still. The still is the layout reference; the **video is the motion reference**.

A board is **scanned, not scrolled** — the entry lands in one beat: top bar → sidebar cascade → band 1 → band 2, with each panel fading and rising ~8px on a short stagger.

- **Bars grow from the baseline**, and the accent bar arrives **last** so the eye ends on it.
- **The donut sweeps** from 12 o'clock; the centre figure counts up.
- **Proportional circles scale from their shared baseline**, largest last.
- **Numbers count up** — the big panel figures are the payoff.
- Motion handles hover/press springs on rows and chips. Lenis tuned **short (~0.7s)**: this is a page to scan, and inertia makes you overshoot the row you were aiming at.

### ⚠️ Implementation traps

1. **`gsap.from({opacity:0})` against a CSS pre-hide is a no-op** — `.from()` tweens *to* the current computed value, which is also 0. Use **`fromTo()`** with explicit end values.
2. **Every pre-hidden selector must be animated back.** Drop the pre-hide class on complete as a structural guard.
3. **Never size a chart with `height:'100%'` inside a flex/stretch parent** — the percentage resolves before layout settles. Pass explicit pixels and recompute on resize.
4. **A loose descendant selector will eat a semantic colour** — `.panel span` outranks `.chip--accent` and repaints it. Scope with `>`.
5. **Render the hatch with `repeating-linear-gradient`, not an image** — it must scale with the element and stay crisp at any size.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- A DARK-NATIVE COMMERCE/LEARNING DASHBOARD. Sidebar left; a top bar carrying the greeting and the
  KPI strip; then a content area of panels on a four-column grid.
- ⚠️ ZERO BORDER-RADIUS ON EVERY PANEL. Measured at the corner: inset is 0 at the very first row.
  A dark commerce dashboard pulls you toward rounded cards by reflex — this design refuses. Set
  panel radius to 0 globally. (Circles, the avatar and the donut are round because they are
  circles, not because anything has a corner radius.)
- TONE SYSTEM IS TWO DARK GREYS AND NOTHING ELSE: canvas #111111, panel #171717.
  ⚠️ THE PANEL IS LIGHTER THAN THE CANVAS — PANELS LIFT TOWARD THE VIEWER. Do not assume dark
  dashboards recede; this one does the opposite, and inverting it kills the whole effect.
  THE SIDEBAR IS A PANEL, not a chrome region: same #171717, same margin, canvas visible on all
  four sides so it reads as one more cell in the grid.
- SEPARATION IS THE CANVAS SHOWING THROUGH GAPS. No borders, no dividers, no tone steps, NO
  SHADOWS ANYWHERE.
- INK #FEFEFE, de-emphasised chart data #616974, a chart yellow #FEDE00 for a third category only.
- ⚠️ THE ACCENT (#E83B13) APPEARS EXACTLY ONCE PER GROUPING and is a FOCUS MARKER, never a series
  or category colour: ONE panel filled solid, ONE bar, ONE circle, ONE donut segment, ONE price
  chip. Everything else in the same chart takes the muted grey. An accent-FILLED PANEL is the
  strongest move on the board and there is exactly one — do not add a second.
- GRID — FOUR COLUMNS, AND THE WIDE PANEL SWAPS SIDES BETWEEN BANDS:
  · the TOP band runs 1 : 1 : 2, wide panel on the RIGHT
  · the BOTTOM band runs 2 : 1 : 1, wide panel on the LEFT
  That alternation is the layout's rhythm. Do not put both wide panels on the same side.
- SPACING at a 1512 artboard: outer margin 16, sidebar 266 wide, column gutter 12, content column
  292. THE VERTICAL GAP BETWEEN STACKED PANELS IS ABOUT TWICE THE COLUMN GUTTER (24-32) — the
  gutters are NOT uniform in both axes.
- COMPONENT ANATOMY — get these wrong and it reads as a different product:
  · THE KPI STRIP LIVES IN THE TOP BAR, NOT IN THE CONTENT. Greeting and one-line subtitle on the
    left, then KPIs as tiny-uppercase-label over value, SPLIT BY VERTICAL HAIRLINES, then search,
    notification, avatar. These are chrome, not content cards.
  · ⚠️ BARS HAVE ONE LARGE TOP-LEFT CORNER RADIUS AND A SQUARE TOP-RIGHT. The right edge is
    STRAIGHT for the bar's whole height; the left edge sweeps in and reaches vertical about
    three-quarters of the bar's width down. TOP-LEFT RADIUS ~= 75% OF THE BAR WIDTH. This is NOT a
    rounded-top bar and NOT a pill — it is an asymmetric sweep, like a wave breaking left.
  · EVERY BAR SITS IN A FULL-HEIGHT HATCHED TRACK showing the whole scale; the fill shows the
    value. The track is the unfilled remainder, not a gridline or a background.
  · THE LABEL AND VALUE SIT ABOVE THE FILL, INSIDE THE TRACK, stacked name-over-value. There is NO
    AXIS, NO GRIDLINE AND NO TICK anywhere in the bar chart.
  · PROPORTIONAL CIRCLES ARE BOTTOM-ALIGNED ON A SHARED BASELINE, not centred, sized by value,
    with percent-over-label beneath each.
  · PRODUCT ROWS END IN A PRICE CHIP — hatched by default, accent-filled on the one highlighted row.
- ⚠️ TEXTURE IS AN ENCODING, NOT DECORATION. A 45-DEGREE DIAGONAL HATCH AT ~8px PERIOD MEANS
  "UNFILLED / REMAINDER / DE-EMPHASISED", and it is used for exactly that in four places: bar
  tracks, the un-selected collection swatch, the muted donut segment, and non-highlighted price
  chips. This is how the design shows a remainder WITHOUT adding a third grey — it is why the tone
  system can stay at two. Render it with repeating-linear-gradient, never an image, so it scales.
  Do not drop it and do not substitute a lighter grey.
- A DOT-MATRIX HALFTONE wedge sits in the lower-right of the two BIG-NUMBER panels and NOWHERE
  ELSE — a motif bound to one component, not scattered across the board.
- TYPOGRAPHY: neo-grotesque. Big numerals are the loudest thing on the board, set LIGHT and LARGE;
  panel titles small and regular; KPI labels tiny uppercase. USE A COMMA AS THE DECIMAL SEPARATOR
  (+65,5%) AND SET THE % SMALLER than the number it follows.
- ZERO ELEVATION. No shadows on anything.
- SHIP BOTH THEMES. Dark is native; light is a TOKEN RE-SKIN with an identical layout language.
  ⚠️ THE RULE THAT MUST SURVIVE THE FLIP IS "PANELS LIFT": in light, run a canvas around #EFEFEF
  against a panel of #FFFFFF, so the panel is still LIGHTER than the canvas. Do not invert that
  relationship just because the theme changed.
  TWO THINGS DO NOT FLIP: (1) THE ACCENT SURFACE KEEPS LIGHT TEXT IN BOTH THEMES — the orange panel
  and the accent chip stay orange, so binding their text to the ink token puts near-black text on
  orange the moment you switch. Use a separate on-accent token that never flips. (2) THE HATCH
  INVERTS WITH THE INK, NOT THE PANEL — it is the ink hue at low alpha, so in light it becomes dark
  strokes on white. Leave it white and the entire texture encoding disappears.

MOTION:
- A board is SCANNED, NOT SCROLLED: land the entry in one beat — top bar, sidebar cascade, top
  band, bottom band, each panel fading and rising ~8px on a short stagger.
- BARS GROW FROM THE BASELINE AND THE ACCENT BAR ARRIVES LAST, so the eye finishes on it.
- The donut sweeps from 12 o'clock and its centre figure counts up; proportional circles scale from
  their shared baseline, largest last; the big panel numbers count up.
- LENIS TUNED SHORT (~0.7s) — this is a page to scan, and inertia makes you overshoot the row you
  were aiming at. (The editorial pages in this library tune it long; do not copy that here.)
- Use GSAP + ScrollTrigger + Lenis + Motion. Never hand-roll CSS transitions.
- gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP — .from() tweens TO the current computed
  value, which is also 0. Use fromTo() with explicit end values, animate every pre-hidden selector
  back, and drop the pre-hide class on complete as a guard.
- Never size a chart with height:'100%' inside a flex/stretch parent; pass explicit pixels.

ICONS: LUCIDE (the set shadcn/ui ships), stroke-width 1.5. Never hand-draw icon paths.
```
