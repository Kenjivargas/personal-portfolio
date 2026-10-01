import { supabase } from '../../../lib/supabase.js'
import { defaultProfile } from '../../../shared/data/defaultPortfolioData.js'

export async function getProfile() {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('profile_id,display_name,headline,short_intro,about_text')
      .eq('profile_id', 1)
      .maybeSingle()

    if (error) {
      console.warn('Supabase profile fetch error, using verified default:', error.message)
      return defaultProfile
    }
    return data ?? defaultProfile
  } catch (err) {
    console.warn('Supabase offline or unreachable, using default profile:', err)
    return defaultProfile
  }
}
