const mongoose = require('mongoose');
const Schema = mongoose.Schema;

delete mongoose.connection.models['User'];
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
