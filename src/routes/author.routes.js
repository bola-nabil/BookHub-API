import express from "express";
import { AuthorController } from "../controllers/author.controller.js";
import { authorize } from "../middlewares/authorize.js";

const authorRouter = express.Router();

authorRouter.post("/", authorize("admin"), AuthorController.createAuthor);
authorRouter.get("/", AuthorController.getAllAuthors);
authorRouter.get("/:id", AuthorController.getAuthor);
authorRouter.get("/:id/books", AuthorController.getAuthorByBooks);
authorRouter.patch("/:id", authorize("admin"), AuthorController.updateAuthor);
authorRouter.delete("/:id", authorize("admin"), AuthorController.deleteAuthor);

export default authorRouter;