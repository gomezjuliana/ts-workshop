"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsersController_1 = require("./UsersController");
//receives server, instals and controls routes
exports.default = (server) => {
    const controller = new UsersController_1.default(server);
};
