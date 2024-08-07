const {
    register,
    loginUser,
  } = require("../controller/userController");
  
  const router = require("express").Router();
  
  router.post("/register", register);
  router.post("/login", loginUser);
  
  module.exports = router;