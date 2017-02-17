const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, express);

mongoose.connect('mongodb://ericdevin:businessusersstuff@ds153659.mlab.com:53659/whatshappenin');

app.listen(PORT, () => {
  console.log('listening on 3000')
});

module.exports = app;
