const mongoose = require('mongoose');

const dataSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    value: { type: Number, required: true },
    label: { type: String, required: true },
    date: { type: Date, default: Date.now },
    type: { type: String, default: 'sales' }, // e.g., sales, revenue, users
    metadata: { type: mongoose.Schema.Types.Mixed }, // Flexible for other CSV columns
  },
  { timestamps: true }
);

module.exports = mongoose.model('Data', dataSchema);
