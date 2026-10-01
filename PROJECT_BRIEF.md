# PROJECT BRIEF

**Project:** Personal Portfolio Web Application
**Version:** 2.0
**Status:** ACTIVE — ARCHITECTURE / DESIGN PHASE
**Primary Agent:** Codex
**Primary Workflow:** `LOOP_ENGINEERING.md`

---

# 1. Project Overview

This project is a modern personal portfolio web application designed to present Kenji Vargas professionally as an IT/software developer.

The portfolio should demonstrate not only personal information, but also practical software engineering ability.

It should communicate:

* Who I am
* What I build
* What technologies I use
* What projects I have worked on
* How I approach software development
* What technical problems I have worked on
* How visitors can contact or connect with me

The portfolio should feel like a real software product rather than a generic template.

---

# 2. Primary Goal

Build a polished, responsive, accessible, maintainable, and scalable personal portfolio application.

The portfolio should demonstrate:

1. Full-stack development capability
2. Practical system-building experience
3. Strong project presentation
4. Modern frontend engineering
5. Database design capability
6. Security awareness
7. Responsive/mobile-first development
8. Maintainable architecture
9. Professional UI/UX
10. Real project evidence

---

# 3. Developer Positioning

The current positioning direction is:

> **Full-Stack Developer building practical web systems.**

The portfolio should emphasize three related areas:

```text
FULL-STACK DEVELOPMENT
React • JavaScript • Laravel • PostgreSQL • APIs

SYSTEM DEVELOPMENT
Enterprise applications • workflows • data • security

AI-ASSISTED DEVELOPMENT
AI-enhanced software features • AI-assisted engineering workflows
```

AI must be presented as a capability/toolset rather than a substitute for demonstrated software engineering ability.

The portfolio must not exaggerate expertise or claim technologies or capabilities that cannot be supported by actual experience.

---

# 4. Target Audience

Primary audiences:

* Recruiters
* Hiring managers
* Technical leads
* Potential clients
* Developers
* Academic evaluators
* Professional contacts

The portfolio should allow visitors to understand the developer and his strongest work quickly.

---

# 5. Core Technology Stack

## Frontend

* React
* Vite
* JavaScript
* JSX
* CSS

## Backend / Data

* Supabase
* PostgreSQL

## Development

* Node.js
* npm
* Git
* GitHub
* VS Code
* Codex

The exact architecture must remain proportional to the actual portfolio requirements.

---

# 6. Required Database Architecture

Unlike the original brief, the current project explicitly requires a PostgreSQL database through Supabase.

The database must be intentionally designed rather than created merely because Supabase is available.

## Normalization Requirement

Database design must evaluate normalization through:

```text
1NF
 ↓
2NF
 ↓
3NF
 ↓
BCNF where applicable
 ↓
4NF where applicable
```

The purpose is to identify and eliminate:

* Repeating groups
* Partial dependencies
* Transitive dependencies
* Unnecessary redundancy
* Update anomalies
* Insert anomalies
* Delete anomalies
* Unjustified multi-valued dependencies

The design must not claim that normalization creates literally zero duplicated values.

The objective is to eliminate **unnecessary and structurally harmful redundancy** while maintaining a practical schema.

## Database Design Requirements

Before implementation, Codex must document:

* Entities
* Attributes
* Primary keys
* Candidate keys where relevant
* Foreign keys
* Relationships
* Functional dependencies
* Multi-valued dependencies where applicable
* Normalization analysis
* Referential integrity
* Delete/update behavior
* Data ownership
* Access requirements
* RLS requirements

No database migration should be created until the schema has passed the appropriate planning/approval gate.

---

# 7. Portfolio Data

The database may contain structured portfolio information such as:

* Projects
* Technologies
* Project-technology relationships
* Skills
* Experience
* Education
* Contact submissions if explicitly implemented

Many-to-many relationships should use junction tables rather than comma-separated strings or repeated fields.

Example:

```text
projects
    │
    └── project_technologies
              │
              └── technologies
```

The final schema must be based on actual requirements rather than this example alone.

---

# 8. Supabase Security

Supabase is a required part of the architecture.

The application must use:

* Supabase PostgreSQL
* Browser-safe publishable credentials
* Row Level Security where browser-accessible tables require it
* Least-privilege access
* Explicit policies

Never expose:

* Supabase service-role keys
* Secret keys
* Administrative credentials

through frontend code or `VITE_*` environment variables.

Database permissions must be intentionally designed.

Do not enable broad `INSERT`, `UPDATE`, or `DELETE` access simply because the frontend needs database access.

---

# 9. Authentication

Authentication is **not currently required for the public portfolio**.

No authentication system, admin dashboard, or CMS should be implemented unless separately approved.

If a future administrative feature requires authentication, it must receive its own architecture and security review.

---

# 10. Portfolio Information Architecture

The recommended V1 structure is:

```text
HOME
│
├── HERO
├── SELECTED WORK
├── TECH STACK
├── ABOUT
├── EXPERIENCE
├── EDUCATION
├── CONTACT
└── FOOTER
```

Primary navigation should remain simple.

Recommended navigation:

```text
Home
Work
About
Contact
```

The final navigation behavior is defined in `PORTFOLIO_DESIGN_SPEC.md`.

---

# 11. Hero

The Hero must immediately communicate:

* Name
* Developer identity
* Primary positioning
* Short description
* Primary CTA
* Secondary CTA

The Hero should emphasize what the developer builds rather than generic statements such as "passionate coder."

---

# 12. Projects

Projects are one of the most important parts of the portfolio.

The project presentation should communicate:

* Project name
* Problem
* Solution
* Developer contribution
* Technologies
* Key features
* Technical challenges
* Architecture where relevant
* Results/status
* Screenshots
* Repository/demo links when available

Projects must not contain invented claims.

---

# 13. Featured Project

ISMERS may be presented as a major featured project.

Possible verified areas may include:

* React
* Laravel
* PostgreSQL
* REST APIs
* RBAC
* Facilities management
* Visitor management
* Document management
* Records management
* Legal management
* Contract management
* AI-assisted functionality

Only features that can be verified from the actual project should be presented as completed functionality.

---

# 14. Frontend Architecture

The frontend must use a **Feature Folder Strategy**.

Recommended high-level structure:

```text
src/
├── features/
│   ├── portfolio/
│   ├── projects/
│   ├── contact/
│   └── ...
│
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── ...
│
├── lib/
├── assets/
└── ...
```

Feature folders should follow:

```text
feature/
├── pages/
├── components/
├── services/
└── hooks/
```

However, folders/files must only be created when they serve an actual purpose.

Do not create empty architectural folders merely to satisfy a naming convention.

---

# 15. Mobile-First Requirement

The application must follow a **mobile-first development approach**.

Design and implementation priority:

```text
Mobile
 ↓
Tablet
 ↓
Desktop
```

Touch interaction must be considered before desktop scaling.

This applies to:

* Navigation
* Buttons
* Forms
* Cards
* Project layouts
* Typography
* Spacing
* Interactive controls
* Theme controls

Desktop layouts must be an intentional expansion of the mobile design.

---

# 16. Dark / Light Mode

A dedicated theme system is required.

At minimum:

```text
Light
Dark
```

The theme system should be implemented through centralized design tokens/CSS variables rather than scattered hard-coded colors.

Theme preference should persist appropriately between sessions.

The theme toggle must:

* Be keyboard accessible
* Have an accessible label
* Provide clear visual state
* Work on mobile
* Avoid causing layout instability

---

# 17. UI Design System

The portfolio must use reusable UI primitives.

Core reusable components should include, where needed:

```text
Card
Button
TextField
PasswordField
Badge
Section
Navigation
ThemeToggle
```

The visual language should be based around the requested styling direction:

```text
rounded-3xl
border border-border
bg-card/95
p-6
shadow-2xl
backdrop-blur-xl
```

This is a **design foundation**, not a requirement to blindly apply the exact class string to every component.

Component-specific requirements must still be respected.

For example:

* Buttons need appropriate sizing and interaction states.
* Inputs need focus/error/disabled states.
* Cards need appropriate spacing.
* Password fields need appropriate input behavior.

The design system should provide consistency without sacrificing semantics or usability.

---

# 18. Visual Direction

The visual direction is:

* Modern
* Developer-oriented
* Premium
* Polished
* Clean
* Professional
* Strong visual hierarchy

Avoid:

* Excessive neon
* Excessive gradients
* Excessive glassmorphism
* Generic templates
* Gimmicky animations
* Excessive decorative effects
* Visual clutter

The portfolio should look like a professional software product.

---

# 19. Responsive Design

The application must support:

* Mobile
* Tablet
* Laptop
* Desktop

Responsive design must be intentional.

Do not simply scale a desktop layout down to mobile.

Special attention must be given to:

* Navigation
* Hero typography
* Project visuals
* Cards
* Buttons
* Forms
* Spacing
* Theme controls

---

# 20. Accessibility

The application should use:

* Semantic HTML
* Correct heading hierarchy
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Accessible form controls
* Meaningful image alternative text
* Sufficient contrast
* Appropriate touch target sizes

Accessibility should be considered during implementation and verified afterward.

---

# 21. Performance

Avoid unnecessary:

* Dependencies
* Large assets
* API requests
* State management libraries
* Re-renders
* Animations
* Third-party services

Performance should be evaluated based on actual application behavior.

---

# 22. Content Management

The database requirement means portfolio data should be evaluated for structured storage.

However, database-backed content does not automatically require a CMS or admin interface.

The initial architecture should distinguish:

```text
Database storage
```

from:

```text
Administrative editing interface
```

They are separate concerns.

No CMS/admin panel is approved by this brief.

---

# 23. Contact

The portfolio should provide professional contact options.

Potential methods:

* Email
* GitHub
* LinkedIn
* Contact submission

If a contact submission system is implemented, it must receive separate consideration for:

* Database storage
* RLS
* Validation
* Abuse prevention
* Rate limiting
* Privacy
* Data retention

---

# 24. Git Requirements

The project must remain independently version controlled.

Do not commit:

```text
.env
.env.*
node_modules/
dist/
```

Real credentials must never enter Git history.

`.env.example` may contain placeholders only.

---

# 25. Testing

At minimum, where applicable:

```text
npm run lint
npm run build
```

Additional verification should include:

* Browser runtime checks
* Responsive checks
* Accessibility checks
* Theme switching
* Supabase connectivity
* Database queries
* RLS behavior
* Form validation
* Error states
* Loading states

Codex must not claim a feature works unless it has actually been verified.

---

# 26. Deployment

The portfolio should eventually be deployed to an appropriate web hosting platform.

The final platform has not yet been selected.

Deployment architecture must be planned before production deployment.

---

# 27. Scope Control

The following require explicit approval before implementation:

* Authentication
* Admin dashboard
* CMS
* Blog
* Analytics
* AI chatbot
* Comments
* Messaging
* Payment functionality
* Complex external integrations
* Major architectural refactors

---

# 28. Source of Truth

Use this priority:

```text
1. Explicit user-approved requirements
2. Approved architecture decisions
3. PROJECT_BRIEF.md
4. PORTFOLIO_DESIGN_SPEC.md
5. Existing verified project behavior
6. LOOP_ENGINEERING.md
7. Agent recommendations
```

Recommendations must not silently become requirements.

---

# 29. Definition of Done

Eventually:

```text
[ ] Professional portfolio UI
[ ] Mobile-first implementation
[ ] Responsive desktop/tablet layouts
[ ] Dark/Light mode
[ ] Feature-based architecture
[ ] Reusable UI primitives
[ ] Normalized PostgreSQL schema
[ ] Normalization analysis documented
[ ] Supabase integration
[ ] RLS/security policies
[ ] Hero
[ ] Selected projects
[ ] Tech stack
[ ] About
[ ] Experience
[ ] Education
[ ] Contact
[ ] Accessibility verification
[ ] Performance review
[ ] Lint passes
[ ] Build passes
[ ] Runtime verification
[ ] GitHub repository
[ ] Production deployment
[ ] Production verification
[ ] Documentation updated
```

Not every item must be implemented in one phase.

---

# 30. Final Principle

Build the portfolio as a real software product.

Use:

```text
Understand
 ↓
Design
 ↓
Plan
 ↓
Approve
 ↓
Implement
 ↓
Test
 ↓
Verify
 ↓
Document
```

Do not guess.

Do not invent requirements.

Do not overengineer.

Do not claim unverified behavior.

**Build for scalability, but keep every architectural decision justified by an actual requirement.**
