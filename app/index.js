const serverless = require('serverless-http')
const express = require('express')
const jwt = require('express-jwt')

const errorHandler = require('./error-handler')
const ConfigService = require('./service/config.service')

const app = express()
const config = ConfigService.getConfig()

app.use(express.json())
app.use(jwt({secret: config.jwt.secret}).unless({path: ['/login', '/register']}))

require('./controller/user.controller')(app)
require('./controller/event.controller')(app)

/**
 * Common error handler
 */
app.use(errorHandler)

module.exports.handler = serverless(app)