const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, trim: true, required: true, unique: true },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: [8, "La contraseña necesita un mínimo de 8 caracteres"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Encriptamos la contraseña antes de guardar el usuario en la base de datos
userSchema.pre("save", function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;
