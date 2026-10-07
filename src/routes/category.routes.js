import express from "express";
import { CategoryController } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", CategoryController.getAllCategories);

export default categoryRouter;