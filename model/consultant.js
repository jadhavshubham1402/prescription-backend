const mongoose = require("mongoose");

const consultantSchema = new mongoose.Schema(
  {
    currentIllnessHistory: {
      type: String,
      required: true,
    },
    recentSurgery: {
      type: Date,
      required: true,
    },
    familyMedicalHistory: {
      type: String,
      required: true,
    },
    anyAllergies: {
      type: String,
      required: true,
    },
    others: {
      type: String,
      required: true,
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
