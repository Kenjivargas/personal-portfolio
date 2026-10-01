import { supabase } from '../../../lib/supabase.js'
import { defaultTechnologyStack } from '../../../shared/data/defaultPortfolioData.js'

export async function getTechnologyStack() {
  try {
    const [categoriesResult, technologiesResult] = await Promise.all([
      supabase
        .from('technology_categories')
        .select('category_id,slug,name,display_order')
        .order('display_order')
        .order('category_id'),
      supabase
        .from('technologies')
        .select('technology_id,category_id,slug,name,display_order')
        .eq('show_in_stack', true)
        .order('display_order')
        .order('technology_id'),
    ])

    if (categoriesResult.error || technologiesResult.error) {
      console.warn('Supabase tech stack fetch issue, using default tech stack')
      return defaultTechnologyStack
    }

    const technologiesByCategory = new Map()
    for (const technology of technologiesResult.data ?? []) {
      const group = technologiesByCategory.get(technology.category_id) ?? []
      group.push(technology)
      technologiesByCategory.set(technology.category_id, group)
    }

    const categories = (categoriesResult.data ?? [])
      .map((category) => ({
        ...category,
        technologies: technologiesByCategory.get(category.category_id) ?? [],
      }))
      .filter((category) => category.technologies.length > 0)

    return categories.length > 0 ? categories : defaultTechnologyStack
  } catch (err) {
    console.warn('Supabase offline or unreachable, using default tech stack:', err)
    return defaultTechnologyStack
  }
}
