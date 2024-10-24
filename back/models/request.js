const mongoose = require("mongoose");
const Schema = mongoose.Schema

const RequestSchema = mongoose.Schema({
  interventionDate: { type: Date, required: false },
  description: { type: String, required: false },
  kilometers: { type: Number, required: false },
  price: { type: Number, required: false },
  comment: { type: String, required: true },
  status: { type: String, enum: ["initial", "pending", "accepted", "declined"], default: "initial" }, // Track request status
  type: { type: String, enum: ["edit", "delete"], required: true }, // Type of request: edit or delete
  fileName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

 // only type, comments and fileName field are required//
  // edit and delete use the same schema //
module.exports = mongoose.model("Request", RequestSchema);
