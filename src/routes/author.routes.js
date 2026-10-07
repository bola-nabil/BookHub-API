import express from "express";
import { AuthorController } from "../controllers/author.controller.js";

const authorRouter = express.Router();

authorRouter.post("/", AuthorController.createAuthor);
authorRouter.get("/", AuthorController.getAllAuthors);
authorRouter.get("/:id", AuthorController.getAuthor);
authorRouter.patch("/:id", AuthorController.updateAuthor);
authorRouter.delete("/:id", AuthorController.deleteAuthor);

export default authorRouter;