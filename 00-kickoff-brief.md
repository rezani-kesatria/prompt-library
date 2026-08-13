# 00 · Kickoff brief

The one message that seeds the whole project — the client/design kickoff. It sets
positioning, brand direction, motion intent, and scope from the client's own
materials, and nothing more. Everything downstream is derived from here.

**Hand-off**
- **In:** the client's company-profile PDF + their current site URL.
- **Out:** an agreed brief — audience, positioning, brand direction (one colour,
  one type feeling), motion intent, and a one-page scope.
- **Next:** **01** turns this direction into a *settled charter* (tokens, type,
  motion) before any page is composed.

**When to use** — at the very start, or whenever a new client engagement begins.
This is the only phase that reads *external* references (the PDF + the old site);
every later phase reads the artifacts these phases produce.

---

## Fill-in template

```
@{company-profile.pdf}

I want to create a company-profile website mockup for {Company} — a {business type}
that {what they do} for {who they serve}. They have a current site and want
something new and sophisticated that fits their brand.

Analyse the attached profile PDF + their current site as references.
Current site: {old-site-url}

Design Direction:
- Primary brand colour {#hex / name}; {secondary/accent} as support.
- {Serif / sans} typeface for the "{elegant / bold / editorial}" brand feel.
- Imagery that hooks the client on first scroll; generous white space.
- Desktop max-width {1800px}.

Copy: proper SEO copywriting that surfaces their brand values ({value 1},
{value 2}, {value 3}).
Motion: incorporate {GSAP} scroll animation (reveal-on-scroll + a hero parallax).
Make it ready for {2026}.

Scope: start with the {home} page for now.
```

## Filled example — GreenGarden

> The real, proven kickoff. The shipped site delivered exactly what this asked for.

```
@company-profile.pdf

I want to create a company-profile website mockup for GreenGarden Integrated
Services — a landscaping firm that designs, builds, and maintains gardens and
grounds for commercial estates, hospitality, and premium residences across
Malaysia. They have a current site and want something new and sophisticated that
fits their brand.

Analyse the attached profile PDF + their current site as references.
Current site: https://greengarden.com.my

Design Direction:
- Primary brand colour deep evergreen (#1B4332); warm sand/gold as accent.
- Serif display type for the "elegant" brand feel; a clean sans for body.
- Imagery that hooks the client on first scroll; generous white space.
- Desktop max-width 1800px.

Copy: proper SEO copywriting that surfaces their brand values — craftsmanship,
stewardship, longevity.
Motion: incorporate GSAP scroll animation (reveal-on-scroll + a hero parallax).
Make it ready for 2026.

Scope: start with the home page for now.
```

## Intake — have these ready before you send

A short checklist; the brief is only as good as its inputs.

| Input | Why it matters |
|---|---|
| The company-profile **PDF** | anchors the brand in the client's own language, not guesswork |
| The **current site** URL | the "before" — what to honour and what to leave behind |
| **One** primary colour + **one** type feeling | 01 derives the full palette/scale from these; over-specifying locks the wrong things |
| Desktop **max-width** + the **"ready for {year}"** bar | cheap to state now, expensive to retrofit |
| The **brand values** to surface | they drive both the SEO keywords and the copy tone (03) |
| The **first page** (usually home) | prove the system on one page before scaling |

## Do's

- **DO** attach the real profile PDF and link the live current site — the analysis
  is the anchor; a brief with no references is a brief about nothing.
- **DO** name **one** primary colour and **one** type feeling; let **01** derive
  the full palette, scale, and neutrals.
- **DO** state the desktop max-width and the "ready for {year}" bar up front —
  they're one line each and shape every later decision.
- **DO** scope to a single page (home) first — a home that lands the system is
  worth more than five half-baked templates.
- **DO** name the brand values you want surfaced — they're the seam where SEO
  (03) and brand voice meet.

## Don'ts

- **DON'T** specify pixel-level layout or a component list here — that's **02**'s
  job; over-specifying the brief freezes the wrong things early.
- **DON'T** ask for "modern / clean" without a reference — the PDF and the old
  site **are** the reference; point at them.
- **DON'T** request every page at once — scope creep at kickoff produces uniform
  mediocrity.
- **DON'T** commit to a CMS or stack in the brief — the static build (**05**) is
  the source of truth; the Divi port (**06**) is a later, deliberate choice.
