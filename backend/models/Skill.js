const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required"],
      trim: true,
    },
    level: {
      type: Number,
      min: 1,
      max: 100,
      default: 80,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);