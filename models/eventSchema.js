const mongoose = require('mongoose');

const Events = new mongoose.Schema({
  username: String,
  eventTime: Date,
  location: String,
  createdAt: Date,
  tags: String,
  businessName: String,
  picLink: String,
  busLink: String,
  description: String,
});

const ev = mongoose.model('Events', Events);

module.exports = ev;
