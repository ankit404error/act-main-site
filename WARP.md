# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project context
- Stack: Vite + React + TypeScript + Tailwind CSS + shadcn/ui
- Router: react-router-dom (SPA)
- Data: @tanstack/react-query
- Meta/SEO: react-helmet-async
- Path alias: @ -> ./src
- Dev server: Vite on port 8080 (configured), host "::" (all interfaces)
- Source layout highlights: entry at src/main.tsx -> src/App.tsx; pages in src/pages; shared components in src/components and src/components/ui; hooks in src/hooks; utils in src/utils

Commands you’ll commonly use
- Install
```sh path=null start=null
npm i
```
- Develop (Vite dev server on http://localhost:8080)
```sh path=null start=null
npm run dev
```
- Build (production)
```sh path=null start=null
npm run build
```
- Preview local production build
```sh path=null start=null
npm run preview
```
- Lint
```sh path=null start=null
npm run lint
```
- Tests
Currently no test runner is configured (no test script or test files detected). If tests are added later (e.g., Vitest), prefer a script like:
```sh path=null start=null
npm run test -- --run --reporter=default
```
And to run a single test by name or file, use the test runner’s filter options (e.g., Vitest: --testNamePattern or a path pattern).

Big-picture architecture
- App bootstrap and providers
  - src/main.tsx mounts <App /> to #root.
  - src/App.tsx composes app-wide providers: HelmetProvider (SEO/meta), QueryClientProvider (React Query), TooltipProvider (shadcn/ui), two toasters (ui/toaster and ui/sonner), and BrowserRouter for routing. ScrollToTop resets scroll on navigation; SEOHead injects meta/structured data.
- Routing
  - SPA routes defined inline in src/App.tsx: "/" -> pages/Index, "/about" -> pages/AboutUs, "/services" -> pages/Services, dynamic "/services/:serviceId" -> pages/ServiceDetail, "/contact" -> pages/ContactUs, catch-all -> pages/NotFound. Add new routes above the catch-all.
- UI system and styling
  - Tailwind configured via tailwind.config.ts and postcss.config.js.
  - shadcn/ui component primitives live under src/components/ui (accordion, dialog, form, toast, etc.). Higher-level site sections (Hero, Services, Footer, etc.) are in src/components.
- Data fetching and state
  - @tanstack/react-query is initialized in App with a shared QueryClient. Use hooks that call useQuery/useMutation and are rendered under QueryClientProvider.
- SEO and metadata
  - src/components/SEOHead.tsx wraps react-helmet-async and provides sensible defaults (title, description, Open Graph, Twitter cards, and JSON-LD). It computes a full title with the site name and can accept overrides per route/page.
- Utilities
  - src/utils/emailService.ts posts contact form data to external form handlers (FormSubmit), with a fallback mailto: open. This utility assumes a browser environment (window and fetch) and uses a configured target email.
- Module resolution and tooling
  - Vite config (vite.config.ts) defines alias @ -> ./src and enables @vitejs/plugin-react-swc. In development mode, lovable-tagger is enabled to annotate components.
  - ESLint (eslint.config.js) uses ESLint v9 + typescript-eslint with react-hooks and react-refresh plugins. The lint script runs eslint . across the repo.

Notes derived from README
- Local dev: requires Node.js and npm. The README documents cloning, npm i, and npm run dev.
- Technologies: Vite, TypeScript, React, shadcn-ui, Tailwind CSS.
- Deployment via Lovable: The README references publishing from the Lovable UI (Share -> Publish) if you use that workflow.

Conventions and tips specific to this codebase
- Path aliases: Prefer imports from "@/…" to avoid deep relative paths; tsconfig.json and vite.config.ts are aligned for @.
- Ports: Dev server binds to port 8080. If you need a different port temporarily, pass --port to Vite or adjust vite.config.ts.
- Routing: New routes should be added above the catch-all "*" route in src/App.tsx.
