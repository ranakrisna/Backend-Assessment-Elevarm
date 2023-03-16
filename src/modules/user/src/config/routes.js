const { verifyToken, isDriver, isAdmin } = require("./../application/middleware/auth");
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("./../application/middleware/user");
const UserController = require("./../application/controller/user");
const AuthController = require("./../application/controller/auth");


module.exports = function(router) {
  router.group("/api/v1", (route) => {
    route.post("/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], AuthController.signup);
    route.post("/signin", AuthController.signin);

    route.group("/users", (routes) => {
      routes.get('/', [verifyToken, isAdmin], UserController.getUsers);
      routes.get('/:id', [verifyToken, isAdmin], UserController.getUserById);
      routes.post('/', [verifyToken, isAdmin, checkDuplicateUsernameOrEmail, checkRolesExisted], UserController.saveUser);
      routes.put('/:id', [verifyToken, isAdmin, checkDuplicateUsernameOrEmail, checkRolesExisted], UserController.updateUser);
      routes.patch('/:id', [verifyToken, isAdmin], UserController.deleteUser);
      routes.delete('/force/:id', [verifyToken, isAdmin], UserController.forceDeleteUser);
    })
  });
};