const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, default: 'My Dashboard' },
  layout: [{
    i: String,
    x: Number,
    y: Number,
    w: Number,
    h: Number,
    type: { type: String },
    config: mongoose.Schema.Types.Mixed
  }],
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Dashboard', dashboardSchema);
