const db = require('../models');

module.exports ={
  findAll: function (req, res) {
    db.MaterialsCosts.findAll()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  createOne: function (req, res) {
    db.MaterialsCosts.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  removeOne: function(req, res) {
    db.MaterialsCosts.destroy({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateOne: function(req, res) {
    db.MaterialsCosts.update(req.body , { where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}