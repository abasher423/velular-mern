import jwt from 'jsonwebtoken';

const checkRole = (role) => {
    return (req, res, next) => {
        try {
            // fetch jwt token from Authorization header
            const token = req.headers.authorization.split(' ')[1];
            // decode jwt and check role
            if (jwt.decode(token).role === role){
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decoded;
            } else {
                res.status(409).json({ message: "You do not have permission"});
            }
            next();
        } catch (err){
            return res.status(402).json({ message: 'Authorization Failed'});
        }
    };
};

export default checkRole;