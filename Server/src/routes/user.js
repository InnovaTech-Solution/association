const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const v4 = require('uuid').v4;
const crypto = require('crypto');

const user_model = require('../models/users.model');

const verifyToken = require('../middleware');

// GET ------------------------------------------------------------------

router.get('/users', async (req, res) => {
// route to get all users to test database.
    try {
        const users = await user_model.getUsers();
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/me', verifyToken, async (req, res) => {
// Route pour récupérer les informations de l'utilisateur.
    try {
        const user = await user_model.findOne({id: req.token_decrypted.id});
        if (!user) {
            return res.status(404).send({error: 'User not found'});
        }
        res.send(user);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// POST -----------------------------------------------------------------

router.post('/login', async (req, res) => {
// Route for logging in an existing user.

    // Check if the user exists
    const user = await user_model.findOne({email: req.body.email});

    if (!user) {
        return res.status(401).send({error: 'Email or password is wrong'});
    }

    await bcrypt.compare(req.body.password, user.password, async function (err, result) {
        if (result === true) {
            // Create a JSON Web Token
            const payload = {
                id: user.id,
                email: user.email
            };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'});

            // Return the token to the client
            res.status(200).send({token, id: user.id});
        } else {
            return res.status(400).send('Email or password is wrong');
        }
    });
});

router.post('/register', async (req, res) => {
// Route for registering a new user.

    // Check if the user already exists
    const existingUser = await user_model.findOne({email: req.body.email});
    if (existingUser) {
        return res.status(400).send({error: 'User already exists'});
    }

    // Add the new user to the list of users.
    const newUser = new user_model({
        id: v4(),
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email
    });
    await newUser.save(); // Save the user to the database

    const payload = {
        id: newUser.id,
        email: newUser.email
    };

    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '72h'});

    // Return success message
    res.status(200).send({token});
});

router.post('/users/forgot-password', async (req, res) => {
// Route pour demander la réinitialisation du mot de passe.
    const email = req.body.email;
    const user = await user_model.findOne({email});

    if (!user) {
        return res.status(404).send({error: 'User not found'});
    }

    // Générer un jeton de réinitialisation du mot de passe
    const buffer = crypto.randomBytes(20);
    const token = buffer.toString('hex');

    // Sauvegarder le jeton dans la base de données avec une date d'expiration
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    res.status(200).send({token});
    // Envoyer un email à l'utilisateur avec le lien de réinitialisation du mot de passe

});

router.post('/users/reset-password/:token', async (req, res) => {
// Route pour réinitialiser le mot de passe.
    const token = req.params.token;
    const newPassword = req.body.password;

    const user = await user_model.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

    if (!user) {
        return res.status(400).send({error: 'Password reset token is invalid or has expired.'});
    }

    // Mettre à jour le mot de passe de l'utilisateur
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.send({message: 'Password has been updated.'});
});


// PUT ------------------------------------------------------------------

router.put('/users/:id', verifyToken, async (req, res) => {
// Route pour mettre à jour les informations de l'utilisateur.
    const userId = req.params.id;
    const {age, city, description} = req.body;

    try {
        const user = await user_model.findOneAndUpdate(
            {id: userId},
            {$set: {age, city, description}},
            {new: true}
        );

        if (!user) {
            return res.status(404).send({error: 'User not found'});
        }

        res.status(200).send({message: 'User updated successfully', user});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


// DELETE ---------------------------------------------------------------

router.delete('/users/:id', verifyToken, async (req, res) => {
// Route for deleting an existing user.
    const userId = req.params.id;
    try {
        const result = await user_model.deleteOne({id: userId});

        if (result.deletedCount === 0) {
            return res.status(404).send({error: 'User not found'});
        }

        res.status(200).send({message: 'User deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});



module.exports = router;