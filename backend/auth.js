const db = require('../database/connection');
const Users = require('../database/users.schema');
const Credentials = require('../database/credentials.schema');

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
                      message: 'Успех'
                    });
                  } else {
                    throw new Error();
                  }
                });

              });
          })
          .catch((err) => {
            resolve({
              user: {},
              status: false,
              message: 'Неверный логин или пароль'
            });
          })
      })
      .catch(() => {
        resolve({
          user: {},
          status: false,
          message: 'Не удалось подключиться к базе данных'
        });
      });
  })
};

const signUp = (req, res) => {

  return new Promise((resolve, reject) => {
    db()
      .then(() => {
        Users.findOne({email: req.body.email})
          .then((result) => {
            // If user already exists
            if (result) {
              resolve({
                user: {},
                status: false,
                message: 'Пользователь с этой почтой уже зарегистрирован'
              })
            } else {
              throw new Error();
            }

          })
          .catch(() => {
            const user = new Users({
              email: req.body.email,
              name: req.body.name || '',
              surname: req.body.surname || '',
              country: '',
              statusId: 1
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

                    resolve({
                      user: result,
                      status: true,
                      token: token,
                      message: 'Успех'
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
          message: 'Не удалось подключиться к базе данных'
        });
      });
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


module.exports = {
  signUp, logIn, verifyToken, checkToken
};
