const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const adminDashboardModel = require('../models/adminDashboard');
const tripModel = require('../models/tripModel');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.route('/').get((req, res) => {
  res.status(200).send({ message: 'Home Page' });
});
router.route('/register').post(async (req, res) => {
  const { userName, userEmail, password, role, carNo, carColor, carModelName } =
    req.body;
  let isExist = await userModel.findOne({ userEmail });
  if (isExist) {
    res.status(201).send({ message: "You're Already Registered" });
  } else {
    await userModel
      .create({
        userName,
        userEmail,
        password,
        role,
        carNo,
        carColor,
        carModelName,
      })
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
      name: user.userName,
    });
  } else {
    res.status(403).send({ message: 'Invalid Login' });
  }
});

router.route('/admin/setPrice').post(async (req, res) => {
  const {
    userEmail,
    basePrice,
    rain,
    frost,
    rainParcent,
    frostParcent,
    carType,
    description,
  } = req.body;
  const user = await userModel.findOne({ userEmail });
  if (!user) {
    res.status(500).send({ message: 'Invalid User' });
  } else if (user.role === 'admin') {
    let admin = await adminDashboardModel.findOne({});
    if (!admin) {
      await adminDashboardModel.create({
        rain,
        frost,
        lastUpdate: userEmail,
        rainParcent,
        frostParcent,
        carInfo: [{ basePrice, carType, description }],
      });
      res.status(200).send({ message: 'Create Successfully.' });
    } else {
      let allCar = admin.carInfo;
      let found = false;
      for (let i = 0; i < allCar.length; i++) {
        if (allCar[i].carType === carType) {
          allCar[i].basePrice = basePrice;
          allCar[i].description = description;
          found = true;
        }
      }
      if (found === false) {
        res.status(404).send({ message: 'Car Not Found' });
        return;
      }
      await adminDashboardModel.updateOne(
        {},
        {
          $set: {
            rain,
            frost,
            updateAt: Date.now(),
            lastUpdate: userEmail,
            rainParcent,
            frostParcent,
            carInfo: [...allCar],
          },
        }
      );
      res.status(200).send({ message: 'Update Successfully.' });
    }
  } else {
    res.status(402).send({ message: "Sorry, You're not Admin !!" });
  }
});

router.route('/admin/addCar').post(async (req, res) => {
  const { userEmail, basePrice, carType, description } = req.body;
  const user = await userModel.findOne({ userEmail });
  if (!user) {
    res.status(500).send({ message: 'Invalid User' });
  } else if (user.role === 'admin') {
    let admin = await adminDashboardModel.findOne({});
    if (admin) {
      let allCar = admin.carInfo;
      for (let i = 0; i < allCar.length; i++) {
        if (allCar[i].carType === carType) {
          res.status(403).send({
            message: 'Car is Already Added , You Can Update Car',
          });
          return;
        }
      }
      await adminDashboardModel.updateOne(
        {},
        {
          $set: {
            updateAt: Date.now(),
            lastUpdate: userEmail,
            carInfo: [...admin.carInfo, { basePrice, carType, description }],
          },
        }
      );
      res.status(200).send({ message: 'Car Added Successfully.' });
    }
  } else {
    res.status(402).send({ message: "Sorry, You're not Admin !!" });
  }
});

router.route('/admin/removeCar').put(async (req, res) => {
  const { removeCar, userEmail } = req.body;
  const user = await userModel.findOne({ userEmail });
  if (!user) {
    res.status(500).send({ message: 'Invalid User' });
  } else if (user.role === 'admin') {
    let admin = await adminDashboardModel.findOne({});
    if (admin) {
      let allCar = admin.carInfo;
      if (allCar.length === 0) {
        res.status(500).send({ message: 'Car Not Found !!' });
      }
      let car = allCar.filter((i) => i.carType !== removeCar);
      await adminDashboardModel.updateOne(
        {},
        {
          $set: {
            updateAt: Date.now(),
            lastUpdate: userEmail,
            carInfo: [...car],
          },
        }
      );
      res.status(200).send({ message: 'Car Delete Successfully.' });
    }
  } else {
    res.status(402).send({ message: "Sorry, You're not Admin !!" });
  }
});

router.route('/admin/setPrice').get(async (req, res) => {
  let setPrice = await adminDashboardModel.findOne({});
  res.status(200).send(setPrice);
});

router.route('/trip').post(async (req, res) => {
  const { userEmail, source, destination, distance, carType } = req.body;
  const user = await userModel.findOne({ userEmail });
  if (!user) {
    res.status(500).send({ message: 'Invalid User' });
  } else {
    const admin = await adminDashboardModel.findOne({});
    // console.log(admin);
    let allCar = admin.carInfo;
    let basePrice;
    let found = false;
    for (let i = 0; i < allCar.length; i++) {
      if (allCar[i].carType === carType) {
        basePrice = allCar[i].basePrice;
        found = true;
      }
    }
    if (found === false) {
      res.status(404).send({ message: 'Car Not Found' });
      return;
    }
    const isRainPrice = admin.rain ? (basePrice * admin.rainParcent) / 100 : 0;
    const isFrostPrice = admin.frost
      ? (basePrice * admin.frostParcent) / 100
      : 0;
    const day = new Date().getDay();
    const isWeekend = day === 0 || day === 6 ? basePrice * 0.3 : 0;
    const price = parseFloat(
      distance * (basePrice + isRainPrice + isFrostPrice + isWeekend)
    ).toFixed(2);
    await tripModel.create({
      userName: user.userName,
      createdAt: Date.now(),
      id: Date.now(),
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

router.route('/admin/totalData').get(async (req, res) => {
  const adminData = await adminDashboardModel.find({});
  res.send(adminData);
});

router.route('/trip/singleUser').get(async (req, res) => {
  const { userEmail } = req.query;
  const allTrip = await tripModel.find({ userEmail });
  allTrip.sort((a, b) => b.id - a.id);
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
  const alluser = await userModel.find({});
  res.status(200).send(alluser);
});

router.route('/admin/information').get(async (req, res) => {
  const allTrip = await tripModel.find({});
  const alluser = await userModel.find({});
  let totalBookedPrice = 0;
  for (let i = 0; i < allTrip.length; i++) {
    totalBookedPrice += allTrip[i].amount;
  }
  res.send({
    totalBookedPrice,
    totalTrips: allTrip.length,
    totalUsers: alluser.length,
  });
});

router.route('/admin/last10Trip').get(async (req, res) => {
  const allTrip = await tripModel.find({});
  allTrip.sort((a, b) => b.id - a.id);
  let tenTrip = [];
  for (let i = 0; i < 10; i++) {
    if (allTrip[i]) {
      tenTrip.push(allTrip[i]);
    }
  }
  res.status(200).send(tenTrip);
});
router.route('/trip/AllTrip').get(async (req, res) => {
  const allTrip = await tripModel.find({});
  allTrip.sort((a, b) => b.id - a.id);
  res.send({ allTrip });
});

router.route('/admin/updateRole').put(async (req, res) => {
  const { userId, updateRole } = req.body;
  const user = await userModel.findOne({ userId });
  if (user) {
    await userModel.updateOne(
      { userId: userId },
      { $set: { role: updateRole } }
    );
    res.status(200).send({ message: 'Update Successfully !' });
  } else {
    res.status(404).send({ message: 'Update Failed' });
  }
});

router.route('/admin/bookedTrip').get(async (req, res) => {
  let bookedTrip = await tripModel.find({ tripStatus: 'startTrip' });
  const onTheWay = await tripModel.find({ tripStatus: 'onTheWay' });
  bookedTrip.push(...onTheWay);
  bookedTrip.sort((a, b) => b.id - a.id);
  res.status(200).send(bookedTrip);
});

router.route('/driver/bookedTrip').get(async (req, res) => {
  let bookedTrip = await tripModel.find({ tripStatus: 'booked' });
  bookedTrip.sort((a, b) => b.id - a.id);
  res.status(200).send(bookedTrip);
});

router.route('/driver/trip').get(async (req, res) => {
  const { idx } = req.query;
  let allDriver = await userModel.find({ role: 'driver' });
  allDriver.sort((a, b) => b.userId - a.userId);
  const fixedDriver = allDriver.slice(0, 5);
  const foundDriver = fixedDriver[idx % 5];
  if (foundDriver) {
    res.send(foundDriver);
  } else {
    res.send({ message: 'Driver Not found' });
  }
});

router.route('/cancelTrip').put(async (req, res) => {
  const { id } = req.body;
  const trip = await tripModel.findOne({ id });
  if (!trip) {
    res.status(404).send({ message: 'Trip Not Found', cancelStatus: false });
  } else if (trip.tripStatus === 'cancel') {
    res.send(500).send({
      message: 'Trip is Already Cancelled before',
      cancelStatus: false,
    });
  } else {
    await tripModel.updateOne({ id }, { $set: { tripStatus: 'cancel' } });
    res
      .status(200)
      .send({ message: 'Trip is Succesfully Cancel Now', cancelStatus: true });
  }
});

router.route('/singleTripDetails').get(async (req, res) => {
  const { id } = req.query;
  const trip = await tripModel.findOne({ id });
  res.status(200).send(trip);
});

router.route('/driver/confirmTrip').put(async (req, res) => {
  const { id, assignDriver } = req.body;
  const trip = await tripModel.findOne({ id });
  if (trip.tripStatus !== 'booked') {
    res.send({ message: 'Trip is Already taken.', acceptStatus: false });
  } else {
    const num = () => Math.floor(Math.random() * 10);
    let otp = '';
    for (let i = 0; i < 4; i++) {
      otp += num();
    }
    let driver = await userModel.findOne({ userEmail: assignDriver });
    const { carNo, carColor, carModelName, userName } = driver;
    await tripModel
      .updateOne(
        { id },
        {
          $set: {
            assignDriver: assignDriver,
            tripStatus: 'startTrip',
            otp1: otp,
            carNo,
            carColor,
            carModelName,
            driverName: userName,
          },
        }
      )
      .then((data) => {
        res.send({
          message: 'Successfully start trip',
          acceptStatus: true,
          otp,
        });
      })
      .catch((err) => {
        res.send({ err, acceptStatus: false });
      });
  }
});

router.route('/driver/onTheWay').put(async (req, res) => {
  const { id } = req.body;
  const trip = await tripModel.findOne({ id });
  if (!trip) {
    res.send({ message: 'Cannot Find Trip', onTheWay: false });
  } else if (trip.tripStatus === 'cancel') {
    res
      .status(501)
      .send({ message: 'So Sorry, Trip is Cancelled Now', onTheWay: false });
  } else if (trip.tripStatus === 'onTheWay') {
    res.status(422).send({ message: 'Trip is On The Way', onTheWay: false });
  } else {
    const num = () => Math.floor(Math.random() * 10);
    let otp = '';
    for (let i = 0; i < 4; i++) {
      otp += num();
    }
    await tripModel
      .updateOne({ id }, { $set: { tripStatus: 'onTheWay', otp2: otp } })
      .then((data) => {
        res.send({ message: 'Trip is onTheWay', onTheWay: true, otp });
      })
      .catch((err) => {
        res.send({ err, message: 'Cannot update Data', onTheWay: false });
      });
  }
});

router.route('/driver/endTrip').put(async (req, res) => {
  const { id } = req.body;
  const trip = await tripModel.findOne({ id });
  if (!trip) {
    res.send({ message: 'Cannot Find Trip', endTrip: false });
  } else if (trip.tripStatus === 'cancel') {
    res
      .status(501)
      .send({ message: 'So Sorry, Trip is Cancelled', endTrip: false });
  } else if (trip.tripStatus === 'endTrip') {
    res
      .status(422)
      .send({ message: 'Trip is Already ended.', onTheWay: false });
  } else {
    await tripModel
      .updateOne({ id }, { $set: { tripStatus: 'endTrip' } })
      .then((data) => {
        res.send({ message: 'Trip is End Now', endTrip: true });
      })
      .catch((err) => {
        res.send({ err, message: 'Cannot update Data', endTrip: false });
      });
  }
});

router.route('/driver/activeTrip').get(async (req, res) => {
  const { userEmail } = req.query;
  const driverStartTrip = await tripModel.find({
    assignDriver: userEmail,
    tripStatus: 'startTrip',
  });
  let driverOntheWayTrip = await tripModel.find({
    assignDriver: userEmail,
    tripStatus: 'onTheWay',
  });
  driverOntheWayTrip.push(...driverStartTrip);
  res.send({ driverOntheWayTrip });
});

router.route('/driver/tripHistory').get(async (req, res) => {
  const { userEmail } = req.query;
  const driverTripHistory = await tripModel.find({ assignDriver: userEmail });
  res.send(driverTripHistory);
});
router.route('/generateOTP').get(async (req, res) => {
  const num = () => Math.floor(Math.random() * 10);
  let otp = '';
  for (let i = 0; i < 4; i++) {
    otp += num();
  }
  // console.log(otp);
  res.send({ otp });
});

router.route('/driver/last24Hrs').get(async (req, res) => {
  const { userEmail } = req.query;
  const allTrip = await tripModel.find({ assignDriver: userEmail });
  const timestamps = new Date().setHours(0, 0, 0, 0);
  let trips = [];
  let amount = 0;
  for (let i = 0; i < allTrip.length; i++) {
    if (allTrip[i].id >= timestamps) {
      trips.push(allTrip[i]);
      amount += allTrip[i].amount;
    }
  }
  res.status(200).send({ trips, amount });
});

// stripe payment
router.route('/stripePayment').post(async (req, res) => {
  const { selectedPrice } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: selectedPrice * 100,
    currency: 'inr',
    metadata: {
      company: 'goX',
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

router.route('/sendStripeApiKey').get(async (req, res) => {
  res.status(200).send({ stripeApiKey: process.env.STRIPE_API_KEY });
});

module.exports = router;
