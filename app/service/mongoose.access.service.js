const mongoose = require('mongoose')
const ConfigService = require('./config.service')


// Make sure to add this so you can re-use `conn` between function calls.
// See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
// context.callbackWaitsForEmptyEventLoop = false
module.exports = obtainMongoConnection = async () => {
    if (mongoose.connection.readyState) {
        console.log('=> using EXISTING database connection')
    } else {
        const {mongoDbConfig} = ConfigService.getConfig();
        console.log(`=> using NEW database connection ${mongoDbConfig.connectionString}`)
        await mongoose.connect(mongoDbConfig.connectionString)
    }

}
