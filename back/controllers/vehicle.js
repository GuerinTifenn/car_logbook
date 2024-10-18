const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");

// Création d'un véhicule
exports.createVehicle = async (req, res) => {
  console.log('req',req.body)
  // try {
  //   const { carBrand, model, firstRegistrationDate, registration, vin } = req.body;
  //   const userId = req.body.userId


  //   const vehicle = new Vehicle({
  //     carBrand,
  //     model,
  //     firstRegistrationDate,
  //     registration,
  //     vin,
  //     userId // associate vehicle with the user
  //   });

  //   await vehicle.save();
  //   res.status(201).json({
  //     message: "Vehicle created successfully!",
  //     vehicleId: vehicle._id,
  //     vehicle: vehicle,
  //   });

  // } catch (error) {
  //   console.error("Vehicle registration error:", error);
  //   res.status(400).json({ error: error.message });
  // }
  try {
    const vehicleObject = req.body
    delete vehicleObject._userId

    const vehicle = new Vehicle({
      ...vehicleObject,
      userId: req.auth.userId,
      fileName: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // File URL
    })

    await vehicle.save();

      // Send a success response if the vehicle is saved successfully
      res.status(201).json({ message: 'Vehicle saved successfully!' });
  } catch (error) {
    console.log('ere', req.body)
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

exports.getVehicleById = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

