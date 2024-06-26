const { registerUser, authUser } = require("../controllers/userController");
const express = require("express");

const router = express.Router();

router.route("/signup").post(registerUser);
router.post("/login", authUser);


module.exports = router;
