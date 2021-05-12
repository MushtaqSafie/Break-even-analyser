const router = require("express").Router();
const userController = require("../../controllers/userController");

// route "/api/register/"
router.route("/")
  .post(userController.create)

  module.exports = router