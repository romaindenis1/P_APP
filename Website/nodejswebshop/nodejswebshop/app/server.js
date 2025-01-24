const express = require("express");

const app = express();
const userRoute = require("./routes/User");
app.use("/user", userRoute);

app.set("view engine", "ejs");

// Démarrage du serveur
app.listen(8080, () => {
  console.log("Server running on port 8080");
});

app.use(express.static(__dirname + "/public"));
