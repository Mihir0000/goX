const express = require('express');
const router = express.Router();


router.route('/').get((req, res) => {
    res.status(200).send({ message: 'Home Page' });
});
router.route('/register').get((req, res) => {
    res.send({ message: 'register Page' });
});

module.exports = router;
