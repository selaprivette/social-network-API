const { Schema, model } = require('mongoose');
// **User**:

// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // * Must match a valid email address (look into Mongoose's matching validation)
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/i],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId, ref: 'Thought',

            }
        ],
        friends: [
           { type: Schema.Types.ObjectId, ref: 'User',
           } 
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

UserSchema
.virtual('friendCount')
.get(function () {
    return this.friends.length;
})


const User = model('User', UserSchema);
module.exports = User;