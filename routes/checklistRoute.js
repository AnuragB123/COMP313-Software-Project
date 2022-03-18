//Load User Controller
var checklistController = require('../controllers/ChecklistController');
var express = require('express');
var router = express.Router();

router.get('/get', checklistController.getChecklist);
router.get('/getchecklisttoedit/:id', checklistController.get_checklist_to_edit); 
router.get('/deletechecklist/:id', checklistController.postdeleteChecklist); 
router.post('/upsertchecklist' , checklistController.postupdateChecklist);

module.exports = router;
