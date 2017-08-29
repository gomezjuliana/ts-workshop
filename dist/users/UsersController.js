"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../services/logger");
const BaseController_1 = require("../common/BaseController");
let data = require('../../data/users.json');
class UsersController extends BaseController_1.default {
    constructor(server) {
        super(server); //this calls to the parent and passes the server too
    }
    getEndpoint() {
        return 'users';
    }
    del(req, res, next) {
        logger_1.logger.info('accessing del route');
        const userId = parseInt(req.params.id, 10);
        const newData = data.filter((user) => {
            if (user.id === userId) {
                return false;
            }
            return true;
        });
        if (newData.length === data.length) {
            res.json(404, 'No User found with the given id.');
        }
        else {
            data = newData;
            res.json(200, `User with id ${userId} was deleted.`);
        }
        return next();
    }
    get(req, res, next) {
        logger_1.logger.info('accessing get route');
        if (req.params.id) {
            const userId = parseInt(req.params.id, 10);
            const user = data.find((user) => user.id === userId);
            if (user) {
                res.json(200, user);
            }
            else {
                res.json(404, 'No User found with the given id.');
            }
        }
        else {
            res.json(200, data);
        }
        return next();
    }
    post(req, res, next) {
        logger_1.logger.info('accessing post route');
        const userId = parseInt(req.body.id, 10);
        const user = data.find((user) => user.id === userId);
        if (user) {
            res.json(500, 'There is a user with the given id.');
            return next();
        }
        data.push(req.body);
        res.json(201, 'User created successfully.');
        return next();
    }
    put(req, res, next) {
        logger_1.logger.info('accessing put route');
        const userId = parseInt(req.params.id, 10);
        let foundIndex = -1;
        const isFound = data.some((user, index) => {
            foundIndex = index;
            return user.id === userId;
        });
        if (!isFound) {
            res.json(500, 'There is not a user with the given id.');
            return next();
        }
        data[foundIndex] = req.body;
        res.json(200, 'User updated successfully.');
        return next();
    }
}
exports.default = UsersController;
