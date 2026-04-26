const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/seed', async (req, res) => {
  const User = require('../models/User');
  const userExists = await User.findOne({ email: 'admin@system.io' });
  if (!userExists) {
    await User.create({
      name: 'Super Admin',
      email: 'admin@system.io',
      password: 'admin123',
      role: 'admin'
    });
    return res.send('Admin User Created: admin@system.io / admin123');
  }
  res.send('Admin User already exists.');
});

module.exports = router;
