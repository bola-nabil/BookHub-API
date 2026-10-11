import Review from "../models/review.model.js";
import { AppError } from "../utils/appError.js";

export class ReviewService {
    static async createReview(data, userId, bookId) {
        const { rating, comment } = data;

        const review = await Review.create({
            comment,
            rating,
            user: userId,
            book: bookId
        });

        return review;
    }
}