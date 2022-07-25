const { User, Thought } = require('../models');

module.exports = {
async getUsers(req, res) {
   const users = await User.find().populate({ path: 'thoughts' }).populate({ path: 'friends' });
   if (users){
    res.json(users)
   } else {
    res.status(404).json({message: 'No users'});
   }
}
}