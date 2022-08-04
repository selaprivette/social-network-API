const { User, Thought } = require('../models');

module.exports = {
async getAllUsers(req, res) {
   const users = await User.find().populate({ path: 'thoughts' }).populate({ path: 'friends' });
   if (users){
    res.json(users)
   } else {
    res.status(404).json({message: 'No users'});
   }
},
async createUser(req, res) {
    const users = await User.create(req.body)
    res.json(users)
},
async getSingleUser(req, res) {
    const users = await User.findOne({ _id: req.params.userId }).populate({ path: 'thoughts' }).populate({ path: 'friends' });
    if (users){
        res.json(users)
       } else {
        res.status(404).json({message: 'No user found'});
       }
},
async updateUser(req, res)  {
    await User.updateOne({ _id: req.params.userId }, req.body, { new: true, runValidators: true });
    const users = await User.findOne({ _id: req.params.userId }).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (users){
        res.json(users)
       } else {
        res.status(404).json({message: 'No user found'});
       }
 
},
async deleteUser(req, res) {
    const users = await User.findOneAndDelete({ _id: req.params.userId}).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (users){
        res.json(users)
       } else {
        res.status(404).json({message: 'No user found'});
       }
},
async addFriend(req,res) {
    const users = await User.findOneAndUpdate({ _id: req.params.userId}).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (users){
        res.json(users)
       } else {
        res.status(404).json({message: 'No user found'});
       }
},
async removeFriend(req, res) {
    const users = await User.findOneAndDelete({ _id: req.params.userId}).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (users){
        res.json(users)
       } else {
        res.status(404).json({message: 'No user found'});
       }
}
}
