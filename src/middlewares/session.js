const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
require('dotenv').config();

const configSession = session({
  secret: 'KEYSECRET',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONECTIONSTRING,
  }),
  cookie: {
    maxAge: 1000 * 60 * 10,
    httpOnly: true,
  },
});

exports.configSession = configSession;
exports.flash = flash;
