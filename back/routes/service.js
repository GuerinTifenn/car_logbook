const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config"); // Import du middleware Multer
const serviceController = require("../controllers/service");
// Routes pour les services

router.post("/service/:vehicleId", auth, multer, serviceController.createService);
router.get("/services/:vehicleId", auth, serviceController.getServicesByVehicle)

module.exports = router;
