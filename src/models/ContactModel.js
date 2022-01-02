const mongoose = require('mongoose');
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: Number, required: true },
  createdAt: { type: Date, required: false, default: new Date() },
  ownerId: { type: String, required: true },
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
        ownerId: data.ownerId,
      });
    } catch (error) {
      return [error];
    }
  }

  async myData(id, ownerId) {
    let data = [];
    if (id) data = await this.ContactModel.findById(id);
    if (ownerId) data = await this.ContactModel.find({ ownerId });
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
