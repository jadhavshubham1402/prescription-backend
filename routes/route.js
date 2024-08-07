const { register, loginUser } = require("../controller/controller");
const multer = require('multer');
const path = require('path');

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

const upload = multer({ storage });

router.post("/register", upload.single("profileImage"), register);
router.post("/login", loginUser);

module.exports = router;
