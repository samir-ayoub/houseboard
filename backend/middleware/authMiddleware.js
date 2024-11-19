// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ msg: "Token de autenticação não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token inválido" });
  }
};

module.exports = authenticate;
