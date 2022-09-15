const mongoose = require('mongoose');

const adminDashboardSchema = mongoose.Schema({
    basePrice: {
        type: Number,
        required: true,
    },
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
});

module.exports = mongoose.model('adminDashboards', adminDashboardSchema);
