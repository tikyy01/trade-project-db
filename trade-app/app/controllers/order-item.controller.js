const db = require("../models");
const OrderItem = db.orderItem;

exports.create = (req, res) => {
  OrderItem.create(req.body)
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
  OrderItem.findAll()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
  OrderItem.findByPk(req.params.id)
    .then(data => data ? res.send(data) : res.status(404).send({ message: "Not found" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.update = (req, res) => {
  OrderItem.update(req.body, { where: { id: req.params.id } })
    .then(() => res.send({ message: "Updated" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.delete = (req, res) => {
  OrderItem.destroy({ where: { id: req.params.id } })
    .then(() => res.send({ message: "Deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};

exports.deleteAll = (req, res) => {
  OrderItem.destroy({ where: {} })
    .then(() => res.send({ message: "All deleted" }))
    .catch(err => res.status(500).send({ message: err.message }));
};
