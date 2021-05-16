const router = require("express").Router();
const userRoutes = require("./user");
const tableRoutes = require("./tables");

router.use("/user", userRoutes);
router.use("/table", tableRoutes);

module.exports = router;
