import { supabase } from '../../../lib/supabase.js'
import { defaultProjects } from '../../../shared/data/defaultPortfolioData.js'

export async function getPublishedProjects() {
  try {
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('project_id,slug,title,summary,problem_text,solution_text,contribution_text,status,is_featured,display_order,cover_asset_path,cover_alt_text')
      .eq('is_published', true)
      .order('display_order')
      .order('project_id')

    if (projectsError) {
      console.warn('Supabase projects fetch error, using default projects:', projectsError.message)
      return defaultProjects
    }
    if (!projects?.length) {
      return defaultProjects
    }

    const ids = projects.map((project) => project.project_id)
    const [technologiesResult, linksResult] = await Promise.all([
      supabase
        .from('project_technologies')
        .select('project_id,technology_id,technologies(technology_id,name,slug)')
        .in('project_id', ids),
      supabase
        .from('project_links')
        .select('link_id,project_id,link_type,label,url,display_order')
        .in('project_id', ids)
        .order('display_order')
        .order('link_id'),
    ])

    if (technologiesResult.error) throw technologiesResult.error
    if (linksResult.error) throw linksResult.error

    const technologiesByProject = new Map()
    for (const relationship of technologiesResult.data ?? []) {
      const group = technologiesByProject.get(relationship.project_id) ?? []
      if (relationship.technologies) group.push(relationship.technologies)
      technologiesByProject.set(relationship.project_id, group)
    }

    const linksByProject = new Map()
    for (const link of linksResult.data ?? []) {
      const group = linksByProject.get(link.project_id) ?? []
      group.push(link)
      linksByProject.set(link.project_id, group)
    }

    return projects.map((project) => ({
      ...project,
      technologies: (technologiesByProject.get(project.project_id) ?? [])
        .sort((a, b) => a.name.localeCompare(b.name)),
      links: linksByProject.get(project.project_id) ?? [],
    }))
  } catch (err) {
    console.warn('Supabase offline or unreachable, using default projects:', err)
    return defaultProjects
  }
}
