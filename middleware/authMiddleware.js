
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// const generateAccessToken = (userId, role) => {
//   return jwt.sign({ userId, role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
// };

// const generateRefreshToken = (userId) => {
//   return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
// };

const authenticateUser = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// module.exports = { authenticateUser, generateAccessToken, generateRefreshToken };
module.exports = { authenticateUser};
