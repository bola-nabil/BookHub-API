import express from "express";
import { CategoryController } from "./category.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/authorize.js";

const categoryRouter = express.Router();

categoryRouter.use(authMiddleware);

categoryRouter.get("/", CategoryController.getAllCategories);
categoryRouter.get("/:id", CategoryController.getCategory);
categoryRouter.get("/:id/books", CategoryController.getCategoryWithBooks);
categoryRouter.post("/", authorize("admin"), CategoryController.createCategory);
categoryRouter.patch("/:id", authorize("admin"), CategoryController.updateCategory);
categoryRouter.delete("/:id", authorize("admin"), CategoryController.deleteCategory);

export default categoryRouter;