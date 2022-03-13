//Load User Controller
var checklistController = require('../controllers/ChecklistController');
var express = require('express');
var router = express.Router();


router.get('/checklist', checklistController.getChecklist);

module.exports = router;