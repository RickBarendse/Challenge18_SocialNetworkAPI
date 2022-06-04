const router = require('express').Router();
const {
    addThoughts,
    addReactions
} = require('../../controllers/thoughts-controller');

// add users routes to thoughts route
router
    .route('/:usersId')
    .post(addThoughts);

router
    .route('/:usersId/:thoughtsId')
    //.put(addReactions);


module.exports = router;