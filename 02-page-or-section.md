# 02 · Page or section — compose from the grammar

Given the settled charter, compose a specific page (or one section): the section
order, each section's job, its layout at every breakpoint, its copy slots, its
imagery slots, and its motion beat. The output is a **build-ready spec** — a
wireframe in prose — not code.

**Hand-off**
- **In:** the charter (**01**) + copy (**03**) + imagery direction (**04**).
- **Out:** a section-by-section spec: order, layout at desktop/tablet/mobile,
  copy/imagery slots, motion beats — and a flag on any section that will **stay as
  Code** at the Divi port (forms, maps/iframes, pinned/scrubbed motion).
- **Next:** **05** builds it as class-driven HTML/CSS/GSAP.

**When to use** — once per page (or per new section). Compose *only* from the
grammar named in **01**; a page the charter can't express is a signal to revise
01, not to bolt ad-hoc CSS onto 05.

---

## Fill-in template

```
Compose the {home} page for {Company} from the settled charter
(design-guidelines/design-system.json) — layout + content plan only, no build yet.

Use only the grammar we named in 01 (sections, tokens, {ggis-} classes). For each
section give: its job, the layout (grid/columns at desktop / tablet / mobile), the
copy slots (from 03), the imagery slots (art direction from 04), and the motion
beat (from the charter).

Sections, in order:
1. {Hero} — {job}; {full-bleed image / split}; headline + sub + {1} CTA; {parallax}.
2. {Intro} — {job}; {measure-limited paragraph}; {reveal fade-up}.
3. {Services grid} — {3-up → 1-up}; {card grammar}; {staggered reveal}.
4. {Showcase} — {job}; {STAYS AS CODE — pinned scroll}.
5. …

Constraints: container max {1800px}; section rhythm from the charter; one primary
CTA per screen; every animated element keeps the {ggis-reveal} class.

Deliver: a section-by-section spec (a wireframe in prose) ready for 05 to build.
Mark which sections stay as Code at 06.
```

## Filled example — GreenGarden home

```
Compose the home page for GreenGarden Integrated Services from the settled charter
(design-guidelines/design-system.json) — layout + content plan only, no build yet.

Sections, in order:
1. Hero — set the tone; full-bleed evergreen garden photo (graded per 04);
   headline + one-line promise + one CTA ("Request a consultation"); slow parallax
   on the image, headline reveals word-by-word. Desktop full-viewport; mobile 80vh.
2. Intro — position the firm in one 66ch paragraph; ggis-reveal fade-up.
3. Services grid — 3-up desktop / 1-up mobile: Design, Build, Maintain; each an
   image card + title + one line; staggered reveal (80ms step).
4. Showcase — pinned horizontal scroll of 4 signature projects. STAYS AS CODE (06).
5. Proof — client logos + one testimonial; quiet fade-in.
6. CTA band — evergreen block, headline + consultation form. Form STAYS AS CODE (06).
7. Footer — sitemap, contact, socials (native modules later).

Constraints: container 1800px; section rhythm 128px desktop; one primary CTA per
screen; ggis-reveal on every animated element.

Deliver: section-by-section spec ready for 05. Code-only: showcase + form.
```

## Do's

- **DO** compose only from the grammar named in **01** — a brand-new one-off
  component means the charter was incomplete; fix 01.
- **DO** specify layout at **all three** breakpoints per section — "responsive" is
  *decided* here, not discovered in QA.
- **DO** mark the **stays-as-Code** sections now (forms, maps/iframes,
  pinned/scrubbed motion) — 06 needs them flagged; a Text module kses-strips
  forms and iframes.
- **DO** keep **one** primary CTA per screen and pull real copy from **03** — no lorem.
- **DO** keep the `ggis-reveal` trigger on every element you want animated —
  decomposed Divi columns that drop it won't animate after the port.

## Don'ts

- **DON'T** over-section — a sophisticated home is ~6–8 sections with room to
  breathe, not a kitchen sink.
- **DON'T** inline pixel values that duplicate tokens — reference the charter's
  space/type steps by name.
- **DON'T** decide imagery beyond slots + intent here — **04** owns sourcing and
  grading; **03** owns the words.
- **DON'T** design a screen with two competing CTAs — one primary action, the rest
  secondary.
