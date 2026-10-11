import express from "express";
import { ReviewController } from "../controllers/review.controller.js";

const reivewRouter = express.Router();

reivewRouter.post("/:bookId/reviews", ReviewController.createReview);

export default reivewRouter;