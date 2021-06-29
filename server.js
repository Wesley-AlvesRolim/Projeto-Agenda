require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const router = require('./src/routes');
const mongoose = require('mongoose');
const { configSession, flash } = require('./src/middlewares/session');
const helmet = require('helmet');
const csurf = require('csurf');
const {
  title,
  checkCsrf,
  csrfToken,
  alreadyRegistered,
} = require('./src/middlewares/global');

(async function () {
  try {
    await mongoose.connect(process.env.CONECTIONSTRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.emit('Db conected');
  } catch (error) {
    console.log(error);
  }
})();

app.use(configSession);
app.use(flash());

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(title);
app.use(alreadyRegistered);

app.use(helmet());
app.use(csurf());
app.use(csrfToken);
app.use(checkCsrf);

app.use(router);

app.on('Db conected', () => {
  app.listen(3333, () => {
    console.log('http:localhost:3333/');
  });
});
