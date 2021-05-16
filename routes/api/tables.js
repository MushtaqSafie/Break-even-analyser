const router = require('express').Router();
const userController = require("../../controllers/userController");

// route "/api/table/productInfo"
router.route("/productInfo")
  .post(userController.create)

// route "/api/table/fixedCosts"
// router.route("/fixedCosts")
//   .post(userController.findOne)

  module.exports = router