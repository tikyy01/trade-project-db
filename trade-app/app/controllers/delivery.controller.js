const db = require("../models");
const Delivery = db.delivery;

exports.create = (req, res) => {
  Delivery.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Delivery.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Delivery.findByPk(req.params.id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Delivery.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send({ message: "Updated" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Delivery.destroy({ where: { id: req.params.id } })
    .then(() => res.send({ message: "Deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Delivery.destroy({ where: {} })
    .then(() => res.send({ message: "All deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};