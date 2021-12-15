const contactModel = require('../models/ContactModel');

exports.checkOwner = async (req, res, next) => {
  const { id } = req.params;
  const { ownerId } = await contactModel.myData(id);

  if (req.session.user._doc._id !== ownerId) {
    req.flash('error', 'Este comando foi negado.');
    res.redirect('/');
    return;
  }
  next();
};
