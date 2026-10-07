import Author from "../models/author.model.js";
import Book from "../models/book.model.js";
import { AppError } from "../utils/appError.js";
import { notFound } from "../utils/notFound.js";
import { HttpResponses } from "../utils/httpResponses.js";

const response = new HttpResponses();

export class AuthorController {
    /**
     * Create author
     * @POSt Method
     */
    static async createAuthor(req, res, next) {
        try {
            const author = await Author.create(req.body);

            response.success(res, 201, {
                success: true,
                data: author
            });
        } catch(error) {
            next(new AppError(error.message, 400));
        }
    }
}