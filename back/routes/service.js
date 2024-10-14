const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer-config"); // Import du middleware Multer
const auth = require("../middleware/auth");
const serviceController = require("../controllers/service");
// Routes pour les services

router.post("/service/:vehicleId", auth, serviceController.createService);


module.exports = router;
