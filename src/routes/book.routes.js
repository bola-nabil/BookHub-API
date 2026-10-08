import express, { Router } from "express";
import { BookController } from "../controllers/book.controller.js";

const bookRouter = express.Router();

bookRouter.post("/", BookController.createBook);

export default bookRouter;