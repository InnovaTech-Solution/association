const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const v4 = require('uuid').v4;
const crypto = require('crypto');

const user_model = require('../models/users.model');

const verifyToken = require('../middleware');

// route to create a new user to test database. Made by Jeremy

router.post('/users', async (req, res) => {
  try {
    const user = new user_model({
      name: 'Random User',
      email: 'email@example.com'
    });
    await user.save(); // Save the user to the database
    res.send(user); // Return the inserted user as a response
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// route to get all users to test database. Made by Jeremy

router.get('/users', async (req, res) => {
  try {
    const users = await user_model.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// home route to test if token is working. Made by Arnaud

router.get('/', verifyToken, (req, res) => {
  res.send(req.token_decrypted);
});

// Dummy data for users
const users = [
  { id: 1, username: 'John', password: 'password' },
  { id: 2, username: 'Jane', password: 'secret' }
];

// Route for registering a new user. Made by Arnaud

router.post('/register', async (req, res) => {

  // Check if the user already exists
  const existingUser = await user_model.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(400).send({ error: 'User already exists' });
  }

  // Add the new user to the list of users. Made by Arnaud

  const newUser = new user_model({
    id: v4(),
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    email: req.body.email
  });
  await newUser.save(); // Save the user to the database

  // const newUser = { 
  //     id: v4(), 
  //     username: req.body.username, 
  //     password: await bcrypt.hash(req.body.password, 10)
  // };
  // users.push(newUser);

  const payload = {
    id: newUser.id,
    email: newUser.email
  };


  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
  // Return success message
  res.status(200).send({ token });
});

// Route for logging in an existing user. Made by Arnaud

router.post('/login', async (req, res) => {

  // Check if the user exists
  const user = await user_model.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send({ error: 'Incorrect username or password' });
  }

  await bcrypt.compare(req.body.password, user.password, async function (err, result) {
    if (result === true) {
      // Create a JSON Web Token

      const payload = {
        id: user.id,
        email: user.email
      };
      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

      // Return the token to the client
      res.status(200).send({ token, id: user.id });
    } else {
      return res.status(400).send('Email or password is wrong');
    }
  });
});

// Route for deleting an existing user. Made by Arnaud

router.delete('/users/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await user_model.deleteOne({ id: userId });

    if (result.deletedCount === 0) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route pour demander la réinitialisation du mot de passe. Made by Arnaud

router.post('/users/forgot-password', async (req, res) => {
  const email = req.body.email;
  const user = await user_model.findOne({ email });

  if (!user) {
    return res.status(404).send({ error: 'User not found' });
  }

  // Générer un jeton de réinitialisation du mot de passe
  const buffer = crypto.randomBytes(20);
  const token = buffer.toString('hex');

  // Sauvegarder le jeton dans la base de données avec une date d'expiration
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  res.status(200).send({ token });
  // Envoyer un email à l'utilisateur avec le lien de réinitialisation du mot de passe

});

// Route pour réinitialiser le mot de passe.Made by Arnaud

router.post('/users/reset-password/:token', async (req, res) => {
  const token = req.params.token;
  const newPassword = req.body.password;

  const user = await user_model.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

  if (!user) {
    return res.status(400).send({ error: 'Password reset token is invalid or has expired.' });
  }

  // Mettre à jour le mot de passe de l'utilisateur
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.send({ message: 'Password has been updated.' });
});

// Route pour récupérer les informations de l'utilisateur. Made by Arnaud

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await user_model.findOne({ id: req.token_decrypted.id });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Route pour mettre à jour les informations de l'utilisateur. Made by Arnaud

router.put('/users/:id', verifyToken, async (req, res) => {
  const userId = req.params.id;
  const { age, city, description } = req.body;

  try {
    const user = await user_model.findOneAndUpdate(
      { id: userId },
      { $set: { age, city, description } },
      { new: true }
    );

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.status(200).send({ message: 'User updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;