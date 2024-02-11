const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,//expires in 5 minutes

  }
});

otpSchema.pre('save', async function (next) {
});



module.exports = mongoose.model('OTP', otpSchema);