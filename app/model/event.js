const mongoose = require('mongoose')
const Schema = mongoose.Schema

delete mongoose.connection.models['Event']
const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})

module.exports = mongoose.model('Event', eventSchema)
