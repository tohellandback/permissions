import pluralize from 'pluralize'

export default function generateCollectionFromScope (scope) {
  if (!scope) {
    throw new Error(
      '[@dmapper/permissions] generateCollectionFromScope: scope is required'
    )
  }
  return pluralize.plural(scope)
}
