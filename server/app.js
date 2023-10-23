require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const routes = require("./routes");
app.use(routes);

app.listen(PORT, () => {
  console.log("app listen on port " + PORT);
});
