import db from "../config/db.js";

export default async function requireAdminMiddleware(req, res, next) {
  try {
    const userLogged = { ...req.user };

    const user = await db("users")
      .where({ id: userLogged.id }).first();
    if (!user || user.role !== "admin") {
      return res.status(403).send("Acesso negado, somente para administradores");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
}