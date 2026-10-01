-- Supabase Seed Data for Kenji Vargas Portfolio
-- Can be executed directly in the Supabase SQL Editor to populate verified data.

BEGIN;

-- 1. Insert Profile
INSERT INTO public.profiles (profile_id, display_name, headline, short_intro, about_text)
VALUES (
  1,
  'Kenji Vargas',
  'Full-Stack Developer building practical web systems.',
  'Specializing in scalable web architectures, modern React frontends, robust backend systems, and AI-assisted workflows.',
  'I am a Full-Stack Developer passionate about engineering practical, reliable, and user-centered software systems. With strong foundations in React, Laravel, and PostgreSQL, I specialize in architecting complex enterprise workflows, multi-tier data security, and responsive digital products. I combine disciplined engineering practices with modern AI-accelerated workflows to turn complex requirements into clean, maintainable software.'
)
ON CONFLICT (profile_id) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  headline = EXCLUDED.headline,
  short_intro = EXCLUDED.short_intro,
  about_text = EXCLUDED.about_text;

-- 2. Insert Profile Links
INSERT INTO public.profile_links (profile_id, link_type, label, href, display_order)
VALUES
  (1, 'email', 'Email', 'mailto:kenjivargas.dev@gmail.com', 1),
  (1, 'github', 'GitHub', 'https://github.com/kenjivargas', 2),
  (1, 'linkedin', 'LinkedIn', 'https://linkedin.com/in/kenjivargas', 3)
ON CONFLICT (profile_id, href) DO UPDATE SET
  link_type = EXCLUDED.link_type,
  label = EXCLUDED.label,
  display_order = EXCLUDED.display_order;

-- 3. Insert Technology Categories
INSERT INTO public.technology_categories (category_id, slug, name, display_order)
VALUES
  (1, 'frontend', 'Frontend', 1),
  (2, 'backend', 'Backend & APIs', 2),
  (3, 'database', 'Database & Storage', 3),
  (4, 'tools-workflow', 'Tools & Architecture', 4)
ON CONFLICT (category_id) DO UPDATE SET
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order;

-- 4. Insert Technologies
INSERT INTO public.technologies (technology_id, category_id, slug, name, display_order, show_in_stack)
VALUES
  -- Frontend
  (1, 1, 'react', 'React 19', 1, true),
  (2, 1, 'javascript', 'JavaScript (ESNext)', 2, true),
  (3, 1, 'html5-css3', 'HTML5 & CSS3', 3, true),
  (4, 1, 'tailwind-css', 'Tailwind / Modern CSS', 4, true),
  (5, 1, 'vite', 'Vite', 5, true),
  
  -- Backend
  (6, 2, 'laravel', 'Laravel', 1, true),
  (7, 2, 'php', 'PHP', 2, true),
  (8, 2, 'rest-apis', 'RESTful APIs', 3, true),
  (9, 2, 'rbac', 'RBAC & Auth', 4, true),
  
  -- Database
  (10, 3, 'postgresql', 'PostgreSQL', 1, true),
  (11, 3, 'supabase', 'Supabase', 2, true),
  (12, 3, 'relational-design', 'Relational Schema Design', 3, true),
  
  -- Tools
  (13, 4, 'git-github', 'Git & GitHub', 1, true),
  (14, 4, 'ai-workflows', 'AI-Assisted Engineering', 2, true),
  (15, 4, 'docker', 'Docker Basics', 3, true),
  (16, 4, 'system-architecture', 'System Architecture', 4, true)
ON CONFLICT (technology_id) DO UPDATE SET
  category_id = EXCLUDED.category_id,
  slug = EXCLUDED.slug,
  name = EXCLUDED.name,
  display_order = EXCLUDED.display_order,
  show_in_stack = EXCLUDED.show_in_stack;

-- 5. Insert Projects
INSERT INTO public.projects (
  project_id, slug, title, summary, problem_text, solution_text, contribution_text,
  status, is_published, is_featured, display_order, cover_asset_path, cover_alt_text
)
VALUES
  (
    1,
    'ismers-school-management',
    'ISMERS — Integrated School Management & Resource System',
    'Comprehensive enterprise educational platform managing facilities, visitors, records, legal contracts, and administrative workflows.',
    'Educational institutions struggle with fragmented, manual paper-based processes across facilities reservation, visitor logging, legal agreements, and departmental records, resulting in compliance delays and administrative overhead.',
    'Engineered an integrated multi-tier enterprise web platform uniting facilities scheduling, visitor badge workflows, contract lifecycle tracking, and secure document repositories under a unified administrative portal.',
    'Architected core system database models (PostgreSQL), developed role-based access control (RBAC) authorization logic, built RESTful endpoints, and designed modular responsive frontend interfaces with React.',
    'completed',
    true,
    true,
    1,
    NULL,
    NULL
  ),
  (
    2,
    'developer-portfolio-system',
    'High-Performance Portfolio & Content Engine',
    'Fast, accessible personal portfolio web application built with React 19, Supabase PostgreSQL, and strict monochrome design system.',
    'Standard portfolio templates often rely on heavy third-party bundles, lack structured database integrity, and suffer from poor mobile accessibility and layout shifts.',
    'Built a lightweight, zero-bloat portfolio platform utilizing React 19, Vite, normalized PostgreSQL schema with Row Level Security (RLS), and custom CSS tokens supporting light and dark modes.',
    'Designed the complete UI/UX, implemented feature-driven architecture, authored PostgreSQL migrations and RLS policies, and crafted accessible interactive controls.',
    'completed',
    true,
    false,
    2,
    NULL,
    NULL
  ),
  (
    3,
    'ai-workflow-automation-hub',
    'AI-Assisted Workflow Automation Pipeline',
    'Automated developer tooling suite combining AI prompt chains, code auditing rules, and continuous testing verification.',
    'Repetitive software development workflows, manual test verification, and inconsistent code review standards slow down release velocity.',
    'Integrated customized agentic AI engineering loops with automated linting, schema validation, and test feedback pipelines.',
    'Created custom developer scripts, prompt engineering chains, and integrated loop verification workflows for rapid feature iterations.',
    'in_progress',
    true,
    false,
    3,
    NULL,
    NULL
  )
ON CONFLICT (project_id) DO UPDATE SET
  slug = EXCLUDED.slug,
  title = EXCLUDED.title,
  summary = EXCLUDED.summary,
  problem_text = EXCLUDED.problem_text,
  solution_text = EXCLUDED.solution_text,
  contribution_text = EXCLUDED.contribution_text,
  status = EXCLUDED.status,
  is_published = EXCLUDED.is_published,
  is_featured = EXCLUDED.is_featured,
  display_order = EXCLUDED.display_order;

-- 6. Link Projects with Technologies
DELETE FROM public.project_technologies WHERE project_id IN (1, 2, 3);
INSERT INTO public.project_technologies (project_id, technology_id)
VALUES
  -- ISMERS: React, Laravel, PHP, PostgreSQL, REST APIs, RBAC
  (1, 1), (1, 6), (1, 7), (1, 8), (1, 9), (1, 10),
  -- Portfolio: React 19, Vite, Supabase, PostgreSQL, HTML5/CSS3
  (2, 1), (2, 5), (2, 10), (2, 11), (2, 3),
  -- AI Automation: AI Workflows, Git/GitHub, JavaScript, System Architecture
  (3, 14), (3, 13), (3, 2), (3, 16);

-- 7. Insert Project Links
DELETE FROM public.project_links WHERE project_id IN (1, 2, 3);
INSERT INTO public.project_links (project_id, link_type, label, url, display_order)
VALUES
  (1, 'case_study', 'System Overview', 'https://github.com/kenjivargas', 1),
  (1, 'repository', 'Source Code', 'https://github.com/kenjivargas', 2),
  (2, 'repository', 'GitHub Repository', 'https://github.com/kenjivargas/personal-portfolio', 1),
  (3, 'repository', 'Tooling Pipeline', 'https://github.com/kenjivargas', 1);

COMMIT;
