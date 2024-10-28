const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token: token, userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}

const login = async (req, res) => {
  
}

const logout = async (req, res) => {
    
}

const update = async (req, res) => {

}

module.exports = {
  signUp,
  login,
  logout,
  update
}