const express = require('express');
require('dotenv').config();
const app = express();

app.use('/api/v1/jokes', require('./controllers/jokes-router'));
app.use(express.static('public'));
app.use(express.json());

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
