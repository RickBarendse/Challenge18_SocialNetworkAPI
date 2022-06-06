const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThoughts,
    addThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// get all thoughts route
router
    .route('/')
    .get(getAllThoughts);

// get get, update, and delete thoughts routes
router
    .route('/:id')
    .get(getSingleThoughts) 
    .put(updateThoughts)
    .delete(deleteThoughts);

// add thoughts to user
router
    .route('/:usersId')
    .post(addThoughts);

// add reaction to thoughts
router
    .route('/:thoughtsId/reactions')
    .post(addReaction);

// delete reaction from thoughts
router
    .route('/:thoughtsId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;