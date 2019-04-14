const helmet = require('helmet');
const express = require('express');
const jsonParser = require('body-parser').json();

const {signUp, logIn, verifyToken, checkToken} = require('./backend/auth');
const {getRooms, createRoom} = require('./backend/rooms');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./dist/generanswer'));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(helmet());

/************************** Authentication **************************/
/** Check for token */
app.get('/check/:token', verifyToken, function (req, res) {
  checkToken(req, res).then(r => {
    res.json(r);
  })
});

/** Login */
app.post('/login', jsonParser, (req, res) => {
  logIn(req, res).then(r => {
    res.json(r);
  })
});

/** Sign up */
app.post('/signup', jsonParser, (req, res) => {
  signUp(req, res).then(r => {
    res.json(r);
  })
});

/************************** Rooms **************************/

/** Get all rooms */
app.get('/getRooms/:userId', (req, res) => {
  getRooms(req, res).then(r => {
    res.json(r);
  })
});

/** Create new room */
app.post('/createRoom', jsonParser, (req, res) => {
  createRoom(req, res).then(r => {
    res.json(r);
  })
});

/************************** Server **************************/
/** Render pages */
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/generanswer/index.html')
});

app.listen(PORT);
