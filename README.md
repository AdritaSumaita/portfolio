# power_BI_projects

Portfolio site and Power BI project workspace for **Sumaita Faria Karim Adrita** — Business Analyst & Product Owner, Tampere, Finland.

The site is a statically exported Next.js application. The Power BI projects it showcases are built and documented in this same repository.

---

## Stack

| Choice | Reason |
|---|---|
| **Next.js 16 (App Router)** | Pre-renders to real HTML so the site is indexable — a portfolio's first job is being found. File-based routing gives each project its own case-study URL. |
| **TypeScript** | Content is defined against typed contracts in [`src/types/content.ts`](src/types/content.ts), so an incomplete entry is a compile error rather than a blank space on the page. |
| **Tailwind CSS v4** | CSS-first configuration; design tokens live in [`src/app/globals.css`](src/app/globals.css). |
| **Static export** | `output: "export"` — deployable to GitHub Pages, Vercel or Netlify with no server and no lock-in. |

> React and Next.js were the real alternatives here; TypeScript is a language that layers onto either. Next.js won on SEO and routing — a plain Vite + React SPA ships an empty root div to crawlers, which is the wrong trade for a site whose purpose is to be found by name.

---

## Design direction — "Instrument"

Dark-first, built to read like a well-made analytics product rather than a brochure: near-black canvas, a fine measurement grid, monospace metadata, and exactly two accents used as signal rather than decoration.

| Decision | Reason |
|---|---|
| **Dark by default, light as a considered alternative** | Both themes are hand-tuned, not an automatic flip. Every text/surface pair verified at ≥ 4.5:1 — the light accent is a darker teal (`#0F766E`) because the dark-mode teal only reaches 3.6:1 on a light surface. |
| **Three type roles** | Space Grotesk for headings, Inter for body **and for every number**, JetBrains Mono for metadata. Large stat values deliberately avoid the display face — at that size a display or serif number reads as decoration rather than data. |
| **Motion is additive only** | Reveal-on-scroll, count-up and the marquee are all applied from JS or disabled under `prefers-reduced-motion`. Content is never hidden waiting for an animation, so no-JS and reduced-motion visitors see everything immediately. |
| **Effects that cost nothing** | The cursor spotlight writes CSS custom properties instead of React state, so mouse movement triggers no re-render. Theme switching is a `data-theme` attribute read by CSS, so the toggle holds no state. |

Verified in a headless browser: no horizontal overflow at 320–1920px, no console errors, and all content visible with both JavaScript and animation disabled.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # static export to ./out
npm run lint
npm run typecheck
```

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx                # metadata, fonts, theme bootstrap
│   ├── page.tsx                  # home: hero, projects, experience, skills, about
│   ├── not-found.tsx
│   └── projects/[slug]/page.tsx  # per-project case study
├── components/                   # header, footer, section, project card, theme toggle
├── content/                      # all site copy, typed
│   ├── profile.ts                # profile, roles, education, skills, languages
│   └── projects.ts               # the three Power BI projects
└── types/content.ts              # content contracts
```

**All copy lives in `src/content/`.** Editing the site means editing data, not JSX.

---

## Branching model

| Branch | Purpose |
|---|---|
| `production` | Released, deployable state |
| `staging` | Pre-release verification |
| `development` | Integration branch — feature branches start and land here |
| `feature/*` | One branch per unit of work, cut from `development` |

Flow: `feature/*` → `development` → `staging` → `production`.

---

## Deployment

The build produces a fully static site in `./out`.

**Vercel / Netlify / custom domain** — no extra configuration:

```bash
npm run build
```

**GitHub Pages project site** — set the base path so assets resolve under the repo subpath:

```bash
BASE_PATH=/power_BI_projects npm run build
```

Add a `.nojekyll` file to `out/` when deploying to Pages so directories beginning with `_` are served.

---

## Power BI projects

Full build specifications — data models, DAX, page layouts and definitions of done — are maintained in the `Plan/` folder of the parent workspace. Each project ships four artefacts:

1. `README.md` — problem, stakeholders, decisions, screenshots
2. Mini-BRD — As-Is / To-Be, scope, success criteria
3. KPI Definition Catalogue — every measure, its business definition and the decision it supports
4. Low-fidelity wireframe, produced before the build

The `.pbix` file is linked from each case study; there is no live Power BI Service report link, since Publish to Web isn't available on this account.

| # | Project | Domain | Status |
|---|---|---|---|
| 01 | Consultancy Utilisation & Bench Cost | Professional services · workforce | Built |
| 02 | Smart Textile Factory — OEE & Downtime | IoT · manufacturing · ERP | Built |
| 03 | Donor Retention & Fundraising Performance | Nonprofit · customer analytics | Built |

All Power BI datasets are synthetically generated. Generation scripts are committed alongside each project.
