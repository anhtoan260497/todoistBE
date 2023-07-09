const express = require("express");
const router = express.Router();
const taskController = require("../app/controllers/taskController");

router.post('/',taskController.getAllTask)
router.post('/update',taskController.updateTask)
router.post('/filter',taskController.getTaskWithFilter)

module.exports = router;