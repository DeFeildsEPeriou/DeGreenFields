const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();
require('./server/middleware.js')(app, express);
require('./server/routes.js')(app, express);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_KEY);


app.post('/login', (err,succes)=>{
  if(err){
    console.log(err);
  }else {
    console.log(succes);
  }
});


app.listen(PORT, () => {
  console.log('listening on 3000')
});

module.exports = app;
