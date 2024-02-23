import express from "express";
import CourseController from "../controllers/CourseController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import requireProfessor from "../middlewares/requireProfessor.js";
const router = express.Router();

router
  .post("/courses", authMiddleware, requireProfessor, CourseController.create)
  .get("/courses", authMiddleware, CourseController.get);

router
  .get("/courses/:title", authMiddleware, CourseController.getByTitle)
  .put("/courses/:title", authMiddleware, requireProfessor, CourseController.update)
  .delete("/courses/:title", authMiddleware, CourseController.delete);

export default router;
