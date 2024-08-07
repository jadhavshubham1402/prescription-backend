const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: false,
    },
    speciality: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    yearOfExperience: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      enum: ["doctor", "patient", "admin"],
      type: String,
      required: true,
    },
    historyOfSurgery: {
      type: String,
      required: false,
    },
    historyOfIllness: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);
