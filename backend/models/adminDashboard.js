const mongoose = require('mongoose');

const adminDashboardSchema = mongoose.Schema({
    rain: {
        type: Boolean,
        required: true,
    },
    frost: {
        type: Boolean,
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
    lastUpdate: {
        type: String,
        required: true,
    },
    rainParcent: {
        type: Number,
    },
    frostParcent: {
        type: Number,
    },
    carInfo: [
        {
            basePrice: {
                type: Number,
                required: true,
            },
            carType: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('adminDashboards', adminDashboardSchema);
