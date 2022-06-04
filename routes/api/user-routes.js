const router = require('express').Router();
const {
    getAllUsers,
    getUsersById,
    createUsers,
} = require('../../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

router
    .route('/:id')
    .get(getUsersById);

module.exports = router;