# FITNESS — Health & Activity Dashboard

**Design mood:** dark glass over a solid near-black canvas · one accent per metric · tight bento · the data glows, the chrome disappears

| | |
|---|---|
| **Source** | Dribbble — *"Fitness Dashboard UI Design \| Health Analytics Dashboard"*, **Mavero Studio** — [`/shots/27537811`](https://dribbble.com/shots/27537811-Fitness-Dashboard-UI-Design-Health-Analytics-Dashboard) · [credits](CREDITS.md). Byline verified **by eye** in the owner's browser on 14 Oct 2026 — the shortlist had carried a wrong designer name for weeks, and Dribbble WAF-blocks every scripted route, so only the by-eye check could catch it. |
| **Recreation** | [`fitness.html`](fitness.html) — dark-native (no light variant published) |
| **Format** | single still, **full-bleed screen, no mockup frame** — saved on disk and **pixel-scanned** (`image_reference/aa4c4f3c…webp`, natural size 1024×768) |
| **Palette** | sampled from the source pixels — **except that the glass forces a caveat, see below** |

> ✅ **Two controls were run before trusting any number, and they disagree — by design:**
> **Keystone check PASSES.** Rail left edge x=18 at y=150/400/650; card top y=111.5 at x=780 and x=980; row-2 top y=533.5 at x=150/400/460/700; bottom y=750 at x=150/600/980; right column right edge x=1005.5 at y=400/700. Nothing converges; there is no in-plane rotation either. **Geometry is exact.**
> **Lighting check FAILS — and it fails for a structural reason, not a photographic one.** The panels are not opaque: the same card fill reads `#2A353A` top-right and `#0C1013` bottom-right on the Sleep card, `#293234` vs `#44423E` on the Daily Goals panel, because every panel is **translucent glass over a photograph** and the photo shows through. Colours *cannot* be read exactly off this design — not because the render is lit, but because the design itself is transparent.
>
> **Consequence, and it is a rule of this spec:** measurements of **position, size and proportion are `observed` and trustworthy**. Measurements of **colour are `inferred`** unless taken on a known-opaque surface. Exactly one surface in the whole design is opaque: the active rail chip's solid orange, which reads `#FE6628` at every sample point. Everything else is glass.

> ⚠️ **There is no presentation frame here — but there is a subtler trap.** ARCHE sits in a MacBook render; RIVA in a monitor; this shot is the screen itself, edge to edge. Nothing gets discarded. The trap is the inverse: the **photograph behind the glass is design content, not presentation.** A frosted-glass UI over a flat dark canvas is a *different* (and dead) design — the glass has nothing to blur. The backdrop photo is a load-bearing layer, and §9 gives its casting rules.
>
> ✅ **Authored divergence — human request, 16 Oct 2026: the build REPLACES the photograph with a solid near-black canvas (`#15181A`, no gradient).** The source keeps its photo as content; the recreation does not. Two consequences: the glass now samples a flat tone (a subtle blur, no photo drifting behind the panes), and every panel's composite colour becomes **deterministic** — the colour-`inferred` caveat above is history of the SOURCE, not of the build. The build also adds a **Health Summary panel** (row 1, columns 1-3, the area the source leaves to the backdrop) — see §7.

> ⚠️ **Scale caveat.** The still is 1024×768 and mildly compressed. All px values below are **image px at an unknown design scale**. The ratios, alignments and the two-column verification (`§4`) are exact; absolute sizes should be read as ratios and re-tuned at the build artboard. A larger Dribbble export, if saved, upgrades several `inferred` tags to `observed`.

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

## 0 · Signature 🔒 `observed` — **metric = accent-coloured glass card**

Three things define this design and all three are visible in the first second:

1. **Every surface is glass.** The icon rail, the search field and every card are translucent panes over one full-bleed photograph. Nothing in the chrome is opaque; depth comes from blur and the photo drifting behind the panes, not from tone steps or shadows.
2. **Each metric domain owns one accent.** Calories wears **orange**, Heart Rate wears **rose**, Steps wears **green** — icon chip, spark series and all. You read which card is which from across the room, before reading a single label.
3. **The grid is tight.** Gutters measure ≈5–6px at image scale — the cards read almost as one continuous glass slab, scored into panels, not as separated tiles floating on a canvas.

> 🔑 This contests two library positions at once. **Ink:** TENON and LUMA insist the ink is a warm off-white, *never* pure white; this design's text measures `#FFFFFF` dead-on, repeatedly. **Glass:** the library has no translucent surface anywhere — this is the first. Do not import the off-white law, and do not import a flat-canvas reflex.

## 1 · Composition 🔒 `observed` — **inset rail + header row + one bento slab**

Full-bleed app frame. Three regions:

- an **icon rail** on the left — an *inset* rounded translucent column (x 18–85, w≈67), not a flush sidebar (RIVA's chrome is welded to the edges; this rail floats on margins of ≈18px all round)
- a **header row** (≈y 18–62) — greeting block, one stadium search field, bell, avatar, name
- the **content slab** (x 103–1006, y 111–750) — the bento grid, `§4`

Margins are unusually uniform: ≈18px left, ≈18px rail→grid, ≈18px bottom (cards end y=750 on a 768 image). observed.

## 2 · Tone system 🔒 structure · 🎚 values `inferred`

| Token | Value | Job |
|---|---|---|
| backdrop | **solid near-black** `#15181A` `authored` — replaced the source's photograph (human request, 16 Oct 2026; one flat tone, no gradient, noise film on top) | the canvas. |
| glass fill | ≈ `rgba(32,36,38,0.55–0.75)` | every rail, field and card — *one* translucent tone |
| ink | `#FFFFFF` `observed` | greeting, values, active labels |
| muted | ≈ `#9A9E9F` `inferred` | subtitles, placeholder, axis labels |
| accent | `#FE6628` `observed` | the system accent — see `§3` |
| rose | ≈ `#E8446A` `inferred` | the Heart Rate domain |
| green | ≈ `#4ADE67` bright / `≈#84B53B` muted `inferred` | the Steps domain + sleep stages |
| red-orange | ≈ `#F44236` `inferred` | the "Awake" sleep stage only |

**Separation without borders.** No card border or hairline was found anywhere — panels separate by the dark gap of photo showing between them. The gaps read *darker* than the glass (`#0B0F10` dips between fills). No shadow was found; if the build feels flat, the fix is a deeper canvas tone behind the gaps, never a drop shadow. (`inferred` — compression could hide a 1px hairline; do not add one on a hunch.)

## 3 · The accent rule 🔑 🔒 `observed` — **a triad with a boss**

The accents are a **categorical system**, not decoration:

| Accent | Where it lives |
|---|---|
| **orange `#FE6628`** | the *system* accent: active rail chip, the stress gauge's arc + needle, the goals progress fill, and the **Calories** card (chip + bars) |
| **rose** | the **Heart Rate** card (chip + ECG line); recurs as the REM sleep stage |
| **green** | the **Steps** card (chip + dot columns); recurs as Core/Deep sleep stages |
| red-orange | the Awake sleep stage only — one legend entry, never elsewhere |

Orange is the boss: everywhere the *interface itself* needs a highlight — navigation, gauge, progress — orange is the choice, and it never delegates to rose or green. Rose and green live inside their metric domains (plus the sleep chart, which legitimately borrows the whole triad as a series palette). An accent appearing on a *different* card's chip — a green Heart Rate chip — breaks the system.

## 4 · Grid 🔒 `observed` — **3 + 1 columns, one 2-col span, uniform tight gutters**

Content slab measured (image px):

| Element | value |
|---|---|
| left zone | 3 columns, each w≈212 (x 103–315, 321–532, 537–749) |
| right column | w≈251 (x 755–1006), full height y 111–750 |
| gutter | ≈5–6px, **uniform in both axes** |
| row 1 (metrics) | y 373–533, h≈160 — Calories / Heart Rate / Steps |
| row 2 | y 540–750, h≈210 — Sleep + Workout |
| right column | Stress y 111–366 (h 255) + Daily Goals y 373–750 |

*Verified two-col span:* Sleep measures 430 wide = 212 + 6 + 212 **exactly** — it swallows the gutter it spans, same verification pattern as ARCHE's wide panels. Sleep spans columns 1–2; Workout sits in column 3.

> Unlike ARCHE, the gutters **are** uniform in both axes (≈6px vertical = ≈6px horizontal), and unlike every other dashboard in the library they are *tight* — the slab reads as scored glass. Spreading the cards apart is the most likely grid failure.

## 5 · Header 🔒 `observed`

Greeting block left — `Good Morning, {name} 👋` (largest type on the page, ≈30px) over a one-line muted subtitle. Then a **stadium search field** (≈305×44, full-round, magnifier + muted placeholder — the placeholder is a real sentence, `Search something here…`). Right: bell in a glass circle, then **avatar (d≈44) with name + role stacked beside it** — the avatar is a circle, and the identity block sits *in the header*, not in the rail. No page title, no KPI strip, no tabs.

## 6 · Rail anatomy 🔒 `observed`

One rounded translucent column, six navigation glyphs at pitch ≈51px, and **the active item is a solid accent circle (d≈44, `#FE6628`) with a dark glyph** — the only opaque object in the design. Inactive glyphs are ink/muted hairline icons. Bottom of the rail: a **moon/sun theme pair** (present, though the design publishes dark only). No labels on any rail item — glyph only.

## 7 · Card anatomy 🔒 `observed`

**Metric card (row 1)** — the species to get right:
- **icon chip top-left: an accent-filled circle (d≈40) with a light glyph** — orange/rose/green per `§3`. This chip is the card's identity.
- label right of the chip (**white**, ≈17px 📐 *corrected during the update pass — the crops show card titles in ink, not muted*); a `Last 7 days` micro-label top-right (muted, ≈11px)
- the **spark series** owns the middle
- **value bottom-left**: white semibold digits with the unit set smaller and muted beside (`1428` · `Kcal`, `104` · `bpm/day`, `9886` · `Steps`) — unit *after* the number, never above it

**Sleep card** — label row (icon chip + title + `Last 7 days`); the chip is **dark glass, not an accent fill** 📐 *corrected during the update pass*. Then a **multi-lane hypogram**: four horizontal lanes, one per stage — Awake (top, tiny orange-red bursts), REM (rose segments), Core (long lime stretches), Deep (bottom, short green dots) 📐 *corrected — the build first shipped a single-row 4-segment bar, which is not the source's species*. Beneath it a **dotted tick axis**: 🌙 `01:38` at left, `07:12` ☀ at right. Legend = four stacked items spread across the card (dot + stage name on one line, duration in white semibold under it).

**Workout card** — title + a two-item dot legend (`● Online` white, `● Offline` orange), then an **area line chart with visible axes** — Y ticks `0% / 20% / 40% / 60%`, X = days — the orange series filled with a fading gradient, the white series a thin line weaving over it, and a **vertical orange pin** with an **orange `57 kg` pill** over a white-ringed marker on one point 📐 *corrected — axes and the orange pill were measured off the crops; the first build hid the Y axis and used a white pill*.

**Stress card** — title + kebab; a **radial tick gauge** (arc of tick marks, needle pointing at the current level) over `Low Stress` / `Current Level`; a small **white pill** (`High Level`); a thin wave line beneath; footer `Daily Dynamic` · time.

**Health Summary panel** — `authored` addition (16 Oct 2026, fills the source's empty row-1 backdrop area; layout revised 19 Oct 2026, human request, and toned down same day on feedback): spans **columns 1-3 of row 1**. Metric-card header (accent chip + `activity` glyph + `Health Summary` + `This week` micro). The AI-generated runner cutout (`assets/fitness/summary-tile.png`) is the panel's **BACKGROUND**: oversized (~2.5× the panel height) so only head-to-waist shows, the bottom cropped by the card, centred but biased slightly right, and rendered at FULL OPACITY — the **canvas-tinted gradient veil** concentrates on the left text column (≥.88 up to ~26% width) then falls away (.18–.42) so the runner reads at full strength; measured live, white text sits only over the dark veil (rings/labels ≈17:1, muted `/ 100` 6.7:1). Foreground is a stacked LEFT column over the veil — the weekly **score** (white semibold ~76px at the build artboard, container-query sized ≈2.5× the greeting, with `/ 100` muted beside and the **white delta pill** (`trending-up +4 pts`) + muted `vs last week` on a row under the number), then **three circle-progress rings side by side pinned BELOW the score** (~52-58px, 8px stroke, 10%-white track, rounded caps, arc start at 12 o'clock), separated from the score block by a guaranteed ≥22px band of open canvas — human feedback 19 Oct: the two contents must never read as one block — Activity orange 82, Heart rose 78, Sleep green 94 — each with its value counting up inside and a muted label under. To the right, over the runner, sits the **Coach AI insight as its own highlighted glass section** (the one card glass tone + blur, ~272px, 15px text, sparkle glyph + `Coach AI` label; enlarged same day on feedback). The panel's own chart species is the **ring gauge**; the 16 Oct radar + orb layer and the photo-tile treatment are retired.

**Daily Goals panel** — title + a **pencil button in a small glass circle** 📐 *corrected*; **five rows, each built as: circular glass icon chip (moon / water / person / footprints / apple) + label + circular checkbox on the RIGHT** 📐 *corrected — the first build put a bare checkbox on the left with no icon*; two rows checked (orange box, white check, label dimmed and struck through — **done rows are the dim ones, open rows are bright white**), three open; **dashed hairline separators between rows**; a **full-round progress bar** (h≈14, orange fill ≈ 40% of the track, white remainder); footer `Compered` — *the source's own spelling, kept* — and `40%` **in orange**. The panel is one card, not a stack of cards.

## 8 · Typography 🔒 rules · 🎨 face `authored`

One geometric sans throughout. Greeting largest (≈30px); row-2 card titles ≈21px; row-1 labels ≈17px white ink; values ≈17px **semibold white** with muted smaller units; micro-labels ≈11px (`Last 7 days`, `Current Level`). No two-tone headings, no uppercase eyebrow device — this design's labels are quiet and lowercase-ish; hierarchy is carried by **weight and colour**, not by size jumps. Values are the loudest text after the greeting.

🎨 **Face: Plus Jakarta Sans** (400/500/600) — `authored` at build time; the source's face is unidentifiable from a compressed still and swappable anyway.

## 9 · The backdrop photograph 🔒 `observed` — SUPERSEDED in the build (16 Oct 2026: solid `#15181A` canvas, no photo); kept as provenance for the SOURCE and any photo-first re-skin

The photo is **content**. Casting rules extracted from the source:

- **dark, desaturated, low-contrast** — it must never compete with the glass; the source reads near-monochrome with faint warm highlights low-left
- **subject centred upper-middle** — the portrait's face sits in the gap between the header and the card slab, where the glass is thinnest; the photo is *most* visible exactly where there are no cards
- **heavily dimmed** — scrim it (black at roughly 50–70%) so white text passes contrast everywhere, especially the greeting
- it must survive being **blurred by every panel** — fine detail is wasted; shape and tonal mass are what show

## 10 · Chart vocabulary 🔒 species `observed` · implementation `authored`

Seven chart species, one per panel — **no two cards use the same species** (the authored Health Summary panel adds an eighth, the ring gauge, unique to it):

| Panel | species |
|---|---|
| Calories | **thin** vertical spark bars (≈7px), rounded tops, mixed dim/bright opacity, orange |
| Heart Rate | ECG-style **spike train**, rose |
| Steps | **dot-matrix columns** — each day a column of dots, green, capped by a WHITE top dot |
| Sleep | **multi-lane stage hypogram** (one lane per stage, segments along the night timeline) + dotted moon/sun axis + stacked legend |
| Workout | area line chart (orange fill) + thin white line, **visible % axes**, orange tooltip pill + pin |
| Stress | radial tick gauge + needle |
| Goals | icon rows with RIGHT-aligned circular checkboxes (dashed separators) + progress bar |
| Health Summary `authored` | **circle-progress rings** — one per domain, each in its own accent, value counting up inside, muted label under |

The dot-matrix columns are the most distinctive and the most likely to be replaced by ordinary bars — **do not**. Implementation is the house rule: **ApexCharts** (or hand-positioned DOM for the dot columns and gauge where a chart library adds nothing), never hand-drawn SVG approximations of the line/area charts.

## 11 · Theme 🔒 dark-native

Only dark is published. A light re-skin is not a token flip here — the glass system is tuned to a dark canvas, and inverting it means re-tuning the canvas tone and re-verifying contrast. If a client demands light, that is an `authored` variant: new canvas, re-verified contrast, same geometry.

---

# Motion brief 🎚 `authored` — GSAP · ScrollTrigger · Lenis · Motion

> The source is a still; everything here derives from the library's standing rule — *motion follows hierarchy; what carries the message arrives last.* For this design that means: **the glass world appears first, the numbers arrive last.**

| Element | Treatment |
|---|---|
| backdrop canvas | fades in first, slow scale 1.04→1 — it is the world the glass sits on |
| rail + header | fade + 12px rise, just after |
| cards | ~50ms stagger in reading order; each fades + rises ~10px |
| gauge needle | **sweeps to its value** (GSAP, explicit `svgOrigin`, ~0.9s ease-out), after the stress card lands |
| bars / dot columns | grow / pop from their baseline, per column |
| summary rings | each arc sweeps to its value by stroke-dashoffset (staggered), the number counts up inside |
| ECG + area lines | draw left→right; **the tooltip pin lands last** |
| values | count up, the payoff |
| hover | card lifts 2px + glass brightens slightly; Motion press-springs on chips and checkboxes |

Lenis tuned **short (~0.7s)** — a dashboard to scan. Everything lands within one beat; no scroll narrative. Disabled under `prefers-reduced-motion`.

### ⚠️ Implementation traps

1. **`backdrop-filter` needs the backdrop on a layer BENEATH the panels** — blur samples what's behind the element. Put the canvas as a fixed full-bleed layer and let each card blur it; a backdrop *inside* the card blurs nothing and the glass reads as flat grey.
2. **Never animate `backdrop-filter` itself** — it is GPU-expensive and stutters. Animate card `opacity`/`transform` only; let the blur sit still.
3. **Cap the blur radius (~14–20px).** Eight glass panels each sampling the canvas is already heavy; larger radii multiply the cost without reading differently.
4. **`gsap.from({opacity:0})` against a CSS pre-hide is a no-op** — use `fromTo()` with explicit end values, animate every pre-hidden selector back, drop the pre-hide class on complete as a guard.
5. **The gauge needle must be driven with an explicit `svgOrigin`, and its parked angle must live in the SVG `transform` attribute, not inline CSS.** 📐 **Corrected during the build.** Two failures observed: Motion's default transform-origin resolves against the line's bounding box — *zero width* for a radial needle — so the sweep landed rotated about a far-off point, off-canvas; and GSAP fed an inline CSS `rotate(-90deg)` plus `svgOrigin` merged into a wild translation for the same reason. Park the needle with `transform="rotate(-90 cx cy)"` as an attribute, tween with `rotation` + `svgOrigin`. (Mid-page tween, not post-View-Transition, so the idle-ticker trap does not apply.)
6. ~~A scrim over the photo is part of the contrast story~~ — obsolete in the build (16 Oct 2026: solid canvas, no photo, no scrim). It stays true for any photo-first re-skin: if entry animation fades the photo layer, the scrim must fade with it.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- A DARK-NATIVE HEALTH & ACTIVITY DASHBOARD MADE OF GLASS: one flat canvas behind everything, and
  every panel — rail, search field, cards — is TRANSLUCENT GLASS over it.
  ⚠️ AUTHORED DIVERGENCE (human request, 16 Oct 2026): the build's canvas is a SOLID NEAR-BACK
  #15181A — NO gradient, NO photograph. The source still uses a photo; this recreation does not
  (the source's own rule that "photo = content" is superseded here by human instruction; keep it
  in mind for any photo-first re-skin). Cast the canvas tone DARK and LOW-CONTRAST so all text
  passes contrast; keep the subtle noise film so the flat field reads as material.
- COMPOSITION: an INSET rounded icon rail on the left (w ~6.5% of the viewport width, floating on
  ~18px margins — NOT a flush sidebar), a header row (greeting block, one stadium search field,
  bell, avatar with name+role beside it), then ONE content slab: a tight bento grid.
- ⚠️ THE GRID IS TIGHT: gutters ~6px AT ALL — uniform in BOTH axes. Cards read as one scored glass
  slab, not as separated tiles. Left zone = 3 equal columns; a full-height right column slightly
  wider than one left column (~1.18x). Rows: a SUMMARY row — the Health Summary panel SPANS ALL 3
  LEFT COLUMNS (authored addition; the source leaves this area to its backdrop) with the stress
  card in the right column; below it a metrics row of 3 equal cards; below that a row where the
  FIRST CARD SPANS 2 COLUMNS AND SWALLOWS THE GUTTER IT SPANS (verified: 430 = 212+6+212)
  and a 1-column card sits in column 3. Right column: the stress card on top (starting at the header
  line, above the summary panel), then the goals panel that starts level WITH THE METRICS ROW and runs
  to the bottom of the slab. Outer margins ~18px all round.
- ⚠️ METRIC = ACCENT-COLOURED CARD. Each metric domain OWNS one accent, used on its icon chip AND
  its chart series: CALORIES = ORANGE, HEART RATE = ROSE, STEPS = GREEN. ORANGE IS ALSO THE SYSTEM
  ACCENT and the boss: active rail chip, gauge arc + needle, progress fill are ALWAYS orange —
  rose and green never leak into the chrome. A green Heart-Rate chip breaks the system.
- TONE: ink = PURE WHITE #FFFFFF (this design does NOT follow the warm-off-white rule of other dark
  dashboards — measured dead-on, repeatedly). muted ~#9A9E9F. ONE glass fill for every panel,
  ~rgba(32,36,38,0.6). NO card borders, NO hairlines, NO drop shadows — panels separate by the DARK
  GAP of canvas showing between them, which reads darker than the glass. If it feels flat, deepen
  the canvas tone behind the gaps; never add a shadow.
- ⚠️ THE ONLY OPAQUE OBJECT IN THE DESIGN is the active rail item: a SOLID ACCENT CIRCLE (~44px)
  with a dark glyph. Everything else is glass. The rail has ~6 glyph-only nav icons (NO labels) at
  an even pitch, plus a moon/sun theme pair at the bottom.
- HEADER: greeting is the LARGEST type (~2x a card label) with a one-line muted subtitle; the search
  field is a FULL-ROUND STADIUM with a magnifier and a placeholder written as a real sentence;
  avatar is a CIRCLE with name + role stacked beside it. No page title, no KPI strip, no tabs.
- CARD ANATOMY (metric cards) — icon chip top-left is an ACCENT-FILLED CIRCLE (~40px) with a light
  glyph; label beside it in WHITE ink; a "Last 7 days" micro-label top-right (~11px); the spark series
  owns the middle; THE VALUE SITS BOTTOM-LEFT — white semibold digits with the UNIT AFTER the number
  and SET SMALLER IN MUTED (1428 Kcal · 104 bpm/day · 9886 Steps), never above it.
- CHART SPECIES — one per panel, NO TWO ALIKE, and this is the vocabulary of the design:
  · Calories: THIN vertical spark bars (~7px), ROUNDED TOPS, orange, MIXED DIM/BRIGHT opacity rhythm
  · Heart Rate: ECG-STYLE SPIKE TRAIN, rose
  · Steps: DOT-MATRIX COLUMNS — each day is a column of green dots CAPPED BY A WHITE TOP DOT.
    ⚠️ DO NOT REPLACE THESE WITH ORDINARY BARS — the dot columns are the most distinctive chart in
    the design.
  · Sleep: a MULTI-LANE HYPOGRAM — four horizontal lanes, one per stage (Awake top / REM / Core /
    Deep bottom), rounded stage segments scattered along the night timeline; under it a DOTTED TICK
    AXIS with moon + 01:38 left and 07:12 + sun right; legend = four STACKED items (dot + stage name
    over the white semibold duration)
  · Workout: AREA LINE CHART — orange series gradient-filled, white series a thin line — with
    VISIBLE AXES (Y 0/20/40/60%, X = days) and a VERTICAL ORANGE PIN with an ORANGE "57 kg" PILL
  · Stress: RADIAL TICK GAUGE (arc of ticks + needle) over "Low Stress / Current Level", a small
    white pill, a thin wave line, footer label + time
  · Health Summary (authored; revised 19 Oct 2026): the AI-GENERATED RUNNER CUTOUT is the PANEL
    BACKGROUND at FULL OPACITY — oversized until only head-to-waist shows, bottom cropped by the
    card, centred but biased slightly right. The CANVAS-TINTED VEIL (never a black scrim) guards
    only the LEFT TEXT COLUMN and falls away over the subject. Foreground, stacked LEFT: ONE score
    ~2.5x THE GREETING (white semibold, container-query sized + "/ 100" muted, WHITE DELTA PILL
    (trending-up, "+4 pts") and muted "vs last week" under the number); THREE
    CIRCLE-PROGRESS RINGS side by side pinned UNDER the score — Activity orange 82, Heart rose 78,
    Sleep green 94 — value counting up inside, muted label under. To the RIGHT, over the runner: the COACH AI INSIGHT as its own HIGHLIGHTED GLASS
    SECTION (the one card glass tone + blur, larger readable text). No radar, no photo tile.
  · Goals: ONE panel (not a card stack): five rows, each = GLASS ICON CHIP (moon / water / person /
    footprints / apple) + label + CIRCULAR CHECKBOX ON THE RIGHT — two checked in orange with the
    label DIMMED AND STRUCK (done rows are the dim ones; open rows are bright white), three open;
    DASHED SEPARATORS between rows; a pencil button in a small glass circle top-right; a FULL-ROUND
    PROGRESS BAR (~14px tall, orange fill ~40%, white remainder); footer "Compered" (sic — the
    source's own spelling) + "40%" IN ORANGE
  Implement line/area charts with a REAL CHARTING LIBRARY (ApexCharts); never hand-drawn SVG.
- TYPOGRAPHY: ONE geometric sans (Plus Jakarta Sans, 400/500/600). Hierarchy by WEIGHT AND COLOUR,
  not by size jumps: greeting largest, card titles ~21px, labels ~17px WHITE INK, values ~17px SEMIBOLD
  WHITE, micro-labels ~11px. No uppercase eyebrow device, no two-tone headings.
- DARK ONLY. A light variant would require re-tuning the solid canvas tone, not flipping tokens — do
  not build one unprompted.
- RADIUS: cards ~15px, search field and progress bar FULLY ROUND, icon chips and avatar are circles.
  No sharp corners anywhere.

MOTION (authored — the source is a still):
- THE GLASS WORLD APPEARS FIRST, THE NUMBERS ARRIVE LAST: backdrop canvas fades in with a slow
  1.04->1 scale; rail + header fade and rise; cards stagger ~50ms in reading order (fade + ~10px
  rise); THEN charts perform — gauge needle SWEEPS TO ITS VALUE, bars and dot columns grow from
  their baseline, the summary's domain rings SWEEP to their values (stroke-dashoffset, staggered),
  lines DRAW left to right with the
  tooltip pin landing last, and the values COUNT UP.
- ⚠️ THE CANVAS MUST SIT ON A LAYER BENEATH THE PANELS — backdrop-filter samples what is BEHIND the
  element. A backdrop painted inside the card blurs nothing and the glass reads as flat grey.
- ⚠️ NEVER ANIMATE backdrop-filter — GPU-expensive and it stutters. Animate opacity/transform only.
  Cap the blur at ~14-20px; eight glass panels each sampling the canvas is already heavy.
- The source's scrim-over-photo rule is obsolete in the build (solid canvas, no photo, no scrim).
- Drive the gauge needle with GSAP using an explicit svgOrigin, and park its start angle in the
  SVG transform ATTRIBUTE — a CSS inline transform or a default transform-origin on a zero-width
  SVG line lands the sweep off-canvas. Never a CSS-rotated pseudo-element.
- Lenis tuned SHORT (~0.7s) — a dashboard to scan, not a page to drift.
- Use GSAP + ScrollTrigger + Lenis + Motion. Never hand-roll CSS transitions.
- gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP — use fromTo() with explicit end values,
  animate every pre-hidden selector back, and drop the pre-hide class on complete as a guard.
- Disable all motion under prefers-reduced-motion.

TUNABLE: card count, the canvas tone (keep it dark, flat and low-contrast), accent hues, blur
radius, motion intensity.
SWAPPABLE: typeface, the accent triad's exact hues (keep one system accent + per-metric accents),
the name/role/avatar, all copy, the summary background cutout (AI-generated at
`assets/fitness/summary-tile.png`; keep the subject wearing the system accent, transparent
background — it scales as the panel BACKGROUND, head-to-waist crop, not a tile).
```

---

## What was measured vs inferred

- **Measured (geometry, exact):** all grid positions and spans — rail x 18–85, columns 212/212/212/251 with ≈6px gutters, row boundaries y 111/366/373/533/540/750, Sleep's 430px two-column span = 212+6+212, the stress card's corner-radius curve (flat to x≈992, sweeping to the edge at x=1006), search field 305×44, rail chip d=44, icon pitch ≈51, progress bar 213×14, pill 53×21.
- **Measured (colour, one surface only):** the active rail chip's orange `#FE6628`, and pure-white ink at multiple direct hits.
- **Inferred (colour — source-only caveat):** every other hex IN THE SOURCE. The source's panels are translucent over a photograph, so source fills drift with its backdrop (same card: `#2A353A` vs `#0C1013`). Rose/green/red values are read through the glass and compression. The BUILD's canvas is solid `#15181A`, so its panel composites are deterministic.
- **Inferred (scale):** the design's true artboard width. All values are image px at 1024; the ratios are the deliverable.
- **Authored:** typeface, the motion design, the source's photo casting rules as provenance (superseded in the build by the solid canvas — human request, 16 Oct 2026), the Health Summary panel (authored addition, same date), the light-theme refusal, and the summary runner cutout — an AI-generated image at `assets/fitness/summary-tile.png` (16 Oct 2026, human-requested; replaces the curated Pexels photo, credit retired). **19 Oct 2026, all human-requested:** the cutout promoted to the panel's BACKGROUND (head-to-waist crop, centre biased right, full opacity — the canvas-tinted veil guards only the left text column); the domain bars replaced by circle-progress rings (the radar + orb layer retired with them); the Coach AI insight promoted to its own highlighted glass section; the score briefly sized to ~45% of the panel height, then settled at ~2.5× the greeting with the delta pill under the number and the rings pinned below it; the Coach AI glass section enlarged (~272px, 15px text) on the same feedback. Rings sit UNDER the score in a stacked left column.
