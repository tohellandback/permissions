import init from 'startupjs/init'
import orm from '../model'
import startupjsServer from 'startupjs/server'
import api from './api'
import getMainRoutes from '../main/routes'
import hooks from './hooks'
import initPermissions from './../permissions'
// Init startupjs ORM.
init({ orm })

// Check '@startupjs/server' readme for the full API
startupjsServer({
  hooks,
  getHead,
  appRoutes: [
    ...getMainRoutes()
  ]
}, ee => {
  initPermissions(ee)
  ee.on('routes', expressApp => {
    expressApp.use('/api', api)
  })
})

function getHead (appName) {
  return `
    <title>HelloWorld</title>
    <!-- Put vendor JS and CSS here -->
  `
}
