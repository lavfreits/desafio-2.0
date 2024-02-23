import db from "../config/db.js";
import { existsOrError, notExistsOrError } from "../utils/validaton.js";

const CategoryController = {
  create: async (req, res) => {
    const category = { ...req.body };

    try {
      existsOrError(category.name, "Nome da categoria não informado");
      const categoryFromDB = await db("categories")
        .where({ name: category.name }).first();
      notExistsOrError(categoryFromDB, "Categoria já cadastrada");
      await db("categories").insert(category);
      res.status(201).json(category);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  },

  getByName: async (req, res) => {
    try {
      const { name } = req.params;
      const category = await db("categories")
        .where("name", name).first();
      if (!category) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  get: async (req, res) => {
    try {
      await db("categories")
        .then(Categories => res.json(Categories));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const { name } = req.params;
      const category = { ...req.body };
      const categoryFromDB = await db("categories")
        .where("name", name).first();
      if (!categoryFromDB) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      await db("categories").where("name", name).update(category);
      res.json({ message: "Categoria atualizada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const { name } = req.params;
      const categoryFromDB = await db("categories")
        .where("name", name).first();
      if (!categoryFromDB) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      await db("categories").where("name", name).del();
      res.json({ message: "Categoria apagada" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default CategoryController;
