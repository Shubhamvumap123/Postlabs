import express from 'express';
import {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getJobStats
} from '../controllers/jobController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/stats')
  .get(getJobStats);

router.route('/:id')
  .get(getJob)
  .put(updateJob)
  .delete(deleteJob);

export default router;
