const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const configAuth = require('./auth.js');
const RegularUser = require('./../models/userSchema.js');

module.exports = (passport) => {
  // Local login

  passport.use(new LocalStrategy(
    (username, password, done) => {
      RegularUser.findOne({ username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    },
  ));
  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  }, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      RegularUser.findOne({ 'github.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        }
        const newUser = new RegularUser();

        newUser.github.id = profile.id;
        newUser.github.username = profile.username;
        newUser.github.displayName = profile.displayName;
        newUser.github.publicRepos = profile._json.public_repos;

        return newUser.save((error) => {
          if (error) {
            throw error;
          }
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use(new GoogleStrategy({
    clientID: configAuth.googleAuth.clientID,
    clientSecret: configAuth.googleAuth.clientSecret,
    callbackURL: configAuth.googleAuth.callbackURL,
  }, (token, refreshToken, profile, done) => {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
    process.nextTick(() => {
            // try to find the user based on their google id
      RegularUser.findOne({ 'google.id': profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
            // if a user is found, log them in
          return done(null, user);
        }
          // if the user isnt in our database, create a new user
        const newUser = new RegularUser();
          // set all of the relevant information
        newUser.google.id = profile.id;
        newUser.google.token = token;
        newUser.google.name = profile.displayName;
        newUser.google.email = profile.emails[0].value; // pull the first email

        // save the user
        return newUser.save((error) => {
          if (error) {
            throw error;
          }
          return done(null, newUser);
        });
      });
    });
  }));

  passport.use(new FacebookStrategy({
        // pull in our app id and secret from our auth.js file
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
  },
  // facebook will send back the token and profile
  (token, refreshToken, profile, done) => {
      // asynchronous
    process.nextTick(() => {
      // find the user in the database based on their facebook id
      RegularUser.findOne({ 'facebook.id': profile.id }, (err, user) => {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err) {
          return done(err);
        }
        // if the user is found, then log them in
        if (user) {
          return done(null, user); // user found, return that user
        }
        // if there is no user found with that facebook id, create them
        const newUser = new RegularUser();

        // set all of the facebook information in our user model
        newUser.facebook.id = profile.id; // set the users facebook id
        newUser.facebook.token = token; // we will save the token that facebook provides to the user
        newUser.facebook.name = `${profile.name.givenName} ${profile.name.familyName}`; // look at the passport user profile to see how names are returned
        newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
        // save our user to the database
        return newUser.save((error) => {
          if (error) {
            throw error;
          }
          // if successful, return the new user
          return done(null, newUser);
        });
      });
    });
  }));
};
