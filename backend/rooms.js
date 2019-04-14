const db = require('../database/connection');
const Rooms = require('../database/rooms.schema');
const MESSAGE = require('./_common');

const getRooms = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        Rooms.find({userId: req.params.userId})
          .then((result) => {
            resolve({
              status: true,
              rooms: result
            });
          })
          .catch((error) => {
            resolve({
              status: false,
              message: error.message
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

const createRoom = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        const room = new Rooms(req.body);

        room.save()
          .then((result) => {
              resolve({
                status: true,
                room: result
              })
                .catch(e => console.log(e))
            }
          ).catch((error) => {
          resolve({
            status: false,
            message: error.message
          });
        });

      })
      .catch(() => {
        resolve({
          status: false,
          message: MESSAGE.error
        });
      })
  })
};

module.exports = {
  createRoom, getRooms
};
