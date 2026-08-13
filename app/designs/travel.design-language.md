# Vita Travels — Retreats Catalog

**Design mood:** structured dark catalog · utility-first · border-divided

| | |
|---|---|
| **Source** | Dribbble — *"Web Design for Travel Landing Page – VITA"*, **Phenomenon Labs** for Phenomenon Studio — [`/shots/26907949`](https://dribbble.com/shots/26907949-Web-Design-for-Travel-Landing-Page-VITA) · [credits](CREDITS.md) |
| **Recreation** | [`travel.html`](travel.html) — light + dark |
| **Studio-published palette** | `#030709` `#18334A` `#20585E` `#564C4C` `#FEFEFE` `#40A895` `#997E55` `#AB9DB5` |
| **Stated intent** | *"a curated catalog of retreats… filter by activity, goal, location, duration, or budget… compare side by side"* |

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable — this is what makes the design *this* design. Changing it produces a different design. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Expected to change per client. |

> **This dimension list is OPEN.** It is a lens, not a fixed schema — append new dimensions as later references reveal them (e.g. data-density, illustration system, iconography weight, empty/loading states).

---

## 0 · Intent 🔒

A catalog **tool** for comparing and booking retreats — **not** a marketing page.

**Consequences that follow automatically:** dense over airy · sober over expressive · sidebar-driven · horizontal result rows · no hero image, no testimonials, no CTA band, no feature grid.

> **Highest-leverage dimension.** Intent predicts most of the other rules. Get this wrong and everything else drifts — a "travel marketing site" reading of this reference produces hero sections and rounded cards that do not belong.

## 1 · Separation model 🔒

Content is divided by **1px hairlines** — never by whitespace, cards, or shadows.

- **No cards. No elevation. Nothing floats.**
- Horizontal rules separate: header → hero → filter strip → each result row → footer.
- A **vertical rule** separates sidebar from results and runs the **full page height** (down to the footer, even when content is short).

## 2 · Spacing model — 🔒 model · 🎚 magnitude

- **Zero margins.** Blocks butt directly against each other. 🔒
- All breathing room is **padding inside cells**. 🔒
- **No gutters** between sibling blocks. 🔒
- The *amount* of padding is tunable — Vita runs fairly tight. 🎚

## 3 · Geometry 🔒

- **0 border-radius on all structure** — header cells, filter cells, rows, images, buttons, search.
- Exactly **one** exempt component: **filter chips = full pills** (`999px`).
- **One component renders one way, everywhere.** A pill in one filter group and a box in another is a defect, not a variation.

## 4 · Colour space — 🔒 rules · 🎨 hues

- **Flat colour only. Zero gradients anywhere.** 🔒
- The accent is **spent sparingly** — only on: active filter chip · primary CTA · hover/focus accents. 🔒
- A **separate reserved hue for ratings only** (gold). 🔒
- Everything else is muted grey on a near-neutral field. 🔒
- The actual hues. 🎨

## 5 · Grid discipline 🔒

- **Full-bleed.** No centred container, no max-width wrapper.
- **Logo cell width `===` sidebar column width**, so a single unbroken vertical rule runs the whole page. **Alignment *is* the structure.**
- Header = `[logo cell] │ [search ←→ menu] │ [theme cell]` — a structured row of cells, not a free-floating bar.

## 6 · Hierarchy 🔒

Row reading order: **photo → rating → title → price**, CTAs last.

- Emphasis by **weight, not colour** — the headline is a single colour split into bold + regular-muted.
- Price sits **top-right** of each row; CTAs **bottom-right**.
- Meta (location / dates / guests) is plain stacked lines — *not* chips or badges.

## 7 · Forms & buttons 🔒

- The filter strip is **one continuous strip cut into cells** by vertical rules.
- The submit ("Explore") is **the last cell of that strip** — full-height, solid, inverted against the page. It must read as *part of the filter*, never as a floating button.
- **Search is minimal**: icon + word. No box, no border, no badge, no chrome.
- **Row CTAs**: bordered rectangle + a *separate bordered arrow cell* (reusing the border language). Primary = accent fill, secondary = outline. **Stacked vertically** so the primary CTA reads first.

## 8 · Theme — 🔒 both required

Every design mood ships **light AND dark**, so a client can take either.

Light is a **re-skin, not a mechanical inversion**: the language is byte-for-byte identical, only colour tokens change. Deepen the accent on light for contrast and flip the on-accent text.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#040A0C` | `#FFFFFF` |
| `--bg-2` | `#070F11` | `#F4F6F5` |
| `--surface` | `#0E1B1E` | `#DFE6E4` |
| `--line` | `rgba(255,255,255,.10)` | `rgba(8,20,22,.14)` |
| `--ink` | `#FEFEFE` | `#081416` |
| `--muted` | `#8D9A9C` | `#556365` |
| `--accent` | `#40A895` | `#17786A` |
| `--on-accent` | `#04120E` | `#FFFFFF` |
| `--star` | `#E4B65C` | `#A9781F` |

Set before first paint (no flash); respects `prefers-color-scheme`; persists to `localStorage`.

## 9 · Motion 🎚

Motion follows the structure — **the borders themselves animate**.

- **Intro:** header → rules draw left-to-right → headline reveals word-by-word from a mask → filter cells stagger (each divider drawing down) → Explore wipes in → sidebar cascades.
- **Scroll:** photo clip-wipe, content stagger (rating → title → rule → meta/CTAs), row rule draws, price counts up, subtle photo parallax (via `background-position`, so it doesn't fight hover-zoom).
- **Micro:** nav underline wipe, CTA arrow slide, photo zoom on row hover.
- Crisp easing, **no bounce**. Fully disabled under `prefers-reduced-motion`.

## 10 · Responsive 🎚

Fluid tokens, **never fixed px** — the layout scales continuously from laptop to ultrawide, and the rem type scale lifts on very wide screens. Full-bleed at every width; nothing hits a ceiling and strands content in dead space.

---

## Prompt payload

> Paste into the generated prompt. These are the rules that collapse an agent's search space — vibe words do not.

```text
LAYOUT LANGUAGE (non-negotiable):
- This is a catalog/utility tool, not a marketing page. No hero image, no testimonials, no CTA band.
- Separate ALL content with 1px hairline borders. No cards, no shadows, no elevation, nothing floating.
- Zero margins. Blocks butt together; all breathing room is padding INSIDE cells. No gutters.
- Zero border-radius on structure (cells, rows, images, buttons, search). The ONLY exception is
  filter chips, which are full pills. One component renders one way everywhere.
- Flat colour only — no gradients anywhere.
- Full-bleed: no centred container, no max-width wrapper.
- The logo cell width must equal the sidebar column width so one unbroken vertical rule runs the
  full page height, from the header down to the footer.
- Filter bar = one continuous strip cut into cells by vertical rules; the submit button is the LAST
  CELL of that strip (full-height, solid, inverted) — never a floating button.
- Result rows are horizontal: photo left; rating, title, meta stacked on lines; price top-right;
  primary + secondary CTA stacked VERTICALLY bottom-right.
- Emphasis comes from font weight, not colour (headline = one colour, bold + regular-muted split).
- Search is minimal: icon + word only. No box, no border, no badge.
- Spend the accent colour ONLY on active state and primary CTA. Reserve a separate hue for ratings.
- COMPONENT ANATOMY — the parts this design does NOT have are as binding as the ones it does:
  · THE HEADER IS ONE ROW cut into cells by vertical rules: logo cell (its width locked to the
    sidebar column), then search, then the nav links, then account. Not a floating bar.
  · THE SIDEBAR IS A FILTER PANEL, not navigation — grouped facets with headings, each group
    separated by a hairline, running the full page height.
  · THERE IS NO FOOTER, NO HERO BANNER, NO TESTIMONIAL BLOCK AND NO CTA BAND. The page is header,
    filter bar, sidebar + results, and it ends on the last result row. Do not add marketing
    furniture to a utility tool.
  · Section order: header row / filter strip / [sidebar | result rows] — and nothing after.
- Ship BOTH light and dark themes as a token re-skin — the layout language is identical in both.

TUNABLE: padding magnitude, motion intensity, responsive breakpoints.
SWAPPABLE: logo, brand name, palette hues, typeface, imagery.
```
