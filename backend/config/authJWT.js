const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../models/User.model');

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    try {
      if (!username || !password) {
        return done(null, false, {message: 'Incorrect username or password'});
      }

      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, {message: 'Incorrect username'});
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, {message: 'Incorrect password'});
      }

      return done(null, user, {message: 'Logged in successfully'});
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (!user) {
        return done(null, false, {message: 'User not found'});
      }

      return done(null, user, {message: 'User found'});
    } catch (error) {
      return done(error);
    }
  }
));

