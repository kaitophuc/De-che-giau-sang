const { register, login, logout, update } = require('../controllers/user/auth');
const express = require('express');

const authRouter = express.Router();

authRouter.use(express.json());
authRouter.use(express.urlencoded({ extended: true }));

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/update', update);

module.exports = authRouter;