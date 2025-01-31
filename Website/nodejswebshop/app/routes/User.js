const express = require("express");

const path = require("path");

const router = express.Router();
const controller = require("../controllers/UserController");

router.get("/login", (req, res) => {
  res.render("login", { name: "Romain" });
});

router.get("/", controller.get);

module.exports = router;
