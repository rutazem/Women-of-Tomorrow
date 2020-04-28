const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  // Log-in Data
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['Mentor', 'Mentee']
  },
}, 
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  //Personal Data
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  surname: {
    type: String,
    required: true,
    minlength: 2
  },
  age: {
    type: Number,
    min: 0,
    max: 99
  }, // Date of birth would be better 
  location: {
    country: String,
    city: String
  }, // require from the route where you show the signup-form .. and then I would render all the options into the signup-form
  phone: {
    type: Number,
    max: 15
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
  LinkedInProfile: {
    type: String,
    validate: {
      validator: (text) => {
        return text.indexOf('https://www.linkedin.com/') === 0;
      },
      message: "linkedinProfile must start with 'https://www.linkedin.com/'"
    }
  },
  followers: {
    type: Number
  },
  network: {
    type: Number
  }
})
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;