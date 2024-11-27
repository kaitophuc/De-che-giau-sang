const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register } = require('../controllers/user/auth');
require('../config/authJWT');
require('../config/authGoogle');

const authenticate = require('../middlewares/authenticate');

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

authRouter.post('/register', register);

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.json({success: false, message: 'Unauthorized'});
    }

    req.login(user, {session: false}, (err) => {
      if (err) {
        return res.json({success: false, message: `Error: ${err}`});
      }

      const payload = {
        id: user._id,
        username: user.username,
        password: user.password,
        email: user.email,
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.json({payload, token});
    })
  }) (req, res);
});

authRouter.get('/verify-token', passport.authenticate('jwt', {failureRedirect: 'http:localhost:5173/login', session: false}), (req, res) => {
  const userPublicData = {
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  }
  // console.log(userPublicData);
  res.status(200).json({
    success: true,
    user: userPublicData,
  })
})

authRouter.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user,
    })
  }
})

authRouter.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  })
})

authRouter.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((err) => {
      res.clearCookie('connect.sid');
      res.json()
    })
  })
})

authRouter.get('/google/sync/:userId', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: req.params.userId
  })(req, res, next); 
});

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {failureRedirect: 'http://localhost:5173/login', successRedirect: 'http://localhost:5173/', session: false}),
  (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).send('Authentication failed');
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).send('Internal Server Error');
    }
  }
)

authRouter.get('/microsoft', passport.authenticate('microsoft', {scope: ['profile', 'email']}));

authRouter.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', {failureRedirect: 'http://localhost:5173/login', session: false}),
  (req, res) => {
    try {
      if (!req.user || !req.user.microsoftAccessToken) {
        return res.status(400).send('Authentication failed');
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).send('Internal Server Error');
    }
  }
)

module.exports = authRouter;