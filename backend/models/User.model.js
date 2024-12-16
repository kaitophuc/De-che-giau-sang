const moongoose = require('mongoose');

const UserSchema = new moongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  googleAccessToken: {
    type: String,
  },
  googleRefreshToken: {
    type: String,
  },
  microsoftId: {
    type: String,
  },
  microsoftAccessToken: {
    type: String,
  },
  friends: {
    type: [String],
  }
});

const User = moongoose.model('User', UserSchema);

module.exports = User;