const mongoose = require("mongoose");
const User = require("./User");
const Worker = require("./Worker");

const RatingSchema = new mongoose.Schema(
  {
    taskee: User,
    tasker: Worker,
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
