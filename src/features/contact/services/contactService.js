import { supabase } from '../../../lib/supabase.js'
import { defaultProfileLinks } from '../../../shared/data/defaultPortfolioData.js'

export async function getContactLinks() {
  try {
    const { data, error } = await supabase
      .from('profile_links')
      .select('link_id,link_type,label,href,display_order')
      .eq('profile_id', 1)
      .order('display_order')
      .order('link_id')

    if (error) {
      console.warn('Supabase contact links fetch error, using default contact links')
      return defaultProfileLinks
    }
    return data && data.length > 0 ? data : defaultProfileLinks
  } catch (err) {
    console.warn('Supabase offline or unreachable, using default contact links:', err)
    return defaultProfileLinks
  }
}
