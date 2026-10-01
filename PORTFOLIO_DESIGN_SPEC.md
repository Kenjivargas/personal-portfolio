# PORTFOLIO DESIGN SPECIFICATION

**Project:** Personal Portfolio Web Application
**Version:** 1.0
**Status:** PROPOSED — AWAITING APPROVAL
**Related Documents:**

* `LOOP_ENGINEERING.md`
* `PROJECT_BRIEF.md`

---

# 1. Design Objective

Create a portfolio that feels like a polished software product rather than a generic developer template.

The visual experience should communicate:

* Technical competence
* Professionalism
* Practical engineering
* Modern frontend development
* Attention to detail

The design should support the portfolio's content rather than overwhelm it.

---

# 2. Design Personality

Primary direction:

```text
Modern
+
Developer-oriented
+
Premium
+
Professional
+
Clean
```

Avoid:

```text
Excessive neon
Excessive gradients
Excessive glassmorphism
Generic template layouts
Gimmicky animation
Visual clutter
```

---

# 3. Design Principles

## 3.1 Content First

Visual effects must never make important information harder to understand.

## 3.2 Strong Hierarchy

Every section should clearly communicate:

```text
What is this?
Why does it matter?
What should I look at next?
```

## 3.3 Consistency

Repeated UI patterns must use shared components and design tokens.

## 3.4 Mobile First

All components must first work properly on mobile/touch devices before desktop enhancements are introduced.

## 3.5 Accessibility

Interaction must remain usable without relying on:

* Hover
* Color alone
* Animation
* Mouse-only interaction

---

# 4. Page Architecture

The primary page is structured as:

```text
HOME
│
├── Navigation
├── Hero
├── Selected Work
├── Tech Stack
├── About
├── Experience
├── Education
├── Contact
└── Footer
```

---

# 5. Navigation

Recommended navigation:

```text
Home
Work
About
Contact
```

Requirements:

* Responsive
* Keyboard accessible
* Touch-friendly
* Clear active state
* Theme toggle
* Does not consume excessive mobile screen space

Desktop may use a compact sticky navigation.

Mobile should use an appropriate compact navigation pattern.

Do not introduce a complex navigation system unless justified.

---

# 6. Hero

The Hero should answer three questions immediately:

```text
Who is this?
What does he build?
What can I explore?
```

Recommended structure:

```text
Name
Professional identity
Short positioning statement
Primary CTA
Secondary CTA
```

Primary CTA:

```text
View My Work
```

Secondary CTA:

```text
Contact Me
```

Exact wording may be refined during content preparation.

---

# 7. Selected Work

This is a primary visual section.

The strongest project should receive the most visual attention.

Recommended structure:

```text
SELECTED WORK

Featured Project
├── Project title
├── Description
├── Technology
├── Visual
├── Contribution
└── Case study action

Supporting Projects
├── Project
├── Project
└── Project
```

Avoid presenting every project with identical visual weight.

---

# 8. Project Card

A project card may contain:

```text
Project visual
Project name
Short description
Technology badges
Project status
View project
```

Cards should use the shared card visual language.

Base visual direction:

```text
rounded-3xl
border border-border
bg-card/95
p-6
shadow-2xl
backdrop-blur-xl
```

Responsive behavior must adapt card spacing and layout for smaller screens.

---

# 9. Project Case Study

A project detail page/view may eventually contain:

```text
Project Header
Overview
Problem
Solution
My Contribution
Architecture
Key Features
Technical Challenges
Screenshots
Technology
Results / Status
Links
```

Case studies must contain verified information only.

---

# 10. Tech Stack

Do not create a wall of technology logos.

Group technologies by category:

```text
Frontend
Backend
Database
Tools
```

Example:

```text
Frontend
React
JavaScript
HTML
CSS

Backend
Laravel
PHP
REST APIs

Database
PostgreSQL
Supabase

Tools
Git
GitHub
VS Code
```

Only technologies supported by actual experience should be displayed as established skills.

---

# 11. About

The About section should remain concise.

Recommended structure:

```text
About
Short professional introduction

Focus
What I currently build/study

Approach
How I approach software development
```

A short engineering-process presentation may be used:

```text
Understand
Plan
Build
Test
Verify
Improve
```

---

# 12. Experience

Experience should use a clean timeline/list structure.

Each entry may contain:

```text
Role
Organization
Period
Short description
```

Do not fabricate responsibilities or achievements.

---

# 13. Education

Education should remain concise.

Each entry may contain:

```text
Program
Institution
Period
Relevant information
```

---

# 14. Contact

The Contact section should have a strong but simple closing CTA.

Recommended structure:

```text
Let's Connect

Short invitation

Email
GitHub
LinkedIn

Optional contact action
```

If a contact form is introduced, it requires database/security planning.

---

# 15. Footer

Keep the footer minimal.

Potential contents:

```text
Kenji Vargas
Full-Stack Developer

GitHub
LinkedIn
Email

© 2026
```

---

# 16. Theme System

The application must support:

```text
Light Mode
Dark Mode
```

Use semantic design tokens rather than component-specific hard-coded colors.

Conceptually:

```text
--background
--foreground
--card
--border
--muted
--primary
--primary-foreground
--accent
--ring
```

The exact values should be determined during implementation based on contrast and visual testing.

---

# 17. Theme Toggle

The theme toggle must:

* Be visible
* Be accessible
* Work with keyboard
* Work with touch
* Clearly indicate the current state
* Persist the selected theme
* Avoid flash/layout instability where practical

---

# 18. Typography

Use a small, consistent type system.

Recommended hierarchy:

```text
Display
 ↓
H1
 ↓
H2
 ↓
H3
 ↓
Body
 ↓
Metadata
```

Avoid excessive font families.

Typography should prioritize:

* Readability
* Clear hierarchy
* Responsive scaling
* Appropriate line height

---

# 19. Spacing

Use a consistent spacing system.

Sections should have generous vertical separation.

Mobile spacing should be reduced appropriately rather than simply scaling desktop values.

Avoid inconsistent arbitrary spacing values throughout the codebase.

---

# 20. Buttons

Buttons must be implemented as reusable components.

States should include where applicable:

```text
Default
Hover
Focus
Active
Disabled
Loading
```

Buttons must have appropriate touch targets.

Primary and secondary button styles should be visually distinct.

---

# 21. Cards

Cards should use a consistent visual system.

Base style direction:

```text
rounded-3xl
border border-border
bg-card/95
p-6
shadow-2xl
backdrop-blur-xl
```

Cards may add feature-specific styles where required.

Do not use cards for every piece of content.

---

# 22. Text Fields

Reusable text field components must support:

```text
Label
Input
Placeholder
Focus
Error
Disabled
Helper text
```

The visual system should remain consistent with the application's card and surface language.

---

# 23. Password Fields

Password fields must use the same reusable input system while providing appropriate password-specific behavior.

Where applicable:

* Show/hide control
* Accessible label
* Keyboard accessibility
* Error state
* Disabled state

Password fields are only required if an approved authentication feature eventually exists.

Do not implement authentication solely because a PasswordField component exists in the design system.

---

# 24. Mobile-First Rules

All components must begin with mobile styles.

Conceptually:

```css
/* Mobile base */
.component {
}

/* Larger layouts */
@media (...) {
}

/* Desktop */
@media (...) {
}
```

Do not design desktop first and retrofit mobile afterward.

---

# 25. Touch Interaction

Interactive elements should provide comfortable touch targets.

Avoid:

* Tiny links
* Closely packed buttons
* Hover-only actions
* Tiny theme toggles
* Desktop-only navigation interactions

---

# 26. Responsive Project Layout

On mobile:

```text
Image
 ↓
Title
 ↓
Description
 ↓
Technology
 ↓
Actions
```

On larger screens, this may become:

```text
┌────────────────┬────────────────┐
│                │                │
│ Project visual │ Project info   │
│                │                │
└────────────────┴────────────────┘
```

The exact layout can vary based on visual testing.

---

# 27. Animation

Animation should be subtle.

Allowed examples:

* Fade
* Small translate
* Hover transition
* Focus transition
* Theme transition

Avoid:

* Scroll hijacking
* Constant motion
* Excessive parallax
* Large entrance animations
* Decorative animation without purpose

Respect reduced-motion preferences.

---

# 28. Accessibility

The design must support:

* Semantic HTML
* Keyboard navigation
* Focus visibility
* Accessible labels
* Meaningful alt text
* Sufficient contrast
* Reduced-motion preferences
* Touch accessibility

Interactive controls must never rely exclusively on color or hover.

---

# 29. Component Architecture

The frontend should use feature-based organization.

Recommended:

```text
src/
├── features/
│   ├── portfolio/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   │
│   ├── projects/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── hooks/
│   │
│   └── contact/
│       ├── pages/
│       ├── components/
│       ├── services/
│       └── hooks/
│
├── shared/
│   ├── components/
│   ├── hooks/
│   └── services/
│
├── lib/
└── assets/
```

Only create layers that have a real purpose.

---

# 30. Shared UI Layer

Reusable primitives should live in a shared UI layer when they are genuinely shared.

Examples:

```text
Card
Button
TextField
PasswordField
Badge
Section
ThemeToggle
Navigation
```

Feature-specific components belong inside their feature.

---

# 31. Data Architecture and UI

UI components must not directly contain complex database access logic.

Use:

```text
Page
 ↓
Feature component
 ↓
Service
 ↓
Supabase client
 ↓
PostgreSQL
```

Hooks may coordinate fetching/state where appropriate.

This keeps data access separate from presentation.

---

# 32. Database-Aware Design

Database-backed content must account for:

```text
Loading
Empty
Success
Error
```

The UI must not assume that database requests always succeed.

---

# 33. Security-Aware UI

Do not expose administrative controls to public users.

Do not place secret credentials in frontend code.

Do not assume frontend hiding is a security mechanism.

Authorization must ultimately be enforced by the backend/database security model.

---

# 34. Performance

Avoid unnecessary:

* Large images
* JavaScript libraries
* Animation libraries
* API calls
* Repeated queries
* Component re-renders

Optimize assets appropriately.

---

# 35. Design Acceptance Criteria

Before the design is considered complete:

```text
[ ] Mobile layout works
[ ] Tablet layout works
[ ] Desktop layout works
[ ] Light mode works
[ ] Dark mode works
[ ] Theme persists
[ ] Navigation works
[ ] Touch interactions work
[ ] Keyboard navigation works
[ ] Focus states exist
[ ] Project presentation is clear
[ ] Typography is readable
[ ] Contrast is acceptable
[ ] Animations are restrained
[ ] Reduced motion is respected
[ ] UI primitives are consistent
[ ] No unnecessary visual complexity
```

---

# 36. Design Principle

The portfolio should communicate:

> **This is a developer who builds software, not simply a developer who designed a website.**

The visual design should therefore support evidence of engineering ability:

```text
Design
 +
Projects
 +
Architecture
 +
Technical details
 +
Real experience
 =
Developer credibility
```

The implementation must remain proportional to the portfolio's actual requirements.

---

# 37. Approval Status

This specification is currently:

```text
PROPOSED
```

It becomes an implementation source of truth only after explicit project-owner approval.

Major deviations from this specification require review according to `LOOP_ENGINEERING.md`.
