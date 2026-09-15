# Handoff — Prompt Library

**Written:** 28 August 2026, for an incoming agent/model picking this project up cold.
**Read this whole file before touching anything.** It is short on purpose — everything in
it was learned the expensive way, by getting it wrong first.

---

## 1. What this project actually is

Two things live in one repo, and they are easy to conflate:

1. **`00-08-*.md` at the repo root** — a copy-paste **prompt pipeline** for building a
   client website by hand, phase by phase (kickoff → design system → build → Divi → deploy).
   Read [`README.md`](README.md) for that. It is finished and stable; you probably are not
   here for it.
2. **`app/`** — a static web app: a **mood-first prompt builder** backed by a **library of
   design-language references**. This is almost certainly what you were asked to continue.
   The rest of this file is about `app/`.

**The one-sentence pitch for `app/`:** each reference is a real, built webpage plus a
`*.design-language.md` spec that describes *the rule set behind it* — not its palette or
vibe, but the structural rules an agent needs to reproduce the design faithfully. The
builder lets a user pick a mood, fill in a client brief, and generates a prompt that
injects the winning design's payload verbatim, so a downstream coding agent doesn't drift.

**The failure mode this whole project exists to prevent:** a generated prompt that says
"dark SaaS dashboard, rounded, modern" and gets back something generic. The payload is
written to name every non-obvious structural decision explicitly, in the imperative,
often in caps, because a soft suggestion gets ignored and a hard rule gets followed.

---

## 2. Run it

```bash
node app/serve.js
```
Serves on **port 5183** (a `.claude/launch.json` config named `prompt-library` also starts
it). Static files, no build step, no dependencies to install.

- App shell: `app/index.html`, `app/assets/js/app.js` (all UI logic), `app/assets/js/data.js`
  (the mood/reference registry — `MOODS`/`REFERENCES`/`VIBES`/prompt templates).
- Every reference lives at `app/designs/<id>.html` (the built page) +
  `app/designs/<id>.design-language.md` (the spec). The spec's last fenced ` ```text ` block
  is the **payload** — fetched at runtime and injected into the generated prompt. The `.md`
  is the single source of truth; nothing duplicates the payload elsewhere.

**Conformance checker** — `tools/conformance.js`. Drives headless Chrome over CDP and
asserts a design's rules mechanically instead of by eye:
```bash
node tools/conformance.js            # every design that has rules defined
node tools/conformance.js atelier    # one design, by its data.js id
```
Requires the dev server running and Chrome installed at the path in the script (override
with `CHROME_PATH` env var). Only **3 of 12** references have rules defined yet (`atelier`,
`saas`, `assistant`) — see §6.

---

## 3. Git / deploy

- Repo-local identity (do not touch global git config): `rezani-kesatria
  <rezani@kestria.my>`, over `~/.ssh/id_ed25519_kesatria`. Confirm before any commit:
  `git config user.name && git config user.email && git config core.sshCommand`.
- Remote: `git@github.com:rezani-kesatria/prompt-library.git`, branch `main`, currently
  ahead of nothing (pushed through `c7d9f7c` as of this writing).
- **No co-author trailer on commits.** Commit messages in this repo's history are written
  in full prose explaining *why*, not just *what* — match that style, don't shorten it.
- **GitHub Pages is not live yet.** The Actions workflow (`.github/workflows/pages.yml`)
  deploys `app/` on every push to `main`, but Pages itself needs a **one-time manual
  enable**: repo Settings → Pages → Source: "GitHub Actions". `enablement: true` in the
  workflow cannot do this — creating a Pages site is an admin-scope call the token doesn't
  have. This has been an open item for three weeks; it needs the human, not an agent.
- `.nojekyll` in `app/` is load-bearing — without it Jekyll rewrites the `*.design-language.md`
  files to HTML and every payload fetch 404s silently. Never delete it.
- `image_reference/` is untracked (holds a third-party asset dropped in mid-session). Ask
  before committing or deleting it.

---

## 4. The method — read this before writing or editing any spec

This is the actual intellectual content of the project. Get this part right or every spec
you touch will drift the same way the early ones did.

### 4.1 Extract the rule set, not the vibe
A design-language spec answers "what are the *rules*", never "what does it look like". Bad:
*"clean, modern dashboard with rounded cards."* Good: *"zero border-radius on every panel;
the ONLY exception is 9999px pills. Two states, no middle ground."* Rules transfer across
content; vibes don't.

### 4.2 Every spec has the same shape
1. Header table (Source, Recreation, Format, Palette) + callout boxes for traps specific to
   that source.
2. A tier legend: 🔒 FIXED (structural, non-negotiable) / 🎚 FLEXIBLE (magnitude, tune
   freely) / 🎨 SWAPPABLE (brand identity, changes per client).
3. Numbered "Core dimensions" sections, each tagged `observed` (measured), `inferred`
   (read by eye, not measured), or `authored` (our decision). **Never claim `observed` for
   something you didn't actually measure.**
4. A **COMPONENT ANATOMY** section — how parts are *assembled*, not how they look. This is
   the section every spec was originally missing, and it's the single biggest source of
   transfer failure (see §4.4).
5. A **Motion brief** — every payload as of this week names the actual stack (GSAP +
   ScrollTrigger + Lenis + Motion) and lists implementation traps. Do not write a motion
   section that just says "smooth, modern animations" — it must say what to build it with.
6. A closing fenced ` ```text ` block: the **Prompt payload**. This is what actually ships.
   Imperative, often shouting-cased on the load-bearing rules, self-contained (an agent
   reading only this block should be able to build the page).

### 4.3 Measure, don't eyeball, whenever a file is available
The single highest-value technique found this project: **when you have the source image on
disk**, pixel-scan it (crop, magnify, sample colours, scan for edges/corners) before writing
any numeric rule. Every time a rule was written from a visual impression instead of a
measurement, it was later found wrong:
- Metric: read as "rounded" → measured as **exactly 0 radius** (a chip's fill was exactly
  48px tall at its first column — a rounded corner would start shorter).
- ARCHE: read as "panels rounded 12–16px, bars rounded-top" → measured as **0 radius on
  panels** and an **asymmetric bar sweep** (top-left radius ≈75% of width, top-right square,
  right edge dead straight at every row).

If no file is available (as with LUMA/`assistant.html` — the source still was never saved),
say so explicitly in the spec header and tag every magnitude `inferred`, not `observed`.
**Do not silently upgrade an inferred value to sound measured.**

Two controls to run before trusting a mockup/render as a source, both non-negotiable:
- **Lighting gradient check** — sample the same "flat" surface at several distant points.
  If the values match exactly, the shot was composited flat and colours are trustworthy; if
  they drift, the render is lit and you cannot read exact hex values off it.
- **Keystone/perspective check** — sample the edges of the screen region at multiple points.
  If they're constant (not converging), the shot is axis-aligned and geometry is
  trustworthy. If they converge, discard the shot — see ShiftPulse in `CREDITS.md`, rejected
  outright for exactly this.

### 4.4 The presentation-frame trap
The single most repeated mistake in this project's history: **reading the mockup/frame
around a design as part of the design.** A MacBook render, a grey backdrop mat, a browser
chrome screenshot — none of that is the design. Only the *screen contents* are. This
produced a wrong "floating app shell" for Numéro (from a Dribbble grey mat) and nearly did
the same for ARCHE and LUMA (MacBook renders) before being caught. **Every spec for a
mockup-presented source must state explicitly what was discarded as presentation.**

### 4.5 Don't over-generalize a small sample into a law
Happened three times this project, always caught by *building* the next thing, never by
re-reading:
- "Panels recede — a genuine constant" (written after 3 dashboards) → ARCHE's panels
  **lift**. Now documented as a per-design axis, like radius.
- "ARCHE is dark only, no valid inversion" (argument borrowed from TENON by analogy) →
  inverts cleanly; TENON's dark-only-ness is specific to its own accent rule, not general.
- "LUMA is rounded at exactly two scales" → it's a radius **ladder** with intermediate
  values; the binary was invented, not observed.

**When you find yourself writing "always" or "a genuine constant" into a spec, that's the
signal to go measure the next example before it ships**, not after.

### 4.6 Original references invert the build order
Two references (**TENON**, **LUMA**) are not recreations — the domain/content is invented,
only the *rule set* is studied from a real source and credited as an influence (never
claimed as the origin). For these: **write the spec first, then build blind from the spec
alone**, never looking back at the source while building. This is the only way to test
whether a payload is actually complete — TENON's blind build immediately found a real gap
(word-wrapping in a per-character text-split animation) that the spec had silently assumed.
If you write another original reference, keep this order.

### 4.7 Deliberate divergence is fine, and should be stated
When a source's content-specific component doesn't fit the new domain, don't cargo-cult it.
TENON's source had 4 video-project cards; TENON (furniture) needed a material/dimension
metadata table instead, so that's what got built — and the spec says so explicitly, framed
as "this is where our content legitimately diverges."

### 4.8 Attribution is written down before the build starts, not after
Every recreation credits its real designer in `app/designs/CREDITS.md`, verified against
the live source (Dribbble serves shots by **ID and ignores the slug** — a stale/wrong URL
silently resolves to an unrelated shot rather than 404ing; always re-open and confirm the
byline before trusting a link). Record the credit as soon as the source is picked, before
any file is built, so it can't get lost mid-session.

---

## 5. Do / Don't

**Do:**
- Use the house animation stack everywhere: **GSAP + ScrollTrigger + Lenis + Motion**
  (motion.dev), never hand-rolled CSS transitions, for any new build.
- Use a real charting library (**ApexCharts** has been the house choice) for any chart,
  never hand-drawn SVG bars/donuts.
- Use **Lucide** icons (`unpkg.com/lucide@0.462.0`, UMD build, `stroke-width` tuned per
  design ~1.5–1.7) for everything except a genuine brand/company mark. One sanctioned
  content-fidelity exception exists (Numéro's rating-face arcs — see its spec §comment) —
  don't "fix" it.
- Tag every claim `observed`/`inferred`/`authored` honestly.
- Run `tools/conformance.js` against a design after any structural edit, and treat a
  passing check that reports **zero elements found** as a bug in the check, not a pass —
  see §4.3/§6, the "vacuous pass" pattern already bit this project twice.
- Verify visually (screenshot or CDP capture) after any CSS/layout change — several bugs
  this project shipped (word-breaking mid-word, invisible chart series on a theme flip,
  a toggle icon stranded invisible after a View Transition) were only caught by looking.

**Don't:**
- Don't treat a mockup's outer frame/backdrop as design (§4.4).
- Don't write a numeric rule as `observed` without having actually measured it.
- Don't promote an observation from a few examples into a blanket "always"/"constant"
  claim without flagging it as provisional (§4.5).
- Don't use `gsap.fromTo()` in the microtask right after a View Transition completes — a
  tween created there can land on an idle GSAP ticker and never receive a tick, silently
  stranding the element at its from-state (this made a theme-toggle icon invisible; fixed
  by driving that specific animation with Motion/WAAPI instead, and clearing inline styles
  *before* animating so the failure mode is "no animation" rather than "invisible element").
- Don't assume `r.cssRules` truthy means "this is a grouping rule like `@media`" when
  walking a stylesheet in JS — with CSS Nesting, plain style rules carry a (empty)
  `cssRules` too. Use `r.conditionText !== undefined` to detect a real grouping rule.
- Don't measure a centred/pinned fixed element's position against `window.innerWidth` —
  it includes the scrollbar and reports a false ~half-scrollbar offset. Use
  `document.documentElement.clientWidth`.
- Don't touch the user's **global** git config. Everything for this repo is set locally
  (§3) — confirm identity before every commit rather than assuming.
- Don't enable GitHub Pages yourself or claim you did — it structurally cannot be done by
  an agent here (§3). Tell the user, don't attempt workarounds.

---

## 6. Current state, precisely (as of commit `c7d9f7c`, 28 Aug 2026)

**12 references** registered in `app/assets/js/data.js` → `REFERENCES` (also re-exported
into `MOODS`). Every entry ships a built `.html` + a `.design-language.md` with a payload
that fetches successfully at runtime — verified this session.

| id | Name | Kind | Status |
|---|---|---|---|
| `vita` | VITA | Travel catalog | done |
| `blockio` | Blockio | Crypto product | done |
| `vertex` | Vertex | Real estate | done |
| `artcourse` | Art Course | E-learning | done |
| `ecovolt` | EcoVolt | Solar energy | done |
| `numero` | Numéro | Finance dashboard | 🚩 **`flag: "Provisional"` in data.js** — no visual audit ever completed, rules unconfirmed |
| `hirelaw` | HireLaw | Law firm | done |
| `moveiq` | MoveIQ | Fleet workbench | done |
| `metric` | Metric | Analytics dashboard | done, pixel-measured |
| `atelier` | TENON | Furniture atelier | done — **original**, spec-first blind build, has conformance rules |
| `saas` | ARCHE | Commerce/learning dashboard | done — pixel-measured, light+dark, has conformance rules |
| `assistant` | LUMA | AI learning assistant | 🚧 **work in progress** — original, but **magnitudes are `inferred`** (source file never saved), no visual audit done, has conformance rules |

**Two flags that should probably be surfaced in the UI but currently aren't fully
consistent:** Numéro has a `flag`/`flagNote` field that renders a warning badge in the
Refine step. LUMA does **not** have this flag set yet despite being equally unfinished —
worth adding `flag: "Work in progress"` to its `data.js` entry so the app's own UI matches
what the docs say. Nobody has done this yet; it's a one-line addition if you pick it up.

**Payload totals:** 12 references, 865 payload lines, ARCHE currently the largest at 89.

**Conformance coverage:** only `atelier`, `saas`, `assistant` have rules in
`tools/conformance.js`. The other 9 references are unguarded — no mechanical check exists
for them. Extending coverage to the rest is a good, well-scoped next task.

**Animation-stack coverage:** all 12 payloads *name* GSAP/Lenis/Motion as of this week, but
only **5 of the 12 built HTML files** actually load those libraries: `fleet`, `metric`,
`atelier`, `saas`, `assistant`. The other 7 (`vita`, `blockio`, `vertex`, `artcourse`,
`ecovolt`, `numero`, `hirelaw`) still run hand-rolled CSS transitions with
IntersectionObserver — verified by grepping each `.html` for `gsap.min.js`. The payload is
what transfers into new work, so the payload text was fixed first; retrofitting the older
recreations themselves is unstarted and is a separate, larger job.

**Dashboard shortlist** (`CREDITS.md`, "Shortlist — dashboards ▶ ACTIVE") still has open
candidates: AI SaaS Dashboard (Robert Licau), RIVA (Md Forhad Alam/Qudra), Fitness Dashboard
(Abdullah Al Mamun), AI-Powered Analytics Overview (Outcrowd), Rinesk Call Centre (Anastasiia
Cherniak — currently open in a browser tab per the last session), Charts Mega UI Kit and
Financia (both Muzli-hosted, not Dribbble). Geovea was used for LUMA and removed from the
list. ShiftPulse is permanently rejected (angled mockup, see §4.3).

**Uncommitted at handoff time:** `WEEK-PROGRESS-2026-08-28.md` (this week's report, written
but not yet committed) and the untracked `image_reference/` folder. Nothing else pending —
working tree otherwise clean, `origin/main` matches local `HEAD`.

---

## 7. Design references — sources for all 12 built

Pulled directly from `app/designs/CREDITS.md` (the canonical copy — check there for
updates, this is a snapshot). Dribbble serves shots by **ID, ignoring the slug** — a stale
or mistyped URL silently resolves to an unrelated shot rather than 404ing. Always re-open
and confirm the byline before trusting a link, and never build from memory of what a shot
looked like.

### Recreations — content and layout are the original designer's

| Reference | Source shot | Designer | Studio / team |
|---|---|---|---|
| VITA (`travel`) | [Web Design for Travel Landing Page – VITA](https://dribbble.com/shots/26907949-Web-Design-for-Travel-Landing-Page-VITA) | **Phenomenon Labs** | for Phenomenon Studio |
| Blockio (`crypto`) | [Blockio web page](https://dribbble.com/shots/25580612-Blockio-web-page) | **Taras Migulko** | for Emote |
| Vertex (`realestate`) | [Real Estate Website Design – Vertex](https://dribbble.com/shots/27357269-Real-Estate-Website-Design-Vertex) | **Phenomenon Labs** | for Phenomenon Studio |
| Art Course (`elearning`) | [E-learning Platform Landing Page](https://dribbble.com/shots/25605774-E-learning-Platform-Landing-Page) | **Ronas IT \| UI/UX Team** | — |
| EcoVolt (`solar`) | [Ecovolt – Solar Energy Landing Page](https://dribbble.com/shots/25062959-Ecovolt-Solar-Energy-Landing-Page) | **Irfanaffian** | for One Week Wonders |
| Numéro (`finance`) 🚩 provisional | [Finance Management Dashboard](https://dribbble.com/shots/23245345-Finance-Management-Dashboard) | **Bogdan Falin** | for QClay |
| HireLaw (`law`) | [HireLaw – Law Firm Landing Page](https://dribbble.com/shots/26248762-HireLaw-Law-Firm-Landing-Page) | **Odama** | — |
| MoveIQ (`fleet`) | [Logistics & Fleet Management Dashboard UI](https://dribbble.com/shots/26849863-Logistics-Fleet-Management-Dashboard-UI) | **Ronas IT \| UI/UX Team** | — |
| ARCHE (`saas`) | [SaaS Dashboard](https://dribbble.com/shots/26666273-SaaS-Dashboard) | **Juice Lab** | UI/UX Development Agency |
| Metric (`metrics`) | [Dark Dashboard UI — SaaS Startup Metrics & Analytics Panel](https://dribbble.com/shots/27207977-Dark-Dashboard-UI-SaaS-Startup-Metrics-Analytics-Panel) | **Igor Zeru** | — |

**Secondary reference:** Blockio's motion study used a second shot —
[Blockio landing page interaction](https://dribbble.com/shots/25757294-Blockio-landing-page-interaction),
same designer/studio.

**⚠️ Known slug trap:** `/shots/25111403-Ecovolt-…` now resolves to an unrelated skincare
shot. The correct EcoVolt source is ID `25062959`, above.

### Original designs — ours, only the rule set is studied from these

| Reference | Design language studied from | Designer / studio |
|---|---|---|
| LUMA (`assistant`) 🚧 WIP | [Geovea AI Assistant — Travel Web Dashboard](https://dribbble.com/shots/25501591-Geovea-AI-Assistant-Travel-Web-Dashboard) | **Jack R.**, for RonDesignLab ⭐️ |
| TENON (`atelier`) | [unanim.studio](https://unanim.studio) (a live site, not a Dribbble shot) | **unanim.studio**, Braine-l'Alleud, Belgium |

Content, copy, layout and imagery for both are invented — only the rule set is credited.
See §4.6–4.7 for how these are built (spec-first, blind build, deliberate divergence stated).

---

## 8. Upcoming — the open dashboard shortlist

From `CREDITS.md`, "Shortlist — dashboards ▶ ACTIVE". These are **candidates only** — none
built yet. Verify each link resolves to the claimed shot before starting (see the slug trap
above), and check `CREDITS.md` for anything added since this snapshot.

| Shot | Designer | Studio / team |
|---|---|---|
| [AI SaaS Dashboard – Dark Mode](https://dribbble.com/shots/25825708-AI-SaaS-Dashboard-Dark-Mode) | **Robert Licau** | — |
| [RIVA – AI Integrations Dashboard \| Dark SaaS UI](https://dribbble.com/shots/27285217-RIVA-AI-Integrations-Dashboard-Dark-SaaS-UI-Qudra) | **Md Forhad Alam** | for Qudra |
| [Fitness Dashboard UI Design \| Health Analytics Dashboard](https://dribbble.com/shots/27537811-Fitness-Dashboard-UI-Design-Health-Analytics-Dashboard) | **Abdullah Al Mamun ❂** | — |
| [AI-Powered Analytics Overview](https://dribbble.com/shots/27139230-AI-Powered-Analytics-Overview) | **Outcrowd** | — |
| [Rinesk — Call Centre Dashboard Concept](https://dribbble.com/shots/26662554-Rinesk-Call-centre-Dashboard-Concept) | **Anastasiia Cherniak** | — |
| [Charts Mega UI Kit — Dashboard UI](https://me.muz.li/vladyslavtyzun/charts-mega-ui-kit-dashboard-ui-2) *(Muzli, not Dribbble)* | **Vlad Tyzun** | — |
| [Modern Finance Management Dashboard \| Financia](https://me.muz.li/orbix-studio/modern-finance-management-dashboard-financia) *(Muzli, not Dribbble)* | **Orbix Studio** | — |

**Permanently rejected — do not reconsider:**
[ShiftPulse — Healthcare Workforce Scheduling](https://dribbble.com/shots/27578135-Healthcare-Workforce-Scheduling-SaaS-Dashboard-ShiftPulse)
(Noryn). Shown on an *angled* laptop mockup; perspective corrupts every proportion and
radius, so no rule set can be extracted. See §4.3's keystone check — this is the shot that
rule exists to catch.

**Also reviewed during curation, not shortlisted** (kept as a record so this ground isn't
re-covered — mostly landing pages, lower priority than the dashboard gap the shortlist
above targets): Blockchain Wallet Landing Page, Crypto App Landing Page, Crypto Landing
Page, Horizon Homes Real Estate Web App, Travel App Landing Page, Digital Banking Landing
Page, Delivery Web App Design, Fintech Web App Design, Dental Clinic Website, Mission
responsive landing page, KASHFLOW. Full links in `CREDITS.md` §"Also reviewed during
curation".

**Note:** Geovea (Jack R. / RonDesignLab) was on this shortlist and has since been used for
LUMA (§7) — it is no longer an open candidate, it's built.

---

## 9. Where to look for more

- `app/designs/CREDITS.md` — every source, verified byline, the rejected/shortlisted shots,
  and the reasoning for each. Read before picking a new source to build.
- `WEEK-PROGRESS-2026-08-*.md` (three so far) — a running, dated narrative of decisions and
  corrections, more detailed than this file. Good for "why is it like this" questions this
  file doesn't answer.
- `PLAN-atelier-reference.md` — the original plan for TENON; a template for how to plan a
  from-scratch original reference if you build another one.
- Any individual `*.design-language.md` — read 2–3 of the more recent ones (`atelier`,
  `saas`, `assistant`) before writing a new one; they show the current expected shape and
  level of rigor better than this file's summary of it.

---

## 10. Addendum - 15 Sep 2026 (TASK KIT lands; library fully guarded)

**15 references** now registered in data.js -> REFERENCES: the 13 desktop-era entries plus the
library's first two MOBILE references, both task-management apps that answer the same questions
differently (their specs cross-reference each other's contested dimensions; do not blend them):

| id | Name | Shot | Status |
|---|---|---|---|
| `sara` | SARA | 26300878 | built 15 Sep 2026, byline pending (see CREDITS.md shortlist note) |
| `taskkit` | Task Kit | 27043819 | built 15 Sep 2026, **byline unverified** (`flag` set; WAF blocked scripted fetch and no secondary post found) - id/name are **provisional**; confirm the byline, then rename + re-credit |

- **Conformance now covers ALL 15** (
ode tools/conformance.js - all green as of this addendum).
  The SARA and TASK KIT blocks introduced the mobile-specific checks: `columns`, `touchTargets`,
  `mountDiscipline`. TASK KIT's tap-target floor is 36px, not SARA's 42px - its source's header
  circles genuinely measure ~38px build; recorded in the spec, not silently fixed.
- TASK KIT's spec (`taskkit.design-language.md`) documents its scan controls honestly: lighting
  flat on true-bg samples; keystone = rigid ~4.4 in-plane rotation (identical L/R edge slopes),
  i.e. NOT perspective - proportions trustworthy. SARA's still was axis-aligned; TASK KIT's is not,
  and the difference is noted so nobody "unifies" the two control write-ups.
- The payload-conformance tally in section 6 above predates SARA/TASK KIT (says 12 references) -
  section 6 is a dated snapshot (28 Aug); read this addendum as the newer state.
