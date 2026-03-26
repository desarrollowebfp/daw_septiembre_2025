const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    genre: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
