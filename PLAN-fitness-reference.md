# Plan — reference #16: a fitness & health analytics dashboard

**Status:** planned, not started · **Created** 14 October 2026
**Kind:** RECREATION — content and layout are the original designer's; we rebuild and document the rule set.
**Source shortlist row:** `CREDITS.md` §"Shortlist — dashboards ▶ ACTIVE": [Fitness Dashboard UI Design | Health Analytics Dashboard](https://dribbble.com/shots/27537811-Fitness-Dashboard-UI-Design-Health-Analytics-Dashboard), **Abdullah Al Mamun ❂**.

Read `HANDOFF.md` (and its 15 Sep addendum) before anything else. This plan assumes that context
and does not repeat it. Method rules cited below as §-numbers refer to that file.

---

## Phase 0 — Session context for a cold start

State as of 14 Oct 2026:

- **RIVA is closed.** Built, registered in `data.js`, conformance 17/17 green, moved from the
  shortlist into the `CREDITS.md` Built table (now "the thirteen recreations", footer bumped).
- **Uncommitted in the working tree:** `app/designs/CREDITS.md` (the RIVA move, this week),
  `app/designs/taskkit.design-language.md` (modified earlier, reason not recorded — read the
  diff before committing), untracked `WEEK-PROGRESS-2026-08-28.md`, `AGENTS.md`,
  `image_reference/`, `.kilo/`. `image_reference/` must not be committed or deleted without
  asking (HANDOFF §3).
- **Run the app:** `node app/serve.js`, port 5183. Conformance: `node tools/conformance.js [id]`
  (needs that server running + Chrome).
- Dribbble **WAF-blocks scripted fetches**. Verified again this session: both `webfetch` and the
  Playwright-controlled browser get a 405 "Human Verification" page on the shot URL. Byline and
  source confirmation must happen in the **owner's real browser** (that is how the SARA/TASK KIT
  notes were resolved by eye).

## Phase 1 — Verify and acquire the source

1. Open the shot in the owner's browser and **confirm the byline by eye**: expect
   "Fitness Dashboard UI Design | Health Analytics Dashboard" by **Abdullah Al Mamun ❂**.
   Dribbble serves by **ID and ignores the slug** (HANDOFF §7) — confirm ID `27537811` really
   shows the claimed shot, never trust the URL text.
2. Save the **highest-res still** to `image_reference/` (flat, straight-on export — see the
   controls in Phase 2 before trusting it). Never build from memory of the shot.
3. Record the credit in `app/designs/CREDITS.md` **now**, before any build (HANDOFF §4.8), and
   in the spec's Source row later.

## Phase 2 — Controls and pixel scan (measure, don't eyeball)

Before writing a single numeric rule (HANDOFF §4.3):

- **Lighting gradient check** — sample the same flat surface at distant points. Exact match =
  flat composite, colours trustworthy. Drift = lit render; record magnitudes as unreliable.
- **Keystone/perspective check** — sample screen edges at multiple points. Converging edges =
  reject the shot outright (the ShiftPulse rule; an angled mockup kills every proportion).
- **Presentation-frame trap** (§4.4) — if the shot presents the UI in a laptop/monitor mockup,
  only screen contents are the design. State explicitly in the spec what was discarded
  (RIVA's spec header is the current model for how to write this up).

Then pixel-scan: sample palette, radii, spacing, type ramp, stroke weights. Every numeric rule
in the spec gets tagged `observed` only if actually measured; otherwise `inferred` (say so in
the header) or `authored`.

## Phase 3 — Write the spec first

`app/designs/fitness.design-language.md`, in the current shape (§4.2). Read the four most
recent specs first — `riva`, `saas`, `atelier`, `assistant` — they set the expected rigor.

Required sections:

1. Header table (Source / Recreation / Format / Palette) + callouts for this source's traps
   (mockup frame, lighting/keystone results, any circulating angled copy).
2. Tier legend 🔒 FIXED / 🎚 FLEXIBLE / 🎨 SWAPPABLE.
3. Numbered core dimensions, each tagged `observed` / `inferred` / `authored`.
4. **COMPONENT ANATOMY** — how parts assemble, not how they look.
5. **Motion brief** naming the real stack: GSAP + ScrollTrigger + Lenis + Motion, with
   implementation traps (not "smooth modern animations").
6. Closing fenced ` ```text ` **payload** — imperative, self-contained, load-bearing rules in
   caps. An agent reading only the payload must be able to rebuild the page.

Watch the over-generalization trap (§4.5): we now have five dark dashboards (RIVA, ARCHE,
Metric, Numéro, MoveIQ). Do not assume this one repeats any of their laws — RIVA's
sidebar-lightest inversion was found exactly by not assuming. Measure this source on its own.

## Phase 4 — Build

`app/designs/fitness.html` (file stem may end up different — data.js id vs stem have diverged
before: `numero`→`finance.html`, `metric`→`metrics.html`; pick and keep consistent).

- House stack only: GSAP + ScrollTrigger + Lenis + Motion; **Lucide** icons
  (`unpkg.com/lucide@0.462.0`, UMD, stroke-width ~1.5–1.7); **ApexCharts** for any real chart —
  never hand-drawn SVG bars/donuts (HANDOFF §5).
- Recreation: copy the source's content and layout, inside the screen only.
- Scope: the single dashboard screen — that is what a mood tile previews.
- Verify visually after every CSS/layout change (screenshot or CDP). The bugs this project
  shipped were all caught by looking, not by reading.

## Phase 5 — Conformance rules

Add a `fitness` block to `tools/conformance.js` (see the `riva`/`metric`/`numero` blocks for
the vocabulary: `inkNotPureWhite`, `panelDirection`, `ladderOrder`, `exactCount`, `present`,
`bordersOnlyOn`, …). Rules must encode this design's *signature* rules, not generic counts.

- `node tools/conformance.js fitness` must pass.
- **A passing check reporting zero elements found is a bug in the check, not a pass** — the
  "vacuous pass" pattern has bitten twice (HANDOFF §5).

## Phase 6 — Wire in and bookkeeping

1. `data.js`: `REFERENCES` entry (`id: "fitness"`, `ref: true`, vibes, mode) + re-export into
   `MOODS`; set a `flag`/`flagNote` only if something is genuinely unresolved (model: RIVA had
   none once measured; LUMA still carries WIP).
2. Verify end-to-end: payload fetch at runtime, mood tile preview, one generated prompt.
3. `CREDITS.md`: move the shortlist row into the Built table, update the intro line
   ("Three are built…"), bump the footer date. Spec's Source row already carries the designer.
4. Optional: a dated addendum in `HANDOFF.md` (the §10 pattern) — the §6 table and §8 shortlist
   are snapshots and will be stale again.
5. Commit style: repo-local identity, full-prose messages explaining *why*, no co-author
   trailer, never touch global git config (HANDOFF §3). Ask before committing the pre-existing
   uncommitted files listed in Phase 0.

## Acceptance criteria

1. Byline verified by eye and recorded before the build started.
2. Lighting + keystone controls run and their outcomes written into the spec header.
3. Conformance green for this design's signature rules, non-vacuous.
4. Visual verification done (screenshots), not just DOM checks.
5. A generated prompt from the mood carries the anatomy + motion blocks; payload fetches.
6. Someone who has seen the source would call it a faithful sibling, frame discarded.

## Risks

| Risk | Mitigation |
|---|---|
| Angled/lit mockup presentation | Keystone + lighting controls before any measurement; reject if perspective |
| Frame read as design (§4.4) | Explicit discarded-frame callout in the spec header |
| Over-generalizing from the five prior dashboards | Measure this source independently; tag honestly |
| WAF blocks scripted verification | Owner's real browser for byline/source; never trust slug |
| Stale working tree confuses the commit | Phase 0 list; ask before sweeping unrelated files |
