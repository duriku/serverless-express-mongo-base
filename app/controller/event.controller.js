const eventRepository = require('../repository/event.repository')

module.exports = app => {

    /**
     * Get events belonging to user from MongoDb
     */
    app.get('/event', async ({user}, res, next) => {
        try {
            const events = await eventRepository.getEventsByUserId(user.id)
            res.json(events)
        } catch (e) {
            next(e)
        }
    })

    /**
     * Persist a new event in MongoDB
     */
    app.put('/event', async ({user, body}, res, next) => {
        try {
            const {name, state} = body
            await eventRepository.createEvent({userId: user.id, name, state})
            res.json({message: 'success'})
        } catch (e) {
            next(e)
        }
    })
}

