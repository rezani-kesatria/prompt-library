# Art Course — E-learning Platform

**Design mood:** warm editorial canvas · artwork-led · hairline-divided

| | |
|---|---|
| **Source** | Dribbble — *"E-learning Platform Landing Page"*, **Ronas IT \| UI/UX Team** — [`/shots/25605774`](https://dribbble.com/shots/25605774-E-learning-Platform-Landing-Page) · [credits](CREDITS.md) |
| **Recreation** | [`elearning.html`](elearning.html) — light + dark |
| **Stated intent** | *"a landing page promoting an art learning app"* · *"light with contrasting accent colors, like vibrant paints on a white canvas"* · *"highlighting artworks and app screens, ensuring nothing distracts from them"* |
| **Palette** | read from the image (no auto-extracted palette published) |

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (read from the reference — binding) or **`inferred`** (authored — overrulable).

---

# Core dimensions

## 0 · Intent 🔒 `observed`
A **consumer-app marketing landing page** — its job is *emotional first, informational second*: sell inspiration, then credibility, then the download.
**Consequences:** artwork is the hero and everything else gets out of its way · app-store CTA rather than a form · reviews, FAQ and blog carry the trust-building load.

## 1 · Signature motif 🔒 `observed` — **the scattered artwork collage**
The hero headline sits inside a **loose constellation of paintings** — ~10 works at varying sizes scattered across the full width, around and behind the type.

- Thumbnails are **plain sharp-cornered rectangles** — like canvases. Never rounded cards, never framed, no shadow.
- Sizes vary (~70px → ~185px); positions are irregular and **never gridded**.
- The centre stays clear so the headline reads; artworks cluster to the left and right thirds.
- **Use real, recognisable public-domain masterpieces.** Generic stock photography kills this design — the recognisability *is* the appeal. Reference set used: Starry Night · Girl with a Pearl Earring · The Great Wave · The Scream · The Kiss · The Birth of Venus · Wanderer above the Sea of Fog · Le Moulin de la Galette · Rembrandt and Van Gogh self-portraits.
- **Reuse the same works** as course tiles, lesson thumbnails and blog images — the recurrence is what makes it read as one product.

> Serve them via Wikimedia's filename resolver, not hashed CDN paths, so links don't rot:
> `https://commons.wikimedia.org/wiki/Special:FilePath/<Exact%20File%20Name>.jpg?width=420`
> **Verify every URL with an HTTP check before building** — the collage is the design, and a broken image is a hole in it.

## 2 · Colour space 🔒 rules · 🎨 hues `observed`
- **Warm cream canvas** (`#F4EBE2`), near-black ink, **one coral accent** (`#E24B3F`).
- **All other colour comes from the artworks.** The palette is deliberately near-monochrome so the paintings supply the vibrancy — literally *"vibrant paints on a white canvas."*
- Flat colour only. **No gradients.**
- The accent appears only on: the primary CTA, the "Learn anywhere" block, open-FAQ state, link hovers.

## 3 · Separation model 🔒 `observed`
**Border-bottom only, plus whitespace.**

- **NO vertical rules anywhere.** Columns are separated by *gap*, never by a line.
- **Every card carries a `border-bottom` and nothing else** — the benefit cards, testimonial cards and blog cards all sit above a single hairline.
- FAQ rows likewise divide with horizontal rules.
- Content sits **directly on the canvas** — no card backgrounds, no boxes.

## 4 · Elevation 🔒 `observed`
**None.** Zero shadows. Artworks and app screens sit flat on the canvas.

## 5 · Geometry 🔒 `observed` — **the main content has NO radius at all**

| Element | Radius |
|---|---|
| **All page-level content** — colour blocks, artworks, blog images, sections | **0** |
| Buttons | **pill** (999px) |
| Anything *inside* a device/app mockup | medium (~16px) |

> ⚠️ **Separate the screenshot from the design.** The reference contains phone and web-app mockups, and *those screenshots* use rounded cards. That is the mocked product's UI language — **not the landing page's**. Reading radius off mockup content and applying it to the page was the single biggest error in the first build.
>
> **General rule for the whole library:** when a design contains a screenshot, device frame or embedded product UI, its interior styling is a *different design system*. Extract the page's language from the page, never from the picture inside it.

## 6 · Composition 🔒 `observed` · full-height hero 🎚 `inferred`
**~95% of the viewport width, with NO max-width.** Content flows almost edge to edge — it does not sit in a narrow centred column. Colour blocks are full-bleed within that width.

**Spacing is REALLY generous** — sections are deliberately oversized (~160px+ of vertical padding at desktop) so each block of content is isolated and highlighted. Under-spacing this design flattens it.

**The hero runs a full viewport height** — `min-height: calc(100svh - var(--nav))` so nav + hero fills the first screen exactly. This also spreads the percentage-positioned artworks far enough apart to clear the centred headline. *(Authored; a common requirement for hero sections of this type.)*

## 7 · Typography 🔒 `observed`
**All-caps display grotesque for every heading** (`DISCOVER THE ARTIST WITHIN YOU`, `WHY CHOOSE ART COURSE?`, `WHAT USERS SAY`, `FAQ`, `BLOG`) — large and tight. Headline **centred in the hero, left-aligned everywhere else**.

> ⚠️ **EVERY heading runs at a light weight (~500)** — hero, section heads, block heads and card titles alike. **Scale and letter-spacing carry the hierarchy, not weight.** At 700 the all-caps headings turn shouty and start competing with the artworks, which are supposed to be the loudest thing on the page. Body text sits at 400.

Body is a quiet neutral sans.

## 8 · Imagery — role + treatment 🔒 `observed`
- **Content** — the artworks (the product *is* access to art)
- **Proof** — phone and web app screens, shown inside the colour blocks

**Product screenshots BLEED off the bottom edge of their block.** The web-app screenshot is inset at the sides but runs past the bottom of the accent block and is clipped by it — it reads as a *window into a larger product*, not a self-contained panel floating with space beneath it. Implement with `padding-bottom:0` + `overflow:hidden` on the block and a negative bottom margin on the screenshot; round only its **top** corners, since the bottom is a cut edge. Give it more content than fits (e.g. a second row of tiles) so something is visibly cropped.

## 9 · Section rhythm 🔒 `observed`
nav → **hero collage** → benefits (3-up, hairlines) → **black block** + phone screens → testimonials (3-up, ★ ratings) → **coral block** + web app → **FAQ accordion** → blog → footer.

## 10 · Theme 🔒 both required
Light-native `observed`; dark is a token re-skin `inferred`.

| Token | Light | Dark |
|---|---|---|
| `--canvas` | `#F4EBE2` | `#121110` |
| `--surface` | `#FBF6F1` | `#1C1A18` |
| `--ink` | `#17140F` | `#F4EBE2` |
| `--accent` | `#E24B3F` | `#E85D50` |
| `--block` | `#121110` | `#F4EBE2` ← **inverts** |

> The black block **inverts to cream in dark** — a near-black block on a near-black page has no contrast. Same inversion pattern the other designs in the library use.

---

# Components introduced by this design

- **FAQ accordion** — native `<details>`/`<summary>`, so it is keyboard accessible and works without JS. The `+` marker **rotates 45° into `×`** on open and takes the accent colour. First disclosure component in the library.
- **Star rating + review column** (hairline-divided, not carded)
- **Blog/article cards** — image, meta line, title; image scales on hover
- **Device mockups** — phone frames with real lesson UI; browser frame with course tiles

---

# Motion brief 🎚 `inferred`

| Section | 1st | 2nd | 3rd | Message hero |
|---|---|---|---|---|
| Hero | **artworks** stagger in | headline | subline → CTAs | **Art sets the stage, then the promise reads over it** |
| Benefits | items stagger left→right | — | — | Text |
| Black block | copy | phone screens | — | **Text leads, product proves** |
| Testimonials | columns stagger | — | — | Text |
| Coral block | heading | app screen | — | **Text leads, product proves** |
| FAQ / Blog | rows/cards stagger | — | — | Text |

**Character:** calm and gallery-like. The one signature effect is a **gentle parallax on the collage** — each artwork drifts at its own depth (`-0.34 → +0.34`), so the hero feels like a room you move through rather than a flat banner. Nothing bounces.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- Consumer-app marketing landing page for learning art. Emotional first, informational second.
- SIGNATURE MOTIF: a scattered artwork collage in the hero — ~10 paintings at varying sizes strewn
  across the full width, around and behind the headline. Thumbnails are PLAIN SHARP-CORNERED
  RECTANGLES like canvases: no rounding, no frames, no shadows. Irregular placement, never gridded.
  Keep the centre clear so the headline reads. Omitting this makes the design generic.
- Use REAL, RECOGNISABLE PUBLIC-DOMAIN MASTERPIECES (Starry Night, The Great Wave, Girl with a Pearl
  Earring, The Scream, The Kiss...). Generic stock photography kills it — recognisability is the
  appeal. Reuse the same works as course tiles, lesson thumbnails and blog images.
- Colour: warm cream canvas, near-black ink, ONE coral accent. ALL other colour comes from the
  artworks — keep the palette near-monochrome so the paintings supply the vibrancy. Flat colour, no
  gradients. Spend the accent only on the primary CTA, one full-bleed block, and open/hover states.
- Separation: NO VERTICAL RULES ANYWHERE. Columns separate by gap only. Every card carries a
  BORDER-BOTTOM and nothing else (benefit cards, testimonial cards, blog cards). Content sits
  directly on the canvas — no card backgrounds, no boxes.
- ZERO elevation. No shadows anywhere.
- THE MAIN CONTENT HAS NO BORDER-RADIUS AT ALL — colour blocks, artworks, blog images and sections
  are all sharp. Buttons are pills. Radius exists ONLY inside device/app mockups.
  IMPORTANT: the reference contains screenshots of a phone and web app, and those screenshots use
  rounded cards. That is the MOCKED PRODUCT's UI language, not the landing page's. Do not read
  styling off a screenshot and apply it to the page.
- Width ~95% of the viewport with NO max-width — content flows almost edge to edge, never a narrow
  centred column.
- Spacing is REALLY generous: oversized sections (~160px+ vertical padding at desktop) so each block
  of content is isolated and highlighted. Under-spacing flattens this design.
- Hero runs a FULL VIEWPORT HEIGHT: min-height calc(100svh - navHeight) so nav + hero fills the
  first screen exactly.
- Punctuate the page with FULL-BLEED COLOUR BLOCKS (one near-black, one accent), sharp-cornered.
- FOOTER is a simple black band: logo LEFT, menu links CENTRE, social icons RIGHT.
- PRODUCT SCREENSHOTS BLEED off the bottom of their block: inset at the sides, running past the
  block's bottom edge and clipped by it, so they read as a window into a larger product rather than
  a panel floating with space beneath. Use padding-bottom:0 + overflow:hidden on the block and a
  negative bottom margin on the screenshot; round only its TOP corners (the bottom is a cut edge).
  Give it more content than fits so something is visibly cropped.
- Typography: ALL-CAPS display grotesque for every heading, large and tight. Headline centred in the
  hero, left-aligned everywhere else. EVERY HEADING RUNS AT A LIGHT WEIGHT (~500) — hero, section
  heads, block heads and card titles alike. Scale and letter-spacing carry the hierarchy, NOT weight.
  At 700 the all-caps headings turn shouty and compete with the artworks, which must stay the loudest
  thing on the page. Body text at 400.
- Give card icons real breathing room — roughly 50px between the icon and its heading at desktop.
  (The icon wrapper must be display:block; an inline span silently drops vertical margins.)
- Section order: nav / hero collage / benefits 3-up / black block + phone screens / testimonials
  3-up with star ratings / accent block + web app / FAQ accordion / blog / footer.
- FAQ uses native <details>/<summary> so it works without JS; the + marker rotates 45 degrees into an
  x on open and takes the accent colour.
- COMPONENT ANATOMY — where each part sits:
  · NAV IS LEFT-LOGO with a TWO-WORD STACKED WORDMARK, then five links pushed RIGHT, then the theme
    toggle. No filled button in the nav — the CTA lives in the page, not the chrome.
  · CARDS SEPARATE BY A BOTTOM BORDER ONLY and columns separate by GAP — never a vertical rule and
    never a boxed card. A card here is a column of content with a hairline under it.
  · SCREENSHOT BLOCKS TOUCH THE BOTTOM BLEED of their section: the image runs to the section's
    bottom edge with no padding beneath it, and its top-left text stays top-aligned.
  · THE FOOTER IS A BLACK FIELD, three-part on one line: logo LEFT, link menus CENTRE, socials
    RIGHT. It does not use columns of stacked links.
  · Section order: nav / full-height hero + artwork collage / value blocks / screenshot sections /
    blog row / CTA / black footer.
- Ship BOTH themes. The near-black block INVERTS TO CREAM in dark — a near-black block on a
  near-black page has no contrast.

MOTION: artworks stagger in FIRST to set the stage, then the headline reads over them. Give the
collage a gentle parallax, each artwork drifting at its own depth, so the hero feels like a room you
move through. Calm and gallery-like; nothing bounces.

TUNABLE: collage density and scale, padding, motion intensity, breakpoints.
SWAPPABLE: logo, brand name, accent hue, typeface, the specific artworks.
```
