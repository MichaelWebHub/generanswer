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

const getOptions = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {

        RoomSettings.findOne({roomId: req.params.roomId})
          .then((result) => {
            resolve({
              status: true,
              options: result.get('options')
            })
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

const createOption = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {

        RoomSettings.findOneAndUpdate({roomId: req.body.roomID}, {$push: {'options': req.body.data}}, {new: true})
          .then((result) => {
            resolve({
              status: true,
              options: result.get('options')
            })
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

const editOptions = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {

        RoomSettings.findOne({roomId: req.body.roomId})
          .then((result) => {
            req.body.options.forEach(opt => {
              const option = result.options.id(opt._id);
              option.set({'label': opt.label, 'text': opt.text});
            });

            result.save().then(() => {
              resolve({
                status: true
              })
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
  });
}

const deleteOption = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        RoomSettings.findOne({roomId: req.params.roomId})
          .then((result) => {
            result.options.id(req.params.optionId).remove();
            result.save()
              .then(() => {
                resolve({
                  status: true
                })
              })
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
  getSettings, createOption, getOptions, deleteOption, editOptions
};
