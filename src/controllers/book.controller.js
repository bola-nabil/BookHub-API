import Book from "../models/book.model.js";
import Category from "../models/category.model.js";
import Author from "../models/author.model.js";
import Review from "../models/review.model.js";
import { AppError } from "../utils/appError.js";
import { notFound } from "../utils/notFound.js";
import { HttpResponses } from "../utils/httpResponses.js";
import mongoose from "mongoose";

const response = new HttpResponses();

export class BookController {
    /**
     * Get all books
     * @GET Method
     */
    static async getAllBooks(req, res, next) {
    }

    /**
     * Get one book by id
     * @GET Method
     */
    static async getBook(req, res, next) {
        
    }

    /**
     * Create Book
     * @POST Method
     */
    static async createBook(req, res, next) {
        try {
            const {
                title,
                description,
                isbn,
                coverImage,
                publishedAt,
                pages,
                language,
                stock,
                author,
                categories
            } = req.body;

            const existBook = await Book.findOne({
                title: {
                    $regex: title,
                    $options: "i"
                }
            });

            if(existBook) {
                throw new AppError(`${title} book exist`, 400);
            }

            const existAuthor = await Author.findOne({
                _id: author
            });

            notFound(existAuthor, "Author");

            const categoriesExists = await Category.find({
                _id: { $in: categories }
            });

            if(categoriesExists.length !== categories.length) {
                throw new AppError("Category not found", 404);
            }

            const book = await Book.create({
                title,
                description,
                isbn,
                coverImage,
                publishedAt,
                pages,
                language,
                stock,
                author,
                categories
            });

            response.success(res, 201, {
                success: true,
                data: book
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update book by id
     * @PATCH Method
     */
    static async updateBook(req, res, next) {

    }

    /**
     * Delete book by id
     * @DELEtE Method
     */
    static async deleteBook(req, res, next) {

    }
}

/*
{
    title: "Clean Code",

    description: "A handbook of agile software craftsmanship.",

    isbn: "9780132350884",

    price: 35,

    coverImage: "...",

    publishedAt: "2008-08-01",

    pages: 464,

    language: "English",

    stock: 20,

    author: ObjectId,

    categories: [
        ObjectId,
        ObjectId
    ]
}
*/