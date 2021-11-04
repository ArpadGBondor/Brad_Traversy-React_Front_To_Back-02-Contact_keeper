const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const validator = require('validator');
const mongoose = require('mongoose');

const auth = require('../middleware/auth');

const Contact = require('../models/Contact');
const User = require('../models/User');

// CRUD :
// Create   - POST      api/contacts
// Read     - GET       api/contacts
// Update   - PUT       api/contacts/:id
// Delete   - DELETE    api/contacts/:id

// @route   GET api/contacts
// @desc    Get logged in user's all contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post(
    '/',
    auth,
    [
        // Name is required
        check('name', 'Name is required').not().isEmpty(),
        // email must be a valid email
        check('email', 'Please include a valid email').isEmail(),
    ],
    async (req, res) => {
        // handle validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = req.user.id;
            const { name, email, phone, type } = req.body;

            const newContact = new Contact({
                user,
                name,
                email,
                phone,
                type,
            });

            const contact = await newContact.save();

            res.json(contact);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    const { id } = req.params;
    const user = req.user.id;

    const contactFields = {};
    if (name) contactFields.name = name;
    // Validate email
    if (email) {
        if (validator.isEmail(email)) {
            contactFields.email = email;
        } else {
            return res.status(400).json({ msg: 'Please include a valid email.' });
        }
    }
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
        // Validate ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: 'Contact not found.' });

        // Make sure contact exists
        let contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found.' });

        // Make sure user owns contact
        //      contact.user is not a String. Need to use .toString() first
        if (contact.user.toString() !== user) return res.status(401).json({ msg: 'Not authorized.' });

        contact = await Contact.findByIdAndUpdate(id, { $set: contactFields }, { new: true });

        res.json(contact);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const user = req.user.id;

    try {
        // Validate ObjectID
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ msg: 'Contact not found.' });

        // Make sure contact exists
        let contact = await Contact.findById(id);
        if (!contact) return res.status(404).json({ msg: 'Contact not found.' });

        // Make sure user owns contact
        //      contact.user is not a String. Need to use .toString() first
        if (contact.user.toString() !== user) return res.status(401).json({ msg: 'Not authorized.' });

        await Contact.findByIdAndRemove(id);

        res.json({ msg: 'Contact removed.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
