// combine routes
import users from './users/routes'
import posts from './posts/routes'

export default (server) => {
  users(server)
  posts(server)
}