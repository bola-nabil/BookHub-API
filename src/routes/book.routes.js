import express, { Router } from "express";
import { BookController } from "../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.get("/", BookController.getAllBooks);
bookRouter.get("/:id", BookController.getBook);
bookRouter.post("/", BookController.createBook);

export default bookRouter;