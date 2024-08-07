const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    careToBeTaken: {
      type: String,
      required: true,
    },
    medicines: {
      type: String,
      required: true,
    },
    consultationId: {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("Prescription", prescriptionSchema);
