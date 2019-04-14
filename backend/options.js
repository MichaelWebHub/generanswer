const db = require('../database/connection');
const Options = require('../database/rooms.schema');
const MESSAGE = require('./_common');

const getRooms = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {

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
  createRoom, getRooms
};
