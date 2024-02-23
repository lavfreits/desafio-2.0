import db from "../config/db.js";
import { existsOrError, notExistsOrError } from "../utils/validaton.js";

const CourseController = {
  create: async (req, res) => {
    const course = { ...req.body };

    try {
      existsOrError(course.title, "Título não informado");
      existsOrError(course.description, "Descrição não preenchida");
      existsOrError(course.category_id, "Categoria não preenchida");
      existsOrError(course.professor, "Nome do Professor não preenchido");

      const courseFromDB = await db("courses")
        .where({ title: course.title }).first();
      notExistsOrError(courseFromDB, "Curso com esse título já existe");
      const category = await db("categories").where({ id: course.category_id }).first();

      if (!category) {
        return res.status(400).send("Categoria não encontrada");
      }
      await db("courses").insert(course);
      res.status(201).json(course);
    } catch (msg) {
      return res.status(400).send(msg);
    }
  },

  getByTitle: async (req, res) => {
    try {
      const { title } = req.params;
      const course = await db("courses").where("title", title).first();
      if (!course) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }
      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  get: async (req, res) => {
    try {
      await db("courses").then(courses => res.json(courses));
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {

    try {
      const { title } = req.params;
      const course = { ...req.body };
      const courseFromDB = await db("courses").where("title", title).first();
      if (!courseFromDB) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }
      if (course.professor !== courseFromDB.professor) {
        return res.status(403).json({ message: "Você não tem permissão para fazer isso" });
      }
      await db("courses").where("title", title).update(course);
      res.json({ message: "Course updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getByCategory: async (req, res) => {
    const { category_id } = req.params;
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    console.log(page, limit, category_id);

    const category = db("categories").where("id", category_id).first();
    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    try {
      console.log(category_id);
      const courses = await db("courses")
        .where("category_id", category_id)
        .limit(limit)
        .offset((page - 1) * limit);
      console.log(courses);
      res.json(courses);

    } catch (error) {
      console.error(error);
      res.status(500).send(error || "Internal server error");
    }
  },

  delete: async (req, res) => {
    try {
      const { title } = req.params;
      const courseFromDB = await db("courses").where("title", title).first();
      if (!courseFromDB) {
        return res.status(404).json({ message: "Curso não encontrado" });
      }
      await db("courses").where("title", title).del();
      res.json({ message: "course deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default CourseController;
