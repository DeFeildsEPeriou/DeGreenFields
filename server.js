const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').load();

require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, passport);


mongoose.connect(process.env.MONGO_KEY, (err) => {
  if (err) {
    console.log('No database connectivity');
  } else {
    console.log('Database connected');
  }
});


app.listen(PORT, () => {
  console.log('listening on 3000')
});

module.exports = app;
