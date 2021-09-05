const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    taskee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    tasker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Jobs", JobSchema);
