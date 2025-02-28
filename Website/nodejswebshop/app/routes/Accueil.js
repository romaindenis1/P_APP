const express = require("express");
const router = express.Router();
//const verifyToken = require("../controllers/auth.mjs");

router.get("/", (req, res, verifyToken) => {
  res.render("accueil");
});

module.exports = router;
