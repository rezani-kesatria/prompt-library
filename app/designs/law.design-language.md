# HireLaw® — Law Firm Landing Page

**Design mood:** warm-cream professional services · pastel colour-blocking · soft charcoal

| | |
|---|---|
| **Source** | Dribbble — *"HireLaw - Law Firm Landing Page"*, **Odama** — [`/shots/26248762`](https://dribbble.com/shots/26248762-HireLaw-Law-Firm-Landing-Page) · [credits](CREDITS.md) |
| **Recreation** | [`law.html`](law.html) — light + dark |
| **Format** | single still, **1600 × 1200**, presented as two page columns side by side |
| **Palette / description** | none published; every value sampled from the source pixels |

> The library's first **multi-hue** reference, and the first to break the pill-button consensus. Both of those had been drifting toward "constant" — this design puts them back in play.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (read off the source — binding), **`inferred`** (proposal, overrulable), or **`authored`** (deliberately added, not present in the source).

---

# Core dimensions

## 0 · Intent 🔒 `observed`
**Professional-services marketing.** Every section builds trust rather than describing a product: named practice areas, named attorneys with photographs, client testimonials with attribution, and peer-firm recognition. Nothing is transactional — the single CTA is *"Schedule Meet"*, repeated.

## 1 · Colour space 🔒 rules · 🎨 hues `observed` — **the multi-hue break**

| Role | Value |
|---|---|
| canvas | `#F5F3ED` warm cream |
| ink | `#3C3C3C` **soft charcoal — never black** |
| second tone | `#868583` |
| secondary button | `#E7E2D3` warm tan |
| primary button + footer | `#000000` **pure black, reserved** |
| promoted pastel | `#B9B5ED` lavender |
| pastel set | `#B8B4ED` · `#F5B0AD` · `#B2F3B6` · `#B2EEED` · `#F5D5A6` |

Three rules do the work:

1. **Ink is soft charcoal, not black.** The page never reaches full black in its typography.
2. **Pure black is reserved** for exactly two things — primary buttons and the footer field. That reservation is what gives a black button its authority on a cream page.
3. **A six-hue pastel set**, one hue **promoted** to a full-bleed section colour. Every other reference in the library is mono-accent; this one is polychrome, and the hues carry no semantic meaning — they are rhythm, not signal.

## 2 · Geometry 🔒 `observed` — **rounded rects, not pills**
- **Buttons: rounded rect, ~9px.** Not pills.
- **Chips: full pills.** The single exception, and it is deliberate — it separates *stated attributes* from *actions*.
- Cards / images: ~12px.

> Six references before this one used pills for buttons. Button geometry is contested after all.

## 3 · Composition 🔒 `observed` — **left-gutter section labels**
Each section opens with a small uppercase label — two lines, letter-spaced — sitting in a narrow **left gutter column**, with the section's content offset to the right of it. `ABOUT US` · `CLIENT TESTIMONIALS` · `OUR ATTORNEYS`.

The hero is the exception: centred, no gutter.

## 4 · Elevation 🔒 `observed`
None. Cards are hairline-bordered or are photographs. No shadows.

> Now **7/7 across the library**. Flat is not a dimension any more — it is the baseline of this whole curated aesthetic.

## 5 · Signature 🔒 `observed` — **the pastel cast**
A row of figures along a shared baseline, each standing on **its own pastel block**, each **duotone-washed** to that block's hue, with **block heights staggered**. It is the hero image, the brand statement, and the colour system's justification all at once.

## 6 · Imagery — role + treatment 🔒 `observed`
Three distinct roles, three treatments:
- **Cast** (the hero) — duotone on colour, *decorative rhythm*
- **Attorneys** — full-colour photography in a horizontal rail, *evidence*
- **A photographic object** — a single botanical still, bleeding off the right edge, *atmosphere*

## 7 · Typography 🔒 rules · 🎨 face `observed`
Grotesque, weights 500–700, tight tracking (`-.028em`). Body copy in `--ink-2`, headings in soft charcoal.

**Two-tone headings** — grey clause + charcoal clause: *"Trusted Legal Solutions for"* / *"Your Peace of Mind"*, and *"Our Lawyers"* / *"Are Dedicated To…"*.

> ⚠️ **This device is now a library CONSTANT, not a signature.** Four of seven references use it (EcoVolt, Numéro, HireLaw, and it is EcoVolt's spec that still calls it *"the identifying feature"*). **Promote it to the shared baseline** and let each design's identity rest elsewhere — EcoVolt's on full-bleed-inset-by-padding, HireLaw's on the pastel cast.

## 8 · Section rhythm 🔒 `observed`
nav → centred hero + pastel cast → about (gutter label) → **peer-firm marquee** → expertise cards (gutter label) → **full-bleed promoted-pastel testimonials** (gutter label) → attorney rail (gutter label) → CTA → **black footer**.

The page closes on an **oversized wordmark** at display scale.

## 9 · Theme 🔒 both required
Light-native `observed`; dark is a token re-skin `authored`.

| Token | Light | Dark |
|---|---|---|
| `--cream` | `#F5F3ED` | `#141310` |
| `--ink` | `#3C3C3C` | `#EDEBE4` |
| `--grey` | `#868583` | `#7A7871` |
| `--tan` | `#E7E2D3` | `#2B2922` |
| `--solid` *(buttons/footer)* | `#000000` | `#F5F3ED` ← inverts |
| `--lav` | `#B9B5ED` | `#8F8BD0` |
| pastel set | unchanged — **brand identity, identical in both themes** |

The pastels do **not** re-skin. They are the brand; only the neutrals invert.

---

# Motion brief 🎚 `authored`

The source is a still. Derived from the library's standing rule — *motion follows hierarchy*.

Per section: **label → heading → body → the visual**. The hero's cast is the payoff, so it arrives in two beats: the **pastel blocks grow up from the shared baseline** (70ms apart), then the **portraits fade in on top** of them. Colour before content — the blocks are the idea, the faces fill them.

Elsewhere: quiet fade-and-rise, 80ms staggers within a set, and a continuously running peer-firm marquee.

---

# ⚠️ Divergences from the source

Recorded so they are not mistaken for rules.

| # | Source | Recreation | Why |
|---|---|---|---|
| 1 | **True cut-outs** — figures' heads break above their block's top edge | Rectangular duotone filling each block | Cut-outs need transparent-PNG assets. A `multiply` blend reproduces them **only over white backgrounds**; stock photography has busy, dark ones, which renders the figure as a grey rectangle. A **`luminosity` duotone** — photo luminance over block hue — works with any photograph. Hue-per-person, the wash and the staggered baseline survive; the silhouette does not. |
| 2 | CTA band mostly hidden below the shot's edge | **Authored** | Only a sliver is visible: full-bleed, desaturated photo, gutter label, centred restatement of the hero line. Built to that shape per the library's CTA rule (imagery-led design → image CTA). |
| 3 | Botanical still bleeding off the right of the About section | **Removed** | Directed. |
| 4 | Footer wordmark bleeds off the bottom edge | Wordmark **centred with clearance below** | Directed. |
| 5 | Seven real peer-firm logos | Styled text wordmarks, every third in a serif | Avoids sourcing seven third-party marks. The loosest part of the build. |

### Implementation note
A grid track written as `1fr` carries `min-width:auto`, so an overflow-scrolling rail of fixed-width cards **inflates its column** instead of scrolling inside it. Use `minmax(0,1fr)`. This cost the attorney rail 77px of phantom page width before it was caught.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- A professional-services marketing page. Every section builds TRUST rather than describing a
  product: named practice areas, named people with photographs, attributed testimonials, peer
  recognition. One CTA, repeated.
- COLOUR IS THE SIGNATURE, and it runs on three rules:
  (1) Canvas is WARM CREAM. (2) Ink is SOFT CHARCOAL — the typography NEVER reaches full black.
  (3) PURE BLACK IS RESERVED for exactly two things: primary buttons and the footer field. That
  reservation is what gives a black button its authority on a cream page.
- Use a SIX-HUE PASTEL SET (lavender, pink, mint, cyan, peach) and PROMOTE ONE of those hues to a
  full-bleed section background. The hues carry NO semantic meaning — they are rhythm, not signal.
  Do not reduce this to a single accent colour.
- Buttons are ROUNDED RECTS (~9px), NOT pills. Chips ARE full pills — that contrast is deliberate,
  separating stated attributes from actions. Cards and images ~12px.
- ZERO elevation. No shadows. Cards are hairline-bordered or are photographs.
- Every section opens with a SMALL UPPERCASE LABEL, two lines, letter-spaced, sitting in a NARROW
  LEFT GUTTER COLUMN with the content offset to its right. The hero is the only exception —
  centred, no gutter.
- HERO SIGNATURE — THE PASTEL CAST: a row of figures on a shared baseline, each standing on ITS OWN
  pastel block, each DUOTONE-WASHED to that block's hue, with BLOCK HEIGHTS STAGGERED. It is the
  hero image, the brand statement and the justification for the colour system at once.
- IMAGERY HAS THREE ROLES AND THREE TREATMENTS: the cast (duotone on colour — decorative rhythm);
  the people (full-colour photography in a horizontal rail — evidence); and a single photographic
  object bleeding off an edge (atmosphere).
- Typography: grotesque, 500-700, tight tracking. Headings run TWO-TONE — a grey clause followed by
  a charcoal clause in the same sentence.
- Section order: nav / centred hero + pastel cast / about / peer marquee / expertise cards /
  FULL-BLEED PROMOTED-PASTEL testimonials / people rail / CTA / BLACK FOOTER closing on an
  OVERSIZED WORDMARK at display scale.
- Ship BOTH themes. The NEUTRALS invert; THE PASTELS DO NOT — they are brand identity and stay
  identical in light and dark.

- COMPONENT ANATOMY — where each part sits:
  · NAV IS LEFT-LOGO: the ® wordmark on the LEFT, then all links pushed RIGHT in one group, ending
    with a TAN-FILLED "Sign In" button — the only filled control in the nav. The nav is not centred
    and the button is not black; black is reserved for the page's real CTA.
  · THE HERO IS THE ONLY CENTRED SECTION and the only one without a gutter label. Everything after
    it uses the left-gutter label column.
  · THE PEOPLE RAIL IS A HORIZONTAL SCROLLER that runs off the right edge — cards are NOT wrapped
    into a grid. Each card is a full-bleed portrait with the name bottom-left, the specialism
    bottom-right, and a small arrow badge top-right, all over the photograph.
  · THE FOOTER IS A SINGLE BLACK FIELD with the brand block on the LEFT and one column of large
    link text on the RIGHT, then an OVERSIZED WORDMARK below both at display scale, then a thin bar
    (copyright left, socials right).
  · Section order: nav / centred hero + pastel cast / about / peer marquee / expertise cards /
    full-bleed promoted-pastel testimonials / people rail / CTA / black footer.

MOTION (authored — the source is a still):
- Per section, reading order: label, heading, body, then the visual.
- The hero cast arrives in TWO BEATS: the pastel blocks GROW UP from the shared baseline ~70ms
  apart, then the portraits fade in on top of them. Colour before content — the blocks are the
  idea, the faces fill them.
- Elsewhere quiet fade-and-rise, ~80ms staggers within a set, and a continuously running marquee.

BUILD MOTION WITH REAL LIBRARIES, NEVER HAND-ROLLED CSS TRANSITIONS: GSAP + ScrollTrigger for the
reveal choreography, Lenis for smooth scroll, Motion (motion.dev) for hover/press springs. Two traps
that cost a debugging round each: gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP because
.from() tweens TO the current computed value, which is also 0 — use fromTo() with explicit end
values; and every pre-hidden selector must be animated back, so drop the pre-hide class on timeline
complete as a structural guard. Disable all of it under prefers-reduced-motion.

IMPLEMENTATION: a grid track written as `1fr` has min-width:auto, so an overflow-scrolling rail of
fixed-width cards inflates its column instead of scrolling inside it. Use minmax(0,1fr).

TUNABLE: padding/gap magnitude, motion intensity, breakpoints, how many pastel hues.
SWAPPABLE: logo, brand name, the pastel hues themselves, typeface, photography.
```
