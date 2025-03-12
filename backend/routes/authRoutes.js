const express = require("express");
const { loginUser,checkSession,logoutUser } = require("../controllers/authController");
const { updatePassword } = require("../controllers/updatePasswordController");
const router = express.Router();

router.post("/login", loginUser);
router.get("/check-session",  checkSession);
router.post("/logout",  logoutUser);
router.post("/forgot-password",  updatePassword);

module.exports = router;
