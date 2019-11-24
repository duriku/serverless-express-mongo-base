module.exports = app => {

    /**
     * Get events belonging to user from MongoDb
     */
    app.get('/event', async ({requestContext, params}, res, next) => {
        try {
            // TODO: get events from event service
            res.json({message: 'success'})
        } catch (e) {
            next(e)
        }
    })

    /**
     * Persist a new event in MongoDB
     */
    app.put('/event', async ({body}, res, next) => {
        try {
            // TODO: create event by calling the event service
            res.json({message: 'success'})
        } catch (e) {
            next(e)
        }
    })
}

