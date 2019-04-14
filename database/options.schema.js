const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OptionsSchema = new Schema({
  label: String,
  text: String,
  isChecked: {type: Boolean, default: false},
  isNewLine: {type: Boolean, default: true}
});

const ConfigSchema = new Schema({
  connectGreetingsToTime: {type: Boolean, default: false},
  textGreetings: String,
  textEnd: String,
  textStart: {type: Array},
  configAreaTheme: String,
  configAreaTextColor: String,
  textAreaTheme: String,
  textAreaTextColor: String,
  textAreaCopyBackground: String,
  isEnumerable: {type: Boolean, default: true},
  showStartText: {type: Boolean, default: true},
  showEndText: {type: Boolean, default: false}
});

const RoomSettingsSchema = new Schema({
  options: OptionsSchema,
  config: ConfigSchema
});

const RoomSettings = mongoose.model('room-settings', RoomSettingsSchema);

module.exports = RoomSettings;
