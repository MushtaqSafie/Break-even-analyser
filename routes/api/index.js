const router = require("express").Router();
const userRoutes = require("./user");
const tableRoutes = require("./tables");

// router.get("/", (req, res) => {
//   const obj = {
//     name: "helo"
//   }
//   res.json(JSON.stringify(obj))
// })

router.use("/user", userRoutes);
router.use("/table", tableRoutes);

module.exports = router;
