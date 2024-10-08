const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.post("/logout", auth, userCtrl.logout);

module.exports = router;
