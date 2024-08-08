const { register, loginUser, getAllUserData, getAllConsultantData, getAllPrescriptionData, getOneUserData, createOnePrescription, createOneConsultant, updateOnePrescription } = require("../controller/controller");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const { authorize } = require("../middleware/auth");

const router = require("express").Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Example limit of 5MB
  fileFilter: (req, file, cb) => {
    // Accept only certain file types (e.g., images)
    const allowedTypes = /jpg|jpeg|png|gif/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type"));
    }
  },
});

router.post("/register", upload.single("file"), register);
router.post("/login", loginUser);
router.post("/getAllUser", authorize, getAllUserData);
router.get("/getOneUser", authorize, getOneUserData);
router.post("/getAllConsultant", authorize, getAllConsultantData);
router.post("/getAllPrescription", authorize, getAllPrescriptionData);
router.post("/createConsultant", authorize, createOneConsultant);
router.post("/createPrescription", authorize, createOnePrescription);
router.post("/updatePrescription", authorize, updateOnePrescription);

module.exports = router;
