const express = require('express');
const router = express.Router();
const {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJobStats,
} = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getJobs).post(protect, setJob);
router.route('/stats').get(protect, getJobStats);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
