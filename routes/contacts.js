const express = require('express');
const router = express.Router();

// CRUD :
// Create   - POST      api/contacts
// Read     - GET       api/contacts
// Update   - PUT       api/contacts/:id
// Delete   - DELETE    api/contacts/:id

// @route   GET api/contacts
// @desc    Get logged in user's all contacts
// @access  Private
router.get('/', (req, res) => {
    res.send(`Get logged in user's all contacts`);
});

// @route   POST api/contacts
// @desc    Add new contact
// @access  Private
router.post('/', (req, res) => {
    res.send(`Add new contact`);
});

// @route   PUT api/contacts/:id
// @desc    Update a contact
// @access  Private
router.put('/:id', (req, res) => {
    res.send(`Update contact`);
});

// @route   DELETE api/contacts/:id
// @desc    Delete a contact
// @access  Private
router.delete('/:id', (req, res) => {
    res.send(`Delete contact`);
});

module.exports = router;
