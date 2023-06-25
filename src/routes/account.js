const express = require("express");
const router = express.Router();
const accountController = require("../app/controllers/accountController");

// router.get('/create',accountController.create)
router.get('/',accountController.getAll)
router.get("/:id", accountController.getOne);
router.post("/create", accountController.create);
router.post("/login", accountController.login);
router.put("/:id", accountController.update);
router.delete("/:id", accountController.delete);

module.exports = router;
