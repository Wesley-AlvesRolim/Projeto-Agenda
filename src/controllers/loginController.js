const userModel = require('../models/userModel');

exports.loginRender = (req, res) => {
  res.render('registration-page');
};

exports.login = async (req, res) => {
  const data = req.body;
  const user = await userModel.myData(data);
  if (user === null) {
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
  res.redirect('/login'); //messagem de email/senha errada
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
