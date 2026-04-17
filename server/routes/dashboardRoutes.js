const express = require('express');
const router = express.Router();
const { listDashboards, getDashboardById, saveDashboard, deleteDashboard } = require('../controllers/dashboardController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/list', listDashboards);
router.get('/:id', getDashboardById);
router.post('/save', saveDashboard);
router.delete('/:id', deleteDashboard);

module.exports = router;
