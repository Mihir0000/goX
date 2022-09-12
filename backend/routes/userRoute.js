const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const adminDashboardModel = require('../models/adminDashboard');
const tripModel = require('../models/tripModel');

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
        res.status(200).send({
            message: 'Login Successfully !',
            id: user.userId,
        });
    } else {
        res.status(403).send({ message: 'Invalid Login' });
    }
});

router.route('/admin/setPrice').post(async (req, res) => {
    const { userEmail, basePrice, rain, frost } = req.body;
    const user = await userModel.findOne({ userEmail });
    if (!user) {
        res.status(500).send({ message: 'Invalid User' });
    } else if (user.role === 'admin') {
        let admin = await adminDashboardModel.findOne({});
        if (!admin) {
            await adminDashboardModel.create({
                basePrice,
                rain,
                frost,
                lastUpdate: userEmail,
            });
            res.status(200).send({ message: 'Create Successfully.' });
        } else {
            await adminDashboardModel.updateOne(
                {},
                {
                    basePrice,
                    rain,
                    frost,
                    updateAt: Date.now(),
                    lastUpdate: userEmail,
                }
            );
            res.status(200).send({ message: 'Update Successfully.' });
        }
    } else {
        res.status(402).send({ message: "Sorry, You're not Admin !!" });
    }
});

router.route('/trip').post(async (req, res) => {
    const { userEmail, source, destination, distance, carType } = req.body;
    const user = await userModel.findOne({ userEmail });
    if (!user) {
        res.status(500).send({ message: 'Invalid User' });
    } else {
        const admin = await adminDashboardModel.findOne({});
        const isRainPrice = admin.rain ? admin.basePrice * 0.2 : 0;
        const isFrostPrice = admin.frost ? admin.basePrice * 0.3 : 0;
        const day = new Date().getDay();
        const isWeekend = day === 0 || day === 6 ? admin.basePrice * 0.3 : 0;
        const price =
            distance *
            (admin.basePrice + isRainPrice + isFrostPrice + isWeekend);
        console.log(price, day);
        await tripModel.create({
            userEmail,
            source,
            destination,
            distance,
            carType,
            amount: price,
        });
        res.status(200).send({ message: 'Booked Your trip', amount: price });
    }
});

router.route('/trip/singleUser').get(async (req, res) => {
    const { userEmail } = req.query;
    const allTrip = await tripModel.find({ userEmail });
    allTrip.sort((a, b) => b.id - a.id);
    console.log(allTrip.length);
    res.send({ allTrip });
});

router.route('/me').get(async (req, res) => {
    const { userEmail } = req.query;
    const user = await userModel.findOne({ userEmail });
    if (user) {
        res.status(200).send({ user });
    } else {
        res.status(402).send({ message: 'User Not Found' });
    }
});

router.route('/admin/allUsers').get(async (req, res) => {
    const { userEmail } = req.query;
    const user = await userModel.findOne({ userEmail });
    if (user && user.role === 'admin') {
        const alluser = await userModel.find({});
        res.status(200).send(alluser);
    } else {
        res.status(404).send({ message: 'Users Not Found' });
    }
});

module.exports = router;
