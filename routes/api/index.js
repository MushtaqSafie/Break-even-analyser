const router = require("express").Router();
const userRoutes = require("./user");

// router.get("/", (req, res) => {
//   const obj = {
//     name: "helo"
//   }
//   res.json(JSON.stringify(obj))
// })

router.use("/user", userRoutes);

module.exports = router;
