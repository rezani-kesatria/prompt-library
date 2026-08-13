# 01 · Design system — the settled charter

Turn the kickoff *direction* into a fixed, named **charter**: colour, type, space,
grid, radius, shadow, and a motion contract — plus the class prefix every bespoke
class will carry. "Settled" is the operative word: once frozen, later phases *cite*
the charter, they don't renegotiate it.

**Hand-off**
- **In:** the kickoff brief (**00**) + the profile PDF + the current site.
- **Out:** `design-guidelines/design-system.json` (the tokens) + a one-page
  **grammar** note (the named sections/components) + the class prefix + the
  motion/reduced-motion contract.
- **Next:** **02** composes pages from the grammar; **05** implements the tokens
  as `assets/css/ggis.css`; **06**'s reconcile layer restores these same tokens
  over Divi's defaults.

**Skill hand-off** — invoke the **`ka-generate-design-guideline`** skill; it writes
`design-guidelines/design-system.json`. This phase adds the two things a token file
alone doesn't carry: the **class prefix** and the **motion contract**.

---

## Fill-in template

```
Establish the settled design charter for {Company} from the kickoff brief and
references, and save it to design-guidelines/design-system.json.

Use the ka-generate-design-guideline skill. Source: {the profile PDF + current
site + the kickoff Design Direction}. Vibe: {Luxury / Editorial / Minimal / Bold}.

Lock these as the charter (everything downstream obeys it):
- Colour: primary {#hex}, accent {#hex}, ink/paper neutrals, state colours.
- Type: {serif display} for headings, {sans} for body; a modular scale
  (ratio {1.25}) as fluid clamp()s; body measure {66ch}.
- Space & grid: {8px} base; container max {1800px}; gutters {32/24px};
  section rhythm ({96/128/160px}).
- Radius {4/12px}, one soft shadow token, {1px} hairline borders.
- Motion charter: durations/easings; the reveal-on-scroll pattern; smooth-scroll
  ({Lenis}); and a prefers-reduced-motion contract.
- Naming: a class prefix {ggis-} on every bespoke class — it carries the layout
  through the later Divi port (Divi strips baked Layout Style on import).

Deliver: design-system.json (tokens) + a one-page "grammar" note naming the
sections/components 02 will compose from.
```

## Filled example — GreenGarden

```
Establish the settled design charter for GreenGarden Integrated Services and save
it to design-guidelines/design-system.json.

Use the ka-generate-design-guideline skill. Source: the profile PDF + current site
+ the kickoff Design Direction. Vibe: Luxury (botanical, restrained).

Lock as the charter:
- Colour: primary evergreen #1B4332, accent sand #B9A16B, ink #14201A on paper
  #F6F4EE; success/error states.
- Type: Fraunces (serif display) for headings, Inter for body; scale ratio 1.25,
  fluid clamp()s (body 16→20); measure 66ch.
- Space & grid: 8px base; container max 1800px; 32px gutters (24 on mobile);
  section rhythm 96 / 128 / 160px.
- Radius 4/12px; one soft shadow; 1px hairline borders in ink @ 10%.
- Motion: 600ms / cubic-bezier(.22,1,.36,1); reveal-on-scroll = fade-up 24px;
  Lenis smooth-scroll; hero parallax — all gated behind
  prefers-reduced-motion: no-preference.
- Naming: ggis- prefix on every bespoke class.

Deliver: design-system.json + a grammar note listing the home-page sections —
hero, intro, services grid, showcase, proof, CTA band, footer.
```

## The "grammar" note — what 02 composes from

The JSON carries tokens; the grammar note carries the **named vocabulary**. Keep it
to one page:

- **Sections** the site is built from (hero, intro, grid, showcase, proof, CTA, footer).
- **Components** inside them (card, stat, quote, button variants).
- **The section rhythm** (which padding step each section uses).
- **The motion beats** available (reveal fade-up, stagger, parallax, pin).

02 may only compose from this list. If a page needs something that isn't here, the
charter was incomplete — revise **01**, don't improvise in **05**.

## Do's

- **DO** freeze the charter before composing pages — a token that changes after
  02/05 ripples through every file that cited it.
- **DO** choose the class prefix now (`ggis-`) — it carries all layout through the
  Divi port; Divi strips baked Layout Style on import, but the classes survive.
- **DO** make the reduced-motion contract part of the charter, not an afterthought
  — **07** verifies against it.
- **DO** express type and space as fluid tokens (`clamp()`) tied to the 1800px
  container, so the "ready for {year}" bar holds on ultra-wide screens.
- **DO** confirm the display serif can be **licensed and bundled** into the child
  theme (05/06) before committing to it.

## Don'ts

- **DON'T** let the palette sprawl — one primary, one accent, disciplined
  neutrals; more colours read as *less* sophisticated.
- **DON'T** invent component variants here — **name** the sections; 02 composes them.
- **DON'T** ship a prose-only style guide — without the JSON there's nothing for
  05 and 06 to enforce or diff against.
- **DON'T** pick tokens you can't reproduce in the reconcile CSS later — the same
  tokens must lie *over* Divi's defaults at 06.
