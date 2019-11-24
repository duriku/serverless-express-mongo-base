const mongoose = require('mongoose');
const Schema = mongoose.Schema;

delete mongoose.connection.models['Task'];
const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Task', taskSchema);
