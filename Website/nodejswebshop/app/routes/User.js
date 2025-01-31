const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "db_container",
  user: "root",
  password: "root",
  port: 3306,
  database: "p_app",
});

router.get("/login", (req, res) => {
  res.render("login", { name: "Romain" });
});

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Generate a salt
  const salt = crypto.randomBytes(16).toString("hex");

  // Hash the password with the salt
  crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
    const hash = derivedKey.toString("hex");

    const query = "INSERT INTO t_users (username, hash, sel) VALUES (?, ?, ?)";
    connection.query(query, [username, hash, salt], (err, results) => {
      if (err) {
        return res.status(500).send("Marche pas" + err.stack);
      }
      res.status(200).send("User registered successfully");
    });
  });
});

router.get("/", (req, res) => {
  res.send("User: Romain");
});

module.exports = router;
