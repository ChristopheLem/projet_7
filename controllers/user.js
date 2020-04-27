const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        res.status(201).send({ message: 'User has been created' })
    } catch (err) {
        res.status(500).send(err)
    }
}

