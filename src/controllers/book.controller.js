import Book from "../models/book.model.js";
import Category from "../models/category.model.js";
import Author from "../models/author.model.js";
import Review from "../models/review.model.js";
import { AppError } from "../utils/appError.js";
import { notFound } from "../utils/notFound.js";
import { HttpResponses } from "../utils/httpResponses.js";
import { pagination } from "../utils/pagination.js";
import { sortData } from "../utils/sortData.js";
import mongoose from "mongoose";

const response = new HttpResponses();


const filterBooks = (req) => {
        const filter = {};

        if(req.query.search) {
            filter.title = {
                $regex: req.query.search,
                $options: "i"
            }
        }

        if(req.query.author) {
            filter.author = req.query.author
        }

        if(req.query.category) {
            filter.categories = req.query.category
        }

        if (req.query.minPrice || req.query.maxPrice) {
            filter.price = {};

            if (req.query.minPrice) {
                filter.price.$gte = Number(req.query.minPrice);
            }

            if (req.query.maxPrice) {
                filter.price.$lte = Number(req.query.maxPrice);
            }
        }

        if(req.query.language) {
            filter.language = req.query.language
        }

        return filter;
}

export class BookController {
    /**
     * Get all books
     * @GET Method
     */
    static async getAllBooks(req, res, next) {
        try {

            const filter = filterBooks(req);

            const { page, skip, limit } = pagination(req);

            const sort = sortData(req);

            const [books, totalBooks] = await Promise.all([
                await Book.find(filter)
                .populate("author")
                .populate("categories")
                .skip(skip)
                .limit(limit)
                .sort(sort),
                Book.countDocuments(filter)
            ]);

            const pages = Math.ceil(totalBooks / limit);

            response.success(res, 200, {
                success: true,
                page,
                limit,
                total: totalBooks,
                pages,
                data: books
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Get one book by id
     * @GET Method
     */
    static async getBook(req, res, next) {
        try {
            const book = 
                await Book.findById(req.params.id)
                .populate("author")
                .populate("categories");

            notFound(book, "Book");

            response.success(res, 200, {
                success: true,
                data: book
            });
        } catch(error) {
            next(error);
        }
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
                price,
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
                price,
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