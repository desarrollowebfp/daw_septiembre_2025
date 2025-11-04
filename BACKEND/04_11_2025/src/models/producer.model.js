const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const producerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    movies: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Producer = mongoose.model("Producer", producerSchema);

module.exports = Producer;
