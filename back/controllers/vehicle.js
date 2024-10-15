const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");

// Création d'un véhicule
exports.createVehicle = async (req, res) => {
  try {
    const { carBrand, model, firstRegistrationDate, registration, vin } = req.body;
    const userId = req.body.userId
    // const fileName = req.file ? req.file.filename : undefined; // Récupération du nom de fichier si uploadé

    const vehicle = new Vehicle({
      carBrand,
      model,
      firstRegistrationDate,
      registration,
      vin,
      // fileName, // Ajout du nom de fichier dans la base de données
      userId // associate vehicle with the user
    });

    await vehicle.save();
    res.status(201).json({
      message: "Vehicle created successfully!",
      vehicleId: vehicle._id,
      vehicle: vehicle,
    });

  } catch (error) {
    console.error("Vehicle registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Récupération de tous les véhicules
exports.getVehiclesByUser = async (req, res) => {
  try {
    const {userId} = req.params
    const userObjectId = new mongoose.Types.ObjectId(String(userId));
    const vehicles = await Vehicle.find({userId: userObjectId});
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
