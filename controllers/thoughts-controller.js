const { Thoughts, Users } = require('../models');

const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _d: -1 })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get single thought by id
    getSingleThoughts({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.sendStatus(440);
            });
    },

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
            { $push: { reactions: body } },
            { new: true, runValidators: true })
            .populate({path: 'reactions', select: '-__v'})
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({ message: 'No user found with this id!!' });
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.json(err));
    },

    // update thought by ID
    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id '});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    // delete thought by ID
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err));
    },

    // delete reaction by ID
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, 
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true})
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts with this ID!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    }
 };

module.exports = thoughtsController;