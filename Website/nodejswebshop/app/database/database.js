const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "db_container",
  user: "root",
  password: "root",
  port: 6033,
  database: "p_app",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.stack);
    return;
  }
  console.log("Connected to MySQL Database!");
});

db.query(
  `CREATE TABLE IF NOT EXISTS t_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  hash VARCHAR(255) UNIQUE NOT NULL,
  sel VARCHAR(255) NOT NULL
  );`,
  (err) => {
    if (err) console.error("Erreur création table :", err);
    else console.log("Table 'users' prête !");
  }
);

module.exports = connection;
