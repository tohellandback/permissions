import hooks from './hooks'

export default function initPermissions (ee) {
  if (!ee) {
    throw new Error('[@dmapper/permissions] initPermissions: ee is required')
  }

  ee.on('backend', backend => {
    if (!backend.hook) {
      throw new Error(
        'initPermissions: you must initialize the sharedb-hooks first'
      )
    }
    hooks(backend)
  })
}
