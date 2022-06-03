const { Schema, model, default: mongoose } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');
require('mongoose-type-email');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true  

        },
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        // prevents virtuals from creating duplicate of _id as 'id'
        id: false
    }
);

// get total count of friends on retrieval
UserSchema.virtual('friendsCount').get(function() {
    return this.friends.reduce(
        (total, friends) => total + friends.length + 1,
        0
    );
});

const Users = model('Users' , UserSchema);
module.exports = Users;