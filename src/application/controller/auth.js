const User = require('./../model/user');
const Role = require('./../model/role');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const constant = require('../../config/constant');

exports.signup = async (req, res) => {
  const model = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  var roles = req.body.roles

  if (!roles) {
    roles = [constant.USER_ROLE]
  }
  model.roles = await Role.find({ name: { $in: roles } }).then((datas) => { return datas.map(data => data._id) })
  await model.save();
  res.send({ message: "User was registered successfully!" });
};

exports.signin = async (req, res) => {
  const model = await User.findOne({
    username: req.body.username
  }).populate("roles", "-__v").exec()

  if (!model) {
    return res.status(404).send({ message: "User Not found." });
  }

  var passwordIsValid = bcrypt.compareSync(
    req.body.password,
    model.password
  );

  if (!passwordIsValid) {
    return res.status(401).send({
      message: "Username/Password Invalid!"
    });
  }

  var token = jwt.sign({ id: model._id }, process.env.APP_SECRET, {
    expiresIn: 86400 // 24 hours
  });

  var authorities = [];

  for (let i = 0; i < model.roles.length; i++) {
    authorities.push("ROLE_" + model.roles[i].name.toUpperCase());
  }
  res.status(200).send({
    id: model._id,
    username: model.username,
    email: model.email,
    roles: authorities,
    accessToken: token
  });
};