const User = require('./../model/user');
const constant = require('./../../config/constant');

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  var where = {
    $or: [
      { username: req.body.username },
      { email: req.body.email }
    ]
  }
  if(typeof req.params.id !== 'undefined'){
    where["$nor"] = [{_id: req.params.id}]
  }
  const model = await User.findOne(where).exec()
  if (model) {
    res.status(400).send({ message: "Failed! Username/Email is already in use!" });
    return;
  }
  next();
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!constant.ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};