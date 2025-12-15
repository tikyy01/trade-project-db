const db = require("../models");
const Automobile = db.automobile;
const Brand = db.brand;
const Order = db.order;
const OrderItem = db.orderItem;
const Client = db.client;

// ------------------ CRUD ------------------

// CREATE
exports.create = (req, res) => {
  Automobile.create(req.body)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// READ ALL
exports.findAll = (req, res) => {
  Automobile.findAll()
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// READ ONE
exports.findOne = (req, res) => {
  Automobile.findByPk(req.params.id)
    .then(data => {
      if (data) res.send(data);
      else res.status(404).send({ message: "Automobile not found" });
    })
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// UPDATE
exports.update = (req, res) => {
  Automobile.update(req.body, {
    where: { id: req.params.id }
  })
    .then(result => {
      if (result[0] === 1) {
        res.send({ message: "Automobile updated" });
      } else {
        res.send({ message: "Automobile not found" });
      }
    })
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// DELETE ONE
exports.delete = (req, res) => {
  Automobile.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      if (result === 1) {
        res.send({ message: "Automobile deleted" });
      } else {
        res.send({ message: "Automobile not found" });
      }
    })
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

// DELETE ALL
exports.deleteAll = (req, res) => {
  Automobile.destroy({ where: {} })
    .then(nums =>
      res.send({ message: `${nums} automobiles deleted` })
    )
    .catch(err =>
      res.status(500).send({ message: err.message })
    );
};

//
// ------------------ RAW SQL (аналог ЛР12) ------------------
//

// 1. Получить автомобили по бренду
exports.getAutomobilesByBrand = async (req, res) => {
  const brandId = req.params.id;
  try {
    const result = await db.sequelize.query(
      `SELECT * FROM "automobiles" WHERE "brandId" = :brandId`,
      {
        replacements: { brandId },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 2. Автомобили дороже указанной цены
exports.getAutomobilesByPrice = async (req, res) => {
  const price = req.params.price;
  try {
    const result = await db.sequelize.query(
      `SELECT a.*
       FROM "automobiles" a
       JOIN "price_list_items" p ON a.id = p."automobileId"
       WHERE p.price > :price`,
      {
        replacements: { price },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 3. Заказы клиента
exports.getClientOrders = async (req, res) => {
  const clientId = req.params.id;
  try {
    const result = await db.sequelize.query(
      `SELECT * FROM "orders" WHERE "clientId" = :clientId`,
      {
        replacements: { clientId },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 4. Общая стоимость заказа
exports.getOrderTotal = async (req, res) => {
  const orderId = req.params.id;
  try {
    const result = await db.sequelize.query(
      `SELECT SUM(quantity * price) AS total
       FROM "order_items"
       WHERE "orderId" = :orderId`,
      {
        replacements: { orderId },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );
    res.send(result[0]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 5. Клиенты, купившие автомобиль
exports.getClientsByAutomobile = async (req, res) => {
  const automobileId = req.params.id;
  try {
    const result = await db.sequelize.query(
      `SELECT c.*
       FROM "clients" c
       JOIN "orders" o ON c.id = o."clientId"
       JOIN "order_items" oi ON o.id = oi."orderId"
       WHERE oi."automobileId" = :automobileId`,
      {
        replacements: { automobileId },
        type: db.Sequelize.QueryTypes.SELECT
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// 6. Топ-5 автомобилей по продажам
exports.getTop5Automobiles = async (req, res) => {
  try {
    const result = await db.sequelize.query(
      `SELECT a.model, COUNT(*) AS sold
       FROM "order_items" oi
       JOIN "automobiles" a ON oi."automobileId" = a.id
       GROUP BY a.model
       ORDER BY sold DESC
       LIMIT 5`,
      {
        type: db.Sequelize.QueryTypes.SELECT
      }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};