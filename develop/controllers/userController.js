const { User, Thought } = require('../models');

module.exports = {
async getUsers(req, res) {
   const users = await User.find().populate({ path: 'thoughts' }).populate({ path: 'friends' });
   if (users){
    res.json(users)
   } else {
    res.status(404).json({message: 'No users'});
   }
},
async createUser(req, res) {
    const user = await User.create(req.body)
    res.json(user)
},
async getSingleUser(req, res) {
    const user = await User.findOne({ _id: req.params.userId }).populate({ path: 'thoughts' }).populate({ path: 'friends' });
    if (user){
        res.json(user)
       } else {
        res.status(404).json({message: 'No user found'});
       }
},
async updateUser(req, res)  {
    const user = await User.findOneAndUpdate({ _id: req.params.userId }).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (user){
        res.json(user)
       } else {
        res.status(404).json({message: 'No user found'});
       }
 
},
async deleteUser(req, res) {
    const user = await User.findOneAndDelete({ _id: req.params.userId}).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (user){
        res.json(user)
       } else {
        res.status(404).json({message: 'No user found'});
       }
},
async addFriend(req,res) {
    const user = await User.findOneAndUpdate({ _id: req.params.userId}).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (user){
        res.json(user)
       } else {
        res.status(404).json({message: 'No user found'});
       }
},
async removeFriend(req, res) {
    const user = await User.findOneAndDelete({ _id: req.params.userId}).populate({path:'thoughts'}).populate({path:'friends'}); 
    if (user){
        res.json(user)
       } else {
        res.status(404).json({message: 'No user found'});
       }
}
}
