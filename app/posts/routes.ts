import PostsController from './PostsController'

export default (server) => {
  const controller: PostsController = new PostsController(server);
}