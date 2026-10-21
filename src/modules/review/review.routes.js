import express from "express";
import { ReviewController } from "./review.controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { authorizeOwnerOrAdmin } from "../../middlewares/authorizeOwnerOrAdmin.js";

const reivewRouter = express.Router();

reivewRouter.use(authMiddleware);

reivewRouter.post("/books/:bookId/reviews", ReviewController.createReview);
reivewRouter.get("/books/:bookId/reviews", ReviewController.getReview);
reivewRouter.patch("/reviews/:id", authorizeOwnerOrAdmin, ReviewController.updateReview);
reivewRouter.delete("/reviews/:id", authorizeOwnerOrAdmin, ReviewController.deleteReview);

export default reivewRouter;