const db = require ("../models");

module.exports = {
  create: function(req, res) {
    const { first_name, last_name, email_address, user_password } = req.body;
    db.User.create({ 
      first_name, 
      last_name, 
      email_address, 
      user_password 
    })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  }
}