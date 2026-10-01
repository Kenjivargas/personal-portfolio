import { useRemoteResource } from '../../../shared/hooks/useRemoteResource.js'
import { getContactLinks } from '../services/contactService.js'

export function useContactLinks() {
  return useRemoteResource(getContactLinks)
}
