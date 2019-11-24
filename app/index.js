const serverless = require('serverless-http');
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Get User endpoint
app.get('/users/:userId', ({requestContext, params}, res) => {
    console.log(params);
    res.json({userId: params.userId, name: 'Beci'});
})

// Add new event to mongoDB

// Get Event from mongoDB
app.get('')

module.exports.handler = serverless(app);