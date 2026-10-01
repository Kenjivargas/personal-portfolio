# Personal Portfolio — Kenji Vargas

Modern, high-performance developer portfolio built with React 19, Vite, and Supabase PostgreSQL. Features an editorial monochrome design, interactive system consoles, keyboard-driven command palette, and verified database integration.

## Key Features

- **Interactive Hero Console**: Tabbed developer terminal, live system architecture visualizer, engineering workflow diagrams, live availability status, and dynamic cursor spotlight.
- **Project Case Studies & Filtering**: Category filter tabs, technology tag cross-filtering, 3D card perspective tilt, and full-screen accessible `<dialog>` case study modals.
- **Developer Command Palette (`Ctrl+K` / `Cmd+K`)**: Instant search and navigation across sections, external links, theme toggling, and copying email.
- **Top Scroll Progress Bar**: Minimalist viewport progress indicator.
- **Toast Notification System**: Instant feedback for copy-to-clipboard actions and form submissions.
- **Interactive Contact & Quick Inquiries**: Fast mailto composer and one-click email copying.
- **Theme Engine**: Light and dark mode support with localStorage persistence and system color-scheme detection.
- **Graceful Data Architecture**: Dynamic Supabase PostgreSQL connection with verified fallback data mode for offline development.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Environment configuration:
   Copy `.env.example` to `.env` and provide your Supabase development project URL and publishable key:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
   ```

3. Database Seeding (Optional):
   To seed your live Supabase database with Kenji's verified profile, flagship ISMERS project, technology categories, and contact links, copy and run the SQL in:
   ```
   supabase/seed.sql
   ```
   directly in the Supabase SQL Editor.

4. Start development server:
   ```bash
   npm run dev
   ```

## Checks & Verification

- `npm run lint`: Fast code quality checks with `oxlint` (0 warnings, 0 errors).
- `npm run build`: Production client bundle build with Vite.

## Structure

```
src/
├── features/
│   ├── portfolio/      # Hero section, console, tech stack, about, experience, education
│   ├── projects/       # Projects grid, cards, category filters, case study modal
│   └── contact/        # Contact links, quick inquiry form, copy-email toast
├── shared/
│   ├── components/     # Navigation, ScrollProgress, CommandPalette, UI primitives
│   ├── context/        # ToastContext and useToast hook
│   ├── data/           # Verified default portfolio data for offline/fallback mode
│   ├── hooks/          # useActiveSection, useReveal, useRemoteResource
│   └── theme/          # ThemeToggle, useTheme
└── lib/
    └── supabase.js     # Supabase client initialization
```
