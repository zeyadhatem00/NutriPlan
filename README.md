# NutriPlan

NutriPlan is a browser-based food and nutrition dashboard for discovering recipes, looking up packaged-food nutrition, and keeping a personal daily food log. It is implemented as a static HTML/CSS/JavaScript site with client-side API calls and browser-local storage.

## What is included

- **Meals & Recipes**: load a set of random recipes, search by name or ingredient, filter by cuisine/area or meal category, and open a detail view with ingredients, instructions, a YouTube tutorial, and nutrition facts.
- **Nutrition analysis and meal logging**: request nutrition estimates for a selected recipe, choose servings, and add the result to the daily log.
- **Product Scanner**: search packaged foods, look up a barcode, browse product categories, and filter results by Nutri-Score grades A–E. Product cards expose calories and macronutrients and can be added to the log.
- **Daily Food Log**: view logged items, calorie/protein/carbohydrate/fat progress, a seven-day text overview, and controls to remove individual entries or clear the log.
- **Responsive navigation**: the three main views are switched with URL hash routes (`#Meals`, `#Products`, and `#Food-Log`) and a responsive sidebar.

The food log is local to the current browser profile; there is no account system or server-side persistence in this repository.

## Technology and data sources

- Vanilla JavaScript using native ES modules; [`js/main.js`](./js/main.js) is the entry point.
- HTML in [`index.html`](./index.html), generated Tailwind utility CSS in [`css/index.css`](./css/index.css), and custom rules in [`css/style.css`](./css/style.css).
- The client calls the NutriPlan API at `https://nutriplan-api.vercel.app` for recipe lists/search/filtering, product search/category/barcode lookups, and nutrition analysis. Endpoint paths are defined in [`js/api/`](./js/api/).
- The page also loads Tailwind’s browser build, Font Awesome, SweetAlert2, Plotly, Google Fonts, remote recipe/product images, and YouTube embeds from their CDNs or source hosts. A network connection is therefore required for the full experience.

## Run locally

There is no `package.json`, package-lock file, build configuration, or project-specific runtime script in this snapshot. No dependency installation is required. Serve the repository over HTTP so the browser can load JavaScript modules:

```bash
git clone --depth 1 https://github.com/zeyadhatem00/nutriplan.git
cd NutriPlan
python3 -m http.server 8000
```

Open <http://localhost:8000> in a modern browser. Serving the directory is preferred over opening `index.html` directly because browsers commonly restrict module and network requests from `file://` pages.

The repository also contains a GitHub Pages workflow at [`.github/workflows/static.yml`](./.github/workflows/static.yml). It uploads the repository root when `main` is pushed; this README does not assume a published URL.

## API and configuration notes

- No `.env` file or `.env.example` is provided, and the frontend does not read runtime environment variables.
- Recipe and product data will not load if `nutriplan-api.vercel.app` is unavailable, blocked by the browser, or returns an error; the UI falls back to an error/refresh message.
- Recipe nutrition analysis sends a credential from the browser source to the `/api/nutrition/analyze` endpoint. The value is intentionally not reproduced here. Before treating this as a production deployment, move credential handling behind a server-side boundary and rotate any exposed credential.
- Logged meals are stored under the browser local-storage key `container`. Clearing site data or changing browsers removes that local log.

## Project structure

```text
.
├── index.html                 # page shell, sections, CDN assets, module entry
├── js/
│   ├── main.js                # navigation, logging, persistence, view toggles
│   ├── api/                   # recipe, product, barcode, and nutrition requests
│   └── ui/components.js       # section visibility and sidebar behavior
├── css/
│   ├── index.css              # generated Tailwind v4 utility stylesheet
│   └── style.css              # small custom rules and loading behavior
├── images/                    # local favicon and fallback artwork
└── .github/workflows/static.yml # static GitHub Pages workflow
```

## Current boundaries

This repository is a static client, not a complete nutrition backend. The displayed recipe/product records and nutrition analysis are API-backed rather than bundled fixtures. The weekly overview currently renders seven day summaries in the DOM; although Plotly is loaded by `index.html`, no Plotly chart is created in the current JavaScript. The visible **Custom Entry** quick-action control is present in the HTML but has no event handler in the inspected JavaScript.
