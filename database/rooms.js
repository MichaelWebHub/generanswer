const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionsSchema = new Schema({
  sLabel: String,
  sText: String,
  bIsChecked: {type: Boolean, default: false},
  bIsNewLine: {type: Boolean, default: true}
});

const ConfigSchema = new Schema({
  bConnectGreetingsToTime: {type: Boolean, default: false},
  sTextGreetings: String,
  sTextEnd: String,
  aTextStart: {type: Array},
  sConfigAreaTheme: String,
  sConfigAreaTextColor: String,
  sTextAreaTheme: String,
  sTextAreaTextColor: String,
  sTextAreaCopyBackground: String,
  bIsEnumerable: {type: Boolean, default: true},
  bShowStartText: {type: Boolean, default: true},
  bShowEndText: {type: Boolean, default: false}
});

const RoomSchema = new Schema({
  userId: String,
  oRoom: {
    sName: String,
    aOptions: [OptionsSchema],
    oConfig: {type: ConfigSchema}
  }
});


const Room = mongoose.model('rooms', RoomSchema);

module.exports = Room;
