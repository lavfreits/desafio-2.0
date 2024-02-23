import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { existsOrError, notExistsOrError } from "../utils/validaton.js";

const UserController = {
  createUser: async (req, res) => {
    const user = { ...req.body };

    try {
      existsOrError(user.name, "Nome não informado");
      existsOrError(user.username, "Username não informado");
      existsOrError(user.password, "Senha não informada");


      const userFromDB = await db("users")
        .where({ username: user.username }).first();

      notExistsOrError(userFromDB, "Username já cadastrado");
      const result = await bcrypt.hash(user.password, 10);

      await db("users").insert({ username: user.username, name: user.name, password: result, role: user.role });
      res.status(201).json(user);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db("users").where("id", id).first();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getUsers: async (req, res) => {
    try {
      await db("users")
        .then(users => res.json(users));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = { ...req.body };
      const userFromDB = await db("users").where("id", id).first();
      if (!userFromDB) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      if (userFromDB.username === user.username && user.id !== userFromDB.id) {
        return res.status(400).json({ message: "Username já cadastrado" });
      }
      await db("users").where("id", id).update(user);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db("users").where("id", id).first();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await db("users").where("id", id).del();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default UserController;
