const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  // Log-in Data
  username: String,
  password: String,
  linkedinID: String,
  //Personal Data
  name: {
    type: String,
    // required: true,
    minlength: 2
  },
  surname: {
    type: String,
    // required: true,
    minlength: 2
  },
  age: {
    type: Number,
    min: 0,
    max: 99
  }, // Date of birth would be better 
  country: {type: String},
  city: {type: String},
  phone: {
    type: Number,
    max: 15
  },
  email: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default: ''
  }, // TDB Default Image
  //Professional Profile

  bioDescription: {
    type: String
  },
  professionalField: {
    type: String,
    enum: ['Web-development', 'UX/UI', 'Product Management', 'Data Science']
  },
  position: {
    type: String
  },
  followers: {
    type: Number
  },
  network: {
    type: Number
  },
  role: {
    type: String,
    enum: ['Mentor', 'Mentee']
  }
})

const User = mongoose.model('User', userSchema);

module.exports = User;