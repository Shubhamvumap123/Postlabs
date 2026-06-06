import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobStats
} from '../controllers/jobController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/stats')
  .get(getJobStats);

router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);

export default router;
