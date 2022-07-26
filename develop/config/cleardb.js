const db = require('./connection');
const { User, Thought } = require('../models');

console.time('Clearing the database');
db.once('open', async () => {
    await User.deleteMany();
    await Thought.deleteMany();
    console.timeEnd('Database cleared');
    process.exit(0);
});