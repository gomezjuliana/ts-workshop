import * as fs from 'fs'
import * as restify from 'restify'
import { settings } from './config/config'
import { logger } from './services/logger'
import routes from './app-routes'

export let server = restify.createServer({
  name: settings.name // doesn't need this but it's available
})

server.use(restify.plugins.jsonBodyParser({ mapParams: true }))
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser({ mapParams: true }))
server.use(restify.plugins.fullResponse())

routes(server) // this maps the API routes -> stop telling the server to keep getting info, just auto map it!

server.listen(settings.port, function () { //listen to this port and when it starts
  logger.info(`INFO: ${settings.name} is running at ${server.url}`) // log where the server is running
})