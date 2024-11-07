// auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1]; // Extraction du token
    if (!token) {
      return res.status(401).json({ message: 'Token is missing in the Authorization header' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    console.error('Erreur de vérification de token:', error);
    res.status(401).json({ message: 'Invalid token, authentication failed' });
  }
};
