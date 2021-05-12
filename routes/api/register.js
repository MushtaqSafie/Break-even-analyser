const router = require("express").Router();
const db = require("../../models");

// route "/api/register/"
router.route("/")
  .post((req, res) => {
    const { first_name, last_name, email_address, user_password } = req.body;


    db.User.create(req.body).then(result => {
      res.json({ id: result.id, status: "success"});
    }).catch((err) => {
      res.json({ status: "failed"});
      console.log(err);
    });
    
  })

  module.exports = router