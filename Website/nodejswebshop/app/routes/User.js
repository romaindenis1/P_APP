const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "db_container",
  user: "root",
  password: "root",
  port: 3306,
  database: "p_app",
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
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
      res
        .status(200)
        .send("L'utilisateur " + username + " a bien été enregistré !");
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
        const token = jwt.sign({ userId: user.id }, dotenv.privateKey, {
          expiresIn: "1y",
        });

        res.status(200).send("Bonjour, " + username);
        console.log(token);
      } else {
        res.status(401).send("Invalid username or password");
      }
    });
  });
});

module.exports = router;
