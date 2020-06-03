import pluralize from 'pluralize'

export default function generateScopeFromCollection (collection) {
  if (!collection) {
    throw new Error(
      '[@dmapper/permissions] generateScopeFromCollection: ' +
      'collection is required'
    )
  }
  return pluralize.singular(collection)
}
