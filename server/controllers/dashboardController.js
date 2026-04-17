const Dashboard = require('../models/Dashboard');

// GET /api/dashboard/list
exports.listDashboards = async (req, res) => {
  try {
    const dashboards = await Dashboard.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(dashboards);
  } catch (error) {
    res.status(500).json({ message: 'Error listing dashboards' });
  }
};

// GET /api/dashboard/:id
exports.getDashboardById = async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ _id: req.params.id, user: req.user._id });
    if (!dashboard) return res.status(404).json({ message: 'Dashboard not found' });
    res.json(dashboard);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dashboard' });
  }
};

// POST /api/dashboard/save
exports.saveDashboard = async (req, res) => {
  try {
    const { id, name, layout } = req.body;
    let dashboard;

    if (id) {
      dashboard = await Dashboard.findOneAndUpdate(
        { _id: id, user: req.user._id },
        { name, layout },
        { new: true }
      );
    } else {
      dashboard = await Dashboard.create({
        user: req.user._id,
        name: name || 'Untitled Dashboard',
        layout: layout || []
      });
    }

    res.status(200).json({ message: 'Dashboard saved!', dashboard });
  } catch (error) {
    res.status(500).json({ message: 'Error saving dashboard' });
  }
};

// DELETE /api/dashboard/:id
exports.deleteDashboard = async (req, res) => {
  try {
    await Dashboard.deleteOne({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Dashboard deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dashboard' });
  }
};
