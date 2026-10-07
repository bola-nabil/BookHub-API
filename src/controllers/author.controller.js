import Author from "../models/author.model.js";
import Book from "../models/book.model.js";
import { AppError } from "../utils/appError.js";
import { notFound } from "../utils/notFound.js";
import { HttpResponses } from "../utils/httpResponses.js";
import mongoose from "mongoose";

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

    /**
     * Get all authors with books details
     * @GET Method
     */
    static async getAllAuthors(req, res, next) {
        try {
            const authors = await Author.find().populate("books");

            response.success(res, 200, {
                success: true,
                data: authors
            });
        } catch(error) {
            next(new AppError(error.message, 400));
        }
    }

    /**
     * Get author by id with book informations
     * @GET Method
     */
    static async getAuthor(req, res, next) {
        try {
            const author = 
                await Author.findById(req.params.id).populate("books");

            notFound(author, "Author");

            response.success(res, 200, {
                success: true,
                data: author
            });
        } catch(error) {
            next(new AppError(error.message, error.statusCode || 400));
        }
    }

    /**
     * Update author information
     * @PATCH Method
     */
    static async updateAuthor(req, res, next) {
        try {
            const { name, bio, nationality, birthDate, image } = req.body;

            const author = await Author.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    bio,
                    nationality,
                    birthDate,
                    image
                },
                {
                    returnDocument: 'after',
                    runValidators: true
                }
            );

            notFound(author, "Author");

            response.success(res, 200, {
                success: true,
                data: author
            });
        } catch(error) {
            next(new AppError(error.message, error.statusCode || 400));
        }
    }

    /**
     * Delete author by id and related books
     * @DELETE Method
     */
    static async deleteAuthor(req, res, next) {
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(async () => {
                const author = 
                    await Author.findByIdAndDelete(req.params.id).session(session);

                if(!author) {
                    throw new AppError("Author not found", 404);
                }

                await Book.deleteMany({
                    author: author._id
                }).session(session);

                response.success(res, 200, {
                    success: true,
                    message: "Author deleted successfully"
                });
            })
        } catch(error) {
            next(new AppError(error.message, error.statusCode || 400));
        } finally {
            session.endSession();
        }
    }
}