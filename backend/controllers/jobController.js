const Job = require('../models/Job');

exports.getAllJobs = async (req, res) => {
  try {
    const filter = { isOpen: true };
    if (req.query.jobType) filter.jobType = req.query.jobType;
    if (req.query.location) filter.location = new RegExp(req.query.location, 'i');

    const jobs = await Job.find(filter)
      .populate('company', 'name location industry website')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name location industry website description');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};