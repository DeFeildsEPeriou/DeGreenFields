const mongoose = require('mongoose');

const Events = new mongoose.Schema({
  name: String,
  bhp: Number,
  bstr: Number,
  bskl: Number,
  bspd: Number,
  bdef: Number,
  bres: Number

});

const ev = mongoose.model('Events', Events);

module.exports = ev;
