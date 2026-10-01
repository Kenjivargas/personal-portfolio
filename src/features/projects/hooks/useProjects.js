import { useRemoteResource } from '../../../shared/hooks/useRemoteResource.js'
import { getPublishedProjects } from '../services/projectService.js'

export function useProjects() {
  return useRemoteResource(getPublishedProjects)
}
