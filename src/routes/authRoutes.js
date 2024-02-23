import express from "express";
import AuthenticationController from "../controllers/AuthenticationController.js";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/signin", AuthenticationController.login)
  .post("/signup", UserController.createUser);

export default router;