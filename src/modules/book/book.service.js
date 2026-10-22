import Book from "./book.model.js";
import Author from "../author/author.model.js";
import Category from "../category/category.model.js";
import { AppError } from "../../utils/appError.js";

export class BookService {
    static getById = async (bookId) => {
        const book = await Book.findById(bookId)
                        .populate("author")
                        .populate("categories");

        if(!book) {
            throw new AppError("Book not found");
        }

        return book;
    }

    static create = async (data) => {
        return await Book.create(data);
    }

    static update = async (bookId, data) => {
        const book = await Book.findByIdAndUpdate(
            bookId,
            data,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if(!book) {
            throw new AppError("Book not found", 404);
        }

        return book;
    }

    static delete = async (bookId) => {
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if(!deletedBook) {
            throw new AppError("Book not found", 404);
        }

        return deletedBook;
    }
}