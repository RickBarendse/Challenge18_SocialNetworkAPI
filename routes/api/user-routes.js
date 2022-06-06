const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// get all users and create user routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

// get, update, and delete single user routes
router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers)

// add and delete friend for a user
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;