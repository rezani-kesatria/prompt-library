# Plan — original reference #10: a furniture & objects atelier

**Status:** planned, not started · **Created** 19 August 2026

An **original** design in a studied design language. The rule set is extracted from
[unanim.studio](https://unanim.studio); every word, image and layout decision is ours. This is
the library's first reference that is not a recreation of someone else's page.

---

## Why this one is different

The other nine references were built by copying a source, then documenting what we built.
This one inverts that order:

> **Write the payload first. Build blind from the payload. Every drift is a payload hole.**

That matters because it is the first time we can *measure* a spec on the day we write it.
Until now the only transfer test we have run scored 80%, and we learned where the gaps were
after the fact. There is no original page to unconsciously copy from here, so the build is an
honest test of whether the payload alone carries the design.

---

## The extracted rule set (Phase 0 — mostly complete)

Measured from the live site, not eyeballed.

| Dimension | Rule | Confidence |
|---|---|---|
| Canvas | `#121212` | measured |
| Ink | `#EFEFEB` — warm off-white, **never** pure white | measured |
| Accent | a **slot the brand fills** — not a fixed value. Matched to ink luminance, separates by **hue only**. Used **only** on micro-labels + primary CTA fill | measured |
| Muted | `#979788` warm grey-olive | measured |
| Root font-size | **15px**, not 16 | measured |
| Spacing base | **3.75px** (`0.25rem` @ 15px root) — every gap is a multiple | measured (3.75/7.5/11.25/15/18.75/52.5) |
| Radius | `0` everywhere **except** `9999px` pill CTAs | measured |
| Display type | high-contrast serif, weight 400, line-height **1.1**, no tracking | measured |
| UI type | neo-grotesque, 15px base | measured |
| Micro-labels | `( UPPERCASE IN PARENS )`, 0.6875rem, 0.025em tracking, accent colour | measured |
| Motion | per-character split reveal, staggered | measured (per-char spans in DOM) |
| Rendering | **zero WebGL / zero canvas** — DOM + looping video texture | measured |

### Layout signatures — transfer selectively

- **Transfers:** 2x2 quadrant grid split by a full-bleed crosshair, brand mark at the intersection
- **Transfers:** parenthetical micro-label grammar as the only "eyebrow" device
- **Transfers:** pinned bottom-centre menu pill
- **Does NOT transfer as-is:** four full-bleed video project cards. A furniture atelier's work has
  material, dimension, edition and year metadata — that is an index, not a showreel. Forcing the
  video-card component here would be cargo-culting the source instead of applying its rules.

---

## Phase 1 — The brief

**Working name: TENON** — a joinery term. Short, technical, sits well in a high-contrast serif at
7.5rem, and gives the micro-labels somewhere to go (`( MORTISE & TENON )`). Alternates if it
does not land: LIGNUM, STOA, MARROW.

| Field | Value |
|---|---|
| What they do | Design and make furniture and objects in small runs and one-offs |
| Who they serve | Architects, interior designers, private commissions |
| Values | Material honesty, joinery over fasteners, pieces that outlive their owner |
| Voice | Quiet, technical, unsentimental. No "artisan" or "passion" language |

**Content blocks needed** (drives the layout, per the principle above):

1. **Manifesto** — a statement on making. Per-character reveal. Abstract loop behind.
2. **Disciplines** — 2x2 crosshair quadrants: Seating · Tables & casegoods · Commission · Restoration
3. **Works** — a piece index: name, material, dimensions, edition, year
4. **The workshop** — where, how many makers, which materials
5. **Notes** — commissions log, exhibitions, timber sourcing
6. **Footer** — sitemap, contact, address, oversized faded wordmark

### The accent is a slot, not a value — RESOLVED

The accent is **not** part of the design language as a colour. It is a **role** the brand fills.
The language specifies the role and its constraints; the client's brand supplies the hue. This
matches the app, which already collects `brand colour` and `accent colour` as client fields.

**The measured rule — the accent matches the ink's luminance and separates by hue alone.**
On the source, accent vs ink is a **1.03** contrast ratio: effectively identical brightness. That
is deliberate, and it is why the page reads as calm — no luminance hierarchy competing, just a
hue shift. An accent that is merely "the brand colour" dropped in unmodified will break this.

Constraints for anything entering the slot:

- ~15:1 or better against the canvas (ink itself is 16.25:1)
- within ~1.1 contrast of the ink — i.e. **matched luminance**
- differentiated from ink by **hue**, never by brightness
- appears **only** on micro-labels and the primary CTA fill; never a large area fill

**If the brand has no accent, do not invent one.** The role collapses to the ink colour and the
design still works — precisely because the accent already sits at ink luminance. The page
degrades to monochrome with zero layout change. That graceful degradation is itself a rule
worth stating in the payload.

**For TENON:** brand colour `#FBE9CB` — shellac amber. Measured: 15.72:1 on canvas, **1.03 vs
ink**, the same structural relationship the source uses. References french polish, linseed and
brass hardware rather than borrowing the source's pistachio.


---

## Phase 2 — Spec first

Write `app/designs/atelier.design-language.md` from the rule table above, with:

- the full token set (colour, 15px root, 3.75px spacing scale, radius rule, type ramp)
- a **COMPONENT ANATOMY** block (the fix applied to all nine existing specs)
- a real **MOTION** block — this design's identity is substantially motion, and our specs
  currently under-describe it
- explicit font substitutes: **Instrument Serif** (display) + **Instrument Sans** (UI). Naming
  them matters: without it, generated pages silently fall back to Times.
- section order

Ends with the copy-paste **Prompt payload** block, same as the other nine.

## Phase 3 — Blind build

Build `app/designs/atelier.html` working **only** from the payload written in Phase 2.
Not from unanim.studio. Not from memory of it.

- Stack: GSAP + ScrollTrigger + Lenis + Motion, Lucide icons — house standard
- **Hero media:** CSS/SVG-generated abstract form with slow drift. The *rule* is "a single dark
  abstract loop behind the manifesto, no hard edge" — the source's specific mesh is content, not
  a rule, and this keeps the file free of binary assets.
- Scope: homepage only. That is where the rule set lives and what a mood tile previews.

## Phase 4 — Conformance audit

Build a reusable **payload conformance checker** — a script run against the built page that
asserts the rules mechanically rather than by eye:

- [ ] every gap/margin/padding is a multiple of 3.75px
- [ ] root font-size is exactly 15px
- [ ] no border-radius other than `0` or `9999px`
- [ ] accent colour appears **only** on micro-labels and the primary CTA
- [ ] accent sits within ~1.1 contrast of ink (matched luminance, hue-only separation)
- [ ] setting `--accent: var(--ink)` degrades to monochrome with **zero** layout shift
- [ ] ink is never `#FFFFFF`
- [ ] every micro-label matches `( UPPERCASE )`
- [ ] the manifesto is split per-character with a stagger
- [ ] zero `<canvas>` elements

Each failure is triaged: **payload hole** (spec did not say it) or **build slip** (spec said it,
build missed it). Payload holes get patched back into the spec. This checker is reusable for
every future reference.

## Phase 5 — Wire in

- `data.js` entry — becomes mood #10, `vibes: ["Luxury", "Minimalist"]`
- `CREDITS.md` — a new **Original designs** section, crediting unanim.studio as the *studied
  influence* with a plain statement that content and layout are ours
- verify the payload fetch, the mood tile preview, and an end-to-end generate

---

## Acceptance criteria

1. The page is recognisably in the same design language, sharing **no content** with the source.
2. The conformance checker passes, or every failure is explained and patched into the payload.
3. A generated prompt from the mood carries the anatomy and motion blocks.
4. Someone who has seen unanim.studio would call it a sibling, not a copy.

## Risks

| Risk | Mitigation |
|---|---|
| Ends up a clone with different words | Layout follows the new content; the video-card component is deliberately dropped |
| Motion under-specified — page looks dead | A dedicated MOTION block, the first of its kind in our specs |
| Blind build drifts badly | That is the *signal*, not a failure. Phase 4 triages it |
| Licensed fonts | Free substitutes named explicitly in the payload |
