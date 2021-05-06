const express = require("express");
const path = require("path");
// const mysql2 = require("mysql2");
// Requiring our models for syncing
const db = require("./models");
//// const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
//// app.use(routes);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


// Syncing our sequelize models and then starting our Express app
// !! REMOVE "{ force: true }" @ deployment !!
db.sequelize.sync({ force: true }).then(() => {
  // Start the API server
  app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
});

