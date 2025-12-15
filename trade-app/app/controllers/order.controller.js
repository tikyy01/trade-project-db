const db = require("../models");
const Order = db.order;

exports.create = (req, res) => {
  Order.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  Order.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  Order.findByPk(req.params.id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  Order.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send({ message: "Updated" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  Order.destroy({ where: { id: req.params.id } })
    .then(() => res.send({ message: "Deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  Order.destroy({ where: {} })
    .then(() => res.send({ message: "All deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};
