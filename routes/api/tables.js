const router = require('express').Router();
const productController = require("../../controllers/productController");
const fixedCostsController = require("../../controllers/fixedCostsController");
const materialsCostsController = require("../../controllers/materialsCostsController");

// following routes are appended "/api/table/"

// Product Information Table
router.route("/productInfo")
  .get(productController.findAll)
  .post(productController.createOne)

router.route("/productInfo/:id")
  .delete(productController.removeOne)
  .put(productController.updateOne)

// Fixed Costs Table
router.route("/fixedCosts")
  .get(fixedCostsController.findAll)
  .post(fixedCostsController.createOne)

router.route("/fixedCosts/:id")
  .delete(fixedCostsController.removeOne)
  .put(fixedCostsController.updateOne)

// Materials Costs Table
router.route("/materialsCosts")
  .get(materialsCostsController.findAll)
  .post(materialsCostsController.createOne)

router.route("/materialsCosts/:id")
  .delete(materialsCostsController.removeOne)
  .put(materialsCostsController.updateOne)


  module.exports = router