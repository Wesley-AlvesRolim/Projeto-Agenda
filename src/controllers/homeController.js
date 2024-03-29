const ContactModel = require('../models/ContactModel');

exports.homePage = async (req, res) => {
  const userId = req.session.user ? req.session.user._doc._id : false;
  const myData = await ContactModel.myData('', userId);

  const flashMessage = req.flash('error')[0];
  const message = flashMessage || false;

  res.render('home', { myData: Array.from(myData), message });
  return;
};
