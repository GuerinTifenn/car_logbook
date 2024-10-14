const mongoose = require("mongoose");
const Schema = mongoose.Schema

const serviceSchema = mongoose.Schema({
  interventionDate: { type: String, required: true },
  description: { type: String, required: true },
  kilometers: { type: Number, required: true, unique: true },
  price: { type: Number, required: false },
  // fileName: { type: String }, // Champ optionnel pour le nom de fichier
  vehicleId: {type: Schema.Types.ObjectId, ref: "Vehicle", required: true},
});


module.exports = mongoose.model("Service", serviceSchema);
