import express from "express";
import { BookController } from "../controllers/book.controller.js";
import { createBookMiddleware } from "../../middlewares/books/createBookMiddleware.js";
import { updateBookMiddleware } from "../../middlewares/books/updateBookMiddleware.js";
import { authorize } from "../../middlewares/authorize.js";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", authorize("admin"), createBookMiddleware, BookController.createBook);
bookRouter.patch("/:id", authorize("admin"), updateBookMiddleware, BookController.updateBook);
bookRouter.delete("/:id", authorize("admin"), BookController.deleteBook);

export default bookRouter;