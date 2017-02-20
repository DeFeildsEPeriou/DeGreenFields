const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes.js');

require('./passport.js')(passport);

module.exports = (app, express) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({
    secret: 'ihavealteredourpactprayidonotalteritanyfurther',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  routes(app, passport);

  app.use(express.static(path.join(__dirname, '../build')));
};
