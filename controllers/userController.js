const db = require ("../models");
const jwt = require("jsonwebtoken")
const crypt = require("../config/crypto")

module.exports = {
  create: function(req, res) {
    const { first_name, last_name, email_address, user_password } = req.body;
    const hashedPassword = crypt.getHashedPassword(user_password);
    db.User.findOne({ where: { email_address }})
      .then(result => {
        if (result) {
          // user already exist in database;
          res.status(200).json({ status: false, message: "User already exist! — Please Sign in "})
        } else {
          // for new user create a new accounts
          db.User.create({ 
            first_name, 
            last_name, 
            email_address, 
            user_password: hashedPassword 
          })
          .then(dbModel => res.json( { status: true, email: dbModel.dataValues.email_address }))
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
        if (!dbModel || dbModel.dataValues.user_password !== crypt.getHashedPassword(user_password)) {
          res.json({ status: false, message: "Email or password does not match!" })
        } else {
          const jwtToken = jwt.sign({ id: dbModel.dataValues.id, email: dbModel.dataValues.email_address}, "@sdJ#kKlj297230@#32")
          res.json({ message: "Welcome back!", status: true,  Token: jwtToken, ...dbModel.dataValues })
        }
      })
      .catch(err => res.status(422).json(err));
  }
}