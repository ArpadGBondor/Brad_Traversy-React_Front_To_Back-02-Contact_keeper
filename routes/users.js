const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
    '/',
    [
        // name can't be empty
        check('name', 'Please include name.').not().isEmpty(),
        // username must be an email
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
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            // console.log(user);
            if (user) {
                // User already exists
                return res.status(400).json({ msg: 'User already exists.' });
            }

            // Add user
            user = new User({
                name,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
