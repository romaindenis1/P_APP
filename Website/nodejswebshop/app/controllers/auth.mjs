const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
app.use(cookieParser());

//Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bien formatter pour pouvoir récupérer le token

  if (!token) {
    // Si pas de token, conitnuer
    return next();
  }

  // Verificaion
  jwt.verify(token, process.env.privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; // Pour pouvoir utiliser l'utilisateur dans le next
    console.log("User verified:", decoded);
    next();
  });
};

module.exports = verifyToken;
