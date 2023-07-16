const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const v4 = require('uuid').v4;
// const crypto = require('crypto');
const cors = require('cors');

const user = require('./routes/user');

require('dotenv').config();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use("/user", user);

module.exports = app;