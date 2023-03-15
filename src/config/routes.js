
const { verifyToken, isDriver, isAdmin } = require("./../application/middleware/auth");
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("./../application/middleware/user");
const UserController = require("./../application/controller/user");
const AuthController = require("./../application/controller/auth");


module.exports = function(router) {
  router.group("/api/v1/", (route) => {
    route.post("signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], AuthController.signup);
    route.post("signin", AuthController.signin);

    route.get("/public", UserController.publicBoard);
    route.get("/user", [verifyToken], UserController.userBoard);
    route.get("/driver",[verifyToken, isDriver],UserController.driverBoard);
    route.get("/admin", [verifyToken, isAdmin], UserController.adminBoard);
  });
};