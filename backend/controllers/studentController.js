const Student = require('../models/Student');
const Job = require('../models/Job');

exports.updateProfile = async (req, res) => {
  try {
    const { mobile, address, age, sex, dob, city, state, college, branch, degree, cgpa, passingYear, rollNumber, skills, resumeLink } = req.body;

    const student = await Student.findById(req.user.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    Object.assign(student, { mobile, address, age, sex, dob, city, state, college, branch, degree, cgpa, passingYear, rollNumber, resumeLink });
    if (skills) student.skills = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());
    student.profileComplete = true;

    await student.save();
    res.json({ message: 'Profile updated', student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select('-password').populate('appliedJobs');
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const student = await Student.findById(req.user.id);
    const job = await Job.findById(jobId);

    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (!job.isOpen) return res.status(400).json({ message: 'Job is closed' });

    const alreadyApplied = job.applicants.some(a => a.student.toString() === req.user.id);
    if (alreadyApplied) return res.status(400).json({ message: 'Already applied' });

    if (student.appliedJobs.includes(jobId))
      return res.status(400).json({ message: 'Already applied' });

    job.applicants.push({ student: req.user.id });
    await job.save();

    student.appliedJobs.push(jobId);
    await student.save();

    res.json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAppliedJobs = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).populate({
      path: 'appliedJobs',
      populate: { path: 'company', select: 'name location industry' }
    });
    res.json(student.appliedJobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};