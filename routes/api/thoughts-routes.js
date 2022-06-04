const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThoughts,
    addThoughts,
    addReaction,
    updateThoughts,
    deleteThoughts
} = require('../../controllers/thoughts-controller');

// add thought routes
router
    .route('/')
    .get(getAllThoughts);


router
    .route('/:id')
    .get(getSingleThoughts) 
    .put(updateThoughts)
    .delete(deleteThoughts);

// add users routes to thoughts route
router
    .route('/:usersId')
    .post(addThoughts);

router
    .route('/:usersId/:thoughtsId')
    .put(addReaction);


module.exports = router;