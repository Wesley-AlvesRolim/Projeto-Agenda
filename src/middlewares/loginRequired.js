exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'Para realizar este comando, é necessário o login.');
    res.redirect('/');
    return;
  }
  next();
};
