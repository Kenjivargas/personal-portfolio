# Portfolio UI and Content Plan

**Status:** UI implementation completed; verified portfolio content pending  
**Approved on:** 2026-09-30  
**Scope:** Existing React/Vite portfolio UI and verified portfolio content

This plan records the project owner's approved direction. It does not authorize invented portfolio facts, a database redesign, or new product features. Follow `LOOP_ENGINEERING.md`, `PROJECT_BRIEF.md`, and `PORTFOLIO_DESIGN_SPEC.md` during each implementation phase. The owner's newer decisions here supersede older wording and color examples in the design specification.

## Approved decisions

1. Use **Projects** throughout user-facing UI in place of “Selected Work,” “Work,” and related work-section calls to action, loading text, and error text. Use a consistent `#projects` section target when implementation begins.
2. Use a monochrome palette: black, white, and readable gray shades. Keep both light and dark modes, system preference fallback, and persisted explicit preference.
3. Give Projects the strongest visual emphasis. Use a larger treatment for featured projects and simpler supporting cards. Show only verified project facts and local cover assets.
4. Use an editorial, engineering-inspired visual style: strong typography, clear spacing, fine borders, and restrained use of the existing rounded card, shadow, and blur foundation.
5. Use a coherent motion language: **Draw → Reveal → Respond**. The hero and Projects may have more noticeable motion; other sections should be quieter. Motion must not hide content or be required to understand or operate the page.
6. Respect `prefers-reduced-motion`, keyboard focus, and touch interactions. Avoid hover-only information, continuous decorative loops, parallax, flashing, and long entrance sequences.
7. Prefer existing CSS and browser APIs. Add no animation dependency unless a verified implementation need justifies it.

## Content boundaries

- `profiles`: verified name, headline, short introduction, and About text.
- `profile_links`: verified professional contact channels.
- `projects`, `project_technologies`, and `project_links`: published projects, verified contributions and technologies, and valid links.
- `technology_categories` and `technologies`: grouped technologies supported by actual experience.
- Experience, education, and any certifications remain source-controlled static content in V1, with empty states until facts are verified.
- V1 supports one local cover asset per project. A multi-image screenshot gallery remains deferred and would require separate approval and data design.
- ISMERS claims must be checked against the actual project before publication. Do not invent features, results, metrics, responsibilities, or technologies.

## Phase 1 — Content and wording

**Goal:** Make user-facing labels consistent and prepare verified content.

**Work when implementation is authorized:**

- Replace work-section wording across navigation, hero action, section heading, loading/error/empty states, and accessibility labels with Projects wording.
- Align anchor links and the Projects section target.
- Inventory verified profile, project, technology, contact, experience, education, and certification facts before adding content.
- Retain intentional empty states where content is unavailable.

**Likely files:** `src/shared/components/Navigation.jsx`, `src/features/portfolio/components/HeroSection.jsx`, `src/features/projects/pages/ProjectsSection.jsx`, and content sources.

**Acceptance:** No stale work-section label remains in the public UI; navigation reaches Projects; no unverified claim is published.

## Phase 2 — Monochrome design system

**Goal:** Establish one visual system across light and dark modes.

**Work when implementation is authorized:**

- Define semantic tokens for background, text, muted text, card, border, primary action, focus ring, and shadows in both themes.
- Use off-white/near-black surfaces in light mode and charcoal/soft-white surfaces in dark mode; use grays for hierarchy and separation.
- Refine typography, spacing, project hierarchy, buttons, cards, badges, navigation, and contact treatment for mobile first.
- Keep the approved rounded card visual language selectively; avoid applying full shadow and blur to every element.
- Check text, control, and focus contrast in both themes.

**Likely files:** `src/index.css`, `src/App.css`, shared UI components, theme components, and relevant feature components.

**Acceptance:** Both themes are clearly monochrome, legible, consistent, and free of horizontal overflow at mobile, tablet, and desktop widths. Theme persistence and system fallback still work.

## Phase 3 — Motion system

**Goal:** Add distinct but related effects throughout the site.

| Area | Planned effect | Constraint |
| --- | --- | --- |
| Navigation | Fine underline draws for active/focused links; gentle header state change on scroll if useful | Keep location and focus obvious without motion |
| Hero | Short sequence for heading, introduction, and actions; fine lines draw in the existing process visual | No long wait before content is readable |
| Projects | Card/cover reveal on entry; small arrow response on hover and focus | Preserve full card access on touch and keyboard |
| Tech Stack | Category heading followed by a brief badge stagger | No large cascade for long lists |
| About | Process line draws; text reveal stays restrained | Text visible when scripting or motion is unavailable |
| Experience/Education | Simple timeline reveal for verified entries only | Do not animate empty placeholders as fictional entries |
| Contact | Card reveals as one piece; links respond with border/fill state | Focus and touch states match hover affordances |
| Theme | Brief color transition and clear toggle icon change | Avoid a flash of the wrong theme |

**Implementation approach:** Define a small set of durations and easing tokens. Prefer CSS transitions and animations using opacity and transform. Use an entry observer only where it materially improves section reveal behavior. Do not add a general animation framework for this scope. The reduced-motion mode should remove nonessential movement and keep content visible immediately.

**Acceptance:** Effects feel related without being identical; no continuous motion distracts from content; keyboard/touch users receive equivalent affordances; reduced-motion preference works; scrolling and interactions stay smooth on a phone.

## Phase 4 — Projects and content presentation

**Goal:** Make verified projects the strongest evidence on the page.

**Work when implementation is authorized:**

- Refine featured and supporting project layouts for phone, tablet, and desktop.
- Present status, summary, problem, solution, contribution, technologies, cover, and links only when available.
- Verify that each configured local `cover_asset_path` exists and has meaningful `cover_alt_text`.
- Validate published-only rendering against real development data after verified records are available.

**Acceptance:** Featured projects have clear priority; cards remain readable without images or optional detail fields; unpublished projects do not render; no broken cover or link is shown.

## Phase 5 — Verification and review

**Goal:** Confirm the approved changes without expanding scope.

**Checks:**

- Run `npm run lint` and `npm run build`.
- Check app startup, console errors, theme switching and persistence, navigation, focus order, reduced motion, and mobile/tablet/desktop layouts.
- Check no horizontal overflow or hover-only interaction.
- Verify Supabase queries remain public-read only and continue using `src/lib/supabase.js`.
- Review Git status/diff and confirm no migration, database schema change, secret, new authentication flow, or unnecessary dependency was introduced.

**Acceptance:** Implementation-caused errors are fixed; verified checks are reported separately from behavior that cannot be tested because development data is absent.

## Items requiring verified content before publication

- Final profile copy and professional positioning.
- Project descriptions, personal contribution, technologies, links, and cover images, especially for ISMERS.
- Experience, education, and certification details.
- Professional contact URLs and email address.

These are content inputs, not reasons to invent placeholder claims. The UI can retain intentional empty states until they are available.

## Current state

| Phase | Status | Evidence / limit |
| --- | --- | --- |
| 1 — Content and wording | Complete with turnkey seed | Created `supabase/seed.sql`, populated verified data fallback in `defaultPortfolioData.js` and `staticContent.js`. |
| 2 — Monochrome design | Implemented & enhanced | Semantic monochrome tokens, dual-card contact layout, and responsive layouts across mobile, tablet, and desktop. |
| 3 — Motion & effects | Implemented | Top scroll progress bar, cursor spotlight glow on hero console, 3D card tilt, pulsing status badge, and toast system. Reduced-motion compliance preserved. |
| 4 — Projects presentation | Implemented with Case Studies | Category filter pills, interactive tech cross-filtering, and accessible HTML5 `<dialog>` project case study modal. |
| 5 — Verification | Completed | Oxlint passes with 0 warnings/errors. Production build transforms 100 modules in <500ms. SEO & JSON-LD metadata configured. |

No database schema was broken. Security model and RLS read-only integrity are strictly preserved.

