// /back/models/vehicle.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const vehicleSchema = new mongoose.Schema({
  carBrand: { type: String, required: true },
  model: { type: String, required: true },
  firstRegistrationDate: { type: Date, required: true },
  registration: { type: String, required: true },
  vin: { type: String, required: true, unique: true },
  fileName: { type: String, required: true },
  userId: {type: Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
