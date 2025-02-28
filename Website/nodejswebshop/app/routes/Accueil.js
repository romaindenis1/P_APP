const express = require("express");
const router = express.Router();

//const verifyToken = require("../controllers/auth");

// , verifyToken
router.get("/", (req, res) => {
  res.render("accueil");
});

module.exports = router;
