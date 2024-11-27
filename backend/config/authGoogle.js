const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User.model');

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5050/api/auth/google/callback',
  passReqToCallback: true,
};

const verify = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({googleId: profile.id});
    if (existingUser) {
      return done(null, existingUser, {message: 'User found'});
    }

    const currentUser = await User.findById(request.query.state);
    if (currentUser) {
      currentUser.googleId = profile.id;
      currentUser.googleAccessToken = accessToken;
      await currentUser.save();
      return done(null, currentUser, {message: 'Link to Google account successfully'});
    }

    const newUser = new User({
      googleId: profile.id,
      googleAccessToken: accessToken,
      email: profile.email,
      username: profile._json.name,
    })
    
    await newUser.save();
    done(null, newUser, {message: 'User created successfully'});
  } catch (error) {
    done(error);
  }
}

const Google = new GoogleStrategy(options, verify);
passport.use(Google);