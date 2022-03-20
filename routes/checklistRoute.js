//Load User Controller
var checklistController = require('../controllers/ChecklistController');
var express = require('express');
var router = express.Router();

router.get('/get', checklistController.getChecklist);
router.get('/getchecklisttoedit/:id', checklistController.get_checklist_to_edit); 
router.get('/delete/:id', checklistController.postdeleteChecklist); 
router.post('/update/:id' , checklistController.postupdateChecklist);
router.post('/insert', checklistController.postinsertChecklist);

module.exports = router;
