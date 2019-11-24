const serverless = require('serverless-http')
const express = require('express')

const userService = require('./service/user.service');
const errorHandler = require('./error-handler');

const app = express()

// to support JSON-encoded bodies
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/**
 * Get user stored from MongoDb
 */
app.get('/user/:userId', async ({requestContext, params}, res, next) => {
    try {
        const user = await userService.getUserById(params.userId)
        res.json(user)
    } catch (e) {
        next(e)
    }
})

/**
 * Persist a new user in MongoDB
 */
app.put('/user', async ({body}, res, next) => {
    try {
        const user = await userService.createUser(body)
        res.json(user)
    } catch (e) {
        next(e)
    }

    res.json({code: 200, message: 'user created successfully'})
})

/**
 * Common error handler
 */
app.use(errorHandler)

module.exports.handler = serverless(app)