const mongoose = require('mongoose');
const yaml = require('js-yaml');
const fs = require('fs');

let db_config = null;

// Read environment variable
const running_prod = process.env.RUNNING_PROD || 'false';

// Read back_end config file
try {
  const config = yaml.load(fs.readFileSync('back_config.yml', 'utf8'));
  if (running_prod === 'true') {
    console.log('Running in production mode...');
    db_config = config.prod;
  } else {
    console.log('Running in development mode...');
    db_config = config.dev;
  }
} catch (error) {
  console.log("Error reading config file: ", error);
}

const connectionString = "mongodb://" + db_config.db_user + ":" + db_config.db_password + "@" + db_config.db_config

async function connectToMongoDB() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongoDB;
