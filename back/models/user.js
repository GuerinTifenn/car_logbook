const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  last_name: { type: String, required: true },
  first_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: { type: Boolean, required: true },
  vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
