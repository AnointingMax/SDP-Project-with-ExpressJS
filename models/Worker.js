const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
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
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  job: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    default: "Insert personal description here",
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  active: {
    type: Boolean,
    default: true,
  },
  rate: {
    type: Number,
    required: true,
    default: 1500,
  },
  per: {
    type: String,
    default: "per hour",
  },
});

module.exports = mongoose.model("Worker", WorkerSchema);
