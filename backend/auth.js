const db = require('../database/connection');
const Users = require('../database/users.schema');
const Credentials = require('../database/credentials.schema');
const MESSAGE = require('./_common');
const {confirmEmail, sendResetLink} = require('./nodemailer');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const logIn = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        Users.findOne({email: req.body.email})
          .then((user) => {

            Credentials.findOne({userId: user._id})
              .then(credential => {

                bcrypt.compare(req.body.password, credential.userPassword).then((res) => {
                  if (res && user.email === req.body.email) {

                    const payload = {
                      login: req.body.email,
                      status: true
                    };

                    const token = jwt.sign(payload, 'superSecret', {
                      expiresIn: 86400 // expires in 24 hours
                    });

                    resolve({
                      user: user,
                      status: true,
                      token: token,
                      message: 'Success'
                    });
                  } else {
                    resolve({
                      user: {},
                      status: false,
                      message: 'Wrong login or password'
                    });
                  }
                });

              });
          })
          .catch((err) => {
            resolve({
              user: {},
              status: false,
              message: 'Wrong login or password'
            });
          })
      })
      .catch(() => {
        resolve({
          user: {},
          status: false,
          message: MESSAGE.error
        });
      });
  })
};

const signUp = (req, res) => {
  return new Promise((resolve, reject) => {
    if (req.body.email) {
      db()
        .then(() => {
          Users.findOne({email: req.body.email})
            .then((result) => {
              // If user already exists
              if (result) {
                resolve({
                  user: {},
                  status: false,
                  message: 'User with this email already exists'
                })
              } else {
                throw new Error();
              }

            })
            .catch(() => {
              const user = new Users({
                email: req.body.email,
                statusId: 0,
                timestamp: Date.now()
              });

              user.save()
                .then(result => {

                  /** Create password in password table */
                  bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                    const credentials = new Credentials({
                      userId: result._id,
                      userPassword: hash
                    });

                    credentials.save().then(() => {
                      const payload = {
                        login: req.body.email,
                        status: true
                      };

                      const token = jwt.sign(payload, 'superSecret', {
                        expiresIn: 86400 // expires in 24 hours
                      });

                      confirmEmail(req.body.email, token);

                      resolve({
                        user: result,
                        status: true,
                        token: token,
                        message: 'Success'
                      });
                    });
                  });
                });
            });
        })
        .catch((err) => {
          console.log(err);
          resolve({
            user: {},
            status: false,
            message: MESSAGE.error
          });
        });
    }
  });
};

// Подтверждение токена
verifyToken = (req, res, next) => {

  const token = req.params.token;

  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, 'superSecret', function (err, decoded) {
      if (err) {
        console.log(err);
        return res.json({
          user: {},
          status: false
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    console.log('no token');
    return res.json({
      user: {},
      status: false
    });
  }
};

checkToken = (req, res) => {
  return new Promise((resolve, reject) => {

      const ulogin = req.decoded.login;

      db()
        .then(() => {
          Users.findOne({email: ulogin})
            .then((result) => {
              if (result) {

                resolve({
                  user: result,
                  status: true
                })
              } else {
                throw new Error();
              }
            })
            .catch((err) => {
              console.log(err);
              resolve({
                user: {},
                nStatus: false
              })
            });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  )
};

changeStatus = (req, res) => {
  return new Promise((resolve, reject) => {

      const ulogin = req.decoded.login;

      db()
        .then(() => {
          Users.findOneAndUpdate({email: ulogin}, {statusId: 1})
            .then((result) => {
              if (result) {

                resolve({
                  user: result,
                  status: true
                })
              } else {
                throw new Error();
              }
            })
            .catch((err) => {
              console.log(err);
              resolve({
                user: {},
                status: false
              })
            });
        })
        .catch((err) => {
          console.log(err);
        })
    }
  )
};

const sendPasswordResetLink = (req, res) => {
  bcrypt.hash(req.body.email, 10).then((hash) => {
    sendResetLink(req.body.email, hash);
  });
};

const resetPassword = (req, res) => {
  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        bcrypt.compare(req.body.email, req.body.hash).then((res) => {
          if (res) {
            Users.findOne({email: req.body.email}).then((user) => {

              bcrypt.hash(req.body.password, saltRounds).then((hash) => {
                Credentials.findOneAndUpdate({userId: user._id}, {userPassword: hash}).then(() => {
                  resolve({
                    status: true
                  });
                })
                  .catch(e => console.log(e));
              })
                .catch(e => console.log(e));
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      })
  });
};

const removeUnverifiedUsers = () => {

  db()
    .then(() => {
      Users.find({statusId: 0}).stream().on('data', (data) => {
        if (Math.abs(data.timestamp - new Date()) / 36e5 > 24) {
          removeUser(data._id);
        }
      })
    })
    .catch((err) => {
      console.log(err);
    });
};

const removeUser = (id) => {
  db()
    .then(() => {
      Users.findByIdAndRemove(id)
        .then((result) => {
          console.log('Removed', result);
        });

      Credentials.findOneAndRemove({userId: id})
        .then(credentials => {
          console.log('Removed', credentials);
        });
    })
    .catch((err) => {
      console.log(err);
    })
};

module.exports = {
  signUp, logIn, verifyToken, checkToken, changeStatus, removeUnverifiedUsers, sendPasswordResetLink, resetPassword
};
