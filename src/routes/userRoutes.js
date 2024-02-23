import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import requireAdmin from "../middlewares/requireAdmin.js";

const router = express.Router();

router
  .post("/users", authMiddleware, UserController.createUser)
  .get("/users", authMiddleware, requireAdmin, UserController.getUsers);

router
  .get("/users/:id", authMiddleware, UserController.getUserById)
  .put("/users/:id", authMiddleware, requireAdmin, UserController.updateUser)
  .delete("/users/:id", authMiddleware, requireAdmin, UserController.deleteUser);

export default router;