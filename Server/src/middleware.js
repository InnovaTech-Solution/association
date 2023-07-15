const jwt = require('jsonwebtoken');

// middleware to verify the token. Made by Arnaud

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ error: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.token_decrypted = decoded;
      next();
    } catch (err) {
      return res.status(401).send({ error: 'Invalid token' });
    }
  };

  module.exports = verifyToken;