const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/auth.js");

router.get("/", verifyToken, (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("accueil");
});

router.get("/profile", verifyToken, (req, res) => {
  res.render("profile", { username: req.user.username });
});

router.post("/logout", (req, res) => {
  res.clearCookie("authcookie");
  res.redirect("/");
});

module.exports = router;
