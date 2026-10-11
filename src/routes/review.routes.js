import express from "express";
import { ReviewController } from "../controllers/review.controller.js";

const reivewRouter = express.Router();

reivewRouter.post("/books/:bookId/reviews", ReviewController.createReview);
reivewRouter.get("/books/:bookId/reviews", ReviewController.getReview);
reivewRouter.patch("/reviews/:id", ReviewController.updateReview);
reivewRouter.delete("/reviews/:id", ReviewController.deleteReview);

export default reivewRouter;