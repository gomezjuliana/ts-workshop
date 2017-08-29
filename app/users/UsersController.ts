import * as restify from 'restify'

import { logger } from '../services/logger'
import BaseController from '../common/BaseController'

let data = require('../../data/users.json')

export default class UsersController extends BaseController {

  constructor (server: restify.Server) { //this receives 1 param and it's type is restify.server
    super(server)//this calls to the parent and passes the server too
  }

  protected getEndpoint (): string {
    return 'users'
  }

  public del (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing del route')

    const userId = parseInt(req.params.id, 10)

    const newData = data.filter((user) => {
      if (user.id === userId) {
        return false
      }

      return true
    })

    if (newData.length === data.length) {
      res.json(404, 'No User found with the given id.')
    } else {
      data = newData

      res.json(200, `User with id ${userId} was deleted.`)
    }

    return next()
  }

  public get (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing get route')

    if (req.params.id) {
      const userId = parseInt(req.params.id, 10)

      const user = data.find((user) => user.id === userId)

      if (user) {
        res.json(200, user)
      } else {
        res.json(404, 'No User found with the given id.')
      }
    } else {
      res.json(200, data)
    }

    return next()
  }

  public post (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing post route')

    const userId = parseInt(req.body.id, 10)

    const user = data.find((user) => user.id === userId)

    if (user) {
      res.json(500, 'There is a user with the given id.')

      return next()
    }

    data.push(req.body)

    res.json(201, 'User created successfully.')

    return next()
  }

  public put (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing put route')

    const userId = parseInt(req.params.id, 10)

    let foundIndex = -1

    const isFound = data.some((user, index) => {
      foundIndex = index

      return user.id === userId
    })

    if (!isFound) {
      res.json(500, 'There is not a user with the given id.')

      return next()
    }

    data[foundIndex] = req.body

    res.json(200, 'User updated successfully.')

    return next()
  }
}