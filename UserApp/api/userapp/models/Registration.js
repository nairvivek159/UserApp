const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  mobileNumber: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('Registration', registrationSchema);
