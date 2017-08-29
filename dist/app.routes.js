"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// combine routes
const routes_1 = require("./users/routes");
const routes_2 = require("./posts/routes");
exports.default = (server) => {
    routes_1.default(server);
    routes_2.default(server);
};
