const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
.then(() => {
 console.log("Synced db.");
})
.catch((err) => {
 console.log("Failed to sync db: " + err.message);
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to trade-app application." });
});
require("dotenv").config();



const PORT = process.env.PORT || 8080;
require("./app/routes/automobile.routes.js")(app);
require("./app/routes/brand.routes.js")(app);
require("./app/routes/client.routes.js")(app);
require("./app/routes/delivery.routes.js")(app);
require("./app/routes/model.routes.js")(app);
require("./app/routes/order.routes.js")(app);
require("./app/routes/order-item.routes.js")(app);
require("./app/routes/payment.routes.js")(app);
require("./app/routes/price-list.routes.js")(app);
require("./app/routes/price-list-item.routes.js")(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});