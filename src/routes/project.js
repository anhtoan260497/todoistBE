const express = require("express");
const router = express.Router();
const taskController = require("../app/controllers/taskController");
const projectController = require("../app/controllers/projectController");

router.get('/',projectController.getAllProjects)
router.get('/:id',projectController.getSingleProject)

module.exports = router;