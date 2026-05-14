const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent, loginFaculty, loginCompany, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/student/register', registerStudent);
router.post('/student/login', loginStudent);
router.post('/faculty/login', loginFaculty);
router.post('/company/login', loginCompany);
router.get('/me', protect, getMe);

module.exports = router;