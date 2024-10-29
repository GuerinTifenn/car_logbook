const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.post("/logout", auth, userCtrl.logout);
router.get("/profile", auth, userCtrl.getUserProfileById);
router.put("/profile/update", auth, userCtrl.updateUserProfile);

module.exports = router;
