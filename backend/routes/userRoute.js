const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.route('/').get((req, res) => {
    res.status(200).send({ message: 'Home Page' });
});
router.route('/register').post(async (req, res) => {
    const { userName, userEmail, password } = req.body;
    let isExist = await userModel.findOne({ userEmail });
    if (isExist) {
        res.status(201).send({ message: "You're Already Registered" });
    } else {
        await userModel
            .create({ userName, userEmail, password })
            .then(() => {
                res.status(200).send({ message: 'Register Successfully !' });
            })
            .catch((err) => {
                res.status(201).send({ message: err });
            });
    }
});
router.route('/login').post(async (req, res) => {
    const { userEmail, password } = req.body;
    let user = await userModel.findOne({ userEmail });
    if (!userEmail || !password) {
        res.status(401).send({ message: 'Email or Password cannot be empty' });
    } else if (!user) {
        res.status(401).send({ message: 'Please Register First' });
    } else if (userEmail === user.userEmail && password === user.password) {
        res.status(200).send({ message: 'Login Successfully !' });
    } else {
        res.status(403).send({ message: 'Invalid Login' });
    }
});

module.exports = router;
