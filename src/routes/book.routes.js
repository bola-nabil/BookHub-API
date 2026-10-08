import express from "express";
import { BookController } from "../controllers/book.controller.js";
import { createBookMiddleware } from "../middlewares/books/createBookMiddleware.js";
import { updateBookMiddleware } from "../middlewares/books/updateBookMiddleware.js";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", createBookMiddleware, BookController.createBook);
bookRouter.patch("/:id", updateBookMiddleware, BookController.updateBook);
bookRouter.delete("/:id", BookController.deleteBook);

export default bookRouter;