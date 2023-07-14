const express = require("express");
const router = express.Router();
const taskController = require("../app/controllers/taskController");
const projectController = require("../app/controllers/projectController");

router.get('/',projectController.getAllProjects)
router.get('/:id',projectController.getSingleProject)
router.post('/update',projectController.updateProject)

module.exports = router;
