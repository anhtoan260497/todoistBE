const express = require("express");
const router = express.Router();
const authController = require("../app/controllers/authController");

router.post("/create", authController.create);
router.post("/login", authController.login);
router.post('/logged',authController.loggedIn)
router.get("/:id", authController.getOne);
router.put("/:id", authController.update);
router.delete("/:id", authController.delete);

module.exports = router;
