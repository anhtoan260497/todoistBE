const express = require("express");
const router = express.Router();
const taskController = require("../app/controllers/taskController");

router.post('/',taskController.getAllTask)
router.post('/update',taskController.updateProject)
router.post('/filter',taskController.getTaskWithFilters)

module.exports = router;
