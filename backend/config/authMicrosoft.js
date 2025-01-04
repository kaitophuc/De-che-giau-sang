const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const User = require('../models/User.model');
const { sync_microsoft_outlook } = require('../utils/calendar_sync.js');

const options = {
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
  callbackURL: 'http://localhost:5050/api/auth/microsoft/callback',
  passReqToCallback: true,
}

const verify = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({microsoftId: profile.id});
    if (existingUser) {
      sync_microsoft_outlook(existingUser);
      return done(null, existingUser, {message: 'User found'});
    }

    const currentUser = await User.findById(request.query.state);
    if (currentUser) {
      currentUser.microsoftId = profile.id;
      currentUser.microsoftAccessToken = accessToken;
      currentUser.microsoftRefreshToken = refreshToken;
      await currentUser.save();
      sync_microsoft_outlook(currentUser);
      return done(null, currentUser, {message: 'Link to Microsoft account successfully'});
    }

    const newUser = new User({
      microsoftId: profile.id,
      microsoftAccessToken: accessToken,
      microsoftRefreshToken: refreshToken,
      email: profile.emails[0].value,
      username: profile.displayName,
    })

    await newUser.save();
    sync_microsoft_outlook(newUser);
    done(null, newUser, {message: 'User created successfully'});
  } catch (error) {
    done(error);
  }
}

const Microsoft = new MicrosoftStrategy(options, verify);
passport.use(Microsoft);