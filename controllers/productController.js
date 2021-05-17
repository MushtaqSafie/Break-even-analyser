const db = require('../models');

module.exports ={
  // get all items from ProductInfo 
  findAll: function (req, res) {
    db.Products.findAll({ include: [db.MaterialsCosts] })
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  // create one in ProductInfo
  createOne: function (req, res) {
    db.Products.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  // update one in ProductInfo
  removeOne: function(req, res) {
    db.Products.destroy({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // delete many selected from ProductInfo
  updateOne: function(req, res) {
    db.Products.update(req.body , { where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}