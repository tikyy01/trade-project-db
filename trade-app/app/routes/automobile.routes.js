module.exports = app => {
  const automobile = require("../controllers/automobile.controller");
  const router = require("express").Router();


  router.post("/", automobile.create);
  router.get("/", automobile.findAll);
  router.get("/:id", automobile.findOne);
  router.put("/:id", automobile.update);
  router.delete("/:id", automobile.delete);
  router.delete("/", automobile.deleteAll);

  router.get("/brand/:id", automobile.getAutomobilesByBrand);
  router.get("/price/greater/:price", automobile.getAutomobilesByPrice);
  router.get("/client/:id/orders", automobile.getClientOrders);
  router.get("/order/:id/total", automobile.getOrderTotal);
  router.get("/:id/clients", automobile.getClientsByAutomobile);
  router.get("/top/sales", automobile.getTop5Automobiles);

  app.use("/api/automobiles", router);
};