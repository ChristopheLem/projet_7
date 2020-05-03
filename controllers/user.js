const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);

         const alreadyExist = await User.findOne({ where : {
            email: req.body.email
        }})
        if ( alreadyExist ) {
            return res.status(401).send({ error: "Adresse email deja existante !"})
        }      
        await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })

        res.status(201).send({ message: 'L\'utilisateur à été créé' })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: {
            email: req.body.email
        }})

        if (!user) {
            return res.status(404).send({ error: "Utilisateur introuvable avec cette adresse email !"})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if (!isMatch) {
            return res.status(401).send({ error: "Mot de passe incorrecte !"})
        }

        const token = jwt.sign({ id: user.id}, 'SECRET_KEY', { expiresIn: '24h' })
        res.status(200).send({ userId: user.id, token })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ where: {
            id: req.user.id
        }})
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.updateProfile = async (req, res) => {
    try {
        let hashedPassword;
        if (req.body.password) {
            hashedPassword = await bcrypt.hash(req.body.password, 8);
        }
        await User.update({ 
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        }, {
            where: {
                id: req.user.id
            }
        })
        res.status(200).send({ message: 'Profile has been updated !'})
    } catch (err) {
        res.status(500).send(err)
    }
}


exports.deleteProfile = async (req, res) => {
    try {
        await User.destroy({ where: {
            id: req.user.id
        }})
        res.status(200).send({ message: 'deleted!'})
    } catch (err) {
        res.status(500).send(err)
    }
}

