import bcrypt from "bcryptjs";
import jwt from "jwt-simple";

import db from "../config/db.js";

const AuthenticationController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send("Informe usuário e senha");
    }

    const user = await db("users")
      .where({ username: username }).first();
    if (!user) return res.status(400).send("Usuário não encontrado");

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) return res.status(401).send("Senha inválida");


    try {

      delete user.password;
      const token = jwt.encode({ ...user }, "secret");
      res.status(200).send({ msg: "autenticado", token });
    } catch (error) {
      res.status(400).send({ message: "Internal server error", error: error.message });
    }
  }
};

export default AuthenticationController;