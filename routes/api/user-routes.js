const router = require('express').Router();
const {
    createUsers,
} = require('../../controllers/user-controller');

router.route('/')
    .post(createUsers);

module.exports = router;