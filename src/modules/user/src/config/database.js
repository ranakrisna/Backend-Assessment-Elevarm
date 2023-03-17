initial = async () => {
    const constant = require('./constant');
    const Role = require('./../application/model/role')
    const estimate = await Role.estimatedDocumentCount();
    if (estimate === 0) {
        const roles = constant.ROLES.map((role) => {
            return {name: role};
        })
        await Role.create(roles);
    }
}

module.exports = {
    initial
}