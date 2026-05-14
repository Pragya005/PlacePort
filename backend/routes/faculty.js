const express = require('express');
const router = express.Router();
const {
  getAllStudents, getStudentById, getAllJobsWithApplicants,
  registerCompany, getAllCompanies, getFacultyProfile, getDashboardStats
} = require('../controllers/facultyController');
const { protect, requireRole } = require('../middleware/auth');

router.use(protect, requireRole('faculty'));

router.get('/profile', getFacultyProfile);
router.get('/stats', getDashboardStats);
router.get('/students', getAllStudents);
router.get('/students/:id', getStudentById);
router.get('/jobs', getAllJobsWithApplicants);
router.post('/register-company', registerCompany);
router.get('/companies', getAllCompanies);

module.exports = router;