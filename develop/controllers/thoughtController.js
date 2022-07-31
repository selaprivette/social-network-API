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
        const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate({ username: req.body.username }, { $addToSet: { thoughts: thought._id } }, { new: true })
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
    await Thought.updateOne({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true });
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    console.log(req.params.thoughtId, thought);
    if (thought){
        res.json(thought)
       } else {
        res.status(404).json({message: 'No thought found'});
       }
 
},
async deleteThought(req, res) {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId})
    if (thought){
        res.json("thought deleted")
       } else {
        res.status(404).json({message: 'No thought found'});
       }
},
async addReaction(req,res) {
    await Thought.updateOne({ _id: req.params.thoughtId }, { $push: { reactions: req.body }, new: true, runValidators: true });
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (thought){
        res.json(thought)
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
