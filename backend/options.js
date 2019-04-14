const db = require('../database/connection');
const RoomSettings = require('../database/settings.schema');
const MESSAGE = require('./_common');

const getSettings = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        RoomSettings.findOne({roomId: req.params.roomId}).then(result => {
          resolve({
            status: true,
            settings: result
          });
        })
          .catch(e => {
            resolve({
              status: false,
              message: e.message
            });
          })
      })
      .catch(() => {
        resolve({
          status: false,
          message: MESSAGE.error
        });
      })
  });
};

module.exports = {
  getSettings
};
