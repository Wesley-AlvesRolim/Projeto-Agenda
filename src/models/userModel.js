const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

class UserModel {
  constructor() {
    this.UserModel = mongoose.model('Users', UserSchema);
  }
  async createUser(data) {
    try {
      await this.UserModel.create({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      return [error];
    }
  }

  async myData(data) {
    const dataFound = await this.UserModel.findOne(data);
    return dataFound;
  }
}

module.exports = new UserModel();
