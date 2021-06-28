const ContactModel = require('../models/ContactModel');
const { formatNumber } = require('../utils/formatNumber');

class Contact {
  async newContact(req, res) {
    res.render('contact-form', { contactData: '' });
    return;
  }

  async newContactPost(req, res) {
    const data = formatNumber(req);
    ContactModel.createDB(data);
    res.redirect('/');
    return;
  }

  async edit(req, res) {
    const id = req.params.id;
    const contactData = await ContactModel.myData(id);
    res.render('contact-form', { contactData });
    return;
  }

  async editPost(req, res) {
    const id = req.params.id;
    const data = formatNumber(req);
    await ContactModel.editDb(id, data);
    res.redirect('/');
    return;
  }

  async delete(req, res) {
    const id = req.params.id;
    await ContactModel.deleteContact(id);
    res.redirect('/');
    return;
  }
}

module.exports = new Contact();
