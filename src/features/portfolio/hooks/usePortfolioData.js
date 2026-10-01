import { useRemoteResource } from '../../../shared/hooks/useRemoteResource.js'
import { getProfile } from '../services/profileService.js'
import { getTechnologyStack } from '../services/technologyService.js'

export function usePortfolioData() {
  const profile = useRemoteResource(getProfile)
  const technologyStack = useRemoteResource(getTechnologyStack)
  return { profile, technologyStack }
}
