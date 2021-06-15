exports.title = (req, res, next) => {
  res.locals.titulo = 'Agenda';
  next();
};

exports.checkCsrf = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.render('404');
  }
  next();
};

exports.csrfToken = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.alreadyRegistered = (req, res, next) => {
  res.locals.alreadyRegistered = false;
  if (req.session.user) {
    res.locals.alreadyRegistered = true;
  }
  next();
};
