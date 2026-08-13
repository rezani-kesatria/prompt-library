# Blockio — Crypto Trading Platform

**Design mood:** warm light fintech · tint-separated bento · zero elevation

| | |
|---|---|
| **Source** | Dribbble — *"Blockio web page"*, **Taras Migulko** for Emote — [`/shots/25580612`](https://dribbble.com/shots/25580612-Blockio-web-page) · motion: [`/shots/25757294`](https://dribbble.com/shots/25757294-Blockio-landing-page-interaction) · [credits](CREDITS.md) |
| **Recreation** | [`crypto.html`](crypto.html) — light + dark |
| **Studio-published palette** | `#FBFBFA` `#9C9C9C` `#DDC4AB` `#0D0D0D` `#413F3D` `#FC4210` `#ED8F63` |
| **Stated intent** | *"a crypto trading platform designed for fast, secure, seamless transactions… real-time insights, multi-currency support, portfolio tracking… biometric authentication and backup recovery"* |

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable — changing it produces a different design. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Expected to change per client. |

Each rule is also tagged **`observed`** (read directly from the reference — binding) or **`inferred`** (authored by us — overrulable).

> The dimension lens is **open**. Dimensions split into **core** (every design answers them) and **conditional** (only when the design type calls for it). A dimension earns its slot by being **contested** — two references must answer it differently, or it's a global constant rather than a per-design rule.

---

# Core dimensions

## 0 · Intent 🔒 `observed`

A **product marketing page for a trading app** — selling trust and ease, with the product itself as the hero. Not a dashboard, not a catalog.

**Consequences:** device mockups carry the story · real financial data shown as proof · calm and reassuring over urgent · generous air (air signals legitimacy in finance).

## 1 · Separation model 🔒 `observed`

Separation by **surface tint + gaps** — never by borders.

- **White cards on an off-white field** (`#FFFFFF` on `#FBFBFA`). The tint step *is* the divider.
- **No hairline rules** dividing content.
- **Invariant:** the card sits **exactly one step lighter than the field**. This survives the dark re-skin unchanged, which is what makes the dark theme mechanical rather than a fresh design problem.

## 2 · Elevation 🔒 `observed` — *confirmed by the user*

**NONE. Zero shadow anywhere.** `box-shadow` is forbidden outright — not "subtle," not "soft."

> Separation is carried **entirely** by tint + gap. This is the design's headline discipline: most card systems lean on shadow as a crutch, and this one proves tint alone is sufficient. It is also the highest-value anti-slop rule here, since a reflexive `0 4px 6px rgba(0,0,0,.1)` is the most common generated-UI default.

## 3 · Spacing model — 🔒 model `observed` · 🎚 magnitude

- **Real gaps between cards** — a bento rhythm. Margins exist here (unlike VITA). 🔒
- **Very generous padding inside** cards; content sits well clear of edges. 🔒
- Airy overall. 🔒
- Exact gap/padding values. 🎚

## 4 · Geometry 🔒 `observed`

A **stepped radius scale that decreases with nesting** — this is the rule, not any single value.

| Level | Radius |
|---|---|
| Outer card | ~24px |
| Inner element (chart well, list, phone screen) | ~14px |
| Button | ~8px |
| Tab / chip inside app UI | pill |

## 5 · Colour space — 🔒 rules `observed` · 🎨 hues

- **Flat colour only. Zero gradients.** 🔒
- Near-monochrome field: off-white, white, greys, near-black. 🔒
- **A single hot accent, spent very sparingly** — one word in the headline, the one highlighted chart bar, small markers. **Never a full button, never a background wash, never a card fill.** 🔒
- **Warm sand is a minor/reserved tone, NOT a fill.** It appears in the published palette but must not be used at card scale — at that size it fights the near-monochrome field and reads as out of place. Restrict it to small accents or illustration tone. 🔒 *(corrected after review — the first build wrongly used it as a full card background)*
- **Inversion is done with near-black, not colour.** When a block needs to stand out from the white-on-off-white rhythm (feature card, CTA band), invert it to near-black. This is the only permitted "loud" surface. 🔒
- **Primary CTA is near-black**, not the accent. 🔒
- The actual hues. 🎨

## 6 · Grid discipline 🔒 `observed`

- **Contained**, not full-bleed — a centred column with real breathing room at the sides. *(direct inverse of VITA)*
- **Bento composition:** one wide hero card, then rows of narrower cards.

## 7 · Hierarchy 🔒 `observed`

- Headline → supporting line → **product visual as proof**.
- Headline weight is **medium/regular, not heavy** — calm, not shouty.
- **Section labels may sit *below* their own data** (see the insights card): show first, explain second.

## 8 · Forms & buttons 🔒 `observed`

- Primary CTA = **solid near-black**, small radius, compact — repeated in nav and body.
- Nav is sparse: logo · two links · one CTA.
- In-app UI (inside device frames) uses pill tabs and a rounded search field.

## 9 · Theme 🔒 both required

Reference is **light-native** `observed`. Dark is a token re-skin `inferred`, derived from the §1 invariant: near-black field with cards one step lighter. The accent holds on dark unchanged; greys warm slightly.

| Token | Light | Dark |
|---|---|---|
| `--field` | `#FBFBFA` | `#0D0D0D` |
| `--card` | `#FFFFFF` | `#1A1A19` |
| `--ink` | `#0D0D0D` | `#FBFBFA` |
| `--ink-2` | `#413F3D` | `#C9C6C2` |
| `--muted` | `#9C9C9C` | `#7C7A77` |
| `--sand` | `#DDC4AB` | `#C8AE93` |
| `--accent` | `#FC4210` | `#FC4210` |
| `--accent-2` | `#ED8F63` | `#ED8F63` |

## 10 · Responsive 🎚 `inferred`

Contained max-width that still grows on ultrawide; bento collapses to a single column; device mockups scale.

---

# Conditional dimensions

## 11 · Data & numeric treatment 🔒 `observed`

Domain grammar, not styling — this is where a rebuild silently breaks.

- **Magnitude/precision split:** decimals visually de-emphasised — `$97 977.` **`17`**.
- **Thousands separator is a SPACE**, not a comma: `97 977`.
- **Every figure is paired with a signed delta** in both absolute and percentage form: `+2.17 (+$867.43)`.
- **Tabular numerals + right-alignment** in lists, or rows go visibly ragged.
- ⚠️ **The brand accent squats in semantic-signal space.** `#FC4210` reads as *"down"* in a trading UI, so the data layer gets **its own reserved up/down hues, independent of the accent**. Never signal price direction with the brand colour.

## 12 · Imagery — role + treatment 🔒 `observed`

- **Role: proof.** The imagery is the product itself, shown as evidence it works. *(vs VITA, where imagery **is** the content.)*
- **Treatment: product-in-device.** A realistic phone frame is the hero visual.
- **The screen content is real designed UI with real data** — a design-within-a-design. This is exactly where fidelity collapses; a placeholder rectangle in the frame fails the spec.
- **The device bleeds past its card edge** — creating depth without shadow, which is essential in a zero-elevation system.

## 14 · Decoration / pattern 🎚 `inferred` — *authored extension, not observed in the reference*

The inverted CTA band carries a **box-particle field**: scattered rounded squares.

- **The shape is derived from the brand mark, not invented** — the mark is a rounded square at `7/26 ≈ 28%` radius, so particles use `border-radius:28%`. The pattern is generated *by* the identity.
- **Flat tints only** (~7% and ~12% of the opposing surface colour). No gradients, no shadows, no outlines.
- **At most two small accent pieces** — a full accent particle field would breach the "spend it sparingly" rule.
- **Particles bleed past the card edge**, reusing the same depth-without-shadow device as the hero phone.
- Tints are expressed as `color-mix` against theme tokens, so the field inverts automatically in dark.
- **Parallax** is driven by the section's own progress through the viewport (not absolute page offset), so it responds to scrolling in **both** directions. Speeds spread roughly −0.7 → +0.6 to separate depth layers, with a small rotation coupled to the same value.

> Provenance note: this is our addition, consistent with the language but **not present in the source shot**. Overrulable.

---

# Motion brief 🎚 `inferred`

Motion is **derived from content hierarchy**, not prescribed as effects. Per section: what reads 1st / 2nd / 3rd, and what the message hero is.

| Section | 1st | 2nd | 3rd | Message hero |
|---|---|---|---|---|
| Nav | logo | links | CTA | — (utility) |
| Hero card | headline | subcopy | phone, then its screen content | **Text leads, image proves** |
| Real-time insights | the figure | delta → chart bars (accent bar lands last) | heading + copy | **Data is hero; label is caption** |
| Portfolio overview | heading | copy | rows stagger | **Text leads, data proves** |

**The design alternates which element leads** — so reveal order must be recorded per section, never globally.

**Character:** a finance product selling trust. Motion should build confidence — measured, things **settle rather than spring**, no overshoot or bounce. The two on-brand effects animate the subject matter rather than decorating it: figures **counting up**, and chart bars **growing from the baseline** with the accent bar arriving last. Inside the phone, the frame lands first and its rows populate after, so the design-within-a-design reads as live rather than as a static image.

---

## Prompt payload

> Paste into the generated prompt.

```text
LAYOUT LANGUAGE (non-negotiable):
- Product marketing page for an app; the product itself is the hero. Not a dashboard, not a catalog.
- Separate content by SURFACE TINT + GAPS, never borders: white cards on an off-white field.
  The card is exactly one step lighter than the page field.
- ZERO ELEVATION. No box-shadow anywhere — not subtle, not soft. None. Tint and gap do all the work.
- Bento composition: one wide hero card, then rows of narrower cards. Real gaps between cards,
  very generous padding inside them. Airy, not dense.
- Stepped radius scale that decreases with nesting: outer card ~24px, inner elements ~14px,
  buttons ~8px, in-app tabs are pills.
- Flat colour only, no gradients. Near-monochrome field: off-white / white / grey / near-black.
- ONE hot accent spent very sparingly — a single headline word, the one highlighted chart bar, small
  markers. NEVER a full button, NEVER a background wash, NEVER a card fill.
- The warm sand tone is a MINOR accent only — never a card or section fill; at that scale it fights
  the near-monochrome field.
- When a block must stand out, invert it to NEAR-BLACK — that is the only permitted loud surface.
- Primary CTA is solid NEAR-BLACK, not the accent. Small radius, compact.
- Contained centred column — NOT full-bleed.
- Headline weight is medium/regular, never heavy. Section labels may sit BELOW their own data.
- Hero visual = a realistic phone frame containing REAL designed UI with REAL data (a design within
  a design — never a placeholder rectangle). The device bleeds past its card edge to create depth
  without shadow.
- NUMBERS: de-emphasise decimals ($97 977.17 → ".17" smaller/lighter). Use a SPACE as the thousands
  separator. Pair every figure with a signed delta in both absolute and percent form. Tabular
  numerals, right-aligned in lists.
- Reserve separate up/down hues for price direction, independent of the brand accent (the accent is
  orange-red and would misread as "down").
- Ship BOTH light and dark as a token re-skin; the "card one step lighter than field" invariant
  holds in both.

- COMPONENT ANATOMY — where each part sits:
  · NAV IS THREE-PART AND LEFT-LOGO: wordmark with a small geometric mark on the LEFT, two or three
    ALL-CAPS links in the MIDDLE, and on the RIGHT the theme toggle plus ONE dark filled button
    ("GET THE APP"). The nav sits ABOVE the bento grid, not inside a card.
  · EVERY SECTION IS A CARD IN THE BENTO — hero, chart, portfolio, each feature, the CTA. There is
    no bare section: if it is content, it is in a card, and the cards are separated by real gaps.
  · ONE FEATURE CARD IN THE ROW IS INVERTED (dark fill) while its neighbours stay light — the row
    reads as a rhythm, not three identical tiles.
  · THE FOOTER IS A SINGLE THIN LINE OUTSIDE THE BENTO — copyright left, one-line strapline right.
    No columns, no link lists, no logo. It is deliberately the lightest element on the page.
  · Section order: nav / hero card / chart card + portfolio card / three feature cards / CTA card /
    thin footer line.

MOTION: derive reveal order from each section's own content hierarchy (text-leads vs data-leads
varies per section). Measured and settling, never bouncy. Figures count up; chart bars grow from the
baseline with the accent bar last; the phone frame lands before its rows populate.

TUNABLE: padding/gap magnitude, motion intensity, breakpoints.
SWAPPABLE: logo, brand name, palette hues, typeface.
```
