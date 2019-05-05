const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  statusId: Number,
  timestamp: Date
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
