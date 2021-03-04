import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // hashes and adds salt

const router = express.Router();

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
                        const { email, fullName, username, street, city, country, state, postcode, role, orderId } = req.body;
                        const user = new User({ 
                            _id: mongoose.Types.ObjectId(),
                            password: hash, 
                            orders: orderId,
                            email, username, fullName, street, city, country, state, postcode, role  
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
        .catch()
});



export default router;