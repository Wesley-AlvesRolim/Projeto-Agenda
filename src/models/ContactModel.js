const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  createdAt: { type: Date, required: false, default: new Date() },
});

class ContactModel {
  constructor() {
    this.ContactModel = mongoose.model('Contacts', ContactSchema);
  }
  async createDB(data) {
    try {
      await this.ContactModel.create({
        name: data.name,
        surname: data.surname,
        email: data.email,
        number: data.number,
      });
    } catch (error) {
      return [error];
    }
  }
  async myData(id) {
    let data = await this.ContactModel.find();
    if (id) data = await this.ContactModel.findById(id);
    return data;
  }
  async editDb(id, update) {
    const data = await this.ContactModel.findByIdAndUpdate(id, update);
    return data;
  }
  async deleteContact(id) {
    await this.ContactModel.findByIdAndRemove(id);
    return;
  }
}

module.exports = new ContactModel();
