const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema(
  {
    username: String,
    password: String,
    linkedinID: String,

    ///// need more clarity with this
    role: {
      type: String,
      enum : ['mentor','mentee']

    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
 
const User = mongoose.model('User', userSchema);
 
module.exports = User;