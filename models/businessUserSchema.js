const mongoose = require('mongoose');

const BusinessUser = new mongoose.Schema({
  username: String,
  password: String,
  bio: String,
  age: String,
  address: String,
  busName: String,
});

const bu = mongoose.model('BusinessUser', BusinessUser);

module.exports = bu;
