const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const passport = require('passport');

// API Routes
router.use("/api", apiRoutes);

router.get("/test", passport.authenticate("jwt", { session: false }) ,(req, res) => {
  res.send("You have a helo");
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;