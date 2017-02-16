const mongoose = require('mongoose');

const RegularUser = new mongoose.Schema({
  username: String,
  password: String,
  bio: String,
  age: String,
  zip: Number,
});

const ru = mongoose.model('RegularUser', RegularUser);

module.exports = ru;
