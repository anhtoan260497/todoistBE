const express = require("express");
const router = express.Router();
const taskController = require("../app/controllers/taskController");

router.post('/',taskController.getAllTask)
router.post('/add',taskController.addTask)
router.post('/update',taskController.updateTask)
router.post('/filter',taskController.getTaskWithFilters)
router.post('/remove',taskController.removeTaskWithTaskId)
router.post('/subtask/add',taskController.updateSubTask)
router.post('/subtask/check',taskController.updateSubTask)
router.post('/subtask/remove',taskController.updateSubTask)

module.exports = router;
