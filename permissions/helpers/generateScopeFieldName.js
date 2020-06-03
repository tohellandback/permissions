export default function generateScopeKeyName (scope) {
  if (!scope) {
    throw new Error(
      '[@dmapper/permissions] generateScopeKeyName: scope is required'
    )
  }
  return scope + 'Id'
}
