// /back/routes/vehicle.js
const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle");
const upload = require("../middleware/multer-config"); // Import du middleware Multer
const auth = require("../middleware/auth");
// Routes pour les véhicules
// router.post("/createVehicle", upload.single("file"), vehicleController.createVehicle); // Route POST avec le middleware d'upload de fichier
router.post("/vehicle/create", auth, vehicleController.createVehicle); // Route POST avec le middleware d'upload de fichier
router.get("/vehicles/:userId", auth, vehicleController.getVehiclesByUser); // Route GET pour récupérer tous les véhicules

module.exports = router;
