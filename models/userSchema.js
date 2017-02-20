const mongoose = require('mongoose');

const RegularUser = new mongoose.Schema({
  github: {
    id: String,
    displayName: String,
    username: String,
    publicRepos: Number,
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  local: {
    username: String,
    password: String,
    bio: String,
    age: String,
    zip: Number,
  },
});

const ru = mongoose.model('RegularUser', RegularUser);

module.exports = ru;
