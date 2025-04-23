const express = require('express');
const router = express.Router();
const controller = require('../Controllers/schoolController');
const {
  validateAddSchool,
  validateListSchools
} = require('../Validators/schoolValidator');

router.post('/addSchool', validateAddSchool, controller.addSchool);
router.get('/listSchools', validateListSchools, controller.listSchools);

module.exports = router;  