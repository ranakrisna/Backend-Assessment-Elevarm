var bcrypt = require("bcrypt");
const User = require("./../model/user");
const Role = require("./../model/role");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
 
exports.saveUser = async (req, res) => {
    try {
        const user = new User(req.body);
        user.password = bcrypt.hashSync(req.body.password, 8)
        var roles = req.body.roles
        if (!roles) {
          roles = [constant.USER_ROLE]
        }
        user.roles = await Role.find({ name: { $in: roles } }).then((datas) => { return datas.map(data => data._id) })
        const inserteduser = await user.save();
        res.status(201).json(inserteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
exports.updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
exports.deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}