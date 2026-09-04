/* Prompt Library — prototype data
   Mood tiles render the real recreated page in an iframe, not a stand-in.
   Prompt templates are condensed from the real 00-08 markdown library. */

const VIBES = ["All", "Minimalist", "Simplicity", "Modern", "Playful", "Luxury", "Tech"];

/* Every mood in the library is a real recreation (see REFERENCES below).
   The six token stand-ins that used to sit here — Nocturne, Editorial,
   Botanical, Terminal, Aurora, Sorbet — were removed: they rendered the
   generic template/web.html rather than an actual page, so their tiles all
   looked alike and, having no spec, they carried no prompt payload. A mood
   that cannot inject a rule set is worse than no mood at all — it hands the
   agent a vibe and lets it drift. */
const MOODS = [];

/* ---------------------------------------------------------------------------
   REFERENCE MOODS — the nine curated recreations in app/designs/, and since
   the token stand-ins were dropped, the whole mood library.
   The tile and the Refine preview render the real page, and `spec` points at
   that page's design-language document, whose "Prompt payload" block is
   injected verbatim into the generated brief. The payload is read from the .md
   at runtime, so the spec file stays the single source of truth.
   Token fields below exist so the Refine panels and design-system.json still
   have something to work with — they mirror each page's :root.
--------------------------------------------------------------------------- */
const REFERENCES = [
  {
    id: "vita", name: "VITA", ref: true, vibes: ["Minimalist", "Modern"], mode: "both",
    nativeTheme: "dark",
    src: "designs/travel.html", spec: "designs/travel.design-language.md",
    credit: "Phenomenon Labs for Phenomenon Studio",
    source: "https://dribbble.com/shots/26907949-Web-Design-for-Travel-Landing-Page-VITA",
    kind: "Travel catalog", note: "border-divided · zero radius · no margins",
    bg: "#040A0C", surface: "#0E1B1E", ink: "#FEFEFE", primary: "#40A895", accent: "#E4B65C",
    fd: "'Hanken Grotesk', sans-serif", fb: "'Hanken Grotesk', sans-serif", type: "Hanken Grotesk",
    radius: "Sharp", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Subtle", density: "Compact"
  },
  {
    id: "blockio", name: "Blockio", ref: true, vibes: ["Tech", "Modern"], mode: "both",
    nativeTheme: "light",
    src: "designs/crypto.html", spec: "designs/crypto.design-language.md",
    credit: "Taras Migulko for Emote",
    source: "https://dribbble.com/shots/25580612-Blockio-web-page",
    kind: "Crypto product", note: "zero elevation · gutter grid · box particles",
    bg: "#FBFBFA", surface: "#FFFFFF", ink: "#0D0D0D", primary: "#FC4210", accent: "#DDC4AB",
    fd: "'Onest', sans-serif", fb: "'Onest', sans-serif", type: "Onest",
    radius: "Rounded", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Abstract",
    motion: "Subtle", density: "Balanced"
  },
  {
    id: "vertex", name: "Vertex", ref: true, vibes: ["Modern", "Luxury"], mode: "both",
    nativeTheme: "light",
    src: "designs/realestate.html", spec: "designs/realestate.design-language.md",
    credit: "Phenomenon Labs for Phenomenon Studio",
    source: "https://dribbble.com/shots/27357269-Real-Estate-Website-Design-Vertex",
    kind: "Real estate", note: "inverted-radius silhouette · tint-only separation",
    bg: "#FFFFFF", surface: "#F5F6F6", ink: "#1E0B09", primary: "#F0561F", accent: "#A9CBE3",
    fd: "'Archivo', sans-serif", fb: "'Archivo', sans-serif", type: "Archivo",
    radius: "Rounded", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Subtle", density: "Balanced"
  },
  {
    id: "artcourse", name: "Art Course", ref: true, vibes: ["Playful", "Simplicity"], mode: "both",
    nativeTheme: "light",
    src: "designs/elearning.html", spec: "designs/elearning.design-language.md",
    credit: "Ronas IT | UI/UX Team",
    source: "https://dribbble.com/shots/25605774-E-learning-Platform-Landing-Page",
    kind: "E-learning", note: "scattered artwork collage · bottom borders only",
    bg: "#F4EBE2", surface: "#FBF6F1", ink: "#17140F", primary: "#E24B3F", accent: "#E2A03F",
    fd: "'Schibsted Grotesk', sans-serif", fb: "'Schibsted Grotesk', sans-serif", type: "Schibsted Grotesk",
    radius: "Sharp", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Illustration",
    motion: "Subtle", density: "Airy"
  },
  {
    id: "ecovolt", name: "EcoVolt", ref: true, vibes: ["Minimalist", "Tech"], mode: "both",
    kind: "Solar energy", note: "two-tone headlines · full bleed · inset by padding",
    nativeTheme: "light",
    src: "designs/solar.html", spec: "designs/solar.design-language.md",
    credit: "Irfanaffian for One Week Wonders",
    source: "https://dribbble.com/shots/25062959-Ecovolt-Solar-Energy-Landing-Page",
    bg: "#FFFFFF", surface: "#F2F3F5", ink: "#0B0B0C", primary: "#2F5BFF", accent: "#B9BDC4",
    fd: "'Instrument Sans', sans-serif", fb: "'Instrument Sans', sans-serif", type: "Instrument Sans",
    radius: "Sharp", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Rich", density: "Airy"
  },
  {
    id: "numero", name: "Numéro", ref: true, vibes: ["Modern", "Tech"], mode: "both",
    kind: "Finance dashboard", note: "framed panels · tint ladder · charts that bleed",
    /* visually audited against the source on 4 Sep 2026 — see the spec header */
    nativeTheme: "light",
    src: "designs/finance.html", spec: "designs/finance.design-language.md",
    credit: "Bogdan Falin for QClay",
    source: "https://dribbble.com/shots/23245345-Finance-Management-Dashboard",
    bg: "#FFFFFF", surface: "#F8F8F8", ink: "#000000", primary: "#E16449", accent: "#B7B7B7",
    fd: "'Manrope', sans-serif", fb: "'Manrope', sans-serif", type: "Manrope",
    radius: "Rounded", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Abstract",
    motion: "Subtle", density: "Balanced"
  },
  {
    id: "hirelaw", name: "HireLaw", ref: true, vibes: ["Simplicity", "Luxury"], mode: "both",
    kind: "Law firm", note: "pastel cast · gutter labels · rounded rects, not pills",
    nativeTheme: "light",
    src: "designs/law.html", spec: "designs/law.design-language.md",
    credit: "Odama",
    source: "https://dribbble.com/shots/26248762-HireLaw-Law-Firm-Landing-Page",
    bg: "#F5F3ED", surface: "#E7E2D3", ink: "#3C3C3C", primary: "#B9B5ED", accent: "#F5B0AD",
    fd: "'Figtree', sans-serif", fb: "'Figtree', sans-serif", type: "Figtree",
    radius: "Subtle", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Subtle", density: "Airy"
  },
  {
    id: "moveiq", name: "MoveIQ", ref: true, vibes: ["Tech", "Modern"], mode: "both",
    kind: "Fleet workbench", note: "hairline tables · reserved status colour · counts on controls",
    nativeTheme: "light",
    src: "designs/fleet.html", spec: "designs/fleet.design-language.md",
    credit: "Ronas IT | UI/UX Team",
    source: "https://dribbble.com/shots/26849863-Logistics-Fleet-Management-Dashboard-UI",
    bg: "#FFFFFF", surface: "#F0F0F0", ink: "#0C0D0D", primary: "#D2D88F", accent: "#F37833",
    fd: "'Plus Jakarta Sans', sans-serif", fb: "'Plus Jakarta Sans', sans-serif", type: "Plus Jakarta Sans",
    radius: "Rounded", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Rich", density: "Compact"
  },
  {
    id: "metric", name: "Metric", ref: true, vibes: ["Tech", "Minimalist"], mode: "both",
    kind: "Analytics board", note: "zero radius · two tones, three jobs · good/bad deltas",
    nativeTheme: "dark",
    src: "designs/metrics.html", spec: "designs/metrics.design-language.md",
    credit: "Igor Zeru",
    source: "https://dribbble.com/shots/27207977-Dark-Dashboard-UI-SaaS-Startup-Metrics-Analytics-Panel",
    bg: "#1F1F1F", surface: "#171717", ink: "#F8F8F8", primary: "#09A55A", accent: "#C39E09",
    fd: "'DM Sans', sans-serif", fb: "'DM Sans', sans-serif", type: "DM Sans",
    radius: "Sharp", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Abstract",
    motion: "Rich", density: "Compact"
  },
  {
    id: "atelier", name: "TENON", ref: true, vibes: ["Luxury", "Minimalist"], mode: "dark",
    kind: "Craft atelier", note: "15px root · hue-only accent · crossing hairlines",
    nativeTheme: "dark",
    src: "designs/atelier.html", spec: "designs/atelier.design-language.md",
    /* the library's only ORIGINAL design — content and layout are ours, the
       design language was studied from unanim.studio */
    original: true,
    credit: "Original — design language studied from unanim.studio",
    source: "https://unanim.studio",
    bg: "#121212", surface: "#121212", ink: "#EFEFEB", primary: "#FBE9CB", accent: "#FBE9CB",
    fd: "'Instrument Serif', serif", fb: "'Instrument Sans', sans-serif", type: "Instrument Serif · Instrument Sans",
    radius: "Sharp", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Rich", density: "Airy"
  },
  {
    id: "arche", name: "ARCHE", ref: true, vibes: ["Tech", "Modern"], mode: "both",
    kind: "Commerce board", note: "zero radius · hatch as encoding · one accent per grouping",
    nativeTheme: "dark",
    src: "designs/saas.html", spec: "designs/saas.design-language.md",
    credit: "Juice Lab (UI/UX Development Agency)",
    source: "https://dribbble.com/shots/26666273-SaaS-Dashboard",
    bg: "#111111", surface: "#171717", ink: "#FEFEFE", primary: "#E83B13", accent: "#FEDE00",
    fd: "'Instrument Sans', sans-serif", fb: "'Instrument Sans', sans-serif", type: "Instrument Sans",
    radius: "Sharp", elevation: "Flat", gradient: "None", icon: "Line", imagery: "Abstract",
    motion: "Rich", density: "Compact"
  },
  {
    id: "luma", name: "LUMA", ref: true, vibes: ["Modern", "Playful"], mode: "both",
    kind: "AI assistant", note: "everything floats · chartreuse marks what is live",
    /* first pass — magnitudes inferred (source still never saved); audit under way */
    flag: "Work in progress",
    flagNote: "Magnitudes are inferred, not measured — the Geovea still was never saved to disk. Treat as an auditable sketch, not a finished spec.",
    nativeTheme: "light",
    src: "designs/assistant.html", spec: "designs/assistant.design-language.md",
    /* original design; only the rule set was studied */
    original: true,
    credit: "Original — design language studied from Geovea by Jack R., for RonDesignLab",
    source: "https://dribbble.com/shots/25501591-Geovea-AI-Assistant-Travel-Web-Dashboard",
    bg: "#EFEFEF", surface: "#FFFFFF", ink: "#1A1A1A", primary: "#1A1A1A", accent: "#D8F32B",
    fd: "'Poppins', sans-serif", fb: "'Poppins', sans-serif", type: "Poppins",
    radius: "Rounded", elevation: "Raised", gradient: "None", icon: "Line", imagery: "Photo",
    motion: "Rich", density: "Airy"
  }
];

/* references lead — they are real, the token moods are stand-ins */
MOODS.unshift.apply(MOODS, REFERENCES);

const TARGETS = [
  { id: "site", icon: "M4 4h16v4H4zM4 10h10v10H4zM16 10h4v10h-4z", label: "Company site", hint: "marketing / profile" },
  { id: "webapp", icon: "M3 4h18v14H3zM8 21h8", label: "Web app", hint: "dashboard / product" },
  { id: "mobile", icon: "M7 2h10v20H7zM11 18h2", label: "Mobile app", hint: "iOS / Android" },
  { id: "landing", icon: "M12 3v18M5 10l7-7 7 7", label: "Landing page", hint: "one-page launch" },
  { id: "portal", icon: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z", label: "Web portal", hint: "internal tools" },
  { id: "store", icon: "M6 2 3 6v14h18V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0", label: "E-commerce", hint: "shop / catalogue" }
];

/* condensed 00-08 web-design pipeline; {tokens} auto-parse into fill-in fields */
const WEB_PROMPTS = [
  {
    id: "kickoff", order: "00", title: "Kickoff brief", tags: ["kickoff", "brief"],
    purpose: "The one message that seeds the whole project.",
    template:
`Create a company-profile website mockup for {Company} — a {business type} that {what they do} for {who they serve}. They want something new and sophisticated that fits their brand.

Design direction: primary colour {brand colour}; a {serif/sans} typeface for the "{feeling}" brand; generous spacing; desktop max-width {max width}. Proper SEO copy that surfaces {brand values}. Incorporate {animation library} scroll animation. Make it ready for {2026}. Start with the {home} page.`,
    dos: ["Attach the real profile PDF", "Name one colour + one type feeling"],
    donts: ["Over-specify pixel layout", "Ask for every page at once"]
  },
  {
    id: "design-system", order: "01", title: "Design system", tags: ["tokens", "charter"],
    purpose: "Freeze the charter: tokens, type, motion.",
    template:
`Establish the settled design charter for {Company} and save it to design-guidelines/design-system.json.

Lock: primary {brand colour}, accent {accent colour}, {light/dark/both} theme; {display font} for headings, {body font} for body; {8px} base spacing; container max {max width}; radius + elevation scale; a motion charter with a reduced-motion contract. Prefix every bespoke class {class prefix}.`,
    dos: ["Freeze the charter before composing pages", "Decide light / dark / both now"],
    donts: ["Let the palette sprawl", "Ship a prose-only style guide"]
  },
  {
    id: "page", order: "02", title: "Page or section", tags: ["layout", "grammar"],
    purpose: "Compose a page from the grammar.",
    template:
`Compose the {home} page for {Company} from the settled charter — layout + content plan only.

For each section give its job, the layout at desktop/tablet/mobile, the copy slots, the imagery slots, and the motion beat. Sections: {section list}. One primary CTA per screen; keep the {reveal class} trigger on every animated element. Mark which sections stay as Code at the Divi port.`,
    dos: ["Specify layout at all three breakpoints", "Mark the stays-as-Code sections"],
    donts: ["Over-section the page", "Design what the charter can't express"]
  },
  {
    id: "content", order: "03", title: "Content & SEO", tags: ["copy", "seo"],
    purpose: "Brand-voice + SEO copywriting.",
    template:
`Write the {home}-page copy for {Company} in their brand voice, SEO-optimised.

Voice: {voice}; {UK/US} spelling; no hype words. Surface the values: {brand values}. SEO: primary keyword "{keyword}", one H1, descriptive H2s, meta title <=60, meta description <=155, location {location}. Deliver per the section slots + alt-text for every image.`,
    dos: ["Write to the exact slots + limits", "Give one H1 and real alt-text"],
    donts: ["Keyword-stuff", "Write past the slot"]
  },
  {
    id: "imagery", order: "04", title: "Imagery & art direction", tags: ["imagery", "grade"],
    purpose: "Sourcing + one-recipe grading.",
    template:
`Art-direct the imagery for the {home} page of {Company}.

Look: {imagery style}; grade {warm/cool} toward {brand colour}; consistent light. Source + grade per the slots: a hero (>=2400px, focal point {focal point}, WebP <= {weight}KB) plus card images at {ratio}. Apply one grade recipe uniformly so the set reads as one shoot.`,
    dos: ["Grade the whole set with one recipe", "Right-size + compress; modern formats"],
    donts: ["Ship un-graded stock", "Bake headline text into images"]
  },
  {
    id: "build", order: "05", title: "Build (static)", tags: ["gsap", "lenis", "html"],
    purpose: "Class-driven HTML/CSS/GSAP — the source of truth.",
    template:
`Build the {home} page for {Company} as a static, class-driven site — the single source of truth.

Semantic HTML; ONE stylesheet carrying all tokens + layout; every class prefixed {class prefix}. Motion in one file: {animation library} + {smooth-scroll library}; {reveal class} on animated elements; initial hidden states set in JS only under prefers-reduced-motion: no-preference. Container max {max width}; fluid clamp() type/space. Keep {code-only blocks} as isolated blocks.`,
    dos: ["Carry all layout in CSS classes", "Set hidden motion states in JS, reduced-motion-gated"],
    donts: ["Put forms/iframes inline in prose blocks", "Use utility-class soup for layout"]
  },
  {
    id: "divi", order: "06", title: "Divi conversion", tags: ["divi", "wordpress"],
    purpose: "Hand off to the divi5-native-convert skill.",
    template:
`Use the divi5-native-convert skill to convert {source page} into Divi 5 native, client-editable modules.

Target {WP target}; keep the {class prefix} classes on every module. Reconcile CSS goes in the child theme {theme}; bake asset URLs {uploads base}. Keep as Code: {code-only blocks}. Generate the JSON with a re-runnable script; validate every block config; verify live at {verify url}.`,
    dos: ["Generate JSON from the static build with a script", "Preview reconcile CSS live before repackaging"],
    donts: ["Bake display:flex/grid into the JSON", "Zip the theme with Compress-Archive"]
  },
  {
    id: "qa", order: "07", title: "Review & QA", tags: ["a11y", "responsive"],
    purpose: "Responsive / reduced-motion / a11y / live verify.",
    template:
`Run QA on the {home} page of {Company} at {verify url} and fix failures in source.

Responsive at {breakpoints}: no overflow, tap targets >= 44px. Reduced-motion: nothing stranded invisible. A11y: one H1, contrast >= 4.5:1 in {light/dark/both}, real alt-text, keyboard nav. Performance: LCP < 2.5s, CLS < 0.1. Verify the live import with the verify.md probes.`,
    dos: ["Fix in source, then re-verify", "Test reduced-motion as a first-class path"],
    donts: ["Declare responsive from one resize", "Wave through a11y criticals"]
  },
  {
    id: "deploy", order: "08", title: "Deploy", tags: ["pages", "cloudflare", "divi"],
    purpose: "GitHub Pages / Cloudflare / Divi theme zip.",
    template:
`Deploy the {Company} {home} page via {track}.

Static: publish to {host}, custom domain {domain}, enforce HTTPS. Divi: rebuild the child-theme zip with System.IO.Compression (forward-slash entries, version bump; never Compress-Archive), install via Replace-current-with-uploaded, import page JSON via Portability. Version assets by filemtime to bust the CDN. Verify the live production URL logged-out.`,
    dos: ["Zip with System.IO.Compression + forward slashes", "Verify live production after every deploy"],
    donts: ["Deploy before QA is green", "Hand-edit files on the server"]
  }
];

/* Mobile app pipeline (00-08) — same shape as web, mobile-native */
const MOBILE_PROMPTS = [
  {
    id: "m-concept", order: "00", title: "Concept brief", tags: ["concept", "brief"], shape: "kickoff",
    purpose: "Frame the app: who, what, why.",
    template:
`Design a mobile app concept for {App} — a {platform} app that helps {primary user} to {core job}. Positioning: {positioning}. Success looks like {key metric}.

List the top {3} user jobs and the primary navigation model ({tabs/stack}). Ready for {2026}.`,
    dos: ["Name one primary user + one core job", "State the platform conventions to honour"],
    donts: ["List every feature at once", "Skip the success metric"]
  },
  {
    id: "m-design", order: "01", title: "Design system", tags: ["tokens", "charter"], shape: "design-system",
    purpose: "Freeze mobile tokens + components.",
    template:
`Establish the mobile design charter for {App}. Type scale, spacing, {44px} touch targets, colour incl. {light/dark/both} theme, and core components (nav bar, cards, list rows, inputs, sheets).

Follow {iOS HIG / Material} conventions. Motion tokens with a reduced-motion contract.`,
    dos: ["Set 44px+ touch targets", "Decide light / dark / both now"],
    donts: ["Ignore platform conventions", "Invent components you will not ship"]
  },
  {
    id: "m-flows", order: "02", title: "Flows & screens", tags: ["flows", "ia"], shape: "flows",
    purpose: "Map the core journeys to a screen list.",
    template:
`Map the core user flows for {App}: {onboarding}, {core loop}, {settings}. For each, list the screens and the transitions.

Define the navigation model ({tabs}) and where state persists. Output a screen inventory ready to design.`,
    dos: ["Map flows before screens", "Name the navigation model"],
    donts: ["Design screens with no flow", "Bury the primary action"]
  },
  {
    id: "m-content", order: "03", title: "Content & microcopy", tags: ["copy", "ux"], shape: "content",
    purpose: "Onboarding, empty states, errors.",
    template:
`Write the microcopy for {App}: onboarding ({3} screens), empty states, error + permission-priming messages, and button labels.

Voice: {voice}. Short, human, action-first. Localise-ready — no baked text in images.`,
    dos: ["Write empty + error states early", "Prime permissions in context"],
    donts: ["Use dead-end empty states", "Bake copy into images"]
  },
  {
    id: "m-icons", order: "04", title: "Iconography & imagery", tags: ["icons", "art"], shape: "imagery",
    purpose: "Icon set, app icon, store art.",
    template:
`Art-direct the iconography + imagery for {App}. Icon style {line/solid/duotone} on a {24px} grid, consistent stroke.

Design the app icon ({adaptive}), the {illustration/photo} style, and store screenshots. One grade recipe across all imagery.`,
    dos: ["Keep one icon style + grid", "Design an adaptive app icon"],
    donts: ["Mix icon styles", "Ship low-res store art"]
  },
  {
    id: "m-build", order: "05", title: "Build (prototype)", tags: ["swiftui", "compose", "rn"], shape: "device",
    purpose: "Prototype in the target stack.",
    template:
`Build the {App} prototype in {SwiftUI / Compose / React Native / Flutter}. Real navigation, the {core loop} interactive, tokens from the charter.

Respect safe areas + dynamic type; gate motion behind prefers-reduced-motion. Deliver a runnable build of the {home + core} screens.`,
    dos: ["Use real navigation, not mockups", "Honour safe areas + dynamic type"],
    donts: ["Hardcode values off the charter", "Ship an inaccessible prototype"]
  },
  {
    id: "m-handoff", order: "06", title: "Dev handoff", tags: ["handoff", "spec"], shape: "build",
    purpose: "Specs, tokens, redlines.",
    template:
`Prepare the dev handoff for {App}: exported tokens ({JSON}), component specs, redlines, and every state (loading / empty / error).

Note platform behaviours ({haptics, gestures}) and the accessibility requirements. Package for {the dev team}.`,
    dos: ["Hand off tokens + every state", "Note gestures + haptics"],
    donts: ["Redline only the happy path", "Omit accessibility notes"]
  },
  {
    id: "m-qa", order: "07", title: "Review & QA", tags: ["a11y", "qa"], shape: "qa",
    purpose: "Usability, a11y, platform review.",
    template:
`QA {App} on {devices}. Usability of the {core loop}; accessibility (dynamic type, {VoiceOver/TalkBack}, contrast, target size); reduced-motion; platform-guideline pass ({HIG/Material}); performance (cold start, jank).

Fix in source and re-verify.`,
    dos: ["Test with VoiceOver / TalkBack", "Check reduced-motion + dynamic type"],
    donts: ["QA one device only", "Skip cold-start performance"]
  },
  {
    id: "m-ship", order: "08", title: "Ship", tags: ["appstore", "play"], shape: "deploy",
    purpose: "Store submission + release.",
    template:
`Ship {App}: build + sign for {iOS/Android}, store listing (name, subtitle, {keywords}, screenshots), privacy labels, and a {TestFlight / internal} beta first.

Stage a phased rollout and a rollback plan. Verify the live store build.`,
    dos: ["Beta on TestFlight / internal first", "Prepare privacy labels"],
    donts: ["Full rollout with no beta", "Forget the rollback plan"]
  }
];

/* Animation cookbook — non-linear recipes, tagged by library */
const ANIM_RECIPES = [
  {
    id: "a-reveal", order: "01", title: "Scroll reveal", tags: ["gsap", "scrolltrigger"], shape: "layers",
    purpose: "Fade-and-rise elements as they enter.",
    template:
`Reveal {elements} on scroll with {animation library} + ScrollTrigger. From {opacity:0, y:24} to visible when the element hits {80%} of the viewport; stagger {0.08}s; ease {power3.out}.

Set the initial hidden state in JS only, inside a prefers-reduced-motion: no-preference branch. Kill triggers on unmount.`,
    dos: ["Set the hidden state in JS, reduced-motion-gated", "Batch with ScrollTrigger.batch"],
    donts: ["Hide with a bare opacity:0 class", "Leave triggers alive on unmount"]
  },
  {
    id: "a-stagger", order: "02", title: "Staggered grid", tags: ["gsap"], shape: "divi",
    purpose: "Cascade a list or grid in.",
    template:
`Animate {grid items} in with a {animation library} stagger. From {y:20, opacity:0}; stagger {each: 0.06} or {grid: [rows, cols]} for a 2D wave; ease {back.out(1.4)}.

Trigger on enter. Respect reduced-motion.`,
    dos: ["Use grid stagger for 2D waves", "Keep the total under about 0.5s"],
    donts: ["Stagger 50 items linearly", "Animate layout-shifting properties"]
  },
  {
    id: "a-pin", order: "03", title: "Pin & scrub", tags: ["gsap", "scrolltrigger"], shape: "build",
    purpose: "Pin a section and scrub on scroll.",
    template:
`Pin {section} with ScrollTrigger ({pin:true, scrub:1}) over {1.5x} the viewport, and drive {the animation} from scroll progress ({end: "+=100%"}).

Animate transforms only. Refresh on resize; provide a static reduced-motion fallback.`,
    dos: ["Animate transforms only", "Provide a static reduced-motion fallback"],
    donts: ["Pin without a scrub", "Scrub layout properties"]
  },
  {
    id: "a-parallax", order: "04", title: "Hero parallax", tags: ["gsap", "lenis"], shape: "layers",
    purpose: "Depth via layered scroll speeds.",
    template:
`Add parallax to {hero layers} with {animation library} + {smooth-scroll library}. Move {background} at {0.5x} and {foreground} at {1.1x} of scroll via yPercent tied to progress.

Clamp so layers never gap. Disable under reduced-motion.`,
    dos: ["Drive parallax from Lenis scroll", "Clamp so layers never gap"],
    donts: ["Parallax on mobile untested", "Use unoptimised images"]
  },
  {
    id: "a-transition", order: "05", title: "Page transition", tags: ["motion"], shape: "page",
    purpose: "Animate route enter / exit.",
    template:
`Animate route transitions with {transition tech}. On exit {fade + y:-12}; on enter {fade + y:12}; duration {0.4}s, ease {[0.22,1,0.36,1]}.

Match shared elements where possible. Preserve focus + scroll; honour reduced-motion.`,
    dos: ["Keep transitions under about 0.5s", "Preserve focus + scroll position"],
    donts: ["Block navigation on animation", "Animate through reduced-motion"]
  },
  {
    id: "a-marquee", order: "06", title: "Infinite marquee", tags: ["css", "gsap"], shape: "wave",
    purpose: "Seamless looping ticker.",
    template:
`Build a seamless marquee of {items}. Duplicate the track and translateX {-50%} on a {animation library} loop ({duration: 20, ease: none, repeat: -1}); pause on hover.

Use will-change: transform. Pause entirely under reduced-motion.`,
    dos: ["Duplicate the track for a seamless loop", "Pause on hover + reduced-motion"],
    donts: ["Loop with a visible jump", "Animate margin instead of transform"]
  },
  {
    id: "a-magnetic", order: "07", title: "Magnetic button", tags: ["gsap"], shape: "kickoff",
    purpose: "Cursor-attracted control.",
    template:
`Make {button} magnetic: on mousemove within {a 40px} radius, translate it toward the cursor by {0.3x} the offset with gsap.quickTo; reset on leave with {elastic.out}.

Nudge the label {0.15x}. Pointer-fine only; disable for touch + reduced-motion.`,
    dos: ["Use quickTo for a smooth follow", "Gate to pointer:fine devices"],
    donts: ["Apply on touch devices", "Move layout, not transforms"]
  },
  {
    id: "a-draw", order: "08", title: "SVG draw-on", tags: ["gsap"], shape: "content",
    purpose: "Trace a path or line on scroll.",
    template:
`Draw {SVG path} on with {animation library}: set stroke-dasharray/offset to the path length, animate offset to 0 on {scroll / enter}, duration {1.2}s ease {power2.inOut}.

Compute length via getTotalLength(). Show the final drawn state statically for reduced-motion.`,
    dos: ["Compute length with getTotalLength()", "Show the drawn state statically too"],
    donts: ["Hardcode the dash length", "Leave the path invisible for reduced-motion"]
  },
  {
    id: "a-lenis", order: "09", title: "Lenis smooth-scroll", tags: ["lenis"], shape: "wave",
    purpose: "Buttery smooth scrolling base.",
    template:
`Set up {smooth-scroll library} smooth scroll: init with {lerp: 0.1}, drive {animation library} ScrollTrigger from Lenis's scroll event, and add lenis.raf to the {animation library} ticker.

Skip Lenis under prefers-reduced-motion. Handle anchor links + resize.`,
    dos: ["Sync ScrollTrigger to Lenis", "Skip Lenis under reduced-motion"],
    donts: ["Run two scroll systems unsynced", "Break anchor links"]
  }
];

const CATEGORIES = [
  { id: "web", name: "Web design", kind: "pipeline", icon: "grid", count: "9 prompts", prompts: WEB_PROMPTS, subtitle: "company-profile site", blurb: "Kickoff to deploy, in nine phases. Set the client once in the builder and every field fills itself." },
  { id: "mobile", name: "Mobile app", kind: "pipeline", icon: "mobile", count: "9 prompts", prompts: MOBILE_PROMPTS, subtitle: "concept to store", blurb: "Nine phases, concept to ship. Fill the fields once and reuse them across every step." },
  { id: "anim", name: "Animation", kind: "cookbook", icon: "wand", count: "9 recipes", prompts: ANIM_RECIPES, subtitle: "motion cookbook", blurb: "Copy a recipe and drop it into your build. Tagged by library — GSAP, Motion, Lenis, CSS." }
];

/* The GreenGarden worked example. This is a SAMPLE you can load on demand —
   it is NOT the default. Seeding it as the default was why every generated
   prompt talked about a landscaping firm regardless of the real client. */
const EXAMPLE_PROJECT = {
  /* the brief — added so "Load example" fills EVERY field the Client step
     shows, including the three project-intent ones */
  "project brief": "a company-profile site that replaces a dated brochure page — it has to win the first call from estate managers who are comparing three firms",
  "primary goal": "get a site visit booked without a phone call first",
  "must avoid": "stock-photo corporate polish, or pricing hidden behind a contact form",
  "Company": "GreenGarden Integrated Services",
  "business type": "landscaping firm",
  "what they do": "designs, builds and maintains gardens and grounds",
  "who they serve": "commercial estates and premium residences",
  "brand colour": "#1B4332",
  "accent colour": "#B9A16B",
  "serif/sans": "serif",
  "feeling": "elegant",
  "max width": "1800px",
  "brand values": "craftsmanship, stewardship, longevity",
  "GSAP": "GSAP",
  "2026": "2026",
  "home": "home",
  "class prefix": "ggis-",
  "reveal class": "ggis-reveal",
  "light/dark/both": "both",
  "App": "GreenGarden",
  "platform": "cross-platform",
  "Lenis": "Lenis"
};

/* The real defaults: only the technology/format tokens that are the same on
   every project. Everything CLIENT-SPECIFIC starts EMPTY so a blank field is
   visibly a blank field, not someone else's brand. */
const PROJECT_DEFAULTS = {
  "GSAP": "GSAP",
  "Lenis": "Lenis",
  "2026": "2026",
  "home": "home",
  "light/dark/both": "both",
  "max width": "1800px"
};

/* THIS PROJECT — the intent. Without it a generated brief describes a look
   and a stack but never says what the thing is FOR, which is the first thing
   a downstream agent needs in order to make sensible decisions. */
const BRIEF_FIELDS = [
  { k: "project brief", label: "What are we building, and why?",
    ph: "e.g. a booking site that replaces the phone-and-spreadsheet process customers use today",
    wide: true, long: true },
  { k: "primary goal",  label: "The one thing it must achieve",
    ph: "e.g. get a qualified quote request without a phone call",
    wide: true },
  { k: "must avoid",    label: "What it must NOT be",
    ph: "e.g. no stock-photo corporate look; nothing that needs an account to browse",
    wide: true }
];

/* The client form. `k` is the token key used inside the prompt templates. */
const CLIENT_FIELDS = [
  { k: "Company",        label: "Client / brand name", ph: "e.g. Northwind Logistics",         wide: true },
  { k: "business type",  label: "Business type",       ph: "e.g. freight brokerage" },
  { k: "what they do",   label: "What they do",        ph: "one line — what the business actually does", wide: true, long: true },
  { k: "who they serve", label: "Who they serve",      ph: "e.g. mid-market shippers across the EU",     wide: true, long: true },
  { k: "brand values",   label: "Brand values",        ph: "three words, comma separated",               wide: true },
  { k: "brand colour",   label: "Brand colour",        ph: "#1B4332",  color: true },
  { k: "accent colour",  label: "Accent colour",       ph: "#B9A16B",  color: true },
  { k: "class prefix",   label: "CSS class prefix",    ph: "e.g. nwl-" }
];
