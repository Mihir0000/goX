const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Home Page' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port no: ${process.env.PORT}`);
});
