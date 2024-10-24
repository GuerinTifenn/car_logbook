const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");
const User = require("../models/user")

// Création d'un véhicule
exports.createVehicle = async (req, res) => {
  try {
    const vehicleObject = req.body

    // Ensure the user exists
    const user = await User.findById(req.auth.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const vehicle = new Vehicle({
      ...vehicleObject,
      fileName: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // File URL
    })

    // Save the vehicle to the Vehicle collection
    const savedVehicle = await vehicle.save();

    // Add the vehicle to the user's vehicles array
    user.vehicles.push(savedVehicle._id);
    await user.save(); // Save the updated user with the new vehicle

      // Send a success response if the vehicle is saved successfully
      res.status(201).json({ message: 'Vehicle saved successfully!', vehicle: savedVehicle });
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

