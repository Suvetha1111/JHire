const express = require('express');
//const multer = require('multer');
//const upload = multer({ storage: multer.memoryStorage() }); // In-memory file storage for image uploads
const { getHrByCompanyId, getAllHrs, getHrById, getJobsByHrId, registerHR, registerCompany, checkCompanyByDomain,getJobById } = require('../controllers/hrController');
const { updateHrProfile } = require('../controllers/updateHRprofile');
const {updateApplicationStatus}=require('../controllers/appliedJobs');
const router = express.Router();

// Route to get all HRs
router.get('/', getAllHrs);

// Route to get jobs posted by a specific HR by HR ID
router.get('/posted-jobs/:id', getJobsByHrId);

router.get('/job-details/:id', getJobById);
// Route to get HR details by ID
router.get('/:id', getHrById);

router.put("/update-job-status/:application_id", updateApplicationStatus);
// Route to register an HR
router.post("/register/hr", registerHR);

// Route to register a company (this will be associated with the HR)
router.post("/register/company", registerCompany);

// Route to check if a company exists by email domain
router.get("/company/check/:domain", checkCompanyByDomain);

// Route to update HR profile (with optional photo upload)
router.put("/update-profile/:id", updateHrProfile);

router.get('/getHRsByCompany/:companyId', getHrByCompanyId);
module.exports = router;
