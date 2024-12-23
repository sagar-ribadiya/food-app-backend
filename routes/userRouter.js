const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Sign Up Route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.json({ msg: 'Your account has been created successfully!' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to sign up' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ msg: 'Login successful!' });
        } else {
            res.status(400).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to login' });
    }
});

module.exports = router;
