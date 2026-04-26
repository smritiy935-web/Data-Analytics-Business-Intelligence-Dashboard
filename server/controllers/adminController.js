const User = require('../models/User');
const Data = require('../models/Data');
const SystemSettings = require('../models/SystemSettings');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
};

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
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
};

// @desc    Update user role
// @route   PUT /api/admin/user/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.role = req.body.role || user.role;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get admin analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAdminAnalytics = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalDataPoints = await Data.countDocuments();
  const recentUploads = await Data.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email');
  
  // Get system settings
  let settings = await SystemSettings.findOne();
  if (!settings) {
    settings = await SystemSettings.create({});
  }

  res.json({
    totalUsers,
    totalDataPoints,
    recentUploads,
    settings
  });
};

// @desc    Update system settings
// @route   PUT /api/admin/settings
// @access  Private/Admin
const updateSystemSettings = async (req, res) => {
  const { maintenanceMode, announcement, siteName } = req.body;
  
  let settings = await SystemSettings.findOne();
  
  if (settings) {
    settings.maintenanceMode = maintenanceMode !== undefined ? maintenanceMode : settings.maintenanceMode;
    settings.announcement = announcement !== undefined ? announcement : settings.announcement;
    settings.siteName = siteName !== undefined ? siteName : settings.siteName;
    
    const updatedSettings = await settings.save();
    res.json(updatedSettings);
  } else {
    const newSettings = await SystemSettings.create({
      maintenanceMode,
      announcement,
      siteName
    });
    res.json(newSettings);
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUserRole,
  getAdminAnalytics,
  updateSystemSettings
};
