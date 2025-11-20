const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    year: { type: Number, required: false, min: 1963, max: 2300 },
    videogames: [{ type: mongoose.Types.ObjectId, ref: "Videogame" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Platform = mongoose.model("Platform", platformSchema);

module.exports = Platform;
