"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restify = require("restify");
const config_1 = require("./config/config");
const logger_1 = require("./services/logger");
const app_routes_1 = require("./app-routes");
exports.server = restify.createServer({
    name: config_1.settings.name // doesn't need this but it's available
});
exports.server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
exports.server.use(restify.plugins.acceptParser(exports.server.acceptable));
exports.server.use(restify.plugins.queryParser({ mapParams: true }));
exports.server.use(restify.plugins.fullResponse());
app_routes_1.default(exports.server); // this maps the API routes -> stop telling the server to keep getting info, just auto map it!
exports.server.listen(config_1.settings.port, function () {
    logger_1.logger.info(`INFO: ${config_1.settings.name} is running at ${exports.server.url}`); // log where the server is running
});
