const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const user = require('./routes/userRoute');
app.use('/', user);

module.exports = app; 
