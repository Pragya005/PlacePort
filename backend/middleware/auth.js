const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Company = require('../models/Company');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (decoded.role === 'student') {
        req.userDoc = await Student.findById(decoded.id).select('-password');
      } else if (decoded.role === 'faculty') {
        req.userDoc = await Faculty.findById(decoded.id).select('-password');
      } else if (decoded.role === 'company') {
        req.userDoc = await Company.findById(decoded.id).select('-password');
      }

      if (!req.userDoc) return res.status(401).json({ message: 'User not found' });
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalid or expired' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied: insufficient permissions' });
  }
  next();
};

module.exports = { protect, requireRole };