const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./Config');

const AuthenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'Token is not provided' });
  }
};

module.exports = AuthenticateJWT;
