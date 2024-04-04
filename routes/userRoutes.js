const express = require("express");
const {
  getAllUsers,
  loginController,
  registerController,
} = require("../controller/userController.js");

// router object
const router = express.Router();

// get all user || GET
router.get("/all-users", getAllUsers);

// CREATE USER || POST
router.post("/register", registerController);

// LOGIN USER || POST
router.post("/login", loginController);

module.exports = router;
