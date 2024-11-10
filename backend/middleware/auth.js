// auth.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute = async (req, res, next) => { 
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'You are not authenticated - No token provided'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - Invalid token'
      });
    }

    const currentUser = await User.findById(decoded.id);

    req.user = currentUser;
    next();
  } catch (error) {
    console.error('Error in protectedRoute middleware:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }
};

export const verifyToken = (req, res, next) => {
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
