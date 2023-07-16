const app = require('./app');
const connectToMongoDB = require('./db_service');

connectToMongoDB();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});