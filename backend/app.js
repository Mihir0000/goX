const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const user = require('./routes/userRoute');
app.use('/', user);

module.exports = app;
