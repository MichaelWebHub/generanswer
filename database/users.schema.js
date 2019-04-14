const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  statusId: Number
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
