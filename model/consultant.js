const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema(
  {
    currentIllnessHistory: {
      type: String,
      required: true,
    },
    recentSurgery: {
      type: Date,
      required: false,
    },
    familyMedicalHistory: {
      type: String,
      required: true,
    },
    anyAllergies: {
      type: String,
      required: false,
    },
    others: {
      type: String,
      required: false,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultant", consultantSchema);
