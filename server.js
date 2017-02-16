let path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')
let PORT = process.env.PORT || 3000;
const bodyparser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/build'));


app.use(express.static(path.join(__dirname, '/build')));


app.post('/login', (err,succes)=>{
  if(err){
    console.log(err);
  }else {
    console.log(succes);
  }
});

app.listen(PORT, function() {
  console.log('listening on 3000')
})
