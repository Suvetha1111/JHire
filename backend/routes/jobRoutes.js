const jobController = require('../controllers/jobController');
const express = require('express');
const { postJob } = require('../controllers/postJob');
const authenticateUser = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/',authenticateUser,postJob);
module.exports = router;