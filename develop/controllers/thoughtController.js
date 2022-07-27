const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        const thoughts = await Thought.find().populate({path:'reactions'});
        if (thoughts){
            res.json(thoughts)
           } else {
            res.status(404).json({message: 'No thoughts found'});
           }
    },
    async createThought(req, res) {
        const thought = await Thought.create(req.body)
        const user = await User.findOneAndUpdate({ _id: req.params.userId }).populate({path:'thoughts'}).populate({path:'users'}); 
        if (user){
            res.json(thought)
           } else {
            res.status(404).json({message: 'User not found'});
           }
     
    },
    async getOneThought(req, res) {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        if (thought){
            res.json(thought)
           } else {
            res.status(404).json({message: 'No thought found'});
           }
},
async updateThought(req, res)  {
    const thoughts = await Thought.findOneAndUpdate({ _id: req.params.ThoughtId }).populate({path:'thoughts'})
    if (thought){
        res.json(thought)
       } else {
        res.status(404).json({message: 'No thought found'});
       }
 
},
async deleteThought(req, res) {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId}).populate({path:'reactions'})
    if (thought){
        res.json(thought)
       } else {
        res.status(404).json({message: 'No thought found'});
       }
},
async addReaction(req,res) {
    const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId}).populate({path:'reactions'})
    if (users){
        res.json(users)
       } else {
        res.status(404).json({message: 'Thought not found'});
       }
},
async removeReaction(req, res) {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId}).populate({path:'reactions'})
    if (thought){
        res.json({message: 'Reaction deleted'})
       } else {
        res.status(404).json({message: 'Reaction not deleted'});
       }
}

}
