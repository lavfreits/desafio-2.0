import express from "express";
import CategoryController from "../controllers/CategoryController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import requireAdmin from "../middlewares/requireAdmin.js";
const router = express.Router();

router
  .post("/categories", authMiddleware, requireAdmin, CategoryController.create)
  .get("/categories", authMiddleware, CategoryController.get);
router
  .get("/categories/:name", authMiddleware, CategoryController.getByName)
  .put("/categories/:name", authMiddleware, requireAdmin, CategoryController.update)
  .delete("/categories/:name", authMiddleware, requireAdmin, CategoryController.delete);

export default router;
