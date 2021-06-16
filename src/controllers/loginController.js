const userModel = require('../models/userModel');

exports.loginRender = (req, res) => {
  const flashMessage = req.flash('error');
  const message = flashMessage[0] ? flashMessage[0] : false;
  res.render('registration-page', { message });
};

exports.login = async (req, res) => {
  const data = req.body;
  const user = await userModel.myData(data);
  if (user === null || data.password !== user.password) {
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

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.register = async (req, res) => {
  const data = req.body;
  const user = await userModel.myData(data);
  if (user) {
    req.flash('error', 'Usuário já existe.');
    return;
  }
  await userModel.createUser(data);
  res.redirect('/login');
};
