import useRoles from './useRoles'
import { getConfig } from './../model'

export default function usePermissions (scopeId, entityId) {
  const config = getConfig()

  if (!scopeId) {
    throw new Error(
      '[@dmapper/permissions] usePermissions: scopeId is required'
    )
  }
  if (!entityId) {
    throw new Error(
      '[@dmapper/permissions] usePermissions: entityId is required'
    )
  }

  const roles = useRoles(scopeId, entityId, { inherited: true })

  let permissionsList = []
  for (const role of roles) {
    permissionsList = permissionsList.concat(config.permissions[role])
  }

  const permissions = {}
  for (const permission of permissionsList) permissions[permission] = true
  return permissions
}
