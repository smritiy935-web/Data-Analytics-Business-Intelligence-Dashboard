const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Data = require('../models/Data');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// Delete user
router.delete('/user/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete admin user' });
    }
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Admin Analytics
router.get('/analytics', async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalDataPoints = await Data.countDocuments();
  const recentUploads = await Data.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email');
  
  res.json({
    totalUsers,
    totalDataPoints,
    recentUploads
  });
});

module.exports = router;
