const express = require("express");
const { login, register, googleLogin } = require("../controllers/authController.js"); // ✅ Added googleLogin

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google-login', googleLogin); // ✅ Added new route for Google Authentication

module.exports = router;