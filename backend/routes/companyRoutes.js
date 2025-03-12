const companyController = require('../controllers/companyController');
const express = require('express');
const router = express.Router();
router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getCompanyById);
module.exports = router;