# TASK KIT — Task Management Mobile App (provisional name)

**Design mood:** pastel containers + WHITE cards on a near-black canvas · hatch means "not yet" — both-native: the mount toggle flips canvas + chrome while the cards stay white (§0, §10)

| | |
|---|---|
| **Source** | Dribbble — *"Task Management Mobile App Design UI/UX"*, **byline NOT verified** — [`/shots/27043819`](https://dribbble.com/shots/27043819-Task-Management-Mobile-App-Design-UI-UX) · [credits](CREDITS.md). Dribbble WAFs scripted fetches (same as every shot before this one) and no secondary post of this shot was found; the byline is **pending human confirmation** and the id/name are provisional until it lands. Dribbble serves shots by ID and ignores the slug — re-open and confirm before trusting any link. |
| **Recreation** | [`taskkit.html`](taskkit.html) — both moods; the mount toggle flips the mat AND the screens (§10) |
| **Format** | three-screen still on a mint/lavender backdrop — analysed **inside the screens only**; backdrop and phone bezels are presentation and discarded. Source saved on disk and **pixel-scanned** (`image_reference/2801c79e….webp`, 1024×768). |
| **Palette** | sampled from the source pixels by scanner; magnitudes are **measured, not inferred** (type sizes and the face are the honest exceptions — see §9) |

> ⚠️ **Controls run (method §4.3), results recorded honestly:**
> **Lighting** — the near-black screen canvas sampled at four distant points returned identical `#1E1E1E` (a fifth sample landed on an avatar and was discarded); the pastel cards read identically across screens. Flat composite — colour values are trustworthy. The mint/lavender page backdrop behind the phones is a gradient, but it is presentation, not design.
> **Keystone** — the phones are each **rotated ~4.4° in-plane** (left and right screen edges share one identical slope: pure rigid rotation). Rotation is NOT perspective: proportions survive a rigid transform to within 0.3%. This passes the keystone rule's intent — the ShiftPulse rejection targets *converging* perspective mockups, which this is not. Measured dimensions are used as-is.
>
> ⚠️ **The library's second MOBILE reference (SARA was the first).** The desktop page around the phones is a **presentation mount** — library-neutral backdrop, quiet caption, theme toggle. It is NOT the design and carries none of the design's tokens. The screens are the design.

> ⚠️ **The library's SECOND mobile reference — same-species guard.** SARA (shot 26300878 — [`sara.design-language.md`](sara.design-language.md)) landed first and is the closest species in the library: also a task-management app, also three still-screens, also pastel containers. A downstream agent **must not blend them**. Where the two languages answer the same question differently, both specs name the dimension deliberately:
>
> | Dimension | SARA (26300878) | TASK KIT (this) |
> |---|---|---|
> | Canvas | pastel periwinkle + white canvases, no dark | near-black `#1E1E1E` (dark mood) / white (light mood) — the screens flip with the mount (§0, §10) |
> | Separation | tone step + gutter, **zero hairlines** | both moods: body cards separate by TONE STEP alone — white on the dark canvas, light grey `#F4F4F2` on the white canvas. Never borders, never tinted fills |
> | Accent's jobs | accent = FAB + arrow circles + the one highlighted bar (selection is ink) | **live green = progress marks only**; the FAB is WHITE, action circles are black or white |
> | Chart | 5 domed bars, **no gridlines**, grey hatch = "inactive" (comparative) | 7 pill bars **on hairline gridlines**, live-green hatch = "not yet done" (temporal remainder) |
> | Bottom nav | white labelled sheet, ~45px top corners, accent 44pt FAB | **bare icons floating on the canvas**, no sheet, white 62px FAB |
> | Radius ladder | 28 / 19 / 45 (sheet) + pills | 26 / 22 + pills — no sheet curve exists here |
> | Theme | light-native (dark = authored re-skin) | **both-native** — the mount toggle flips mat AND screens; dark is the grid tile's native pin |
>
> Where this document says "contested", it is naming one of these rows so payloads stay distinct.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (pixel-measured off the source), **`inferred`**, or **`authored`**.
Build-scale numbers: the source screens are 256 device-px wide ≈ a 390pt phone; everything below is restated at **375px screen width** (×1.465). The recreation MOUNTS the screens at a real device's viewport — Samsung Galaxy S26 Ultra: 1440×3120 native (**19.5:9**) → **412×891 CSS px** at 3.5× — with the content's 375-based scale held. Never invent screen dimensions; mount at a shipping device's ratio.

---

# Core dimensions

## 0 · Signature 🔒 `observed` — **pastel containers on a near-black canvas, in three species of screen**

A near-black `#1E1E1E` canvas carries pastel-coloured CONTAINERS (mint `#DAFDDB`, lilac `#D4BFFA`, butter `#FFF5B7`) and nothing else coloured. In the SOURCE still, three screen species: the **home screen is dark edge to edge**; the **inner screens run a dark header zone** (status bar + nav row + title block) that **bleeds into a white body** — a hard edge, no gradient. `SARA's screens are flat lavender or flat white — no two-zone screen.`

> **⚠️ Authored divergence — human review, 15 Sep 2026 (two rounds, the second supersedes the first):** a first review ran all three screens dark end to end with hairline-outlined cards. The SECOND review (same day, against the source's own crop) settled it: the design's actual device is **WHITE cards floating on the dark canvas** — the build adopts that verbatim. At the same time the recreation became **both-native**: the mount toggle flips mat + screens together. **Dark mood** (native tile pin): `#1E1E1E` canvas, white body cards separated by the tone step alone (no border), white title block, white share/edit circles, white FAB. **Light mood:** white canvas — the same cards turn **light grey `#F4F4F2`**, so the tone step (never a border) keeps doing the separating; the canvas-floating circles invert (black share/edit, black FAB); the cards' near-black ink and muted greys are CONSTANT across moods. Every pastel container, the live-green progress law and the hatch encoding are identical in both moods. §4/§5 keep the earlier readings as provenance. Do NOT outline the cards, do not tint them pastel, and do not flip the cards' interior ink.

## 1 · Tone system 🔒 `observed` — measured, batch reads

| Token | Value | Job |
|---|---|---|
| canvas / dark zone | `#1E1E1E` | home screen throughout; inner screens' header zone |
| ink | `#1E1E1E` on light · `#FFFFFF` on dark | ONE ink, near-black, both themes |
| muted | ~`#8A8A8A` on light · ~`rgba(255,255,255,.55)` on dark `inferred` | labels, secondary lines |
| pastel mint | `#DAFDDB` | hero card, assignee card, chart card |
| pastel lilac | `#D4BFFA` | task card, focus stat |
| pastel butter | `#FFF5B7` | task card, done stat |
| **live green** | `#8CDA86` (sampled family `#8BD986`–`#8FDA8A`) | the ONLY saturated colour — progress arcs, active bars, fills |
| chip black | `#050505` | category chips, FAB glyphs, ↗ buttons, the body cards' `+` circle — constant in both moods |
| surface | `#FFFFFF` | the body cards AND the white circles on the pastels, both moods; the canvas-floating circles (share/edit, FAB) are white in the dark mood and invert to black discs in the light mood |
| body cards | dark mood: `#FFFFFF` on the `#1E1E1E` canvas, no border — the tone step IS the separation (review crop, the source's own device). Light mood: the same cards turn light grey `#F4F4F2` on the white canvas — tone step again, never a border | interior ink `#1E1E1E` / muted `~#8A8A8A` in BOTH moods |
| icon disc | ~`rgba(255,255,255,.09)` ≈ #303030 on canvas `inferred` (review crops); ~6% ink in the light mood | solid fills behind ← → ⋯ bell — NEVER hairline rings |

## 2 · The colour law 🔒 `observed` — **pastels are containers, never ink; live green is progress, never decoration**

Pastels paint whole cards/tiles; text on them is always the near-black ink. The saturated live green appears ONLY as state: gauge arcs, the one active chart bar, progress fills. **Hatch (thin diagonal live-green ruling) is the remainder encoding** — every incomplete measure (gauge remainder, inactive chart bars, progress-track remainder, stacked-bar remainder) is hatched, never grey. Contested dimensions: ARCHE also encodes with hatch, but there hatch means *"not highlighted"*; here it means *"not yet done"* — a temporal, not a comparative, reading. `SARA: indigo accent system — accent = FAB + arrow circles + the one highlighted bar, selection is ink; no pastel trio, no temporal hatch.`

## 3 · Home anatomy 🔒 `observed`

Status bar (white) → greeting row (avatar, `Welcome back,` muted / name in white, bell in a solid grey disc) → **date stepper** (solid tone-step discs `←` `→` flanking a centred two-line label) → **hero mint card**: `Current tasks` label, task title, white share circle + black `↗` circle, a `+12%` chip row, black category chips, and a **semicircular gauge** — live-green solid arc, hatched remainder, the % set large inside the opening → `All Tasks` / `See All` row → **pastel task cards** (lilac, butter): title, one muted line, avatar cluster + `N participants`, and a **progress ring** (translucent-ink track `inferred`, ink arc, % centred) → **floating bottom nav on the bare canvas** — no bar, no elevation: four white line icons (home, chart-in-rounded-square, sliders, person) flanking a **central white FAB** with a black `+`. Measured: FAB ≈62px build ⌀, icon glyphs ≈28px, nav pitch ≈72px — all ≥44px targets hold.

## 4 · Detail anatomy 🔒 `observed`

Dark zone: status bar → solid tone-step discs `←` / `⋯` flanking the screen title → large white title + grey kit line → **two floating circles** (share, edit) — white in the dark mood, inverted to black discs in the light mood. Mint **assignee card**: avatar + `Assigned to`/name on the left; a darker-tint circle with a calendar glyph + `Due date`/date on the right. Body below: **WHITE cards on the dark canvas** (the source's own device, confirmed by review crop 15 Sep — dark zone, then white cards; the tone step separates them, no border). Light mood: the same cards turn light grey `#F4F4F2` on the white canvas — the tone step separates again. Interior text is near-black ink + `~#8A8A8A` muted in BOTH moods. `SARA is the OPPOSITE answer: tinted cards on tinted canvases, zero hairlines — do not blend the two separation models.` Cards: **Task Status** (outlined dark pill + progress bar: live-green fill over a hatched remainder, % right-aligned), **Description** (five quiet lines), **Attach File** (dark-ringed file circle, name + size·date, **the design's only red** on the delete glyph `inferred`), **Team Member** (avatar row + chip-black `+` circle). Card-to-card vertical gaps are TIGHT — halved at build per the second review (~7px).

## 5 · Summary anatomy 🔒 `observed`

Dark zone as §4. Mint **chart card**: `Task Activity` + black `↗` circle, `Avg 3 Hours per day`, then a **seven-day bar chart on hairline gridlines** — every bar hatched EXCEPT ONE solid live green (the peak, Thursday); labels `0h–8h` / day initials. Stat duo: lilac `13h Total Focus +12` and butter `43 Tasks Done +12`. **Overview card**: white on the dark canvas, light grey `#F4F4F2` in the light mood — the tone step always separates it (§0): `Total spending` + `$2,580.00`, a **segmented bar** (live-green, lilac, butter segments with small gaps, hatched remainder), and a hairline-divided legend (`Completed 43% / In Progress 25% / On Hold 10%`) with small rounded-square colour dots; its `↗` circle is chip black. The chart is hand-built geometry (rounded divs + CSS hatch) — **deliberate divergence**: ApexCharts cannot reproduce hatch-as-encoding cleanly, and the hatch IS the chart's information.

## 6 · Radius ladder 🔒 measured · 🎚 magnitudes

Large pastel cards **18px source ≈ 26px build** (corner-profiled off the lilac task card and the lilac stat tile); inner white cards one step down (**22px build** `authored`, same family); chips, pills, FAB, avatar rings and icon circles are **full rounds** (9999px / 50%) — the ladder is exactly three steps plus circles. Screens themselves carry the device bezel's rounding — presentation, not design.

## 7 · Density, spacing & targets 🎚 `inferred`

One column per screen, generous side padding (~20px build), cards stacked TIGHT — the source reads close-packed, and the second review halved the card-to-card vertical gaps at build (**~5–7px**; the first pass used 14–16px). Card padding ~18–22px. Nothing touches the screen edges except the dark header zones and the floating nav. Airy, thumb-sized, nothing cramped.

**Touch-target inventory (recorded, not smoothed over):** the nav band measures ≥44px build (nav pitch ~72px, FAB 62px), but this source's header/utility circles are **~38px build — below the 44pt heuristic** (SARA's circles measured 50pt; the two designs genuinely differ). The status pill is a *display* badge (~24px) — TASK KIT treats it as a passive state indicator; the toggle in our recreation is an authored extra and is not asserted as a tap target. The `+` circle on Team Member ships at 36px (measured ~34, rounded up one step at build).

## 8 · Content fidelity 🎨 `observed`

The source's own copy is kept verbatim — **including its typo** `Task manger ui kit` (sic, the source's own kit line under the detail title). Do not "fix" it in the recreation; it is provenance.

## 9 · Typography 🔒 rules · 🎨 face `authored`

Geometric sans, double-story `a` with a rounded single-story `g`; titles medium (500–600), never bold-heavy; big numerals (gauge %, stat numbers) are the loudest type on every screen. Scale (build, `inferred` — scaled by eye at 1.465×): screen titles ~34–36 · section/card titles 17–20 · stat numerals ~34 · body 13 · micro-labels 10–11.

🎨 **Face: Plus Jakarta Sans** (400/500/600) — the original's face is unidentifiable from a still and treated as swappable.

## 10 · Theme 🔒 both, and the screens flip WITH the mount

The design is both-native by human review (15 Sep 2026, round 2): the `data-theme` toggle flips **the mat and the screens together**. **Dark mood** (the grid tile's native pin): `#1E1E1E` canvas, white body cards separated by the tone step, white title block, white canvas-floating circles (share/edit, FAB), ~9%-white icon discs. **Light mood**: white canvas — the body cards turn light grey `#F4F4F2` (tone-step separation again, no border), the canvas-floating circles invert to black discs, icon discs go ~6% ink, and all canvas text turns near-black. The cards' interior (near-black ink, muted greys, the pastel trio, live green, hatch) is CONSTANT across moods. Conformance pins the flip mechanically (`--canvas` is `#1E1E1E` under dark and `#FFFFFF` under light). A client re-skin swaps the pastel trio + live green (keeping the container/progress/hatch law) — the cards' grey/white surfaces and their ink law are not up for re-skin.

---

# Motion brief 🎚 `authored`

The source is a still; everything here derives from the library's standing rule — *motion follows hierarchy; what carries the message arrives last.*

| Element | Treatment |
|---|---|
| mount caption + phones | phones fade + 24px rise, one after another (80ms apart) |
| per screen | status bar → header rows → title block first; cards stagger ~60ms in reading order |
| state marks | **land last on each screen**: gauge arc draws, rings pop, bars rise from the baseline, the progress fill and stacked segments slide in — state is this design's payload |
| interactivity | bottom-nav tab switch (active icon full-white, others dim), the IN PROGRESS pill toggles to COMPLETED (pill inverts, fill + % animate), FAB press-springs via Motion |
| perpetual motion | none — this design is calm |

Everything lands within one beat. GSAP + Motion (Motion for press springs); no page scroll at mount widths, so no Lenis. `prefers-reduced-motion` kills all of it.

### ⚠️ Implementation traps

1. `gsap.from({opacity:0})` against a CSS pre-hide is a no-op — use `fromTo()` with explicit end values and `clearProps` on complete (library standing rule).
2. The gauge arc and rings are SVG strokes — animate `stroke-dashoffset` from a dash array set to the full arc length, and draw the static final state for reduced-motion.
3. Bars rise with `scaleY` from `transform-origin: bottom` — never animate `height` (layout thrash, and the hatch would smear).
4. The hatch is `repeating-linear-gradient` at 45°, thin live-green lines on the container's own pastel/white — never a solid grey block; never let the hatch carry text.
5. No box-shadow anywhere — the library's zero-elevation constant holds even for the presentation mount (hairline rims on the bezels only).

---

## Prompt payload

```text
MOUNT NOTE (read once, then forget it):
- This reference is a MOBILE APP shown as three phone screens on a desktop
  presentation mat. The mat (backdrop colour, caption, theme toggle, phone
  bezels) is PRESENTATION ONLY and carries no design tokens. Build the app
  screens; if a desktop view is required, centre phone-width columns on a
  library-neutral backdrop. The mount's theme toggle flips BOTH the mat and
  the screens (see TONE).
- PHONES ARE REAL DEVICES: size every screen to the Samsung Galaxy S26 Ultra
  viewport — 1440×3120 native (19.5:9) = 412×891 CSS px at 3.5×. NEVER invent
  screen dimensions; a task-app screen that matches no shipping phone's ratio
  is a defect, not a stylisation.

LAYOUT LANGUAGE (non-negotiable):
- A TASK-MANAGEMENT MOBILE APP that ships BOTH MOODS and flips with the
  mount's data-theme toggle (authored: human review, 15 Sep 2026). DARK
  mood (native): near-black #1E1E1E canvas. LIGHT mood: white #FFFFFF
  canvas. Never mix moods in one render.
- TONE (dark mood): canvas #1E1E1E; canvas text white, muted ~55% white;
  the body cards are WHITE (#FFFFFF) floating on the dark canvas with NO
  border — the tone step IS the separation (the source's own device,
  confirmed by review crop); card interior ink #1E1E1E, muted ~#8A8A8A.
  Icon discs (back / more / stepper chevrons / bell) are solid grey fills
  ~9% white (~#303030) — NEVER hairline rings. The FAB and share/edit
  circles float WHITE with black glyphs; the + and ↗ circles are BLACK.
- TONE (light mood): canvas #FFFFFF; canvas text near-black; the body cards
  turn LIGHT GREY (#F4F4F2) on the white canvas — tone-step separation, no
  border; discs ~6% ink; the canvas-floating FAB / share-edit circles INVERT
  to black (#050505) with white glyphs. Card interiors, the pastel trio,
  live green and hatch are IDENTICAL in both moods — never flip the cards'
  interior ink.
- COLOUR LAW: pastel containers ONLY — mint #DAFDDB, lilac #D4BFFA, butter
  #FFF5B7 paint whole cards/tiles; text on them is always the near-black ink.
  The ONLY saturated colour is LIVE GREEN #8CDA86 and it marks PROGRESS only:
  gauge arcs, the one active chart bar, progress fills. Never green-fill a
  container, never pastel-tint text.
- HATCH IS THE REMAINDER: every incomplete measure — gauge remainder, inactive
  chart bars, progress-track remainder, stacked-bar remainder — is thin 45°
  live-green diagonal ruling on its own container colour. NEVER grey blocks.
  (Hatch here reads temporally: "not yet done" — a different job from ARCHE's
  comparative hatch. Do not blend the two usages.)
- HOME: greeting row (avatar, "Welcome back," muted + name white, bell in a
  solid grey disc) → date stepper (solid tone-step discs flanking a two-line
  centred label) → HERO MINT CARD: small label, task title, white share circle
  + BLACK circle with white arrow-up-right, a "+12%" row, BLACK
  pill category chips, and a SEMICIRCULAR GAUGE — live-green solid arc, hatched
  remainder, the % set LARGE inside the opening → "All Tasks / See All" →
  pastel task cards (lilac, butter): title, one muted line, avatar cluster +
  "N participants", and a PROGRESS RING (translucent-ink track, ink arc, %
  centred) → FLOATING BOTTOM NAV on the bare canvas — no bar, no elevation:
  four white line icons (home, chart in a rounded square, sliders, person)
  flanking a CENTRAL WHITE FAB with a black +. FAB ~62px, icons ~28px, nav
  pitch ~72px — every target >= 44px.
- DETAIL: dark zone carries the title block ("App Design"-scale title + grey
  kit line) and TWO floating circles (share, edit — white in the dark mood,
  black in the light). Then a MINT ASSIGNEE CARD (avatar + "Assigned to"/
  name left; tinted calendar circle + "Due date"/date right). Then WHITE
  body cards on the dark canvas (light mood: the same cards in light grey
  #F4F4F2 on the white canvas) — never tinted pastels, never outlined-only
  boxes. Cards stack TIGHT: ~7px vertical between cards.
  Cards:
  Task Status (outlined dark uppercase pill + progress bar: live-green fill
  over a hatched remainder, % right-aligned), Description (quiet muted
  multi-line), Attach File (dark-ringed file circle, name + size · date, a
  red delete glyph — the only red), Team Member (avatar row + BLACK +
  circle).
- SUMMARY: dark zone, then a MINT CHART CARD: title + black arrow circle,
  "Avg"-style subtitle, and a 7-day bar chart on HAIRLINE GRIDLINES where
  EVERY BAR IS HATCHED EXCEPT ONE SOLID LIVE GREEN (the peak). Then a stat duo
  (lilac "13h Total Focus +12" / butter "43 Tasks Done +12") and a
  tone-step-separated overview card (white on the dark canvas, light grey
  #F4F4F2 in the light mood; its arrow circle is chip black):
  "Total spending" + amount, a SEGMENTED BAR (live-green, lilac,
  butter segments with small gaps, hatched remainder) and a hairline-divided
  legend with small rounded-square colour dots.
- RADIUS LADDER — three steps plus circles: large pastel cards 26px, inner
  white cards/stat tiles 22px, chips/pills/FAB/circles full round. Nothing
  sharp anywhere.
- CHARTS: hand-built geometry (rounded divs + CSS hatch + SVG arcs), NOT a
  charting library — the hatch encoding is the chart's information and a chart
  library cannot render it faithfully.
- ZERO ELEVATION: no box-shadow anywhere, screens included. Separation is
  tone steps, pastels, and hairlines only.
- TYPE: geometric sans (Plus Jakarta Sans or equal — double-story a, rounded
  g), medium weights, never heavy-bold; big numerals (gauge %, stat numbers)
  are the loudest type. Micro-labels 10–11px, body 13, card titles 17–20,
  screen titles ~34–36.
- ICONS: lucide line icons ONLY (stroke ~1.7) — status bar, bell, chevrons,
  share/edit/arrow circles, calendar, file, delete, +, nav (home, chart,
  sliders, person). The gauge, progress rings and bar chart are the one
  exception: hand-built geometry (see CHARTS), never lucide.
- Keep the source's copy verbatim, including its typo "Task manger ui kit" —
  it is provenance, not a defect to fix.

MOTION (authored — the source is a still):
- Screens arrive one after another (fade + 24px rise, ~80ms apart). Within a
  screen: status bar → header → title first; cards stagger ~60ms in reading
  order; THE STATE MARKS LAND LAST on each screen — gauge arc draws, rings
  pop, bars rise from the baseline (scaleY, transform-origin bottom), progress
  and stacked segments slide in. State is this design's payload.
- Cheap real interactivity: bottom-nav tab switch; the status pill toggles
  (pill inverts, fill + % animate); FAB press-springs (Motion). No perpetual
  motion — this design is calm.
- Use GSAP + ScrollTrigger + Motion. gsap.from({opacity:0}) against a CSS
  pre-hide is a NO-OP — use fromTo() with explicit end values and clearProps
  on complete. Animate stroke-dashoffset for arcs, transform only for bars.
- Disable all motion under prefers-reduced-motion and leave the final state
  rendered.

TUNABLE: task names, counts, percentages, chart heights, day labels.
SWAPPABLE: the pastel trio + live green (keep the container/progress/hatch
law), typeface, avatar photos, the kit line.
```

---

## What was measured vs inferred

- **Measured:** all tone values (§2 table), the pastel trio + live green family, card radius (18px source, corner-profiled), screen width (256 device px), FAB ⌀ and nav pitch, card/gutter positions, the two-zone boundary (hard edge at the assignee card's top), the one-solid-rest-hatched chart composition, white-on-white hairline card separation, dark header zones on both inner screens.
- **Inferred:** all font sizes (scaled by eye), muted greys (small text), ring track opacity, red delete glyph, inner-card radius step, the "IN PROGRESS" pill's exact height.
- **Authored:** the desktop mount, the theme flip (mat + screens, review round 2), nav active-state affordance, Plus Jakarta Sans, inner-card radius value, build-scale restatement (×1.465), the S26 Ultra mount viewport (412×891 CSS), the lucide icon set, the both-native moods with WHITE cards on the dark canvas (human review 15 Sep 2026, round 2 — the review crop settled the card reading and supersedes round 1's all-dark hairline build), the solid tone-step icon discs (review crops; supersedes the hairline-circle read), the halved card-to-card gaps (review round 2).
- **Blocked on the human:** the byline. Dribbble WAFs scripted fetches; no secondary post surfaced in search. The id `taskkit` and name "Task Kit" are provisional from the shot's own subtitle and must be revisited when the byline is confirmed.
