const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const Company = require('../models/Company');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// ─── STUDENT ────────────────────────────────────────────────────────────────

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const student = await Student.create({ name, email, password });
    const token = generateToken(student._id, 'student');
    res.status(201).json({ token, role: 'student', user: { id: student._id, name: student.name, email: student.email, profileComplete: student.profileComplete } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student || !(await student.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(student._id, 'student');
    res.json({ token, role: 'student', user: { id: student._id, name: student.name, email: student.email, profileComplete: student.profileComplete } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── FACULTY ────────────────────────────────────────────────────────────────

exports.loginFaculty = async (req, res) => {
  try {
    const { email, password } = req.body;
    const faculty = await Faculty.findOne({ email });
    if (!faculty || !(await faculty.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(faculty._id, 'faculty');
    res.json({ token, role: 'faculty', user: { id: faculty._id, name: faculty.name, email: faculty.email, employeeId: faculty.employeeId } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── COMPANY ────────────────────────────────────────────────────────────────

exports.loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company || !(await company.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(company._id, 'company');
    res.json({ token, role: 'company', user: { id: company._id, name: company.name, email: company.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  res.json({ user: req.userDoc, role: req.user.role });
};