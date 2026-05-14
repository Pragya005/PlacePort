const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, postJob, getMyJobs, updateJobStatus, updateApplicantStatus } = require('../controllers/companyController');
const { protect, requireRole } = require('../middleware/auth');

router.use(protect, requireRole('company'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/jobs', postJob);
router.get('/jobs', getMyJobs);
router.put('/jobs/:jobId/status', updateJobStatus);
router.put('/jobs/:jobId/applicants/:studentId', updateApplicantStatus);

module.exports = router;