const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "La contraseña tiene que tener un mínimo de 8 caracteres"],
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://res.cloudinary.com/dwkafwila/image/upload/q_auto/f_auto/v1775587363/avatar_placeholder.png",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", function async(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;