const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const path = require("path");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

const userRouter = require("./routes/User");
const accueilRouter = require("./routes/Accueil");

app.use("/", accueilRouter);
app.use("/", userRouter);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
