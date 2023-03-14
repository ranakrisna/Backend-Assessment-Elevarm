import { Router } from 'express';
import RouteGroup from 'express-route-grouping';

const root = new RouteGroup('/', Router());

const { verifyToken, isDriver, isAdmin } = require("./../application/middleware/auth");
const { checkDuplicateUsernameOrEmail, checkRolesExisted } = require("./../application/middleware/user");
const UserController = require("./../application/controller/user");
const AuthController = require("./../application/controller/auth");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });
  app.group("/api/v1", (router) => {
      router.post("signup", [checkDuplicateUsernameOrEmail, checkRolesExisted],AuthController.signup);
      router.post("signin", AuthController.signin);
  });
  app.get("/api/test/public", UserController.publicBoard);
  app.get("/api/test/user", [verifyToken], UserController.userBoard);
  app.get("/api/test/driver",[verifyToken, isDriver],UserController.driverBoard);
  app.get("/api/test/admin", [verifyToken, isAdmin], UserController.adminBoard);
};