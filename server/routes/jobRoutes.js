import express from 'express';
import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

export default router;
