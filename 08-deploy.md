# 08 · Deploy (GitHub Pages / Cloudflare Workers / Divi theme zip)

Ship it. Three tracks, chosen per target: the static build to **GitHub Pages** or
**Cloudflare Workers/Pages** (dev-controlled preview or edge production), and/or
the **Divi child-theme zip** to WordPress (client-editable production). Cache-bust,
wire DNS/HTTPS, and verify the *live production* URL.

**Hand-off**
- **In:** the QA-green static build (**05**/**07**) and/or the Divi theme zip +
  page JSON (**06**/**07**).
- **Out:** the live site (static host and/or WordPress) + a one-line rollback note.
- **Next:** pipeline complete. Content edits now happen in the Divi Builder
  (native modules); design/motion changes loop back to **05 → 06** (keep source
  and port in sync).

**When to use** — only after **07** is green. A live regression costs more than a
QA pass.

---

## Fill-in template

```
Deploy the {Company} {home} page. Track: {GitHub Pages | Cloudflare Workers |
Divi child-theme zip} (pick per target).

A) GitHub Pages (static preview):
- Repo {org/repo}, publish {website/} from {/docs on main | gh-pages branch}.
- Custom domain {domain} + CNAME; enforce HTTPS; verify the built page live.

B) Cloudflare Workers/Pages (static, edge):
- {wrangler} project {name}; serve {website/} as static assets; route {domain/*}.
- Set cache headers; purge cache on deploy; verify live after a hard refresh.

C) Divi child-theme zip (WordPress production):
- Rebuild {ggis-divi-child.zip} with System.IO.Compression (forward-slash entries,
  version bump). NEVER Compress-Archive (backslashes → "missing style.css").
- Install: Appearance → Themes → Add New → Upload → Replace current with uploaded.
- Import page JSON via the page's Builder → Portability → Import (Divi Library for
  a single section).
- Assets versioned by filemtime cache-bust; if behind {Cloudflare}, confirm the
  CSS ?ver= query busts the CDN. Verify live at {URL}.

Deliver: the live URL(s) + a one-line rollback note.
```

## Filled example — GreenGarden

```
Deploy the GreenGarden home page.

Static preview → GitHub Pages: repo kesatria/greengarden, publish website/ from
/docs on main; custom domain greengarden-preview.kesatria.my; HTTPS enforced.

Production → Divi child-theme zip on WordPress:
- Rebuilt ggis-divi-child.zip via System.IO.Compression (forward-slash entries,
  version 1.4.0); NOT Compress-Archive.
- Installed: Appearance → Themes → Add New → Upload → Replace current with uploaded.
- Imported Home JSON via the page's Builder → Portability → Import.
- functions.php versions css/js by filemtime; behind Cloudflare, the ?ver= query
  busts the cached CSS. Verified live, logged out, at https://greengarden.kesatria.my/.

Rollback: re-upload the previous theme zip; re-import the prior JSON export to
restore the earlier layout.
```

## Track chooser

| Need | Track |
|---|---|
| A quick, dev-controlled preview for client sign-off | **GitHub Pages** |
| Edge-fast static production, no WordPress | **Cloudflare Workers/Pages** |
| Client must edit copy/images themselves | **Divi child-theme zip** (native modules) |

## Do's

- **DO** zip the child theme with `System.IO.Compression` + **forward-slash
  entries** and a version bump — `Compress-Archive` writes backslashes and WP
  rejects it ("missing style.css").
- **DO** version assets by `filemtime` so a CDN (Cloudflare caches CSS hard) serves
  the new file; verify with a **logged-out hard refresh**.
- **DO** install via **Replace current with uploaded**, and import page JSON via
  the page's Portability (Divi Library for a single section).
- **DO** keep a rollback ready — the previous theme zip + the prior JSON export —
  and verify the **live production** URL after every deploy.

## Don'ts

- **DON'T** deploy before **07** is green.
- **DON'T** hand-edit files on the server — deploy from source, or the next build
  overwrites the fix.
- **DON'T** forget DNS/HTTPS — CNAME + enforce HTTPS on Pages; route + custom
  domain on Workers.
- **DON'T** mix tracks silently — decide static-host vs WordPress-Divi per the
  client's editing needs (native Divi = client-editable; static = dev-controlled).
