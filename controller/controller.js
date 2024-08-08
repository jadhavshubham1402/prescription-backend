const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  getOneUser,
  createUser,
  getAllUser,
  getAllConsultant,
  getAllPrescription,
  createConsultant,
  createPrescription,
  updatePrescription,
} = require("../service/service");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Invalid Credentials");
    }
    let user = await getOneUser({
      email,
    }).lean();

    if (!user) {
      throw Error("User not found");
    }

    let compareResult = await bcrypt.compare(password, user.password);

    if (compareResult) {
      const token = jwt.sign({ user }, "qwertyuiopasdfghjklzxcvbnm", {
        expiresIn: "1d",
        algorithm: "HS256",
      });

      delete user.password;

      res.json({
        code: 200,
        user,
        token,
        message: "welcome",
      });
    } else {
      res.status(401).send({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function register(req, res) {
  try {
    console.log("herererere");
    let userData = await getOneUser({
      email: req.body.email,
    }).lean();

    if (userData) {
      throw Error("User already exist");
    }

    req.body["profile"] = req.file.path;

    req.body.password = bcrypt.hashSync(req.body.password, 10);

    await createUser(req.body);

    res.json({
      code: 201,
      message: "User created",
    });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ message: error.message });
  }
}

async function getAllUserData(req, res) {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = 10;
    const filter = req.body.filter;
    const userData = await getAllUser(filter, page, limit);
    res.json({
      code: 200,
      data: userData,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function getOneUserData(req, res, next) {
  try {
    let userData = await getOneUser({
      email: req.body.email,
    }).lean();

    if (!userData) {
      throw Error("User not found");
    }

    res.json({
      code: 200,
      data: userData,
    });
  } catch (error) {
    res.status(500).send({ message: error });
  }
}

async function getAllConsultantData(req, res) {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = 10;
    const filter = req.body.filter;
    const userData = await getAllConsultant(filter, page, limit);
    res.json({
      code: 200,
      data: userData,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function createOneConsultant(req, res) {
  try {
    const userData = await createConsultant(req.body);
    res.json({
      code: 200,
      message: "consultant form added successfully",
      data: userData,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function createOnePrescription(req, res) {
  try {
    const userData = await createPrescription(req.body);
    res.json({
      code: 200,
      message: "Prescription form added successfully",
      data: userData,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function updateOnePrescription(req, res) {
  try {
    const filter = req.body.id;
    const update = {
      careToBeTaken: req.body.careToBeTaken,
      medicines: req.body.medicines,
    };
    const userData = await updatePrescription(filter, update);
    res.json({
      code: 200,
      message: "Prescription form updated successfully",
      data: userData,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}

async function getAllPrescriptionData(req, res) {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = 10;
    const filter = req.body.filter;
    const userData = await getAllPrescription(filter, page, limit);
    res.json({
      code: 200,
      data: userData,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
}
module.exports = {
  loginUser,
  register,
  getAllUserData,
  getOneUserData,
  getAllConsultantData,
  createOneConsultant,
  getAllPrescriptionData,
  createOnePrescription,
  updateOnePrescription
};
