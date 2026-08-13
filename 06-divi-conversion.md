# 06 · Divi conversion (hand off to `divi5-native-convert`)

Port the static build to **WordPress + Divi 5** as **native, client-editable
modules** via portability JSON, backed by a child theme that carries the design
system, reconcile CSS, motion, and assets. This phase is a thin wrapper: it feeds
the **`divi5-native-convert`** skill the inputs it needs and points at its own
references.

**Hand-off**
- **In:** the static build from **05** (the single source of truth) + the
  **stays-as-Code** sections flagged in **02**.
- **Out:** validated Divi 5 portability JSON per page + the rebuilt
  `ggis-divi-child` theme zip (design system + reconcile CSS + motion + assets).
- **Next:** **07** verifies the live import (the skill's own `verify.md` loop);
  **08** ships the theme zip.

**Skill hand-off** — invoke **`divi5-native-convert`**. Its
`references/prompt-template.md` has the canonical invocation; the block below
mirrors it for the GreenGarden build so the whole library reads consistently.

---

## Fill-in template

```
Use the divi5-native-convert skill to convert {website/index.html — the whole
page, or "just the <section class='ggis-…'>"} into Divi 5 NATIVE, client-editable
modules.

Context it needs:
- Target: {a new WP page (Home) | page id 108 | Theme Builder Global Header/Footer}.
- Design system: classes + stylesheet in {assets/css/ggis.css}; keep the {ggis-}*
  classes on every module — they carry the layout (Divi strips Layout Style on import).
- Child theme: {website/divi/ggis-divi-child} (folder holding style.css). Fold all
  reconcile CSS into {css/ggis-divi.css} and repackage the zip when done.
- Asset URLs: bake {uploads = https://…/wp-content/uploads/2026/08/} for content
  images, {theme = https://…/wp-content/themes/ggis-divi-child/img/} for bundled assets.
- Keep as Code (not native): {the consultation form, the map iframe, the pinned
  showcase}. Everything else native + editable.
- Verify: after I import, inspect it live at {https://greengarden.kesatria.my/?page_id=…}
  with the verify.md probes; fold any spacing/grid/z-index nudges into the theme.

Deliverables: the validated portability JSON + the rebuilt child-theme zip.
Generate the JSON with a re-runnable PowerShell script (don't hand-edit it), and
validate every block config parses before handing it over.
```

## Filled example — GreenGarden

```
Use the divi5-native-convert skill to convert website/index.html into Divi 5
native, client-editable modules.

- Target: new WP page (Home).
- Design system: assets/css/ggis.css; keep the ggis-* classes on every module.
- Child theme: website/divi/ggis-divi-child; reconcile goes in css/ggis-divi.css,
  then rebuild ggis-divi-child.zip.
- Asset URLs: uploads = https://greengarden.kesatria.my/wp-content/uploads/2026/08/,
  theme = https://greengarden.kesatria.my/wp-content/themes/ggis-divi-child/img/
- Keep as Code: the consultation form + the pinned showcase. Everything else native.
- Verify live at https://greengarden.kesatria.my/?page_id=108 after I import.
```

## Quick variants

**Single section** (insert via the Divi Library — a page Portability import replaces
the whole page):
```
Use divi5-native-convert to rebuild just the {ggis-cta} section of the home page as
a native section I can import via the Divi Library and insert on {target page}.
Keep {the form} as Code; reconcile in css/ggis-divi.css.
```

**Global header / footer** (Theme Builder body, id "1"):
```
Use divi5-native-convert to convert the Global {Footer} to native modules.
Keep {forms/maps} as Code. Import target is the Theme Builder {Footer} body.
```

## Do's

- **DO** invoke the skill and feed it the intake — scope, target, stays-as-Code,
  verify URL; it asks these as options if you omit them.
- **DO** generate the JSON from the **05** build with a re-runnable script; never
  hand-author or hand-edit the exported JSON.
- **DO** keep the whole design system in the child theme (`site.css` +
  `reconcile.css` + `motion.js`) laid over Divi's defaults; carry layout via the
  `ggis-` classes.
- **DO** preview the reconcile CSS live and get sign-off **before** repackaging the
  zip; expect several verify/tune passes per page.

## Don'ts

- **DON'T** bake `display:flex/grid` into the JSON expecting it to stick — import
  strips Layout Style; the reconcile CSS restores it.
- **DON'T** put forms/maps in Text modules (kses strips them), paste reconcile CSS
  into a Divi field (truncates ~3–4KB), or zip the theme with `Compress-Archive`
  (backslash entries → WP "missing style.css").
- **DON'T** import a single section via page Portability — it **replaces the whole
  page**; use the Divi Library.
- **DON'T** let the static build and the port drift — change the **05** source and
  re-generate.
