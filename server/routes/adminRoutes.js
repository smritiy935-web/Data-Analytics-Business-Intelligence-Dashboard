const express = require('express');
const router = express.Router();
const {
  getUsers,
  deleteUser,
  updateUserRole,
  getAdminAnalytics,
  updateSystemSettings
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.use(protect);
router.use(admin);

// Get all users
router.get('/users', getUsers);

// Delete user
router.delete('/user/:id', deleteUser);

// Update user role
router.put('/user/:id/role', updateUserRole);

// Admin Analytics & Settings
router.get('/analytics', getAdminAnalytics);

// Update system settings
router.put('/settings', updateSystemSettings);

module.exports = router;
