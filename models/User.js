const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: ["Lagos", "Aba", "Abuja", "Port Harcourt"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  addresses: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
