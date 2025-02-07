const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const mysql = require("mysql2");

// Create a connection to the MySQL database
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
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).send("Error registering user");
    }

    const hash = derivedKey.toString("hex");

    const query = "INSERT INTO t_users (username, hash, sel) VALUES (?, ?, ?)";
    connection.query(query, [username, hash, salt], (err, results) => {
      if (err) {
        console.error("Error inserting user:", err.stack);
        return res.status(500).send("Error registering user");
      }
      res.status(200).send("User registered successfully");
    });
  });
});

// Handle login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM t_users WHERE username = ?";
  connection.query(query, [username], (err, results) => {
    if (results.length === 0) {
      return res.status(400).send("Invalid username or password");
    }

    const user = results[0];
    const salt = user.sel;
    const storedHash = user.hash;

    // Re hash
    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).send("Error logging in");
      }
      const hash = derivedKey.toString("hex");
      if (hash === storedHash) {
        res.status(200).send("Login successful");
      } else {
        res.status(401).send("Invalid username or password");
      }
    });
  });
});

router.get("/", (req, res) => {
  res.send("User: Romain");
});

module.exports = router;
