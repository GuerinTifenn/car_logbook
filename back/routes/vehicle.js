const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle");
const multer = require("../middleware/multer-config"); // Import du middleware Multer
const auth = require("../middleware/auth");
// Routes pour les véhicules
// Route POST avec le middleware d'upload de fichier
router.post("/vehicle/create", auth, multer, vehicleController.createVehicle);
router.get("/vehicles/:userId", auth, vehicleController.getVehiclesByUser);
router.get("/vehicle/:vehicleId", auth, vehicleController.getVehicleById);

module.exports = router;
