# 04 · Imagery & art direction

Source and grade the imagery to a single, consistent look that matches the charter.
The **grade is the art direction** — one recipe applied to the whole set so the
page reads as one shoot, not a stock-photo grab-bag.

**Hand-off**
- **In:** the charter's colour/mood (**01**) + the imagery slots, aspect ratios,
  and focal-point notes (**02**).
- **Out:** graded, exported, correctly-sized assets in `assets/img/` under the
  names **05** references, plus a repeatable grade recipe and alt-text stubs.
- **Next:** **05** wires them in (heroes as row backgrounds); **06** bakes their
  final upload URLs into the Divi Image modules / Row backgrounds.

**When to use** — alongside **03**, after the page spec (02) names the slots. A
feeder into 02 and 05.

---

## Fill-in template

```
Art-direct and source the imagery for the {home} page of {Company}.

Look: {editorial botanical}; grade {warm / cool} toward the brand {evergreen};
consistent {shallow depth-of-field}, {golden-hour} light; people {present/absent};
avoid {stocky, over-saturated} frames.

Source + grade, per the 02 slots:
- Hero: {1} full-bleed {landscape}, {≥2400px} wide, focal point {left-third} for
  the headline overlay; export {WebP + JPG fallback}, {≤320KB}.
- {Services} cards: {3}× {4:3}, unified grade.
- {Showcase}: {4}× project frames, {3:2}.

Grade recipe (apply uniformly): {lift shadows +8, greens −8 saturation, highlights
+6 warmth, gentle S-curve} — so the set reads as one shoot.
Deliver into {assets/img/} at the export names 05 will reference; alt-text stubs
(final wording in 03).
```

## Filled example — GreenGarden

```
Art-direct and source the imagery for the GreenGarden home page.

Look: editorial botanical; grade warm toward the brand evergreen; shallow depth of
field, golden-hour light; people mostly absent (let the gardens lead); avoid
stocky, over-saturated frames.

Source + grade per 02 slots:
- Hero: one full-bleed landscape, ≥2400px, focal point left-third for the headline
  overlay; export WebP + JPG fallback, ≤320KB.
- Services cards: 3× 4:3 (Design / Build / Maintain), unified grade.
- Showcase: 4× signature-project frames, 3:2.

Grade recipe: lift shadows +8, greens −8 saturation, highlights +6 warmth, gentle
contrast S-curve — applied uniformly so the set reads as one shoot.
Deliver into assets/img/ as hero.webp, svc-design.webp, svc-build.webp,
svc-maintain.webp, project-01..04.webp; alt-text finalised in 03.
```

## Do's

- **DO** grade the whole set with **one** recipe so it reads as a single shoot —
  inconsistent imagery is the fastest way to look un-sophisticated.
- **DO** export at the aspect ratios and sizes **02** specified, in a modern format
  (WebP/AVIF) + a fallback, within a weight budget — imagery is the usual
  page-weight villain (**07** checks it).
- **DO** place the hero's focal point **away** from the headline overlay zone.
- **DO** keep the hero at ≥2400px for retina and the 1800px ultra-wide container,
  and name exports to match what **05** references.

## Don'ts

- **DON'T** ship un-graded stock — the grade *is* the art direction.
- **DON'T** bake text (headlines) into images — it breaks responsiveness, a11y,
  and SEO; text is **03**'s job, in real markup.
- **DON'T** use imagery the client can't license — note provenance for every asset.
- **DON'T** rely on giant hero JPGs — right-size and compress; the "ready for
  {year}" bar includes Core Web Vitals.
