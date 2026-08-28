# LUMA — AI Learning Assistant

**Design mood:** soft-light workspace · generously rounded · chartreuse marks what is live · conversation left, artifact right

| | |
|---|---|
| **Source** | **ORIGINAL DESIGN.** Content, copy and domain are ours. The *design language* was extracted from [Geovea AI Assistant — Travel Web Dashboard](https://dribbble.com/shots/25501591-Geovea-AI-Assistant-Travel-Web-Dashboard) by **Jack R.**, for RonDesignLab — see [credits](CREDITS.md) |
| **Recreation** | [`assistant.html`](assistant.html) — light (native) + dark |
| **Format** | read from the shot's still. **Magnitudes are `inferred`, not pixel-measured** — the file was not available to scan |
| **Palette** | sampled by eye from the still; see the caveat below |

> ⚠️ **The grey field around the app is PRESENTATION, not design.** It carries a radial vignette — darker toward the corners — and the shell has rounded corners on all four sides with a drop shadow. Real app canvases have neither. **Discard it.** This is the exact trap that produced a "floating app shell" for Numéro out of a Dribbble grey mat.
>
> What *is* design is the shell's interior: a **light-grey canvas with white panels lifting off it**.

> ⚠️ **Magnitudes here are `inferred`.** ARCHE's numbers were pixel-scanned from a file on disk, and that measurement overturned two confident visual readings (radius and bar shape). Nothing here has had that treatment. **Treat every px value as a starting ratio, not a measurement**, and re-measure if the still becomes available.

---

## How to read this

| Tier | Meaning |
|---|---|
| 🔒 **FIXED** | Structural. Non-negotiable. |
| 🎚 **FLEXIBLE** | Tune freely. Magnitudes, not models. |
| 🎨 **SWAPPABLE** | Brand identity. Changes per client. |

Rules are tagged **`observed`** (read from the still), **`inferred`**, or **`authored`** (our decision for this assistant).

---

# Core dimensions

## 0 · Signature 🔒 `observed` — **a workspace, not a page**

Two things define it.

**Everything floats.** There is no full-height sidebar and no header band. The icon rail, the tab strip and the two content panels are all **separate rounded objects** sitting on a shared canvas with the canvas visible between them on every side. Nothing is welded to an edge.

**Generously rounded, on a radius LADDER.** Radius scales with the size of the thing:

| Element | radius 🎚 |
|---|---|
| panels | ~24px |
| the visualisation canvas | ~18px |
| media and inset maps | ~14px |
| small icon buttons | ~10–14px |
| pills, avatars, mic, send | fully round |

> 📐 **Corrected during the build.** This section first claimed "two scales only — panels, then pills and circles, no small radius anywhere." That was wrong, and the build caught it: the canvas, the media and the small icon wells all need intermediate values, and re-reading the source, it has them. **Nothing here is square, and nothing is sharply rounded** — that is the actual rule. Do not flatten it into two states.

> This is the second time in this library a rule was over-generalised into an absolute (the first: Metric's "panels recede… a genuine constant", which ARCHE disproved). The lesson holds: state the ladder, not the binary.

## 1 · Tone system 🔒 `observed` — **panels lift off a soft canvas**

| Token | Value 🎚 | Job |
|---|---|---|
| canvas | `#EFEFEF` | the workspace, visible between every floating object |
| panel | `#FFFFFF` | every floating surface |
| ink | `#1A1A1A` | headings, values, and the dark action buttons |
| muted | `#8C8C8C` | secondary text, map landmass, inactive tabs |
| accent | `#D8F32B` 🎨 | see §2 |

**Panels LIFT** — white on light grey, the same relationship ARCHE has. Two designs now share it, so the library's old "panels recede" claim is doubly dead.

**The ink tone does double duty**: it is the text colour *and* the fill of every primary action (mic, send, active nav, the transit pill). There is no separate "button colour."

## 2 · The accent rule 🔑 🔒 `observed` — **chartreuse marks what is LIVE**

The accent does not mean "primary" and it does not mean "brand." It marks **the thing currently under discussion or currently happening**:

| Where | What it marks |
|---|---|
| regions on the concept map | the topics this session is about |
| the waveform | the microphone is listening *right now* |
| the ring around the assistant avatar | the assistant is the active speaker |
| the active tab's leading glyph | the session you are in |

**It is never used on a button.** Every actionable control is ink-filled or a hairline ghost. That is why the accent reads as *state* rather than *affordance* — the moment you put it on a button, it becomes a call to action and the whole signal collapses.

## 3 · Layout 🔒 `observed` — **conversation left, artifact right**

Roughly **60 / 40**. The left panel is where you talk; the right panel is what the assistant produced. The split never inverts and the right panel is never a modal — the artifact is *persistent*, sitting beside the conversation that made it.

**The left panel is itself split**: a **canvas region** on top (the visualisation, with a floating toolbar over it), and the **conversation** beneath — greeting, voice waveform, input.

## 4 · Component anatomy 🔒 `observed`

> The dimension that decides whether this reads as the same product.

**THE ICON RAIL IS TWO FLOATING CLUSTERS, NOT A SIDEBAR.**
A narrow column of icons split into **two separately rounded containers** — navigation at the top, the user group (notifications, avatar) lower down — with canvas showing between them. It does not run the full height, has no background of its own spanning the column, and never touches the top or bottom edge. Rendering it as a continuous sidebar is the most likely failure.

**THE TAB STRIP IS A ROW OF SESSIONS, AND THE ACTIVE ONE CARRIES A GLYPH.**
Session name with an accent glyph, then `+ New Session`, then `History` with a clock. Tabs are *chat sessions*, not page navigation — page navigation lives in the rail.

**THE VISUALISATION CARRIES A FLOATING TOOLBAR AND A DARK ANNOTATION PILL.**
A cluster of small ghost icon-buttons floats over the canvas at the top-left, with a refresh and a close at the top-right. Somewhere over the visualisation sits a **dark pill carrying one fact** (the original: `Time in transit` · `15h`). The pill floats over the artwork, is never docked to an edge, and states a single measured quantity.

**THE CONNECTOR IS A DASHED PATH BETWEEN TWO ACCENT REGIONS.**
Two highlighted areas joined by a dashed line, with the annotation pill sitting on that line. It is what turns a static picture into a *relationship*.

**THE VOICE ROW IS A SYMMETRIC WAVEFORM WITH A PILL AT ITS CENTRE.**
Accent-coloured bars mirrored around the horizontal axis, densest at the edges, with a small white pill label floating at the middle (`Listen to You…`). A large ink-filled circular mic button sits centred *below* it — not inside the input.

**THE INPUT IS A PILL: ATTACH LEFT, INK-FILLED CIRCULAR SEND RIGHT.**
Full-width, hairline border, placeholder written as a real sentence in the user's voice.

**THE ARTIFACT PANEL LEADS WITH A TITLE AND A UNIT-OVER-VALUE METRIC.**
Title left; top-right a **small unit label sitting above a large number** (the original: `miles` over `392`). Then image → description → a count heading (`4 modules`) → a controls row → a second visualisation.

**PROGRESS IS A GLASS TOAST OVERLAID ON THE CONTENT, NOT A BAR.**
A blurred translucent strip near the panel's lower edge carrying a label, a large percentage, and a dismiss `×`. It sits *over* the artwork it is generating rather than replacing it, so the result is visibly forming underneath.

## 5 · Iconography 🔒 `observed`
**Lucide**, hairline weight, in ghost circular or rounded-square wells. Icons are never accent-coloured.

## 6 · Elevation 🔒 `observed`
**Soft and real** — the first design in this library to use shadow. Panels carry a wide, very low-opacity shadow that reads as *lift*, not as a card border. **11/12 across the library are flat**, so this is the exception that proves it was worth tracking as an axis.

## 7 · Typography 🔒 rules · 🎨 face `inferred`
Geometric sans throughout. The greeting is the largest type on the page and **mixes weights mid-sentence** — regular for the frame, bold for the words that matter — so a single sentence carries its own emphasis. 🎨 **Poppins** or similar geometric face.

## 8 · Theme 🔒 both required
**Light-native**; dark is a token re-skin. The rule that must survive the flip: **panels still lift** (a lighter panel on a darker canvas), and the accent stays chartreuse — it is legible on both.

---

# Motion brief 🔒 grammar · 🎚 magnitude — GSAP · ScrollTrigger · Lenis · Motion

**The waveform is alive.** Its bars animate continuously while listening — this is the one piece of perpetual motion in the design, and it is what signals that the assistant is a *live* participant rather than a form.

- **Entry:** rail clusters, then tabs, then the left panel, then the right — each fading and rising ~10px on a short stagger.
- **The dashed connector DRAWS** between the two accent regions, and the annotation pill lands after it arrives.
- **The progress toast counts up** and its glass blur fades in; on dismiss it slides down and out.
- **The assistant's greeting types or fades in word-by-word**, never all at once — it should feel authored in the moment.
- Motion handles press-springs on the mic, send and every rail icon. Lenis tuned **short (~0.7s)** — this is a workspace to scan.

### ⚠️ Implementation traps

1. **`gsap.from({opacity:0})` against a CSS pre-hide is a no-op** — use **`fromTo()`** with explicit end values, and animate every pre-hidden selector back.
2. **A perpetual waveform must not be a GSAP timeline per bar.** Dozens of infinitely repeating tweens will not stay in phase and will burn frames. Drive it from **one** timeline with a stagger, or from CSS.
3. **`backdrop-filter` on the glass toast needs a non-transparent backdrop beneath it**, or it blurs nothing and reads as flat translucency.
4. **Do not use `gsap.fromTo()` in the microtask after a View Transition** — the from-state applies immediately and the tween can land on an idle ticker, stranding the element invisible. Use Motion/WAAPI and clear inline styles first.
5. **`clearProps:"transform"` when a timeline completes** — a leftover transform creates a stacking context that traps the floating toolbar and the glass toast beneath their own panel.

---

## Prompt payload

```text
LAYOUT LANGUAGE (non-negotiable):
- AN AI ASSISTANT WORKSPACE, light-native. Order: a floating icon rail on the far left, a row of
  session tabs across the top, then a two-column split — CONVERSATION LEFT (~60%), ARTIFACT RIGHT
  (~40%).
- ⚠️ EVERYTHING FLOATS. There is NO full-height sidebar and NO header band. The rail, the tab strip
  and both panels are SEPARATE ROUNDED OBJECTS on a shared canvas, with canvas visible between them
  on every side. Nothing is welded to a viewport edge.
- ⚠️ IF YOU ARE WORKING FROM A SHOT, THE GREY FIELD AROUND THE APP IS PRESENTATION, NOT DESIGN —
  it carries a vignette and the shell is rounded on all four sides with a shadow. Discard it. The
  design is the shell's interior.
- GENEROUSLY ROUNDED ON A RADIUS LADDER, scaled to the size of the thing: panels ~24px, the
  visualisation canvas ~18px, media and inset maps ~14px, small icon buttons ~10-14px, and pills /
  avatars / mic / send fully round. NOTHING IS SQUARE AND NOTHING IS SHARPLY ROUNDED. Do not
  collapse this into two states — the ladder is the rule.
- TONE: canvas #EFEFEF, panel #FFFFFF, ink #1A1A1A, muted #8C8C8C.
  ⚠️ PANELS LIFT — the panel is LIGHTER than the canvas, not darker.
  THE INK TONE DOES DOUBLE DUTY: it is the text colour AND the fill of every primary action (mic,
  send, active nav, the annotation pill). There is no separate button colour.
- ⚠️ THE ACCENT (a vivid chartreuse, ~#D8F32B) MARKS WHAT IS LIVE — not what is primary, and not
  the brand. It colours: the regions of the visualisation this session is about, the waveform while
  the mic is listening, the ring around the assistant's avatar, and the active tab's glyph.
  IT IS NEVER USED ON A BUTTON. Every control is ink-filled or a hairline ghost. Put the accent on
  a button and it becomes a call-to-action, and the whole live/idle signal collapses.
- COMPONENT ANATOMY — get these wrong and it reads as a different product:
  · THE ICON RAIL IS **TWO FLOATING CLUSTERS, NOT A SIDEBAR**: navigation in one rounded container
    near the top, the user group (notifications, avatar) in a second lower down, canvas showing
    between them. It does NOT run full height and never touches the top or bottom edge. Rendering
    it as a continuous sidebar is the most likely failure.
  · THE TABS ARE CHAT SESSIONS, NOT PAGE NAVIGATION — session name with an accent glyph, then
    "+ New Session", then "History". Page navigation lives in the rail.
  · THE VISUALISATION CARRIES A FLOATING GHOST TOOLBAR (small icon buttons top-left, refresh and
    close top-right) AND A DARK ANNOTATION PILL stating ONE measured fact, floating over the
    artwork rather than docked to an edge.
  · TWO ACCENT REGIONS ARE JOINED BY A DASHED CONNECTOR, with the annotation pill sitting on that
    line. The connector is what turns a static picture into a relationship.
  · THE VOICE ROW IS A SYMMETRIC WAVEFORM — accent bars mirrored about the horizontal axis, densest
    at the edges — WITH A SMALL WHITE PILL LABEL FLOATING AT ITS CENTRE. A large INK-FILLED
    CIRCULAR MIC sits centred BELOW it, not inside the input.
  · THE INPUT IS A PILL: attach icon left, INK-FILLED CIRCULAR SEND right, placeholder written as a
    real sentence in the user's own voice.
  · THE ARTIFACT PANEL LEADS WITH TITLE LEFT AND A UNIT-OVER-VALUE METRIC TOP-RIGHT — a small unit
    label ABOVE a large number. Then image, description, a count heading, a controls row, a second
    visualisation.
  · PROGRESS IS A GLASS TOAST OVERLAID ON THE CONTENT, NOT A BAR: a blurred translucent strip near
    the panel's lower edge with a label, a large percentage and a dismiss X. It sits OVER the
    artwork it is generating, so the result is visibly forming underneath.
- ICONS: LUCIDE at hairline weight, in ghost circular or rounded-square wells. NEVER accent-coloured.
- ELEVATION: soft and real — a wide, very low-opacity shadow that reads as LIFT, not as a card
  border. This design is the exception; do not add hard borders to compensate.
- TYPOGRAPHY: geometric sans. THE GREETING IS THE LARGEST TYPE ON THE PAGE AND MIXES WEIGHTS
  MID-SENTENCE — regular for the frame, bold for the words that matter — so one sentence carries
  its own emphasis. Use Poppins or a similar geometric face.
- SHIP BOTH THEMES. Light is native; dark is a token re-skin. THE RULE THAT MUST SURVIVE THE FLIP
  IS "PANELS LIFT" — a lighter panel on a darker canvas. The accent stays chartreuse; it is legible
  on both.

MOTION:
- ⚠️ THE WAVEFORM IS ALIVE. Its bars animate continuously while listening. This is the ONE piece of
  perpetual motion in the design and it is what signals the assistant is a live participant rather
  than a form. Do not render it static.
- Entry: rail clusters, then tabs, then the left panel, then the right — fading and rising ~10px on
  a short stagger.
- THE DASHED CONNECTOR DRAWS between the two accent regions, and the annotation pill lands after it
  arrives.
- The progress toast counts up and its blur fades in; on dismiss it slides down and out.
- THE ASSISTANT'S GREETING ARRIVES WORD BY WORD, never all at once — it should read as authored in
  the moment.
- Motion handles press-springs on the mic, send and rail icons. Lenis tuned SHORT (~0.7s).
- Use GSAP + ScrollTrigger + Lenis + Motion. Never hand-roll CSS transitions.
- ⚠️ A PERPETUAL WAVEFORM MUST NOT BE ONE INFINITE TWEEN PER BAR — dozens of repeating tweens drift
  out of phase and burn frames. Drive it from ONE timeline with a stagger, or from CSS.
- backdrop-filter on the glass toast needs a non-transparent backdrop beneath it, or it blurs
  nothing and reads as flat translucency.
- gsap.from({opacity:0}) against a CSS pre-hide is a NO-OP — use fromTo() with explicit end values,
  animate every pre-hidden selector back, and clearProps:"transform" on complete or a leftover
  transform traps the floating toolbar and glass toast beneath their own panel.
```
