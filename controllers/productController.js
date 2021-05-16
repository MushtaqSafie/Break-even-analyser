const db = require('../models');

// get all items from ProductInfo 
// create one in ProductInfo
// update one in ProductInfo
// delete many selected from ProductInfo
module.exports ={
  findAll: function (req, res) {
    db.Products.findAll()
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  createOne: function (req, res) {
    db.Products.create(req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  },
  removeOne: function(req, res) {
    db.Products.destroy({ where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateOne: function(req, res) {
    db.Products.update(req.body , { where: { id: req.params.id } })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}