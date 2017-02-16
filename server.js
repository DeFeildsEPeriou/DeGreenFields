const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes.js')

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/build')));

mongoose.connect('mongodb://ericdevin:businessesusersandstuff@ds151059.mlab.com:51059/test-database');

app.listen(PORT, () => {
  console.log('listening on 3000')
});

module.exports = app;
