const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    primaryKey: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
  description: {
    type: String,
  },
});

// export gett all users
UserSchema.statics.getUsers = async function () {
  try {
    const users = await this.find({});
    return users;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model('users', UserSchema);
