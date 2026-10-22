import express from "express";
import { AuthController } from "./auth.controller.js";
import { registerValidation, loginValidation } from "./auth.validation.js";


const authRouter = express.Router();

authRouter.post("/register", registerValidation, AuthController.register);
authRouter.post("/login", loginValidation, AuthController.login);

export default authRouter;