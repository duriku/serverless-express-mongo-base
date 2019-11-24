const mongoose = require('mongoose');

// Make sure to add this so you can re-use `conn` between function calls.
// See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
// context.callbackWaitsForEmptyEventLoop = false;

module.exports = connectToDatabase = async () => {
  if (mongoose.connection.readyState) {
    console.log('=> using EXISTING database connection');
    return;
  }

  console.log(`=> using NEW database connection ${process.env.MONGO_CONNECTION_URI}`);
  return await mongoose.connect(process.env.MONGO_CONNECTION_URI);
};
