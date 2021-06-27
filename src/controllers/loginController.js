const userModel = require('../models/userModel');

class Login {
  loginRender(req, res) {
    const flashMessage = req.flash('error')[0] || req.flash('info')[0];
    const message = flashMessage || false;
    res.render('registration-page', { message });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.myData({ email, password });
    if (user === null || password !== user.password) {
      req.flash('error', 'Por favor, verifique seu email e senha!');
      res.redirect('/login');
      return;
    }

  if (data.email === user.email && data.password === user.password) {
    req.session.user = {
      ...user,
    };
    res.redirect('/');
    return;
  }
  res.redirect('/login');
  return;
};

  logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  }

  async register(req, res) {
    const { email, password } = req.body;
    const user = await userModel.myData({ email });

    if (user !== null && email === user.email) {
      req.flash('error', 'Usuário já existe.');
      res.redirect('/login');
      return;
    }

    await userModel.createUser({ email, password });
    req.flash('info', 'Usuário criado com sucesso.');
    res.redirect('/login');
  }
}

module.exports = new Login();
