const mongoose = require('mongoose');

const systemSettingsSchema = mongoose.Schema({
  maintenanceMode: {
    type: Boolean,
    default: false
  },
  announcement: {
    type: String,
    default: ''
  },
  siteName: {
    type: String,
    default: 'InsightFlow'
  }
}, {
  timestamps: true
});

const SystemSettings = mongoose.model('SystemSettings', systemSettingsSchema);

module.exports = SystemSettings;
