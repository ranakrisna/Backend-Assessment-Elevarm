const jwt = require("jsonwebtoken");
const User = require('./../model/user');
const Role = require('./../model/role');
const constant = require("../../config/constant");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  const model = await User.findById(req.userId).exec()
  const roles = await Role.find({ _id: { $in: model.roles } }).then((datas) => { return datas.map(data => data.name) })
  if (!roles.includes(constant.ADMIN_ROLE)) {
    res.status(403).send({ message: `Require ${constant.ADMIN_ROLE} Role!` });
    return;
  }
  next();
};

isDriver = async (req, res, next) => {
  const model = await User.findById(req.userId).exec()
  const roles = await Role.find({ _id: { $in: model.roles } }).then((datas) => { return datas.map(data => data.name) })
  if (!roles.includes(constant.DRIVER_ROLE)) {
    res.status(403).send({ message: `Require ${constant.DRIVER_ROLE} Role!` });
    return;
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isDriver
};