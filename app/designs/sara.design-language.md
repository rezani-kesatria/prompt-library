# SARA — Task Management Mobile App

**Design mood:** pastel periwinkle task space · chunky pills and domes · one accent doing three jobs

| | |
|---|---|
| **Source** | Dribbble — *"Task Management Mobile App"*, shot [`26300878`](https://dribbble.com/shots/26300878-Task-Management-Mobile-App) — [credits](CREDITS.md). **Byline pending verification**: Dribbble WAF-blocks scripted fetches, so the designer name could not be machine-confirmed; the shot page was opened in the owner's browser on 15 Sep 2026 and the byline is being confirmed by eye. Do not cite a designer for this language until CREDITS.md records one. ⚠️ A *different* shot (23820537) shares the exact title — attribution must come from the ID, never the slug or title. |
| **Recreation** | [`sara.html`](sara.html) — light-native (source) + dark re-skin (authored, token swap) |
| **Format** | single still, **three phone screens side by side** on a pale blue-grey mat — analysed **inside the screens only**; source saved on disk and **pixel-scanned** (`image_reference/original-0d51cddf…webp`, 1024×768) |
| **Palette** | sampled from the source pixels by scanner; the still passed both source controls (see below) |

> ✅ **Keystone check passed.** Each phone's screen edges sit at constant x at five sampled heights (62/320, 382/641, 703/962 ±1px) — axis-aligned, geometry trustworthy.
>
> ✅ **Lighting check passed.** Dominant surface fills are exact `#ffffff` (n=2004, n=1460) — the shot was composited flat, so scanned hex values are trustworthy. One nuance: the stat-card fill splits into two clusters `#e6e7fd` / `#eaecff` top-to-bottom — a whisper of a vertical gradient (≤5 RGB points); build it flat.
>
> ⚠️ **The mat, the phone frames, the Dynamic Island and the 9:41 status bar are PRESENTATION, not design** — all discarded. Screen-corner radius belongs to the device. The 44–54px system status inset is safe-area handling; the recreation renders it as plain top padding.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (pixel-measured off the source), **`inferred`**, or **`authored`**.

---

# Core dimensions

## 0 · The library's first MOBILE reference 🔒 `observed`

Every other reference is a desktop page. SARA is a **phone app**: a ~390pt single-column surface, everything reachable by thumb, the primary navigation a **bottom bar with a centred FAB**, and cards sized for a 44pt+ finger. The source shows three screens of one app (Home, Tasks, Progress); they share one language and are specced together.

## 1 · Composition 🔒 `observed`

Single column on a ~390pt-wide app surface (measured 251px at the still's scale ≈ 390–393pt, iPhone-class aspect ≈2.16 — the exact logical width is `inferred`). Content scrolls **under** a bottom nav; Home's task sheet slides over the lavender canvas; nothing is a fixed header.

## 2 · Tone system 🔒 `observed` — **two canvases, one accent family**

| Token | Value | Job |
|---|---|---|
| canvas-lavender | `#B8BCF4` | Home + Tasks screens' canvas |
| canvas-white | `#FFFFFF` | Progress screen's canvas; every card on the lavender screens |
| card-tint | `#E6E7FD` | stat cards on the lavender canvas (one tone *step up* from canvas) |
| panel-tint | `#D7DAFE` | the focus panel on the WHITE canvas |
| ink | `#262123` | headlines, card titles, active nav, dark chips (selected day reads darker, `#0A0A0A`) |
| accent | `#626BC2` | FAB, arrow circles, the one highlighted chart bar |
| accent-pale | `#CCD1FC` | the "Start" word in the two-tone headline |
| peach | `#EFCBAE` (badge `#EEC9B0`) | "+N" badges, one mini stat card |
| pale-blue | `#D7E8F4` (inner pill `#CDE1F1`) | the other mini stat card |
| grey steps | `#6C6E6D` → `#9C9C9C` → `#A9A9A9` | time labels → inactive nav → weekday labels |
| alert | `#C02729` | notification dot only |

> 🔑 The separation model is **tone step + gutter, zero elevation, zero hairline**. No shadow anywhere; no border anywhere (measured: no line tokens in the scan). Light theme is native; a dark theme is an `authored` re-skin (our build ships one) that must keep the two-canvas relationship and re-verify contrast.

## 3 · The accent's three jobs 🔒 `observed`

The indigo accent is spent on exactly three things: **the FAB**, **the arrow circles** (a task's "open" affordance, bottom-right of each card), and **the single highlighted chart bar**. Everything else — selection, active states, primary chips — is **ink** (`#262123`), not accent. Active nav item: ink. "All Tasks" filter chip: ink. Selected weekday: ink. The accent never marks selection — it marks *action* and *emphasis*.

## 4 · Radius ladder 🔒 `observed` — **four steps, no middle ground**

- **~28px** — list cards (task cards)
- **~19px** — stat cards, mini stat cards, the focus panel, Home's bottom sheet top
- **~45px** — the bottom nav sheet's top corners only (the deepest curve on screen)
- **pills & circles** — every chip (full stadium, ~48–50px tall), every button, avatar, icon well and the FAB is a circle

No other radius exists. Nothing is square.

## 5 · Spacing 🔒 `observed`

Side margins **~15pt**; grid gutter **~9pt** (chip row gaps run slightly wider, ~12pt). Cards touch nothing — separation is gutter + tone step alone.

## 6 · Card anatomy 🔒 `observed`

- **Task card** (~364×208pt): time label (12pt grey) → title (semibold ink) → one-line subtitle (grey) → chip row (a dark ink pill "Today" + a light `#EFEFEF` pill with the duration) → avatar stack top-right (3 overlapping ~36pt circles, the last a peach `+N` badge) → **accent arrow circle** (~45pt) bottom-right.
- **Stat card** (~176×150pt, on lavender, tint `#E6E7FD`): white icon circle (~41pt) top-left; a short label top-right; the numeral (~30pt semibold ink) bottom-left with a tiny grey noun ("Task").
- **Mini stat card** (~180×78pt): one numeral, bottom-left; pale-blue variant carries a small inner pill top-right.
- **Focus panel** (~364×355pt, tint `#D7DAFE`): heading + grey subline; ink circle with a white ↗ arrow top-right; a 5-bar week chart; weekday labels under the bars.

## 7 · The bar chart 🔒 `observed` — **dome + hatch do the encoding**

Bars are ~56pt wide with **fully domed tops** (radius = half the bar width, square feet). The **one highlighted day is solid accent**; every other bar is a **white fill with thin grey diagonal hatch** (`repeating-linear-gradient` — the texture IS the "inactive" encoding, exactly as in ARCHE). Weekday labels sit under the bars in grey. No axes, no gridlines, no numbers on the chart.

## 8 · Bottom nav 🔒 `observed`

Full-width white sheet, top corners ~45px, height ~155pt including the home-indicator zone: **four labelled items** (icon ~22pt + 11pt label, grey `#9C9C9C`) with a **44pt accent FAB circle** (white `+`) centred between slots 2 and 3. The **active item flips to ink** (icon + label together). Inter-screen divergence, recorded per §4.7: the second slot reads **"Takes"** on Home/Tasks and **"History"** on Progress — the source is inconsistent; our build reproduces it as-is.

## 9 · Typography 🎚 rules `observed` in ratio · 🎚 magnitudes `inferred` · 🎨 face `authored`

A rounded geometric sans throughout (Poppins-family feel: round dots, geometric bowls). Hierarchy by size + weight only: screen headline ~30pt semibold · screen title same class · card title ~20–24pt semibold · greeting ~20pt · body/labels 13–14pt · micro-labels 11–12pt. Headline line-height tight (~1.15). **The still's resolution limits em derivation to ±20% — magnitudes are FLEXIBLE; ratios are the fixed part** (headline : card title : label ≈ 30 : 22 : 13).

🎨 **Face: Poppins** (400/500/600) — chosen at build time; the original's face cannot be identified from a still. Name the face explicitly in any payload (an unnamed "rounded sans" falls back to something joyless).

## 10 · Two-tone headline device 🔒 `observed`

The Home headline reads **"Start today's tasks."** with the leading word in pale periwinkle `#CCD1FC` and the rest in ink — a two-tone device inside one sentence (the same family as EcoVolt's dim-part device, tuned pastel). It is the only pale-ink text on the canvas.

## 11 · Theme 🔒 light-native · 🎚 dark `authored`

The source is light-only. Our recreation ships an authored dark re-skin: canvases deepen to near-black violet, cards lift one step, the accent lightens one step for contrast, and every relationship above (two canvases, tone-step separation, accent's three jobs) must survive the flip. It is recorded as authored — the source never shows it.

---

# COMPONENT ANATOMY (mobile-specific)

1. **Thumb zone** — every interactive element lives in the bottom two-thirds or along the top rail: nav + FAB at the thumb's rest point; header circles up top (they're 50pt — finger-sized anyway).
2. **Touch targets** — everything interactive measures 43–51pt: header circles 50, chips 48–50, arrow circles 45, FAB 44, weekday cells 44. Nothing smaller is tappable.
3. **Task states** — a task is never a checkbox row: its *state* is a **chip** ("Today" = dark pill; duration = light pill) and its *destination* is the **arrow circle**. Filtering is a chip row on the Tasks screen (one ink-filled = selected).
4. **Sheets, not pages** — Home's task area is a white sheet with rounded top corners sliding over the lavender canvas; the nav is a second sheet under it. Screens end at the nav; nothing scrolls the nav away.
5. **Safe areas** — the recreation renders the system status inset as plain top padding (~44px) and keeps ~20px under the nav for the home indicator; both are required in any real build.
6. **Avatars** — circles only, overlapping −8pt, capped at three + a peach `+N` badge; they are the only "imagery" in the design.

---

# Motion brief 🎚 `authored`

The source is a still; the treatment follows the library's standing rule — *what carries the message arrives last* — adapted to thumb scale.

| Element | Treatment |
|---|---|
| mount header + phones | fade + 14px rise; phones cascade left→right, ~90ms apart |
| inside each phone | content micro-staggers top→bottom (~60ms); the **nav lands last** — it is the screen's frame |
| FAB, chips, weekday cells | press-spring via Motion (scale 0.94 → back); chip selection crossfades the task list |
| nav active state | no slide, no glow — the ink fill simply swaps (selection must be instant) |

Everything lands within one beat; Lenis carries the (short) mount scroll; no scroll narrative. `prefers-reduced-motion` disables all of it.

### ⚠️ Implementation traps

1. `gsap.from({opacity:0})` against a CSS pre-hide is a no-op — `fromTo()` with explicit end values, `clearProps` on complete (the `14fb347` lesson; drop pre-hide classes on timeline complete and keep the 4s safety net).
2. The dome on chart bars is `border-radius: 999px 999px 0 0` — never a pseudo-element arc; the hatch is a `background-image` on the same element, so the dome must clip it (`overflow:hidden`).
3. Chip filtering must not relayout the phone (cards are removed/faded in place) — a phone column that changes height breaks the three-column composition.
4. The pale "Start" word on lavender is low-contrast **by design** — do not "fix" it; it is decorative emphasis, with the sentence's meaning carried by the ink words.

---

## Prompt payload

```text
MOBILE TASK-APP LANGUAGE (non-negotiable):

MOUNT NOTE — READ FIRST: our recreation presents the phone screens as centred phone-width
columns on a desktop backdrop field. THE BACKDROP IS THE MOUNT, NOT THE DESIGN. Building a
REAL MOBILE APP: follow the SCREEN RULES below and ignore the mount entirely. Building a
DESKTOP PAGE that showcases this language: mount it like ours — one ~390px column per screen,
grouped and centred on a quiet neutral field, with a column clip and caption that clearly
belong to the presenter, never reuse screen tokens on the field, and never let the field's
tone into the screens.

SCREEN RULES — the actual app:
- SINGLE COLUMN on a ~390pt app surface. One thing per row, thumb-reachable, generous vertical
  rhythm. Side margins ~15pt; grid gutter ~9pt. NOTHING is edge-to-edge except the bottom nav.
- TWO CANVASES: most screens sit on pastel periwinkle #B8BCF4; data-heavy screens may invert to
  white #FFFFFF (as the Progress screen does). Cards on lavender are a ONE-STEP-UP tint #E6E7FD;
  panels on white are the matching tint #D7DAFE. Separation is TONE STEP + GUTTER alone —
  ZERO elevation (no shadow anywhere) and ZERO hairlines (no borders anywhere).
- INK IS #262123 (warm charcoal) and it — not the accent — marks every selection: the active
  nav item (icon + label flip to ink), the selected filter chip (ink fill, white label), the
  "Today" state pill on each task, the selected weekday circle. INK is also the headline colour.
- ACCENT #626BC2 (indigo) HAS EXACTLY THREE JOBS: the FAB, the ARROW CIRCLES (a task's open
  affordance, bottom-right of each card), and THE ONE HIGHLIGHTED CHART BAR. Never accent-fill
  a selected state. The only other coloured text is the pale headline word #CCD1FC (a two-tone
  headline device: leading word pale, rest ink).
- RADIUS LADDER — four steps, nothing else: list cards ~28px; stat cards / panels / sheets
  ~19px; the bottom nav sheet's top corners ~45px; everything interactive is a full pill or a
  circle. No square corners, no in-between values.
- TYPE: rounded geometric sans (name Poppins explicitly). Tight ~1.15 headline at ~30pt
  semibold, card titles ~20-24pt semibold, greeting ~20pt, body 13-14pt, micro-labels 11-12pt.
  Hierarchy is size + weight ONLY — never colour for hierarchy except the two-tone headline.
- TASK CARD ANATOMY: time label (12pt grey #6C6E6D) -> title (ink, semibold) -> one-line grey
  subtitle -> chip row [dark ink pill = state ("Today"), light #EFEFEF pill = duration] ->
  avatar stack TOP-RIGHT (3 overlapping ~36pt circles, last one a peach #EEC9B0 "+N" badge) ->
  ACCENT ARROW CIRCLE ~45pt BOTTOM-RIGHT. Card ~364x208pt, radius ~28px, padding ~20pt.
- STAT CARD (on lavender, ~176x150pt): white icon circle ~41pt top-left, short label top-right,
  big numeral ~30pt bottom-left + tiny grey noun ("Task"). MINI STAT (~180x78pt): numeral
  bottom-left; pastel fills — peach #EFCBAE or pale blue #D7E8F4 (blue variant may carry a
  small inner pill #CDE1F1 top-right).
- CHART (inside a tint panel ~364x355pt): 5 vertical bars ~56pt wide, FULLY DOMED TOPS
  (radius = half the bar width, square feet), weekday labels underneath in grey. EXACTLY ONE
  bar is solid accent #626BC2; EVERY OTHER BAR is white with a thin grey DIAGONAL HATCH
  (repeating-linear-gradient) — the hatch IS the "inactive" encoding. No axes, no gridlines.
- BOTTOM NAV: full-width white sheet, TOP CORNERS ~45px, ~155pt tall including the
  home-indicator zone. FOUR labelled items (icon ~22pt + 11pt label) with a 44pt accent
  CIRCLE FAB (white +) centred between slots 2 and 3. Active item = ink (icon + label
  together); inactive = grey #9C9C9C. The nav never scrolls away.
- TOUCH TARGETS: everything tappable measures 43-51pt — header circles 50, chips 48-50,
  arrow circles 45, weekday cells 44, FAB 44. Nothing smaller is tappable. Respect the system
  status inset (~44pt top padding) and ~20pt under the nav.
- AVATARS are the only imagery: circles, overlapping -8pt, max three + a peach "+N" badge.
- A notification state is a tiny red #C02729 dot on the bell — nowhere else does red appear.
- ICONS: a hairline geometric set (~1.6 stroke), never emoji, never filled.

MOTION (authored — the source is a still):
- One-beat entry: content micro-staggers top-to-bottom; THE NAV LANDS LAST on each screen.
- Press-springs on FAB/chips/days via Motion (scale .94 and back). Chip selection crossfades
  the task list WITHOUT changing the screen's height. Nav selection is instant — no slide.
- Use GSAP + ScrollTrigger + Lenis + Motion. gsap.from({opacity:0}) against a CSS pre-hide is a
  NO-OP — fromTo() with explicit end values, clearProps on complete, reduced-motion disables all.

TUNABLE: screen count, task copy, numeral values, bar heights, exact type sizes (±20%).
SWAPPABLE: accent hue, pastel canvas hue, peach/blue data hues, typeface (keep it rounded-
geometric and name it), avatar photos, app persona/copy.
DO NOT: put shadows or hairlines on anything; use accent for selection; add a fourth radius;
let the chart grow axes; replace the hatch with opacity.
```

---

## What was measured vs inferred

- **Measured** (scanner, `image_reference/original-0d51cddf…webp`): canvas/card/panel/ink/accent/peach/blue/grey tokens (modal exact values); keystone + lighting controls (both passed); margins 10px, gutters 6px; card rect bounds (task 240×137, stat 118×99, mini 116×50, focus 240×234); radius insets per card class (12–13px vs 17–18px vs nav sheet 29px); chip height 33px; circles 27/29/33px; FAB 28–29px; bar width 37px + domed profile + hatch; nav sheet geometry; two canvases; sheet stack on Home; "Takes"/"History" nav divergence.
- **Inferred**: the logical pt mapping (screen 251px ≈ 390–393pt iPhone-class — aspect matches, exact model unknown); type sizes (±20%, derived from cap-height bands at the still's resolution); the exact grey for weekday labels vs subtitles (three greys measured, assignment partly by eye).
- **Authored**: the dark re-skin; the mount presentation (backdrop, column clip, captions); Poppins as the face; the exact task copy is the source's.
