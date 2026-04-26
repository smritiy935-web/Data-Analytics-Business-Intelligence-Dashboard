const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadCSV, getData, deleteData, getStats } = require('../controllers/dataController');
const { protect, checkMaintenance } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(protect);
router.use(checkMaintenance);

router.post('/upload', upload.single('file'), uploadCSV);
router.get('/', getData);
router.get('/stats', getStats);
router.delete('/:id', deleteData);

module.exports = router;
