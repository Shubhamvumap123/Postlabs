const Job = require('../models/Job');

// @desc    Get jobs for the logged in user
// @route   GET /api/jobs
// @access  Private
const getJobs = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = { user: req.user.id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
      ];
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set a job
// @route   POST /api/jobs
// @access  Private
const setJob = async (req, res) => {
  try {
    const { company, position, status } = req.body;

    if (!company || !position) {
      return res.status(400).json({ message: 'Please add company and position' });
    }

    const job = await Job.create({
      company,
      position,
      status: status || 'Applied',
      user: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the job user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Safely construct update payload
    const { company, position, status } = req.body;
    const updatePayload = {};
    if (company) updatePayload.company = company;
    if (position) updatePayload.position = position;
    if (status) updatePayload.status = status;

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, updatePayload, {
      new: true,
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check for user
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Make sure the logged in user matches the job user
    if (job.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await job.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get job stats
// @route   GET /api/jobs/stats
// @access  Private
const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Format stats into a readable object
    const formattedStats = {
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0
    };

    stats.forEach(stat => {
      formattedStats[stat._id] = stat.count;
    });

    res.status(200).json(formattedStats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  setJob,
  updateJob,
  deleteJob,
  getJobStats
};
