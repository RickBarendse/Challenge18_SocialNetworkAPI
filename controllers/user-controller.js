const { Users } = require('../models');

const usersController = {
    // get all users
    getAllUsers(req, res) {
        Users.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //get single user by id
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // create User
    createUsers({ body }, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.json(err));
        }   
};

module.exports = usersController;