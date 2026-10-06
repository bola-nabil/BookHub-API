import express from "express";
import { AuthorController } from "../controllers/author.controller.js";

const authorRouter = express.Router();

authorRouter.post("/", AuthorController.createAuthor);

export default authorRouter;