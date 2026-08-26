# Vertex — Premium Property Investment

**Design mood:** architectural editorial · pastel multi-tint · notched shape language

| | |
|---|---|
| **Source** | Dribbble — *"Real Estate Website Design – Vertex"*, **Phenomenon Labs** for Phenomenon Studio — [`/shots/27357269`](https://dribbble.com/shots/27357269-Real-Estate-Website-Design-Vertex) · [credits](CREDITS.md) |
| **Recreation** | [`realestate.html`](realestate.html) — light + dark |
| **Studio-published palette** | `#FEFEFE` `#1E0B09` `#5B160C` `#396A94` `#6399BE` `#354B62` `#B02310` `#93BEDB` |
| **Stated intent** | *"a modern real estate platform for discovering and investing in premium properties… brings together design, data, and usability… helping users quickly understand project value, compare options, and take action"* |
| **Composed from** | hero = landing frame · forms/charts = overview frame · feature + project cards = mobile frame, translated to desktop |

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Each rule is tagged **`observed`** (read from the reference — binding) or **`inferred`** (authored — overrulable).

---

# Core dimensions

## 0 · Intent 🔒 `observed`
An **investment-grade property platform** — discovery *and* evaluation. Photography sells the aspiration; spec data justifies the decision. **Data and imagery are co-equal.**
**Consequences:** spec sheets rendered as UI · an ROI calculator as a headline feature · project names treated like brand marks · comparison-friendly structure.

## 1 · Frame / canvas 🔒 `observed`
**Flush to the viewport** — no outer frame, no floating panel. Content is held to a max width but there is no visible container.

> ⚠️ The reference's *project detail* screen does use a framed panel on a steel-blue backdrop. The *landing* screen — which this recreation follows — is flush. **Framing is per-screen, not a global rule for this system.** Don't carry the frame across.

Third distinct answer across the library so far: VITA = full-bleed · Blockio = contained column · Vertex = flush with max-width.

## 2 · Separation model 🔒 `observed`
**Hybrid, by level:**
- **Outer level** — cards separated by **tint + gaps** (pastel or white cards on a near-white field).
- **Inner level** — cells *within* a grouped card divided by **1px hairlines**.

This two-level split is what makes the spec mosaic read as a single object rather than loose cards.

## 3 · Elevation 🔒 `inferred` — assumed **none**
No shadows anywhere; separation is tint + hairline only. *(Assumed, not confirmed by the user — all five reference frames read flat.)*

## 4 · Spacing 🔒 model · 🎚 magnitude
Real gaps between cards; generous internal padding; sections separated by vertical rhythm rather than rules.

## 5 · Geometry 🔒 `observed`
Stepped radius, decreasing with nesting: image/section (~20px) → card (~20px) → inner cell (~12px). **Pills** for tags, CTAs and selectors. **Perfect circles** for icon buttons.

## 6 · Shape language 🔒 `observed` — **the signature**
**Notched containers.** Rounded-square "bites" are cut out of image-panel edges, straddling the boundary so the container reads as a jigsaw piece.

**The style has a name: _inverted border-radius_** (also called inverse/negative radius, concave corners, or inner curves).

### Split the work: `clip-path` for edges, `mask` for holes

| Cut type | Technique | Why |
|---|---|---|
| **Edge-touching** (corners, steps) | `clip-path` with an SVG path | **Only a path can draw the concave fillets.** |
| **Floating interior** | a `mask` layer | No junction to fillet; and `clip-path` can't punch holes. |

> **The rule that matters:** subtracting a rounded rect from an edge *cannot* produce a smooth junction. The concave fillet where the surface curves into the notch is **added material, not removed** — so a mask always leaves a hard 90° corner. A path creates it by alternating arc sweep directions (`,0,0,1,` outward vs `,0,0,0,` inward).

Author the edge silhouette with [Corner Inverter](https://corner-inverter.douiri.org/) and export the `<clipPath>` form — it emits `clipPathUnits="objectBoundingBox"` (normalised 0–1), so one path scales responsively:

```html
<svg width="0" height="0"><defs>
  <clipPath id="clip" clipPathUnits="objectBoundingBox"><path d="M0.0418,0H0.905A0.02,0.0385,…"/></clipPath>
</defs></svg>
```
```css
.hero__bg{ clip-path:url(#clip); }
.hero__frame{ aspect-ratio:200/104; }   /* MUST match the ratio the path was designed at */
```

⚠️ **Lock the aspect ratio to the path's design ratio.** `objectBoundingBox` scales non-uniformly, so a path drawn at 4:3 and used at 1.9:1 gets visibly ovalled corners. Design the path at the ratio you will actually render.

⚠️ The generator only exposes the **four corners**. Mid-span edge cuts must be authored into the path directly; interior cuts go on as mask layers.

### If you must fake it — don't

❌ **Wrong** (what the first build did): position opaque squares in the page's background colour on top of the image. This only works on a flat background, must be recoloured for every theme, and leaves hard 90° junctions — it reads as stickers laid on the image.

✅ **Right:** subtract the shapes with `mask` + `mask-composite`, so the notches are genuinely transparent and the page shows through:

```css
.hero__bg{
  --n: clamp(46px,5.2vw,98px);   /* notch size */
  --nsvg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' rx='26' fill='%23000'/%3E%3C/svg%3E");
  border-radius: var(--r-card);
  mask:
    var(--nsvg) left 9%   top    calc(var(--n) * -.45) / var(--n) var(--n) no-repeat,
    var(--nsvg) left 37%  top    calc(var(--n) * -.45) / var(--n) var(--n) no-repeat,
    /* …one layer per notch, on all four edges… */
    linear-gradient(#000 0 0);          /* the full shape, last */
  mask-composite: exclude;              /* XOR ⇒ full shape MINUS the notches */
  -webkit-mask-composite: xor;          /* Safari */
}
```

Key details:
- An **SVG rounded-rect at a fixed px `mask-size`** keeps every notch square regardless of the container's aspect ratio (percentage/`objectBoundingBox` units would stretch them).
- Offset each notch by ≈ **−45% of its own size** so it straddles the edge.
- Notch corner radius ≈ **26%** of its size.
- Put the mask on a **dedicated background layer**, not the content wrapper — `mask` clips descendants, and would eat the headline and buttons.
- Because the notch is truly transparent, it is **theme- and background-agnostic** — no repainting per theme.

### The silhouette is authored, not scattered

Traced from the reference at full magnification. It is **not** uniform bites sprinkled on the edges — it's a deliberate **architectural stepped profile**, closer to a building massing diagram or floor plan than a decorative border:

| Cut | Placement | Size *(u = depth of a top cut)* |
|---|---|---|
| Top 1 | flush left, removing the top-left corner | 2u wide × 1u deep |
| Top 2 | ~42% across | 1.26u × 1u |
| Top 3 | flush right | 1.26u × 1u |
| Left edge | ~66% down | 1u deep × 1.3u tall |
| Bottom 1 | flush left — the large one | 6.8u × 1.8u |
| Bottom 2 | ~60% across | 2.26u × 1.1u |
| Bottom 3 | ~84% across | 1.16u × 1.1u |
| Floating | ~53%/70%, fully **inside** the image | 1u × 1.2u |

Character rules that make it read correctly:
- **Top edge is crenellated** — cuts of *differing widths*, shallow.
- **Bottom edge is a comb** — one large cut plus narrow tabs, deeper than the top cuts.
- **At least one cut floats fully inside** the image, touching no edge. This is what stops it reading as a plain scalloped border.
- **Never symmetrical**, never evenly spaced.
- Corner radius ≈ **26% of the cut's smaller dimension**, so large cuts get large radii and small cuts stay tight — matching the reference rather than a single fixed radius.
- Appears on both desktop and mobile heroes → systematic, not garnish.
- Accompanied by a **geometric mark set**: 3×3 dot grids, starbursts, notched squares — used as feature-card icons.

> Method note: the silhouette was only readable after opening the source PNG at native resolution and magnifying the hero. **Always do that before recreating a shape motif** — at thumbnail scale this looked like scattered squares, which is what the first two attempts wrongly built.

> This is the single most identifying feature of the design. A recreation without it reads as generic no matter how accurate the colour is.
>
> References: [css-tip.com/inverted-radius](https://css-tip.com/inverted-radius/) · [douiri.org — inverted border-radius](https://douiri.org/blog/inverted-border-radius/) · [Corner Inverter generator](https://corner-inverter.douiri.org/) · [CSS-Tricks — cut corners with mask & clip-path](https://css-tricks.com/cut-corners-using-css-mask-and-clip-path-properties/)

## 7 · Colour space 🔒 rules · 🎨 hues `observed`
- Near-white page, **warm near-black ink** (`#1E0B09` — brown-black, *not* neutral).
- **Multi-tint pastel card set** — pale yellow / blue / peach / pink. Four tints in rotation, one per card.
- **Steel-blue family** available for backdrops and supporting surfaces.
- **ONE hot orange accent**, on **exactly one element at a time**: the single most important spec cell (`Construction Stage`), the active selector pill, the calculator's results panel, the final CTA.
- Flat colour only, no gradients.

## 8 · Typography 🔒 `observed`
**Huge uppercase display is the loudest voice** — hero statements and project names set very large and tight. Supporting labels small, with **slash-separated tag lines** (`Residential / Premium / Urban`).

## 9 · Hierarchy 🔒 `observed`
Statement → image → data. Every spec is a **label-above-value pair**: small muted label, larger dark value.

## 10 · Imagery — role + treatment 🔒 `observed`
**Dual role in one design** — a first for the library:
- **Content** — architectural photography *is* the product (hero, project media), always in a notched container.
- **Proof** — floor-plan line art and isometric site renders as supporting evidence.

## 11 · Forms & buttons 🔒 `observed`
- **Pill selectors** with an **orange active state**.
- **Sliders** with a filled accent track, circular knob, and a min/max numeric scale beneath.
- **Circular** arrow buttons for pagination.
- Plain text nav; pill CTAs (`Book a call` light, `Invest` dark).

## 12 · Data treatment 🔒 `observed` *(conditional)*
Units always carried (`4,500 m²`, `70 m²`, `Q3 2026`). The calculator pairs **inputs → results**: a bar chart plus four label/value results (Total invested, Expected ROI, Payback period, Monthly income), with a disclaimer and a CTA.

## 13 · Theme 🔒 both required
Light-native `observed`; dark is a token re-skin `inferred`. Pastel tints become **deep muted versions of the same hues** (not greys) so the four-tint rotation survives; the orange accent holds unchanged.

> ⚠️ **Tint separation must be verified in BOTH themes, numerically.** With no borders and no shadows, the page↔card tint step *is* the separation model — if it collapses, the layout has no structure. The first build shipped light at a delta of **1** (`#FEFEFE` page vs `#FFFFFF` card): invisible.
>
> **The rule: the page is the pure extreme in each theme, and cards step *inward* from it.** White page → grey cards in light; near-black page → lighter cards in dark. Nested wells continue one more step in the same direction.
>
> | | Page | Card | Well | Page→Card |
> |---|---|---|---|---|
> | Light | `255` | `245` | `234` | **10** |
> | Dark | `15` | `24` | `33` | **9** |
>
> - Keep the delta ~**9–11** in both themes.
> - **Nested wells reverse direction per theme** — darker than the card in light, lighter in dark. Nested surfaces move *away from* the card; copying one theme's offsets into the other makes nesting vanish.
> - White-page/grey-cards also gives pastel tint cards more room than a tinted field does — they compete with a grey page.

> ⚠️ **Do not derive dark surfaces from a warm ink.** Vertex's ink is a warm brown-black (`#1E0B09`), and building the dark ramp from it made the whole page read as **chocolate**. Chroma that is invisible in 16px type compounds across a full viewport. **Keep large surfaces neutral (channel spread ≤ ~2); let the warmth live in the ink and accent only.**

| Token | Light | Dark |
|---|---|---|
| `--panel` | `#FEFEFE` | `#0F0F10` *(neutral)* |
| `--card` | `#FFFFFF` | `#18181A` *(neutral)* |
| `--ink` | `#1E0B09` *(warm)* | `#F6F6F5` |
| `--accent` | `#F0561F` | `#F0561F` |
| `--tint-y` | `#F8EDCE` | `#39301C` |
| `--tint-b` | `#D3E3F0` | `#1E2E3B` |
| `--tint-p` | `#FADFCF` | `#3B2A1F` |
| `--tint-r` | `#F7DED9` | `#3A2523` |

---

# Motion brief 🎚 `inferred`

| Section | 1st | 2nd | 3rd | Message hero |
|---|---|---|---|---|
| Hero | headline | CTAs | (image is already present) | **Text over image — text leads** |
| Features | cards stagger left→right | — | — | **Colour block + title together** |
| Project | photo | spec cards cascade | accent cell counts up | **Image leads, data proves** |
| Calculator | form fields stagger | results panel | bars grow, figures count | **Inputs lead, results are the payoff** |
| Testimonials | cards stagger | — | — | **Text** |

**Character:** architectural and composed — measured, settling, no bounce. The two on-brand effects animate the subject matter: **figures counting up** (construction %, ROI, invested totals) and **chart bars growing from the baseline**.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- Real-estate investment platform: photography and spec data are CO-EQUAL. Not a brochure.
- Page is FLUSH to the viewport — no outer frame, no floating panel. Hold content to a max width.
- SIGNATURE MOTIF: notched image container, i.e. INVERTED BORDER-RADIUS. Omitting it makes the
  design generic regardless of colour accuracy. The silhouette is AUTHORED, not scattered — an
  architectural stepped profile, like a building massing diagram:
    * top edge CRENELLATED — 3 shallow cuts of DIFFERING widths (one flush left removing the
      corner, one mid-span, one flush right)
    * bottom edge a COMB — one large cut flush left, plus narrower deeper tabs across the rest
    * one notch biting the LEFT edge about two-thirds down
    * at least ONE cut floating fully INSIDE the image, touching no edge — this is what stops it
      reading as a plain scalloped border
    * never symmetrical, never evenly spaced
    * corner radius ~26% of each cut's smaller dimension (big cuts get big radii, small cuts tight)
  IMPLEMENT AS A REAL SUBTRACTION, NOT AN OVERLAY: use `mask` with one SVG rounded-rect layer per
  notch plus a final `linear-gradient(#000 0 0)` layer, and `mask-composite: exclude`
  (`-webkit-mask-composite: xor`). Do NOT position opaque background-coloured squares on top — that
  only works on flat backgrounds, needs recolouring per theme, and leaves hard 90-degree junctions.
  Use a fixed px mask-size so notches stay square at any aspect ratio; offset each by ~-45% of its
  own size to straddle the edge; notch corner radius ~26% of its size. Apply the mask to a dedicated
  background layer, never the content wrapper (mask clips descendants).
- Support it with a geometric mark set: 3x3 dot grids, starbursts, notched squares — used as icons.
- Separation is two-level: outer cards separate by TINT + GAPS; cells INSIDE a grouped card divide
  by 1px hairlines. No shadows anywhere.
- Stepped radius decreasing with nesting; pills for tags/CTAs/selectors; perfect circles for icon
  buttons.
- Colour: near-white page, WARM near-black ink (brown-black, not neutral). A rotating MULTI-TINT
  pastel card set (pale yellow / blue / peach / pink), one tint per card. Flat colour, no gradients.
- ONE hot orange accent on EXACTLY ONE element at a time: the single most important spec cell, the
  active selector pill, the calculator results panel, the final CTA. Never more than one per view.
- Typography: huge UPPERCASE display for hero statements and project names, set large and tight.
  Small labels, with slash-separated tag lines ("Residential / Premium / Urban").
- Every spec is a label-above-value pair: small muted label, larger dark value. Always carry units.
- Imagery plays TWO roles: photography as content (in notched containers) and floor-plan line art /
  isometric renders as proof.
- Forms: pill selectors with an orange active state; sliders with a filled accent track, circular
  knob and min/max scale beneath; circular arrow buttons.
- ICONS: use Lucide (the shadcn/ui set) for functional icons — arrows, toggles, controls — at its
  canonical stroke-width 2 with round caps/joins. Do NOT replace the brand motif marks (dot grid,
  starburst, notched square) with library icons; those are the shape language, not icons.
- VERIFY TINT SEPARATION NUMERICALLY IN BOTH THEMES. With no borders and no shadows, the page-to-card
  tint step IS the separation model. The page is the PURE EXTREME in each theme and cards step INWARD
  from it: white page + light-grey cards in light; near-black page + lighter cards in dark. Keep the
  delta ~9-11 in both. Nested wells continue one more step in the same direction (darker than the
  card in light, lighter than the card in dark).
- Ship BOTH themes. In dark, pastel tints become DEEP LOW-CHROMA VERSIONS OF THE SAME HUES — never
  greys — so the four-tint rotation still reads as four distinct colours. The orange accent is
  unchanged.
- CRITICAL: do NOT derive dark surfaces from the warm brown-black ink. Keep large dark surfaces
  NEUTRAL (channel spread <= ~2, e.g. #0F0F10 / #18181A); warmth belongs only in the ink and accent.
  Chroma that is invisible in body text compounds across a full viewport and reads as chocolate.

- COMPONENT ANATOMY — where each part sits. Get these wrong and the page reads as a different
  product even when every colour and radius is correct:
  · NAV IS THREE-PART WITH THE LOGO IN THE CENTRE: primary links on the LEFT, the MARK CENTRED,
    secondary links + theme toggle on the RIGHT. It is not a left-logo nav.
  · THE CLOSING CTA IS A CENTRED BLOCK on a tinted panel: big centred heading, one line of sub-copy,
    then a SINGLE LONG PILL (~760px max) that CONTAINS BOTH the email input AND a circular arrow
    button sitting inside its right end. One container — never a separate field beside a separate
    button.
  · THE FOOTER IS TWO TINTED BLOCKS STACKED, not one dark slab:
      (1) a LIGHT-BLUE TINTED CARD holding the brand mark + one-line blurb, then three link columns;
      (2) BELOW it, a row of THREE EQUAL LIGHT-ORANGE PILLS, one per social — each a full-width
          block with ICON + LABEL centred inside it, never a bare icon button;
      (3) a thin bar under both: copyright left, one-line descriptor right.
  · Section order: nav / hero / projects / stats + calculator / testimonials / CTA / footer.

MOTION: derive reveal order per section (hero = text leads; project = image leads, data proves;
calculator = inputs lead, results are the payoff). Measured and settling, never bouncy. Figures count
up; chart bars grow from the baseline.

BUILD MOTION WITH REAL LIBRARIES, NEVER HAND-ROLLED CSS TRANSITIONS: GSAP + ScrollTrigger for the
reveal choreography, Lenis for smooth scroll, Motion (motion.dev) for hover/press springs. Two traps
that cost a debugging round each: gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP because
.from() tweens TO the current computed value, which is also 0 — use fromTo() with explicit end
values; and every pre-hidden selector must be animated back, so drop the pre-hide class on timeline
complete as a structural guard. Disable all of it under prefers-reduced-motion.

TUNABLE: padding/gap magnitude, motion intensity, breakpoints.
SWAPPABLE: logo, brand name, palette hues, typeface, photography.
```
