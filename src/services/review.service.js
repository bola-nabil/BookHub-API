import Review from "../models/review.model.js";
import Book from "../models/book.model.js";
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

    static async getReview(bookId) {
        const bookReview = await Book.findById(bookId).populate("reviews");

        if(!bookReview) {
            throw new AppError("Book not found", 404);
        }

        return bookReview;
    }

    static async updateReview(id, data) {
        const review = await Review.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if(!review) {
            throw new AppError("Review not found", 404);
        }

        return review;
    }

    static async deleteReview(id) {
        const review = await Review.findByIdAndDelete(id);

        if(review) {
            throw new AppError("Review not found", 404);
        }

        return review;
    } 
}