const { Schema, model } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    }
})


const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        ReactionSchema
    ]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

ThoughtSchema 
.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
})



const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;