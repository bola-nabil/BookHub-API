import Book from "./book.model.js";
import Category from "../category/category.model.js";
import Author from "../author/author.model.js";
import Review from "../review/review.model.js";
import { HttpResponses } from "../../utils/httpResponses.js";
import { pagination } from "../../utils/pagination.js";
import { sortData } from "../../utils/sortData.js";
import { BookService } from "./book.service.js";

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
    static async getBookById(req, res, next) {
        try {
            const book = await BookService.getById(req.params.id);

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
            const book = BookService.create(req.body);

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
        try {
            const book = BookService.update(req.params.id, req.body);

            response.success(res, 200, {
                success: true,
                data: book
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Delete book by id
     * @DELEtE Method
     */
    static async deleteBook(req, res, next) {
        try {
           await BookService.delete(req.params.id);

           response.success(res, 200, {
                success: true,
                message: "Book deleted successfully"
           });
        } catch(error) {
            next(error);
        }
    }
}