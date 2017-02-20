module.exports = {
  githubAuth: {
    clientID: process.env.GITHUB_KEY,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: `${process.env.APP_URL}auth/github/callback`,
  },
  googleAuth: {
    clientID: process.env.GOOGLE_KEY,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: 'http://localhost:8080/auth/google/callback',
  },
  facebookAuth: {
    clientID: process.env.FACEBOOK_KEY, // your App ID
    clientSecret: process.env.FACEBOOK_SECRET, // your App Secret
    callbackURL: 'http://localhost:8080/auth/facebook/callback',
  },
};
