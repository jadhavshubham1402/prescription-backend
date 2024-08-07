const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getOneUser, createUser } = require("../service/service");

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

module.exports = {
  loginUser,
  register,
};
