const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { register } = require('../controllers/user/auth');
require('../config/authJWT');
require('../config/authGoogle');
require('../config/authMicrosoft');

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

// authRouter.get('/verify-token', passport.authenticate('jwt', {session: false}), (req, res) => {
//   const userPublicData = {
//     _id: req.user._id,
//     username: req.user.username,
//     email: req.user.email,
//   }
//   // console.log(userPublicData);
//   res.status(200).json({
//     success: true,
//     user: userPublicData,
//   })
// })

authRouter.get('/verify-token', (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(200).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    console.log("User", user);

    const userPublicData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    }

    res.status(200).json({
      success: true,
      user: userPublicData
    });
  })(req, res, next);
});

// authRouter.get('/verify-google', (req, res, next) => {
//   passport.authenticate('google', {session: false}, (err, user, info) => {
//     if (err || !user) {
//       return res.status(500).json({
//         success: false,
//         message: 'Unauthorized'
//       });
//     }

//     console.log("User", user);

//     const userPublicData = {
//       _id: user._id,
//       username: user.username,
//       email: user.email,
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Authorized',
//     });
//   })(req, res, next);
// })

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

authRouter.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Failed to logout'});
    }

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to destroy session'});
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, message: 'Logged out successfully'});
    })
  })
})

authRouter.get('/google/sync/:userId', (req, res, next) => {
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'],
    state: req.params.userId,
    accessType: 'offline',
    prompt: 'consent',
  })(req, res, next); 
});

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {failureRedirect: 'http://localhost:5173/auth', successRedirect: 'http://localhost:5173/', session: false}),
  (req, res) => {
    try {
      if (!req.user || !req.user.googleAccessToken) {
        return res.status(400).send('Authentication failed');
      }
    } catch (error) {
      console.error("Error", error);
      res.status(500).send('Internal Server Error');
    }
  }
)

authRouter.get('/verify-google', (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log("User", user);
    console.log("Google Id", user.googleId);
    if (err || !user || user.googleId === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Authorized',
    });
  }) (req, res, next);
});

authRouter.get('/microsoft/sync/:userId', (req, res, next) => {
  passport.authenticate('microsoft', {
    scope: ['openid', 'email', 'profile', 'User.Read', 'Calendars.Read', 'offline_access'],
    state: req.params.userId,
    accessType: 'offline',
    prompt: 'consent',
  }) (req, res, next);
});

authRouter.get(
  '/microsoft/callback',
  passport.authenticate('microsoft', {failureRedirect: 'http://localhost:5173/auth', successRedirect: 'http://localhost:5173', session: false}),
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

authRouter.get('/verify-microsoft', (req, res, next) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log("User", user);
    console.log("Microsoft Id", user.microsoftId);
    if (err || !user || user.microsoftId === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Authorized',
    });
  }) (req, res, next);
})

module.exports = authRouter;