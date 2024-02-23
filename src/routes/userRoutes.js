import express from "express";
import UserController from "../controllers/UserController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .post("/users", authMiddleware, UserController.createUser)
  .get("/users", authMiddleware, UserController.getUsers);

router
  .get("/users/:id", authMiddleware, UserController.getUserById)
  .put("/users/:id", authMiddleware, UserController.updateUser)
  .delete("/users/:id", authMiddleware, UserController.deleteUser);

export default router;