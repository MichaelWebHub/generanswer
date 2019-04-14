const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  sLogin: String,
  sPassword: String,
  aRooms: []
});

const Users = mongoose.model('users', UsersSchema);

module.exports = Users;
