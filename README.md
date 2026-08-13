# Website Design & Development — Prompt Library

A phase-by-phase set of **copy-paste prompts** for taking a company-profile
website from kickoff to a live, client-editable site. One Markdown file per phase.

Each entry follows the same shape as the `divi5-native-convert` skill's
references: a **fill-in template** (`{…}` placeholders), a **filled worked example**,
and short **Do / Don't** notes. The worked example running through every phase is a
real, shipped build — **GreenGarden Integrated Services (GGIS)** — so the files read
as one continuous project, not nine disconnected snippets.

> Use it like this: find your phase, copy the template, replace the `{…}`, send.
> If you leave details out, most phases hand off to a skill that will ask you the
> key choices as clickable options before it starts.

---

## The pipeline

The spine runs left to right. **03 Content** and **04 Imagery** are feeders — they
produce the words and pictures that **02** slots and **05** builds.

```
                 ┌── 03 Content & SEO ──┐   ┌── 04 Imagery ──┐
                 │  (copy + meta + alt) │   │ (graded assets)│
                 ▼                      ▼   ▼                ▼
 00 Kickoff ─▶ 01 Design ─▶ 02 Page/ ─▶ 05 Build ─▶ 06 Divi ─▶ 07 QA ─▶ 08 Deploy
   Brief        System       Section     (static)    Convert
                (charter)    (grammar)   (source of   (native
                                          truth)       modules)
```

Hand-off chain: **00 → 01 → 02 → 05 → 06 → 07 → 08**, with **03** and **04**
feeding **02** and **05**.

---

## The phases

| # | File | Phase | In → Out |
|---|---|---|---|
| 00 | [00-kickoff-brief.md](00-kickoff-brief.md) | Project / design kickoff | client PDF + old site → an agreed brief |
| 01 | [01-design-system.md](01-design-system.md) | Establish the settled **charter** | brief → `design-system.json` + grammar + prefix |
| 02 | [02-page-or-section.md](02-page-or-section.md) | Compose a page from the grammar | charter + copy + imagery → a build-ready section spec |
| 03 | [03-content-seo-copy.md](03-content-seo-copy.md) | Brand-voice + SEO copywriting | values + slots → per-slot copy, meta, alt-text |
| 04 | [04-imagery-art-direction.md](04-imagery-art-direction.md) | Sourcing + grading direction | mood + slots → graded, sized assets |
| 05 | [05-build-static.md](05-build-static.md) | Class-driven HTML/CSS/GSAP | spec + copy + imagery → the static **source of truth** |
| 06 | [06-divi-conversion.md](06-divi-conversion.md) | Hand off to `divi5-native-convert` | static build → Divi JSON + child-theme zip |
| 07 | [07-review-qa.md](07-review-qa.md) | Responsive / reduced-motion / a11y / live verify | built page → pass/fail record + fixes in source |
| 08 | [08-deploy.md](08-deploy.md) | GitHub Pages / Cloudflare / Divi zip | QA-green build → live URL + rollback note |

---

## Conventions

- **`{…}` = fill me in.** Everything in braces is a placeholder; replace it before sending.
- **The worked example is GreenGarden Integrated Services (GGIS)** — an elegant,
  evergreen landscaping brand. Its canonical facts stay constant across every file:

  | Thing | Value |
  |---|---|
  | Class prefix | `ggis-` (on every bespoke class — carries layout through the Divi port) |
  | Stylesheet | `assets/css/ggis.css` |
  | Motion | GSAP + ScrollTrigger + Lenis; reveal trigger class `ggis-reveal` |
  | Container max-width | `1800px` |
  | Child theme | `ggis-divi-child`, reconcile CSS in `css/ggis-divi.css` |
  | Live host | `greengarden.kesatria.my` |
  | Uploads base | `…/wp-content/uploads/2026/08/` |
  | Theme assets base | `…/wp-content/themes/ggis-divi-child/img/` |

- **Two skill hand-offs** do the heavy lifting:
  - **01** → the `ka-generate-design-guideline` skill → `design-guidelines/design-system.json`.
  - **06** → the `divi5-native-convert` skill → validated Divi JSON + the rebuilt child-theme zip.

- **The static build (05) is the single source of truth.** Divi JSON is *generated*
  from it, never hand-authored; QA fixes land in source, never in the exported JSON.

---

## Why this order

- The **charter** (01) is frozen before any page is composed, so a token change
  never ripples back through five built pages.
- **Content (03)** and **imagery (04)** are produced against named **slots** (02),
  so nothing is written or shot that the layout can't hold.
- The **static build (05)** is authored to the exact contract `divi5-native-convert`
  expects, so the **port (06)** is a generate-and-verify step, not a rebuild.
- **QA (07)** verifies the live import with the skill's own probes and fixes in
  source; **deploy (08)** only runs once QA is green.
