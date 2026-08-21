# Weekly Progress — Prompt Library

**Week ending Friday, 14 August 2026**
Project: design-reference library + mood-first prompt builder

---

## TL;DR

Turned the Prompt Library from a plan into a working, deployable product this week.
**Nine design references** were recreated in code, each paired with a machine-readable
**design-language spec** whose "prompt payload" gets injected into generated prompts to
stop downstream agents from drifting off the intended design. The builder app that ties it
all together was wired end-to-end, moved onto real animation/charting frameworks, and pushed
to a GitHub repo ready for Pages hosting.

**Headline number:** first end-to-end transfer test scored **80% design accuracy** on a
fresh project — and the 20% gap was traced to a single root cause (layout anatomy), which is
now fixed across every spec.

---

## What shipped

### 1. Nine design recreations (up from five)

Each is an HTML recreation + a `*.design-language.md` spec ending in a copy-paste prompt payload.
The recreation proves the rules; the spec is what actually travels into a prompt.

| # | Name | Type | Original designer |
|---|------|------|-------------------|
| 1 | **VITA** | Travel landing | Phenomenon Labs |
| 2 | **Blockio** | Crypto landing | Taras Migulko / Emote |
| 3 | **Vertex** | Real-estate landing | Phenomenon Labs |
| 4 | **Art Course** | E-learning landing | Ronas IT |
| 5 | **EcoVolt** | Solar landing | Irfanaffian |
| 6 | **Numéro** 🚩 | Finance dashboard | Bogdan Falin / QClay |
| 7 | **HireLaw** | Law-firm landing | Odama |
| 8 | **MoveIQ** | Fleet/logistics dashboard | Ronas IT |
| 9 | **Metric** | Analytics dashboard | Igor Zeru |

- Landing pages 1–5 established the method; this week added **four data-dense product UIs**
  (three dashboards + a law firm site).
- Every original designer is credited in `CREDITS.md`, verified against the live source — a
  deliberate tribute, not a claim on their work.

### 2. The "layout anatomy" fix — the week's most important lesson

- Ran the first real **transfer test**: fed the Metric payload into a brand-new project.
  Result was **80% accurate** — genuinely close, but four misses.
- **All four misses were the same class of error:** the payload described how a design *looks*
  (colour, type, spacing) but not how its parts are *assembled* (e.g. "the KPI strip is one
  panel of N cells, not N separate cards").
- Fixed by adding a **COMPONENT ANATOMY** block and explicit section order to **all nine specs**.
  This closes the single biggest source of drift.

### 3. Builder app wired end-to-end

- **Mood → Refine flow** now renders all nine real recreations live (in-page), each carrying
  its real prompt payload — no more generic stand-ins.
- **New project-brief + client-detail fields** so prompts are built from the actual client
  context (what they do, who they serve, brand values/colours), not a hard-coded sample.
- **"Load example"** button fills the whole form in one click to speed up testing.
- Forms moved to a consistent shadcn-style system; fixed a dropdown z-index bug.
- **Icons swapped to Lucide** (the shadcn icon set) across the app and every design.

### 4. Moved onto real frameworks

Standing decision this week: stop hand-rolling, use production tools.

- **Animation:** GSAP + ScrollTrigger + Lenis + Motion (scroll-triggered reveals that reflect
  hierarchy, not bland fades).
- **Charts:** ApexCharts (bar, area, donut) instead of hand-drawn SVG.

### 5. Hosting

- Repo created and **initial push completed** (`github.com/rezani-kesatria/prompt-library`).
- GitHub Actions workflow deploys the app to Pages; `.nojekyll` guard in place so the spec
  files survive as raw markdown (critical — otherwise every prompt payload 404s silently).

---

## Highlights / wins

- **80% first-shot accuracy** on an unseen project, with the remaining gap root-caused and fixed.
- Scaled from 5 → **9 references** and from landing pages into **dashboards** (the harder,
  data-dense case).
- Established a **repeatable method**: open reference at native resolution → pixel-scan exact
  values → build → verify numerically → iterate. Errors consistently cluster in whatever wasn't
  measured, so measurement is now the discipline.

---

## Flags & what's next

- 🚩 **Numéro (finance dashboard)** is marked **provisional** — no full visual audit completed.
  Revisit before relying on its payload.
- ⏸ **Dashboard shortlist on hold** — a curated list of next candidates is parked in `CREDITS.md`.
- ⚙️ **GitHub Pages needs a one-time manual switch-on** (Settings → Pages → Source: "GitHub
  Actions"). The token can't enable it automatically. One click, then it's live.
- 🎨 **"Playful" mood category is thin** (one tile) — worth targeting for the next reference.

---

## By the numbers

- **9** recreations (HTML + spec each)
- **~2,000** lines of design-language specs (payloads run 154–292 lines each)
- **4** frameworks adopted (GSAP, Lenis, Motion, ApexCharts)
- **1** transfer test run — **80%** accuracy
- **9/9** specs now carry the COMPONENT ANATOMY fix
