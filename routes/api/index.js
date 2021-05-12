const router = require("express").Router();
const registerRoutes = require("./register");

// router.get("/", (req, res) => {
//   const obj = {
//     name: "helo"
//   }
//   res.json(JSON.stringify(obj))
// })

router.use("/register", registerRoutes);

module.exports = router;
