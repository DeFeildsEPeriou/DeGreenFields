const logic = require('./server-logic.js');
const path = require('path');

module.exports = (app, passport) => {
  // middleware passport function verifying logged-in status
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/login');
  }
  // begin regular routes
  app.route('/')
    .get(isLoggedIn, (req, res) => {
      res.sendFile(path.join(__dirname, '..', '/public/index.html'));
    });
  app.route('/login')
    .get((req, res) => {
      res.sendFile(path.join(__dirname, '..', '/public/login.html'));
    });
  app.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/login');
    });
  app.route('/profile')
    .get(isLoggedIn, (req, res) => {
      res.sendFile('../public/profile.html');
    });
  app.route('/api/:id')
    .get(isLoggedIn, (req, res) => {
      // Passport attaches user's Github info to req.user.github so we can
      // access it on the front-end later
      res.json(req.user.github);
    });
  // The route to be used when user logs in via Github
  app.route('/auth/github')
    .get(passport.authenticate('github'));
  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  // Google log-in routes
  app.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }));
    // the callback after google has authenticated the user
  app.route('/auth/google/callback')
    .get(passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  // Facebook log-in routes
  app.route('/auth/facebook')
    .get(passport.authenticate('facebook', { scope: 'email' }));
    // handle the callback after facebook has authenticated the user
  app.route('/auth/facebook/callback')
    .get(passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/login',
    }));

  /* AUTHORIZE ROUTES FOR LINKING ACCOUNTS: */

  // Facebook -------------------------------

  // send to facebook to do the authentication
  app.get('/connect/facebook', passport.authorize('facebook', { scope: 'email' }));
  // handle the callback after facebook has authorized the user
  app.get('/connect/facebook/callback',
    passport.authorize('facebook', {
      successRedirect: '/profile',
      failureRedirect: '/',
    }));
  // Google ---------------------------------
  app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));
  // the callback after google has authorized the user
  app.get('/connect/google/callback',
    passport.authorize('google', {
      successRedirect: '/profile',
      failureRedirect: '/',
    }));
  // Github ---------------------------------
  app.get('/connect/github', passport.authorize('github'));
  // the callback after google has authorized the user
  app.get('/connect/github/callback',
    passport.authorize('github', {
      successRedirect: '/profile',
      failureRedirect: '/',
    }));

  app.get('/get/events', logic.getEvents);

  app.post('/post/event', logic.postEvent);
};
