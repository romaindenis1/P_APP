const crypto = require("crypto");
const connection = require("../database/database");

module.exports = {
  get: (req, res) => {
    res.send("User: Romain");
  },
