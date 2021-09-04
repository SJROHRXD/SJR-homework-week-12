import express from "express";
import routes from "./routes";

const moment = require("moment");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// CONNECT TO DB //
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "",
  },
  console.log(`Connected to the movies_db database.`)
);

// LISTEN //
app.listen(PORT, () => {
  console.log(`Server LIVE on port: ${PORT}; ${moment().format("MMMM Do YYYY, h:mm:ss A")}!`);
});