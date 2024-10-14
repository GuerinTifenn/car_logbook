const Service = require("../models/service");

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
