const ContactModel = require('../models/ContactModel');

exports.homePage = async (req, res) => {
  let myData = await ContactModel.myData();
  res.render('home', { myData: Array.from(myData) });
  return;
};
