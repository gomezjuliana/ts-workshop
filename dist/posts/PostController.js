"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../services/logger");
const BaseController_1 = require("../common/BaseController");
let data = require('../../data/posts.json');
class PostsController extends BaseController_1.default {
    constructor(server) {
        super(server);
    }
    getEndpoint() {
        return 'posts';
    }
    getRoutes() {
        let postsRoutes = super.getRoutes();
        postsRoutes.push({
            method: 'get',
            path: 'user/:id',
            handler: 'getByUser'
        });
        return postsRoutes;
    }
    del(req, res, next) {
        logger_1.logger.info('accessing del route');
        const postId = parseInt(req.params.id, 10);
        const newData = data.filter((user) => {
            if (user.id === postId) {
                return false;
            }
            return true;
        });
        if (newData.length === data.length) {
            res.json(404, 'No Post found with the given id.');
        }
        else {
            data = newData;
            res.json(200, `Post with id ${postId} was deleted.`);
        }
        return next();
    }
    get(req, res, next) {
        logger_1.logger.info('accessing get route');
        if (req.params.id) {
            const postId = parseInt(req.params.id, 10);
            const user = data.find((user) => user.id === postId);
            if (user) {
                res.json(200, user);
            }
            else {
                res.json(404, 'No Post found with the given id.');
            }
        }
        else {
            res.json(200, data);
        }
        return next();
    }
    getByUser(req, res, next) {
        logger_1.logger.info('accessing get route');
        const postId = parseInt(req.params.id, 10);
        const result = data.filter((post) => post.userId = postId);
        res.json(200, data);
        return next();
    }
    post(req, res, next) {
        logger_1.logger.info('accessing post route');
        const postId = parseInt(req.body.id, 10);
        const user = data.find((user) => user.id === postId);
        if (user) {
            res.json(500, 'There is a user with the given id.');
            return next();
        }
        data.push(req.body);
        res.json(201, 'Post created successfully.');
        return next();
    }
    put(req, res, next) {
        logger_1.logger.info('accessing put route');
        const postId = parseInt(req.params.id, 10);
        let foundIndex = -1;
        const isFound = data.some((user, index) => {
            foundIndex = index;
            return user.id === postId;
        });
        if (!isFound) {
            res.json(500, 'There is not a user with the given id.');
            return next();
        }
        data[foundIndex] = req.body;
        res.json(200, 'Post updated successfully.');
        return next();
    }
}
exports.default = PostsController;
