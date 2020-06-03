let localConfig

export function initConfig (config) {
  if (!config) {
    throw new Error('[@dmapper/permissions] initConfig: config is required')
  }
  if (localConfig) {
    throw new Error(
      '[@dmapper/permissions] initConfig: config already initialized'
    )
  }
  // TODO: Validate config structure
  localConfig = config
}

export function getConfig () {
  if (!localConfig) {
    throw new Error(
      '[@dmapper/permissions] getConfig: initialize ' +
      'config using initConfig before get it'
    )
  }
  return localConfig
}
