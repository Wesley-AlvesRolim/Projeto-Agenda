const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

class Login {
  loginRender(req, res) {
    const flashMessage = req.flash('error')[0] || req.flash('info')[0];
    const message = flashMessage || false;
    res.render('registration-page', { message });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.myData({ email });
    const userIsValidAndPasswordIsCorrect =
      user !== null ? bcrypt.compareSync(password, user.password) : false;

    if (!userIsValidAndPasswordIsCorrect) {
      req.flash('error', 'Por favor, verifique seu email e senha!');
      res.redirect('/login');
      return;
    }

    if (email === user.email && userIsValidAndPasswordIsCorrect) {
      req.session.user = {
        ...user,
      };
      res.redirect('/');
      return;
    }
    res.redirect('/login');
    return;
  }

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }

  async register(req, res) {
    let { email, password } = req.body;
    const user = await userModel.myData({ email });

    if (user !== null && email === user.email) {
      req.flash('error', 'Usuário já existe.');
      res.redirect('/login');
      return;
    }

    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    password = hash;

    await userModel.createUser({ email, password });
    req.flash('info', 'Usuário criado com sucesso.');
    res.redirect('/login');
  }
}

module.exports = new Login();
