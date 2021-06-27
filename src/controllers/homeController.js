const ContactModel = require('../models/ContactModel');

exports.homePage = async (req, res) => {
  const myData = await ContactModel.myData();

  const flashMessage = req.flash('error')[0];
  const message = flashMessage || false;

  res.render('home', { myData: Array.from(myData), message });
  return;
};
