const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// Route to handle form submission
router.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    console.log('Request received:', req.body);  // Log request data

    const newContact = new Contact({
        name,
        email,
        message
    });

    newContact.save()
        .then(() => {
            console.log('Data saved:', newContact);  // Log success
            res.json({ msg: 'Your message has been sent successfully!' });
        })
        .catch(err => {
            console.error('Error saving data:', err);  // Log error
            res.status(400).json({ error: 'Failed to send message' });
        });
});

module.exports = router;
