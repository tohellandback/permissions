export default function generateScopeKeyName (entity) {
  if (!entity) {
    throw new Error(
      '[@dmapper/permissions] generateScopeKeyName: entity is required'
    )
  }
  return entity + 'Id'
}
