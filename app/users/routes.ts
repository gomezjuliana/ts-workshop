import UsersController from './UsersController'

//receives server, instals and controls routes
export default (server) => {
  const controller: UsersController = new UsersController(server);
}