import express from "express";
import { BookController } from "./book.controller.js";
import { createBookValidation, updateBookValidation } from "./book.validation.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorize } from "../../middlewares/authorize.js";

const bookRouter = express.Router();

bookRouter.use(authMiddleware);

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBookById);
bookRouter.post("/", authorize("admin"), createBookValidation, BookController.createBook);
bookRouter.patch("/:id", authorize("admin"), updateBookValidation , BookController.updateBook);
bookRouter.delete("/:id", authorize("admin"), BookController.deleteBook);

export default bookRouter;