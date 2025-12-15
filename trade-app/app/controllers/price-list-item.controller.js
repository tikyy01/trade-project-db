const db = require("../models");
const PriceListItem = db.priceListItem;

exports.create = (req, res) => {
  PriceListItem.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  PriceListItem.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  PriceListItem.findByPk(req.params.id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  PriceListItem.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send({ message: "Updated" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  PriceListItem.destroy({ where: { id: req.params.id } })
    .then(() => res.send({ message: "Deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  PriceListItem.destroy({ where: {} })
    .then(() => res.send({ message: "All deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};
