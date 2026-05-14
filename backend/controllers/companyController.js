const Company = require('../models/Company');
const Job = require('../models/Job');

exports.getProfile = async (req, res) => {
  try {
    res.json(req.userDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, location, gstNumber, ceoName, website, industry, description } = req.body;
    const company = await Company.findById(req.user.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });

    Object.assign(company, { name, phone, location, gstNumber, ceoName, website, industry, description });
    await company.save();
    res.json({ message: 'Profile updated', company });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postJob = async (req, res) => {
  try {
    const { title, description, location, salary, jobType, eligibility, skills, deadline, openings } = req.body;
    if (!title || !description || !location)
      return res.status(400).json({ message: 'Title, description and location are required' });

    const job = await Job.create({
      title, description, location, salary, jobType,
      eligibility: eligibility || {},
      skills: skills || [],
      deadline, openings,
      company: req.user.id
    });
    res.status(201).json({ message: 'Job posted', job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.id })
      .populate('applicants.student', 'name email mobile branch cgpa college')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.jobId, company: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    job.isOpen = req.body.isOpen !== undefined ? req.body.isOpen : job.isOpen;
    await job.save();
    res.json({ message: 'Job status updated', job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateApplicantStatus = async (req, res) => {
  try {
    const { jobId, studentId } = req.params;
    const { status } = req.body;

    const job = await Job.findOne({ _id: jobId, company: req.user.id });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const applicant = job.applicants.find(a => a.student.toString() === studentId);
    if (!applicant) return res.status(404).json({ message: 'Applicant not found' });

    applicant.status = status;
    await job.save();
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};