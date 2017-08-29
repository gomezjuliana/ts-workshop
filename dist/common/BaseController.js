"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../services/logger");
class BaseController {
    constructor(server) {
        this.getRoutes().map((route) => {
            const path = `${this.getEndpoint()}/${route.path}`;
            const handler = route.handler || route.method;
            logger_1.logger.info(`Assigning route: ${route.method} => ${path} with handler ${handler}`);
            server[route.method](path, this[handler]);
        });
    }
    getRoutes() {
        return [{
                method: 'del',
                path: ':id'
            }, {
                method: 'get',
                path: ''
            }, {
                method: 'get',
                path: ':id'
            }, {
                method: 'post',
                path: ''
            }, {
                method: 'put',
                path: ':id'
            }];
    }
    getEndpoint() {
        return '';
    }
}
exports.default = BaseController;
