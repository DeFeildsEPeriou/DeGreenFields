const mongoose = require('mongoose');

const regularUser = new mongoose.Schema({
  name: String,
  bhp: Number,
  bstr: Number,
  bskl: Number,
  bspd: Number,
  bdef: Number,
  bres: Number,
});

const ru = mongoose.model('regularUser', regularUser);

module.exports = ru;
