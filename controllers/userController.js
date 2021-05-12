const db = require ("../models");
const jwt = require("jsonwebtoken")

module.exports = {
  create: function(req, res) {
    const { first_name, last_name, email_address, user_password } = req.body;
    db.User.findOne({ where: { email_address }})
      .then(result => {
        if (result) {
          // user already exist in database
          res.status(422).json({ error: "User already exist!"})
        } else {
          // for new user create a new accounts
          db.User.create({ 
            first_name, 
            last_name, 
            email_address, 
            user_password 
          })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
        }
      })
      .catch(err => console.log(err));
  },
  findOne: function (req, res) {
    const { email_address, user_password } = req.body
    db.User.findOne({ where: { email_address }})
      .then(dbModel => {
        // if the user does not exist OR the user exist but the password does not match
        if (!dbModel || dbModel.dataValues.user_password !== user_password) {
          res.json({ error: "Email or password does not match!" })
        } else {
          const jwtToken = jwt.sign({ id: dbModel.dataValues.id, email: dbModel.dataValues.email_address}, "@sdJ#kKlj297230@#32")
          res.json({ message: "Welcome back!", Token: jwtToken })
        }
      })
      .catch(err => res.status(422).json(err));
  }
}