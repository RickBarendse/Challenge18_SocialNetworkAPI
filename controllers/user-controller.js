const { Users } = require('../models');

const usersController = {
// create User
createUsers({ body }, res) {
    Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.json(err));
    }   
};

module.exports = usersController;