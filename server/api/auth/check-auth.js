import jwt from 'jsonwebtoken';

const checkAuth = (role) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (jwt.decode(token).role === role){
                console.log(jwt.decode(token))
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.userData = decoded;
            } else {
                res.status(409).json({ message: "You do not have permission"})
            }
            
            next();
        } catch (err){
            return res.status(401).json({ message: 'Authentication Failed'});
        }
    };
};

export default checkAuth;