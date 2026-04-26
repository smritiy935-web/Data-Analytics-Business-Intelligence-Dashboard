const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SystemSettings = require('../models/SystemSettings');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

const checkMaintenance = async (req, res, next) => {
  const settings = await SystemSettings.findOne();
  if (settings && settings.maintenanceMode && (!req.user || req.user.role !== 'admin')) {
    return res.status(503).json({ 
      message: settings.announcement || 'System is currently under maintenance. Please try again later.',
      maintenance: true 
    });
  }
  next();
};

module.exports = { protect, admin, checkMaintenance };
