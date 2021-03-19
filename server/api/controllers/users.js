import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

// @desc Fetch all users
// @route GET /api/users
// @access Private
const users_get_all = async (req, res) => {
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
};

// @desc Fetch a user
// @route GET /api/users/userId
// @access Public
const users_get_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (user){
            res.status(200).json({
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
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
};

// @desc Create a user
// @route GET /api/users
// @access Public
const user_register = (req, res) => {
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
                        const { email, firstName, lastName, role, verified} = req.body;
                        const user = new User({ 
                            _id: mongoose.Types.ObjectId(),
                            password: hash, 
                            // orders: orderId,
                            email, firstName, lastName, role, verified
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({ 
                                    message: 'User created',
                                    email: user.email,
                                    password: user.password,
                                    firstName: user.firstName,
                                    lastName: user.lastName
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });
                            })
                    }
                });
            }
        })
};

// @desc  Create user login
// @route POST /api/users
// @access Public
const user_login = (req, res) => {
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
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                    res.status(200).json({ 
                        message: 'Authentication Successfull',
                        token: token, //jsonwebtoken,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role
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
};

// @desc Updat a user
// @route PATCH /api/users/userId
// @access Public
const users_update_user = async (req, res) => {
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
};

// @desc Delete a user
// @route DELETE /api/users/userId
// @access Private
const users_delete_user = async (req, res) => {
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
};

export default {
    users_get_all,
    users_get_user,
    user_register,
    user_login,
    users_update_user,
    users_delete_user
};