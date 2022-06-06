const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true  

        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validateEmail, 'Please provide a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
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
UsersSchema.virtual('friendsCount').get(function() {
    return this.friends.length;
});

const Users = model('Users', UsersSchema);

module.exports = Users;