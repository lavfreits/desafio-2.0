// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Token não fornecido");
  }

  try {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }
      req.user = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).json({ message: "erro" });
  }
}