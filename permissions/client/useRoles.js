import { useQuery } from 'startupjs'

export default function useRoles (
  scopeId,
  entityId,
  options = { inherited: false }
) {
  if (!scopeId) {
    throw new Error(
      '[@dmapper/permissions] useRoles: scopeId is required'
    )
  }
  if (!entityId) {
    throw new Error(
      '[@dmapper/permissions] useRoles: entityId is required'
    )
  }

  const rightQuery = { scopeId, entityId }
  if (!options.inherited) rightQuery.base = true
  const [rights] = useQuery('rights', { scopeId, entityId })
  let roles = {}
  for (const right of rights) Object.assign(roles, right.roles)
  // TODO: DO WE NEED HASH OF ROLES?
  return Object.keys(roles)
}
