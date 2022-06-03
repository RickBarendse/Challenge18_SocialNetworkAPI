const { Thoughts, Users } = require('../models');

const thoughtsController = {
    // add thought to user
    addThoughts({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return Users.findOneAndUpdate(
                    { _id: params.usersId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUsersData => {
                console.log(dbUsersData);
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { replies: body } },
            { new: true, runValidators: true }
        )
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No user found with this id!!' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.json(err));
    },
};

module.exports = thoughtsController;