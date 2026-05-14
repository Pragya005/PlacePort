const express = require('express');
const router = express.Router();
const { updateProfile, getProfile, applyForJob, getAppliedJobs } = require('../controllers/studentController');
const { protect, requireRole } = require('../middleware/auth');

router.use(protect, requireRole('student'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.post('/apply/:jobId', applyForJob);
router.get('/applied-jobs', getAppliedJobs);

module.exports = router;