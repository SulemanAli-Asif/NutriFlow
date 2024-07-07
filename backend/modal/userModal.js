const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  user_id: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    enum: ['basic', 'premium'],
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paymentFrequency: {
    type: String,
    enum: ['yearly', 'lifetime'],
    default: function() {
      return this.plan === 'basic' ? 'yearly' : 'lifetime';
    }
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: function() {
      if (this.plan === 'basic') {
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return oneYearFromNow;
      } else if(this.plan==='premium') {
        return null; //for the lifetime part
      }
    }
  }
});

//renewing the basic plan for another year
UserSchema.methods.renewBasicPlan = function() {
  if (this.plan === 'basic') {
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    this.expiryDate = oneYearFromNow;
    this.isPaid = true;
  }
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
