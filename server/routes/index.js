const route = require("express").Router();

route.get("/", (req, res) => {
  res.json({
    message: "Home Page",
  });
});

const userRoutes = require("./user");
const itemRoutes = require("./item");

route.use("/items", itemRoutes);
route.use("/users", userRoutes);

module.exports = route;
