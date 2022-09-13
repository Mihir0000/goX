const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        default: Date.now(),
    },
    source: {
        type: String,
        require: true,
    },
    destination: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    carType: {
        type: String,
        required: true,
    },
    tripStatus: {
        type: String,
        default: 'booked',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model('TripDetails', tripSchema);
