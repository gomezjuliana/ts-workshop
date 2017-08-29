import * as restify from 'restify'

import { logger } from '../services/logger'
import BaseController from '../common/BaseController'

let data = require('../../data/posts.json')

export default class PostsController extends BaseController {

  constructor (server: restify.Server) {
    super(server)
  }

  protected getEndpoint (): string {
    return 'posts'
  }

  protected getRoutes (): Array<Object> {
    let postsRoutes: Array<Object> = super.getRoutes()

    postsRoutes.push({
      method: 'get',
      path: 'user/:id',
      handler: 'getByUser'
    })

    return postsRoutes
  }

  public del (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing del route')

    const postId = parseInt(req.params.id, 10)

    const newData = data.filter((user) => {
      if (user.id === postId) {
        return false
      }

      return true
    })

    if (newData.length === data.length) {
      res.json(404, 'No Post found with the given id.')
    } else {
      data = newData

      res.json(200, `Post with id ${postId} was deleted.`)
    }

    return next()
  }

  public get (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing get route')

    if (req.params.id) {
      const postId = parseInt(req.params.id, 10)

      const user = data.find((user) => user.id === postId)

      if (user) {
        res.json(200, user)
      } else {
        res.json(404, 'No Post found with the given id.')
      }
    } else {
      res.json(200, data)
    }

    return next()
  }

  public getByUser (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing get route')

    const postId = parseInt(req.params.id, 10)

    const result = data.filter((post) => post.userId = postId)

    res.json(200, data)

    return next()
  }

  public post (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing post route')

    const postId = parseInt(req.body.id, 10)

    const user = data.find((user) => user.id === postId)

    if (user) {
      res.json(500, 'There is a user with the given id.')

      return next()
    }

    data.push(req.body)

    res.json (201, 'Post created successfully.')

    return next()
  }

  public put (req: restify.Request, res: restify.Response, next: restify.Next) {
    logger.info('accessing put route')

    const postId = parseInt(req.params.id, 10)

    let foundIndex = -1

    const isFound = data.some((user, index) => {
      foundIndex = index

      return user.id === postId
    })

    if (!isFound) {
      res.json(500, 'There is not a user with the given id.')

      return next()
    }

    data[foundIndex] = req.body

    res.json(200, 'Post updated successfully.')

    return next()
  }
}