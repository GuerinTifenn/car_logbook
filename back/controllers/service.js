const Service = require("../models/service");
const Vehicle = require("../models/vehicle");
const mongoose = require("mongoose");

exports.createService = async (req, res) => {
  try {
    const serviceObject = req.body
    const vehicleId = req.body.vehicleId

    // Ensure the vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const service = new Service({
      ...serviceObject,
      vehicleId,
      status: "initial",
      fileName: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` // File URL
    })

    // Save the new service to the Service collection
    const savedService = await service.save();

    // Add the new service to the vehicle's services array
    vehicle.services.push(savedService._id);
    await vehicle.save();

      // Send a success response if the service is saved successfully
      res.status(201).json({ message: 'Service saved successfully!', service: savedService });
  } catch (error) {
     console.error("Service registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Récupération de tous les services
exports.getServicesByVehicle = async (req, res) => {
  try {
    const {vehicleId} = req.params
    const vehicleObjectId = new mongoose.Types.ObjectId(String(vehicleId));
    const services = await Service.find({vehicleId: vehicleObjectId});
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const serviceObjectId = new mongoose.Types.ObjectId(String(serviceId));
    const service = await Service.findById(serviceObjectId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
