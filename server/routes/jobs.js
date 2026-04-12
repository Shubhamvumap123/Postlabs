import express from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All job routes protected

router.route('/').get(getJobs).post(createJob);
router.route('/:id').put(updateJob).delete(deleteJob);

export default router;
