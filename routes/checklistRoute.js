/*
Developers who contributed to this file:
Vaishali 
*/

//Load User Controller
var checklistController = require('../controllers/ChecklistController');
//Third party libraries
var express = require('express');
var router = express.Router();
//Routers for different pages regarding Checklist
router.get('/get', checklistController.getChecklist);
router.get('/getchecklisttoedit/:id', checklistController.get_checklist_to_edit); 
router.get('/delete/:id', checklistController.postdeleteChecklist); 
router.post('/update/:id' , checklistController.postupdateChecklist);
router.post('/insert', checklistController.postinsertChecklist);
//Export Functions
module.exports = router;
