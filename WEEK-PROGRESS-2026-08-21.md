# Weekly Progress — Prompt Library

**Week ending Friday, 21 August 2026**
Project: design-reference library + mood-first prompt builder

---

## TL;DR

Last week ended with a library of nine recreations and an 80% transfer score. This week closed
the loop on *why* prompts drift, and built the first design that proves they don't have to.

The headline is **reference #10 — TENON**, the library's **first original design**. Every other
entry recreates someone else's page. This one applies a studied rule set to entirely new content,
which let us invert the usual order: **write the payload first, then build the page blind from it.**
That inversion immediately paid for itself by exposing a payload gap before it ever shipped.

Alongside it: a **payload conformance checker** that verifies design rules mechanically instead of
by eye, and a genuinely new insight about colour that changes how every future spec handles brand.

---

## What shipped

### 1. TENON — the first original reference (#10)

A furniture &amp; objects atelier, built in a design language extracted from a live studio site.
Content, copy and layout are ours; only the **rule set** was studied.

- **Spec written before the page existed** — the first time we could test a payload the same day
  we wrote it, because there was no original to unconsciously copy from.
- **87-line payload**, the library's largest, and the first with a **MOTION block as a fixed
  dimension** rather than decoration.
- Deliberately *diverges* from the source where content demands it: the source's four video-backed
  project cards became a metadata index, because furniture carries material, dimensions and edition.
  Keeping the component would have been cargo-culting.

### 2. The blind build caught a real payload hole

Building from the payload alone, the manifesto **shattered mid-word** — "wo/rkshop", "s/mall",
"ti/mber". Two compounding causes: every character was an independent `inline-block`, so the
browser could break between any two letters; and spaces were emitted as non-breaking spaces, which
prevent breaking at the one place it *should*.

The spec had said "split by character" without saying how to preserve word integrity. **This is
the same class of gap that cost 20% on the last transfer test — but caught before shipping rather
than after.** That is the entire argument for the spec-first order, demonstrated on the first try.

### 3. A payload conformance checker

Design rules are now asserted **mechanically**, not by eye — reusable for every future reference:

| Check | Result |
|---|---|
| root font-size is exactly 15px | pass |
| every authored spacing value on the 3.75px grid | 79 rules, 40 declarations, 0 off-grid |
| radius is 0 or pill only | pass |
| ink never pure white | pass |
| accent matched to ink luminance | 1.034 |
| accent used only on labels + CTA | 22 elements, all legal |
| manifesto split per-character, words intact | 122 chars / 26 word wrappers |
| zero `<canvas>` / no WebGL | pass |
| zero elevation | pass |
| `--accent: var(--ink)` → zero layout shift | identical geometry |

**Final: 24/24.**

### 4. The accent insight — a slot, not a colour

The most transferable thing found this week. On the studied source, the accent sits at a **1.03
contrast ratio against the ink** — effectively *identical brightness*. It separates by **hue alone**.
That is why the page reads as calm: nothing competes for brightness hierarchy.

The consequence for the library: **the accent is not part of a design language. It is a role the
brand fills.** The language specifies the slot and its constraints; the client's brand supplies the
hue, tinted up to clear the luminance floor. And if a brand has no accent, **we no longer invent
one** — the role collapses to the ink colour and the design degrades to monochrome with zero layout
change. That degradation is now a conformance test, not a hope.

### 5. Prompt Library app — three fixes

- **Lucide icons everywhere.** The hand-drawn icon map is gone. Three call sites rendered outside
  the icon pass and needed their own handling — including the stepper, which runs *after* icon
  hydration and was leaving unconverted placeholders.
- **"Load example" was dead code.** Its handler existed, but the delegated click listener's
  selector list never matched the button, so it bailed one line earlier. It had been inert since
  it was added. Also backfilled the brief fields it predated.
- **Pruned six placeholder moods.** Nocturne, Editorial, Botanical, Terminal, Aurora and Sorbet all
  rendered the same generic template and carried **no spec** — so choosing one handed the agent a
  palette and nothing about assembly. The library is now 10 entries, every one a real page with a
  real payload.

### 6. Shipped to GitHub

Everything this week is committed and pushed to `main`:

| Commit | What |
|---|---|
| `8334add` | Lucide icons, the Load example fix, and the mood-library pruning |
| `76c9a1a` | **TENON** — the original reference, its spec, credits and app wiring |

Pages workflow is in place with the `.nojekyll` guard.

---

## Highlights / wins

- **The spec-first method is validated.** It found a payload defect on its first outing, which is
  precisely what it was designed to do.
- **Design rules are now testable.** "Does this match?" moved from a judgement call to a 24-point
  script that runs in seconds and is reusable across the library.
- **A reusable colour rule** that applies to every future spec, not just this one.
- The library grew to **10 references** and gained its **first dark-only** entry.

---

## Flags &amp; what's next

- ⚙️ **GitHub Pages still needs its one-time manual switch-on** (Settings → Pages → Source:
  "GitHub Actions"). The token cannot enable it automatically. Unchanged from last week.
- 🚩 **Numéro (finance dashboard)** remains provisional — still no visual audit.
- 📐 **Minor ambiguity in the new spec:** the quadrant's vertical hairline is inset by the section
  padding while the horizontal runs full-bleed. The wording says "edge to edge of the section" for
  both; worth tightening.
- 🎨 **"Playful" is still a single tile.** Unchanged, and now the thinnest category by some way.

---

## By the numbers

- **10** references (was 9) — and **1** of them original
- **10** design-language specs, ~2,200 lines total
- **87** lines — the new payload, largest in the library (previous max 76)
- **24/24** conformance checks passing
- **1.034** accent-to-ink contrast — the week's most reusable measurement
- **3** checker bugs found and fixed while calibrating (including a CSS-Nesting trap that made a
  check pass vacuously)
- **6** placeholder moods removed
- **2** commits pushed to `main`, working tree clean
