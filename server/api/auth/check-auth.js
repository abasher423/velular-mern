import jwt from 'jsonwebtoken';

/*
    * A function to verify a jwt token
    * This was adapted from a YouTube tutorial by Maximilian Schwarzmüller
    * Link here to YouTube tutorial:
    * https://www.youtube.com/watch?v=8Ip0pcwbWYM&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=13&ab_channel=Academind
*/

const checkAuth = () => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]; // fetch jwt token from Authorization header
            const decoded = jwt.verify(token, process.env.JWT_KEY); // verify jwt using ky stored in .env
            req.userData = decoded; // store token inside userData
            next();
        } catch (err){
            return res.status(401).json({ message: 'Authentication Failed'});
        }
    };
};

export default checkAuth;