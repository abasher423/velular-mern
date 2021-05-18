import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import User from '../models/user.js';


const users_get_all = async (req, res) => {
    try {
        const users = await User.find()
        if (users.length > 0){
            res.status(200).json({
                count: users.length,
                users: users.map(user => {
                    return { 
                        userId: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        password: user.password,
                        role: user.role,
                        verified: user.verified,
                        request: {
                            type: 'GET',
                            description: 'Get current  user',
                            url: `http://localhost:8080/api/users/${user._id}`
                        }
                    }
                })
            })
        } else {
            res.status(404).json({ message: 'No entry exists for user' })
        }
    } catch (error){
        console.log(error);
        res.status({ message: `The following error has occurred: ${error}` });
    }
};

const users_get_user = async (req, res) => {
    try {
        if (req.userData.userId === req.params.userId){ 
            const user = await User.findById(req.params.userId); // checks the userId provided in the jwt against the one in params
            if (user){
                res.status(200).json({
                    userId: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: user.password,
                    role: user.role
                });
            } else {
                res.status(404).json({ message: 'No entry exists' });
            }
        } else {
            res.status(401).json({ message: "userId does not match" })
        } 
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const admin_get_user = async (req, res) => {
    try {
        const admin = await User.findById(req.userData.userId);
        if (admin && (req.userData.userId == admin._id)){ 
            const user = await User.findById(req.params.userId);
            if (user){
                res.status(200).json({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                });
            } else {
                res.status(404).json({ message: 'No entry exists' });
            }
        } else {
            res.status(401).json({ message: "userId does not match" })
        }
    } catch (error){
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const user_register = async (req, res) => {
    try {
        // list of users with the same email address as the one provided
        const users = await User.find({ email: req.body.email });
        if (users.length === 0){
            // hash password with 10 salt rounds
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            if (hashedPassword){
                const { email, firstName, lastName, role, verified } = req.body;
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    password: hashedPassword, // store hashed password
                    email, firstName, lastName, role, verified
                });
                await user.save();
                res.status(201).json({
                    message: 'User successfully created',
                    email: user.email,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName
                });
            } 
        } else {
            res.status(401).json({ message: 'An account with the same email address already exists' });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const user_login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user){
            const authenticated = await bcrypt.compare(req.body.password, user.password);
            if (authenticated){
                const token = jwt.sign({
                    // data we want to pass to the client (payload)
                    userId: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h" // jwt will expire after 1 hour
                });
                res.status(200).json({ 
                    message: 'Authentication Successfull',
                    token: token, //jsonwebtoken,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role
                });
            } else {
                res.status(401).json({ message: 'Incorrect email address or password' });
            }
        } else {
            res.status(401).json({ message: 'Incorrect email address or password' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
}

const users_update_user = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const updateItems = {}; // objct so if we want to only update certain values we can (change)
        for (const item of req.body){
            updateItems[item.propName] = item.value;
        }
        const password = updateItems.password
        if (req.userData.userId === req.params.userId){
            if (password === '' || password === null){ // if new password set to null, set password to existing password
                updateItems.password = user.password
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                if (hashedPassword){
                    updateItems.password = hashedPassword;
                } else {
                    res.status(500).json({ message: `The following error has occurred: ${error}` });
                }
            }
            await User.updateOne({_id: req.params.userId}, {$set: updateItems});
            res.status(200).json({ 
                message: 'User updated successfully',
                firstName: user.firstName, 
                lastName: user.lastName, 
                email: user.email,
                role: user.role
            });
        } else {
            res.status(401).json({ message: 'Authentication Failed'})
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

const admin_update_user = async (req, res) => {
    try {
        const updateItems = {};
        for (const item of req.body){
            updateItems[item.propName] = item.value;
        }
        
        if (!updateItems.hasOwnProperty('password')){
            await User.updateOne({ _id: req.params.userId }, { $set: updateItems });
            res.status(200).json({
                message: 'User updated Successfully',
                request: {
                    type: 'GET',
                    description: 'Fetch all users',
                    url: 'http://localhost:8080/users'
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid request'})
        }
        
    } catch (error){
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
}

const users_delete_user = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.userId });
        if (result.n > 0){
            res.status(200).json({ 
                message: 'User deleted successfully',
                request: {
                    type: 'POST',
                    description: 'Register a user',
                    body: {
                        email: 'String',
                        firstName: 'String',
                        lastName: 'String',
                        password: 'String',
                        role: 'String'
                    },
                    url: 'http://localhost:8080/users'
                } 
            });
        } else {
            res.status(404).json({ message: 'User already deleted' });
        }
    } catch (error){
        console.log(error);
        res.status(500).json({ message: `The following error has occurred: ${error}` });
    }
};

export default {
    users_get_all,
    users_get_user,
    admin_get_user,
    user_register,
    user_login,
    users_update_user,
    admin_update_user,
    users_delete_user,
};