import express from "express";
import { CategoryController } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

categoryRouter.get("/", CategoryController.getAllCategories);
categoryRouter.get("/:id", CategoryController.getCategory);
categoryRouter.get("/:id/books", CategoryController.getCategoryWithBooks);
categoryRouter.post("/", CategoryController.createCategory);
categoryRouter.patch("/:id", CategoryController.updateCategory);
categoryRouter.delete("/:id", CategoryController.deleteCategory);

export default categoryRouter;