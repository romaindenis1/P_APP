const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log("No token found, skipping verification");
    return next();
  }

  jwt.verify(token, process.env.privateKey, (err, decoded) => {
    if (err) {
      console.error("Invalid or expired token", err);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Pour pouvoir utiliser l'utilisateur dans le next
    console.log("User verified:", decoded);

    next();
  });
};

module.exports = verifyToken;
