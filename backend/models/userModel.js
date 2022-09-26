const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    default: Date.now(),
  },
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  carNo: {
    type: String,
    default: '',
  },
  carColor: {
    type: String,
    default: '',
  },
  carModelName: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('User', userSchema);
