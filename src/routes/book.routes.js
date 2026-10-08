import express, { Router } from "express";
import { BookController } from "../controllers/book.controller.js";
import { bookMiddleware } from "../middlewares/bookMiddleware.js";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", bookMiddleware, BookController.createBook);
bookRouter.patch("/", bookMiddleware, BookController.updateBook);

export default bookRouter;