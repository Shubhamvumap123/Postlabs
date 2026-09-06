const express = require('express');
const { getJobs, addJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getJobs).post(protect, addJob);
router.route('/:id').put(protect, updateJob).delete(protect, deleteJob);

module.exports = router;
