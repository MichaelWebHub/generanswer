const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  userId: String,
  name: String,
});

const Room = mongoose.model('rooms', RoomSchema);

module.exports = Room;
