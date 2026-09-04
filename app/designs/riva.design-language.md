# RIVA — AI Integrations Dashboard

**Design mood:** distraction-free dark workbench · gradient-as-identity · status on a dot, action on a pill

| | |
|---|---|
| **Source** | Dribbble — *"RIVA – AI Integrations Dashboard \| Dark SaaS UI"*, **Md Forhad Alam** for **Qudra** — [`/shots/27285217`](https://dribbble.com/shots/27285217-RIVA-AI-Integrations-Dashboard-Dark-SaaS-UI-Qudra) · [credits](CREDITS.md). Byline cross-verified on the designer's own LinkedIn post of the same shot and the Qudra Behance case study (Dribbble itself WAF-blocks scripted fetches). |
| **Recreation** | [`riva.html`](riva.html) — dark-native (no light variant published) |
| **Format** | single still, XDR **monitor mockup** — analysed **inside the frame only**; source saved on disk and **pixel-scanned** (`image_reference/61b079c1…webp`, 3810×2858) |
| **Palette** | sampled from the source pixels by scanner; magnitudes are **measured, not inferred** |

> ⚠️ **The same shot circulates as an ANGLED monitor render** (LinkedIn CDN copy): perspective corrupts every radius and proportion — the ShiftPulse trap exactly. Only the straight-on XDR still is a valid source. Do not measure the angled copy.
>
> ⚠️ **The XDR frame is PRESENTATION, not design.** Purple radial backdrop, monitor bezel, stand, screen glow — all discarded. The scan found the bezel band explicitly (backdrop ends → ~70px uniform `#050505` bezel → app canvas) so no measurement below includes the frame. Screen-corner radius belongs to the monitor, not to the app.

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

## 0 · Signature 🔒 `observed` — **a workbench, not an overview**

The library's other dashboards are Numéro's species: glanceable widgets, no navigation. RIVA is the other species — **a persistent tool workspace**: a full-height nav sidebar (with the session history living *inside* it), a title + search header, and a card grid you *operate on*. No charts anywhere; the thing being managed is **tools, not numbers**.

## 1 · Composition 🔒 `observed` — **flush, full-bleed app frame**

The app surface is the page. Sidebar touches top, bottom and left edges — **no floating clusters** (the exact inverse of LUMA, recorded because the contrast is the point), no header band, no outer inset.

## 2 · Tone system 🔒 `observed` — **sidebar is the LIGHTEST surface, content zone the darkest**

Pixel-scanned (app canvas 3141×1938 device px ≈ 1624×1002 logical):

| Token | Value | Job |
|---|---|---|
| sidebar | `#131215` | the full-height nav — the **lightest** structural surface |
| canvas | `#060309` | the content zone — **darker than the sidebar** |
| card | `#141115` | integration cards — **lift off the content zone** |
| ink | ~`#F2F2F2` | titles, names, button labels |
| muted | ~`#8E8E8E` | descriptions, history items, inactive icons |
| line | ~`rgba(255,255,255,.06)` | card borders, hairline above the card footer, search border |

> 🔑 **RIVA inverts Numéro's ladder.** Numéro: header band = card tone, lightest at the chrome. RIVA: the *sidebar* is the lightest surface and the working canvas is the darkest thing on screen — cards float on near-black. Both are "two-tone + hairline" systems, but the light lands on opposite sides. **Dark-dashboards is now a contested dimension: where does the lightest tone sit — chrome or canvas?** Numéro says canvas; RIVA says chrome.
>
> Cards lift by tone step + hairline; **zero elevation** — no shadow anywhere (unanimous across the library, holds here too).

## 3 · The gradient rule 🔑 🔒 `observed` — **gradient is the brand, not decoration**

The identity gradient (~magenta → violet, `#8325D4` → `#7285FE` family — sampled at the logo and nav glow) is spent on exactly three things:

1. **The logo mark** — the only multicoloured object in the chrome
2. **The active nav pill** — dark pill with the gradient **leaking from its bottom edge as a glow**
3. **The action pills** (Manage / Connect) — a faint gradient sheen across the fill

Everywhere else the UI is desaturated greys. This is the library's **first design where gradient is structural** — it formally contests the "gradient: none" baseline Numéro recorded, the same way LUMA's elevation did.

## 4 · Status/affordance split 🔒 `observed` — **the dot carries the boolean, the pill carries the verb**

Connected = **green dot** · `Manage` (gear icon). Not Connected = **grey dot** · `Connect` (nodes icon). The action pill is *identical* in both states — same gradient sheen, same shape; only the dot's colour and the verb change. RIVA allows the brand gradient on buttons (unlike LUMA, where accent-on-a-button is forbidden) and delegates state **entirely to the dot**. Two clean answers to the same problem; the payload must state which species it is building.

## 5 · Card anatomy 🔒 `observed` — uniform, single-line, rhythm-locked

Measured at ~348 logical px wide (~20px gutters):

- **Icon tile** (~56px, radius ~14) — the app's own brand mark and colours, top-left. **The only place third-party colour is legal.**
- **Kebab** (⋯) top-right, muted
- **Name** — ink, medium weight, single line
- **Description** — muted, single line, truncated
- **Full-width hairline** above the footer
- **Footer row** — status left, action pill right

Because name and description never wrap, the hairline lands at the same height on every card; the grid reads as one system. Radius ladder: cards ~18px · search ~16px · icon tiles ~12px · avatar **rounded-square** (~12px, not a circle) · nav pill ~12 · action buttons full pill.

## 6 · Sidebar structure 🔒 `observed`

Logo row (gradient mark + `RIVA` + collapse toggle) → five nav items (New Chat / Search / Images / **Integration** [active] / Chat History) → **history grouped by day** — small muted labels (`Today` / `Yesterday` / `20th March`) above truncated muted items — filling the remaining height. No footer, no profile block.

## 7 · Header 🔒 `observed`

Title (`Integrations`) + **full-width search field** are the whole header — no band, no greeting, no metrics. Share, kebab and the avatar float top-right at logo height, above the title row.

## 8 · Typography 🔒 rules · 🎨 face `inferred`

Geometric sans throughout; page title is the largest type (~34px logical); card names ~20, descriptions ~13; everything else small and quiet. No two-tone heading device (Numéro/EcoVolt's pattern is absent here).

## 9 · Data treatment 🔒 `observed`

**None.** Deliberately. Every other built dashboard's identity is its chart vocabulary; RIVA's is its **card rhythm**. A RIVA-language screen with a chart in it has stopped being RIVA.

## 10 · Theme 🔒 dark-native

No light variant is published. A light theme, if a client demands one, is an `authored` re-skin — keep the sidebar-lightest relationship and the gradient's job, and re-verify the glow against the lighter canvas.

---

# Motion brief 🎚 `authored`

The source is a still; everything here derives from the library's standing rule — *motion follows hierarchy; what carries the message arrives last.*

| Element | Treatment |
|---|---|
| shell + sidebar | fade + 14px rise first |
| title + search | arrive together, just after the shell |
| cards | 40ms stagger in reading order |
| status dots | **pop last on each card** — state is the payload of this screen |
| action pills | subtle gradient sheen slide on hover; press-spring via Motion |
| nav glow | breathes very slowly (opacity 0.8→1) — the one perpetual motion, ≤2% of frame budget |

Everything lands within one beat; no scroll narrative. Lenis short (~0.7s). Disabled under `prefers-reduced-motion`.

### ⚠️ Implementation traps

1. **Gradient sheen on pills must be `background-image`, not `border` or `filter`** — a filter on the pill would also glow the label.
2. **The nav glow must not use `box-shadow` at full strength** — it reads as a focus ring; animate a pseudo-element's opacity instead.
3. `gsap.from({opacity:0})` against a CSS pre-hide is a no-op — use `fromTo()` with explicit end values (library standing rule).
4. The green/grey status dots are the **last** thing to animate; if they land before the cards settle the state change reads as noise.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- A DARK-NATIVE AI WORKBENCH: full-height SIDEBAR + title/search header + a grid of tool cards you
  operate on. NOT an analytics overview: no charts, no KPIs, no data tables — the objects being
  managed are integrations, not numbers.
- FULL BLEED app frame. The sidebar is FLUSH: it touches the top, bottom and left edges. It is NOT
  floating clusters (that is a different species) and NOT a rail.
- TONE (dark, three steps, scanned): sidebar #131215 — the LIGHTEST structural surface; content
  canvas #060309 — DARKER than the sidebar; cards #141115 — LIFT off the content zone by one tone
  step plus a hairline border (rgba(255,255,255,.06)). ZERO elevation: no shadow anywhere.
  The lightest tone sits on the CHROME (sidebar), not on the canvas — do not copy a lighter-canvas
  dashboard here, and do not lighten the canvas.
- THE IDENTITY GRADIENT (magenta→violet, ~#8325D4 → #7285FE) IS THE BRAND, NOT DECORATION — and it
  is spent on exactly three things: the logo mark, the ACTIVE NAV PILL (dark pill with the gradient
  glowing from its bottom edge), and the ACTION PILLS (a faint gradient sheen). Everything else is
  desaturated grey. Never gradient-fill a panel, a card, or the search field.
- STATUS/AFFORDANCE SPLIT: the status DOT carries the boolean (green = connected, grey = not), the
  PILL carries the verb (Manage with a gear / Connect with a nodes icon). The pill NEVER changes
  colour by state — the gradient sheen is constant; only the dot and the verb flip.
- CARD ANATOMY — uniform, rhythm-locked: icon tile top-left (~56px, radius ~14, the app's OWN brand
  mark and colours — the only place third-party colour is legal), kebab top-right, NAME in ink on
  one line, DESCRIPTION in muted on one line (truncate, never wrap), a full-width hairline, then a
  footer row: status left, action pill right. Cards ~348px wide on a 3-across grid, gutters ~20px.
  Because nothing wraps, every hairline lands at the same height — the grid reads as one system.
- RADIUS LADDER: cards ~18px, search field ~16px, icon tiles and avatar ~12px (the avatar is a
  ROUNDED SQUARE, not a circle), nav pill ~12px, action buttons FULL PILLS. No sharp corners.
- SIDEBAR STRUCTURE: logo row (gradient mark + wordmark + collapse toggle) → five nav items →
  HISTORY GROUPED BY DAY: small muted labels (Today / Yesterday / a date) above truncated muted
  session items, filling the remaining height. No footer, no profile block.
- HEADER: the page title is the largest type (~34px); a full-width rounded SEARCH FIELD sits under
  it. No band, no greeting, no metric row. Share / kebab / rounded-square avatar float top-right at
  logo height.
- TYPOGRAPHY: geometric sans, medium weights. Muted labels are small and quiet; names are ink and
  medium; descriptions muted. NO two-tone heading.
- ICONS: Lucide, hairline (~1.6), muted or ink. Third-party brand marks appear ONLY inside icon
  tiles. The accent-colour rule of other designs does not apply here — RIVA has no state accent;
  state is the dot, identity is the gradient.
- SHIP DARK ONLY (dark-native). If a light theme is required it is an authored re-skin: keep the
  sidebar-lightest relationship and re-verify the nav glow.
- THERE IS NO FOOTER and no table. The page ends on the card grid.

MOTION (authored — the source is a still):
- EVERYTHING LANDS WITHIN ONE BEAT: shell + sidebar first, title + search together, cards ~40ms
  apart in reading order, and THE STATUS DOTS LAND LAST on each card — state is this screen's
  payload.
- The active nav pill's gradient glow BREATHES very slowly (opacity 0.8→1) — the one perpetual
  motion; keep it subtle.
- Action pills: gradient sheen slides on hover; press-spring on click via Motion. The sheen is
  background-image on the pill, never a filter (a filter would glow the label too).
- The nav glow animates a pseudo-element's opacity, never a full-strength box-shadow (reads as a
  focus ring).
- Use GSAP + ScrollTrigger + Lenis + Motion. gsap.from({opacity:0}) against a CSS pre-hide is a
  NO-OP — use fromTo() with explicit end values and clearProps on complete.
- Disable all motion under prefers-reduced-motion.

TUNABLE: card count, gutters, gradient hue, motion intensity.
SWAPPABLE: logo, wordmark, gradient hues, typeface, avatar, integration brands.
```

---

## What was measured vs inferred

- **Measured:** sidebar/canvas/card tones (batch pixel reads, 12×12 map), the sidebar↔canvas↔card tone *order*, bezel bounds, the hairline position, gradient hits at logo + nav glow.
- **Inferred:** exact logical design width (assumed ~1624; sidebar 320 logical is clean at that scale), all radii and font sizes (scaled by eye at 2.34× device scale), the gradient's exact stops.
- **Not applicable:** chart vocabulary (none), light theme (none published).