const db = require ("../models");

module.exports = {
  create: function(req, res) {
    const { first_name, last_name, email_address, user_password } = req.body;
    db.User.findOne({ where: { email_address }})
      .then(result => {
        if (result) {
          // user already exist in database
          res.status(422).json({ error: "User already exists!"})
        } else {
          // for new user create a new account
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
  }
}