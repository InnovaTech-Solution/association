const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

mongoose.Promise = Promise;

// start the server and then get the uri
mongoServer.start().then(() => {
  mongoServer.getUri().then((mongoUri) => {
    const mongooseOpts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(mongoUri, mongooseOpts);
  });
});

module.exports = mongoServer;
