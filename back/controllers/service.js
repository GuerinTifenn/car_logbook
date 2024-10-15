const Service = require("../models/service");
const mongoose = require("mongoose");

exports.createService = async (req, res) => {
  try {
    const { interventionDate, description, kilometers, price } = req.body;
    const vehicleId = req.body.vehicleId
    // const fileName = req.file ? req.file.filename : undefined; // Récupération du nom de fichier si uploadé

    const service = new Service({
      interventionDate,
      description,
      kilometers,
      price,
      // fileName, // Ajout du nom de fichier dans la base de données
      vehicleId // associate service with the vehicle
    });

    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupération de tous les services
exports.getServicesByVehicle = async (req, res) => {
  try {
    const {vehicleId} = req.params
    const vehicleObjectId = new mongoose.Types.ObjectId(String(vehicleId));
    const Services = await Service.find({vehicleId: vehicleObjectId});
    res.status(200).json(Services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
