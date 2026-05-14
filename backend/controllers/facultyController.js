const Company = require('../models/Company');
const Student = require('../models/Student');
const Job = require('../models/Job');
const bcrypt = require('bcryptjs');

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select('-password').sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select('-password').populate('appliedJobs');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllJobsWithApplicants = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('company', 'name location industry')
      .populate('applicants.student', 'name email branch cgpa')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerCompany = async (req, res) => {
  try {
    const { name, email, password, phone, location, gstNumber, ceoName, website, industry, description } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'Name, email and password are required' });

    const exists = await Company.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Company email already registered' });

    const company = await Company.create({
      name, email, password, phone, location, gstNumber, ceoName, website, industry, description,
      registeredBy: req.user.id
    });
    res.status(201).json({ message: 'Company registered successfully', company: { id: company._id, name: company.name, email: company.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find().select('-password').populate('registeredBy', 'name');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFacultyProfile = async (req, res) => {
  try {
    res.json(req.userDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const totalJobs = await Job.countDocuments();
    const totalCompanies = await Company.countDocuments();
    const openJobs = await Job.countDocuments({ isOpen: true });
    const profileComplete = await Student.countDocuments({ profileComplete: true });

    res.json({ totalStudents, totalJobs, totalCompanies, openJobs, profileComplete });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};