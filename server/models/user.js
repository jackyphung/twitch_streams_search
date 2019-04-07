const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  password: String,
  user_role: {
    type: String,
    default: "user"
  },
  birthDate: String,
  gender: String,
  bio: {
    type: String,
    default: "Hi! This is my profile."
  },
  dateJoined: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model('users', userSchema);