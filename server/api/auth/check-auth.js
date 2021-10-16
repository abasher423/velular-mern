import jwt from "jsonwebtoken";

const checkAuth = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1]; // fetch jwt token from Authorization header
      const decoded = jwt.verify(token, process.env.JWT_KEY); // verify jwt using ky stored in .env
      req.userData = decoded; // store token inside userData
      next();
    } catch (err) {
      return res.status(401).json({ message: "Authentication Failed" });
    }
  };
};

export default checkAuth;
