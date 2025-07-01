const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json({ error: 'Access Denied. No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
