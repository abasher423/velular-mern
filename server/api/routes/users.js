import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // hashes and adds salt

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('_id username role verified')
        if (users.length > 0){
            res.status(200).json({
                count: users.length,
                users: users.map(user => {
                    return { 
                        userId: user._id,
                        username: user.username,
                        role: user.role,
                        verified: user.verified,
                        request: {
                            type: 'GET',
                            description: 'Get current  user',
                            url: `http://localhost:3000/api/users/${user._id}`
                        }
                    }
                })
            })
        } else {
            res.status(404).json({ message: 'No entry exists for user' })
        }
    } catch (err){
        console.log(err);
        res.status({ error: err });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user){
            res.status(200).json({
                userId: user._id,
                email: user.email,
                fullName: user.fullName,
                street: user.street,
                city: user.city,
                country: user.country,
                state: user.state,
                postcode: user.postcode,
                role: user.role
            });
        } else {
            res.status(404).json({ message: 'No entry exists' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

router.post('/signup', (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) { // if an email already exists
                return res.status(422).json({ message: 'An account with the same email already exists' });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err });
                    } else {
                        const { email, fullName, username, street, city, country, state, postcode, role, verified, orderId } = req.body;
                        const user = new User({ 
                            _id: mongoose.Types.ObjectId(),
                            password: hash, 
                            orders: orderId,
                            email, username, fullName, street, city, country, state, postcode, role, verified
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({ message: 'User created' });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });
                            })
                    }
                });
            }
        })
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (!user){ // if the user doesn't exist
                return res.status(401).json({ message: 'Incorrect email or password' }); // if error with email
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ // what we want to pass to the client (inside the token)
                        userId: user._id,
                        email: user.email,
                        fullName: user.fullName
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    res.status(200).json({ 
                        message: 'Authentication Successfull',
                        token: token //jsonwebtoken 
                    })
                } else { // if error with password
                    res.status(401).json({ message: 'Incorrect  password' });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
});

router.patch('/:userId', async (req, res) => {
        const updateOps = {}; // objct so if we want to only update certain values we can (change)
        for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
        }

        try {
            await User.updateOne({_id: req.params.userId}, {$set: updateOps});
            res.status(200).json({ message: 'User updated successfully' });
        } catch (err){
            console.log(err);
            res.status(500).json({ error: err });
        }
});

router.delete('/:userId', async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params._id });
        if (result.n > 0){
            res.status(200).json({ message: 'User deleted' });
        } else {
            res.status(404).json({ message: 'User already deleted' });
        }
    } catch (err){
        console.log(err);
        res.status(500).json({ error: err });
    }
});

export default router;