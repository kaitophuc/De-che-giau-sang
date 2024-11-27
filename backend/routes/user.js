const express = require('express');
const passport = require('passport');

const userRouter = express.Router();

userRouter.get('/', (req, res, next) => {
  res.status(200).json({
    username: req.user.username,
    email: req.user.email,
  })
})

module.exports = userRouter;