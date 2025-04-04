import express from "express";
import authController from "../controllers/auth.controller";
import { authenticate } from "../middlewares/authenticate";

const authRouter = express.Router();

authRouter.post("/login", authController.login);

authRouter.post("/register", authController.register);

authRouter.get("/currentuser", authenticate, authController.currentuser);

export default authRouter;
