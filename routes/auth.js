const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
    '/',
    [
        // email must be a valid email
        check('email', 'Please include a valid email.').isEmail(),
        // password must be at least 6 chars long
        check('password', 'Please enter a password with 6 or more characters.').isLength({ min: 6 }),
    ],
    async (req, res) => {
        // handle validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // if req.body was valid
        const { email, password } = req.body;

        try {
            // Find user
            let user = await User.findOne({ email });
            // console.log(user);
            if (!user) {
                // Wrong user
                return res.status(400).json({ msg: 'Invalid credentials.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                // Wrong password
                return res.status(400).json({ msg: 'Invalid credentials.' });
            }

            // Generate token
            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 360000,
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
