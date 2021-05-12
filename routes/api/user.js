const router = require("express").Router();
const userController = require("../../controllers/userController");

// route "/api/user/register"
router.route("/register")
  .post(userController.create)

// route "/api/user/login"
router.route("/login")
  .post(userController.findOne)

  module.exports = router