const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User.model');

const register = async (req, res) => {
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

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
}

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token: token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
}

const logout = async (req, res) => {
    
}

const update = async (req, res) => {

}

module.exports = {
  login,
  logout,
  update,
  register,
}