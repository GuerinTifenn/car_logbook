// /back/controllers/vehicle.js
const Vehicle = require("../models/vehicle");

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
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupération de tous les véhicules
exports.getVehiclesByUser = async (req, res) => {
  try {
    const user_id = req.params.userId
    const vehicles = await Vehicle.find({user_id});
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
