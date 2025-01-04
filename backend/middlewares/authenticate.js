const passport = require('passport');
require('../config/authJWT');

const authenticateGoogle = (req, res, next) => {
  passport.authenticate('google', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      })
    }

    if (user) {
      req.user = user;
      return next();
    }
  }) (req, res, next);
}

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err || !user) {
      return authenticateGoogle(req, res, next);
    }

    if (user) {
      req.user = user;
      return next();
    }
  }) (req, res, next);
}

module.exports = authenticate;