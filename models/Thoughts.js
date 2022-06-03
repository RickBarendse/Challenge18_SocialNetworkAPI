const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const ReactionsSchema = new Schema(
    {
        // set up custom id to avoid confustion with parent thoughts_id
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,   
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
    toJSON: {
        getters: true
        }
    }
);

const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        },
        // use ReactionSchema to validate date for a reaction
        reactions: [ReactionsSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtsSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;