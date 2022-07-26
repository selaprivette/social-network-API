const express = require('express');
const db = require('./config/connection.js');
const routes = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
});