export const defaultProfile = {
  profile_id: 1,
  display_name: 'Kenji Vargas',
  headline: 'Full-Stack Developer building practical web systems.',
  short_intro: 'Specializing in scalable web architectures, modern React frontends, robust backend systems, and AI-assisted workflows.',
  about_text: 'I am a Full-Stack Developer passionate about engineering practical, reliable, and user-centered software systems. With strong foundations in React, Laravel, and PostgreSQL, I specialize in architecting complex enterprise workflows, multi-tier data security, and responsive digital products. I combine disciplined engineering practices with modern AI-accelerated workflows to turn complex requirements into clean, maintainable software.',
}

export const defaultProfileLinks = [
  { link_id: 1, link_type: 'email', label: 'Email', href: 'mailto:kenjivargas.dev@gmail.com', display_order: 1 },
  { link_id: 2, link_type: 'github', label: 'GitHub', href: 'https://github.com/kenjivargas', display_order: 2 },
  { link_id: 3, link_type: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/kenjivargas', display_order: 3 },
]

export const defaultTechnologyStack = [
  {
    category_id: 1,
    slug: 'frontend',
    name: 'Frontend',
    display_order: 1,
    technologies: [
      { technology_id: 1, name: 'React 19', slug: 'react' },
      { technology_id: 2, name: 'JavaScript (ESNext)', slug: 'javascript' },
      { technology_id: 3, name: 'HTML5 & CSS3', slug: 'html5-css3' },
      { technology_id: 4, name: 'Tailwind / Modern CSS', slug: 'tailwind-css' },
      { technology_id: 5, name: 'Vite', slug: 'vite' },
    ],
  },
  {
    category_id: 2,
    slug: 'backend',
    name: 'Backend & APIs',
    display_order: 2,
    technologies: [
      { technology_id: 6, name: 'Laravel', slug: 'laravel' },
      { technology_id: 7, name: 'PHP', slug: 'php' },
      { technology_id: 8, name: 'RESTful APIs', slug: 'rest-apis' },
      { technology_id: 9, name: 'RBAC & Auth', slug: 'rbac' },
    ],
  },
  {
    category_id: 3,
    slug: 'database',
    name: 'Database & Storage',
    display_order: 3,
    technologies: [
      { technology_id: 10, name: 'PostgreSQL', slug: 'postgresql' },
      { technology_id: 11, name: 'Supabase', slug: 'supabase' },
      { technology_id: 12, name: 'Relational Schema Design', slug: 'relational-design' },
    ],
  },
  {
    category_id: 4,
    slug: 'tools-workflow',
    name: 'Tools & Architecture',
    display_order: 4,
    technologies: [
      { technology_id: 13, name: 'Git & GitHub', slug: 'git-github' },
      { technology_id: 14, name: 'AI-Assisted Engineering', slug: 'ai-workflows' },
      { technology_id: 15, name: 'Docker Basics', slug: 'docker' },
      { technology_id: 16, name: 'System Architecture', slug: 'system-architecture' },
    ],
  },
]

export const defaultProjects = [
  {
    project_id: 1,
    slug: 'ismers-school-management',
    title: 'ISMERS — Integrated School Management & Resource System',
    summary: 'Comprehensive enterprise educational platform managing facilities, visitors, records, legal contracts, and administrative workflows.',
    problem_text: 'Educational institutions struggle with fragmented, manual paper-based processes across facilities reservation, visitor logging, legal agreements, and departmental records, resulting in compliance delays and administrative overhead.',
    solution_text: 'Engineered an integrated multi-tier enterprise web platform uniting facilities scheduling, visitor badge workflows, contract lifecycle tracking, and secure document repositories under a unified administrative portal.',
    contribution_text: 'Architected core system database models (PostgreSQL), developed role-based access control (RBAC) authorization logic, built RESTful endpoints, and designed modular responsive frontend interfaces with React.',
    status: 'completed',
    is_published: true,
    is_featured: true,
    display_order: 1,
    cover_asset_path: null,
    cover_alt_text: null,
    technologies: [
      { technology_id: 1, name: 'React 19' },
      { technology_id: 6, name: 'Laravel' },
      { technology_id: 7, name: 'PHP' },
      { technology_id: 10, name: 'PostgreSQL' },
      { technology_id: 8, name: 'REST APIs' },
      { technology_id: 9, name: 'RBAC Security' },
    ],
    links: [
      { link_id: 1, link_type: 'case_study', label: 'System Overview', url: 'https://github.com/kenjivargas' },
      { link_id: 2, link_type: 'repository', label: 'GitHub Repository', url: 'https://github.com/kenjivargas' },
    ],
  },
  {
    project_id: 2,
    slug: 'developer-portfolio-system',
    title: 'High-Performance Portfolio & Content Engine',
    summary: 'Fast, accessible personal portfolio web application built with React 19, Supabase PostgreSQL, and strict monochrome design system.',
    problem_text: 'Standard portfolio templates often rely on heavy third-party bundles, lack structured database integrity, and suffer from poor mobile accessibility and layout shifts.',
    solution_text: 'Built a lightweight, zero-bloat portfolio platform utilizing React 19, Vite, normalized PostgreSQL schema with Row Level Security (RLS), and custom CSS tokens supporting light and dark modes.',
    contribution_text: 'Designed the complete UI/UX, implemented feature-driven architecture, authored PostgreSQL migrations and RLS policies, and crafted accessible interactive controls.',
    status: 'completed',
    is_published: true,
    is_featured: false,
    display_order: 2,
    cover_asset_path: null,
    cover_alt_text: null,
    technologies: [
      { technology_id: 1, name: 'React 19' },
      { technology_id: 5, name: 'Vite' },
      { technology_id: 10, name: 'PostgreSQL' },
      { technology_id: 11, name: 'Supabase' },
      { technology_id: 3, name: 'HTML5 & CSS3' },
    ],
    links: [
      { link_id: 3, link_type: 'repository', label: 'GitHub Repository', url: 'https://github.com/kenjivargas/personal-portfolio' },
    ],
  },
  {
    project_id: 3,
    slug: 'ai-workflow-automation-hub',
    title: 'AI-Assisted Workflow Automation Pipeline',
    summary: 'Automated developer tooling suite combining AI prompt chains, code auditing rules, and continuous testing verification.',
    problem_text: 'Repetitive software development workflows, manual test verification, and inconsistent code review standards slow down release velocity.',
    solution_text: 'Integrated customized agentic AI engineering loops with automated linting, schema validation, and test feedback pipelines.',
    contribution_text: 'Created custom developer scripts, prompt engineering chains, and integrated loop verification workflows for rapid feature iterations.',
    status: 'in_progress',
    is_published: true,
    is_featured: false,
    display_order: 3,
    cover_asset_path: null,
    cover_alt_text: null,
    technologies: [
      { technology_id: 14, name: 'AI-Assisted Engineering' },
      { technology_id: 13, name: 'Git & GitHub' },
      { technology_id: 2, name: 'JavaScript' },
      { technology_id: 16, name: 'System Architecture' },
    ],
    links: [
      { link_id: 4, link_type: 'repository', label: 'Tooling Pipeline', url: 'https://github.com/kenjivargas' },
    ],
  },
]
