const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
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
        required: true,
    },
    carType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = mongoose.model('TripDetails', tripSchema);
