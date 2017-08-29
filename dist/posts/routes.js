"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostsController_1 = require("./PostsController");
exports.default = (server) => {
    const controller = new PostsController_1.default(server);
};
