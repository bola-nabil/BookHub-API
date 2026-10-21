import Review from "./review.model.js";
import Book from "../book/book.model.js";
import { AppError } from "../../utils/appError.js";

export class ReviewService {
    static async create(data, userId, bookId) {
        const { rating, comment } = data;

        const review = await Review.create({
            comment,
            rating,
            user: userId,
            book: bookId
        });

        return review;
    }

    static async getByID(bookId) {
        const bookReview = await Book.findById(bookId).populate("reviews");

        if(!bookReview) {
            throw new AppError("Book not found", 404);
        }

        return bookReview;
    }

    static async update(id, data) {
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

    static async delete(id) {
        const review = await Review.findByIdAndDelete(id);

        if(!review) {
            throw new AppError("Review not found", 404);
        }

        return review;
    } 
}