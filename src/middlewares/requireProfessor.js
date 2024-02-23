import db from "../config/db.js";

export default async function requireProfessorMiddleware(req, res, next) {
  try {
    const userLogged = { ...req.user };

    const user = await db("users")
      .where({ id: userLogged.id }).first();
    if (!user || user.role !== "professor") {
      return res.status(403).send("Somente professores tem acesso a essa função");
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro interno do servidor");
  }
}