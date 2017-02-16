const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
mongoose.connect('mongodb://ericdevin:businessesusersandstuff@ds151059.mlab.com:51059/test-database');

app.use(express.static(path.join(__dirname, '/build')));


app.listen(PORT, () => {
  console.log('listening on 3000')
});

module.exports = app;
