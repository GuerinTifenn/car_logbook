const mongoose = require("mongoose");
const Schema = mongoose.Schema

const serviceSchema = mongoose.Schema({
  interventionDate: { type: String, required: true },
  description: { type: String, required: true },
  kilometers: { type: Number, required: true },
  price: { type: Number, required: false },
  fileName: { type: String, required: true },
  vehicleId: {type: Schema.Types.ObjectId, ref: "Vehicle", required: true},
  status: {
    type: String,
    enum: ["initial", "pending", "accepted", "declined"],
    default: "initial",
  },
});


module.exports = mongoose.model("Service", serviceSchema);
