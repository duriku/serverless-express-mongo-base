const Event = require('../model/event')
const obtainMongoConnection = require('../service/mongoose.access.service')

module.exports = {
    getEventsByUserId: async (userId) => {
        await obtainMongoConnection()
        return await Event.find({user: userId})
    },

    createEvent: async ({name, state, userId}) => {
        await obtainMongoConnection()
        return await new Event({name, state, user: userId}).save()
    }
}
