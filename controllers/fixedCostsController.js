const db = require('../models');

module.exports ={
  findAll: function (req, res) {
    db.FixedCosts.findAll()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  createOne: function (req, res) {
    db.FixedCosts.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  removeOne: function(req, res) {
    db.FixedCosts.destroy({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateOne: function(req, res) {
    db.FixedCosts.update(req.body , { where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}