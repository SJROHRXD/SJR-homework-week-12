// CONNECTION REQUIRE STACK //
const mysql = require("mysql");
const express = require("express");

const PORT = process.env.PORT || 3069;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

// CONNECT TO DB //
const connection = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "SQL1989!!bigly",
      database: "employees",
    },
);

module.exports = connection;