const router = require('express').Router();
const productController = require("../../controllers/productController");

// route "/api/table/productInfo"
router.route("/productInfo")
  .get(productController.findAll)
  .post(productController.createOne)

router.route("/productInfo/:id")
  .delete(productController.removeOne)
  .put(productController.updateOne)

// route "/api/table/fixedCosts"
// router.route("/fixedCosts")
//   .post(userController.findOne)

  module.exports = router