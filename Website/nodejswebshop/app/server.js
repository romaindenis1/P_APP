const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/User");
const accueilRouter = require("./routes/Accueil");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", accueilRouter);
app.use("/user", userRoutes);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
