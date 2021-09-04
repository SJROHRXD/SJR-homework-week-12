import express from "express";
import routes from "./routes";
import sequelize from "./config/connection";

const moment = require("moment");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server LIVE on port: ${PORT}; ${moment().format("MMMM Do YYYY, h:mm:ss A")}!`));
  });