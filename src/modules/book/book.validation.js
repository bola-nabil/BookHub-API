import { AppError } from "../../utils/appError.js"
import Book from "./book.model.js";
import Author from "../author/author.model.js";
import Category from "../category/category.model.js";

export const createBookValidation = async (req, res, next) => {
    const { title, author, categories } = req.body;

    const existBook = await Book.findOne({
        title: {
            $regex: `^${title}$`,
            $options: "i"
        }
    });

    if (existBook) {
        return next(new AppError(`${title} book already exists`, 400));
    }

    const existAuthor = await Author.findById(author);

    if(!existAuthor) {
        return next(new AppError("Author not found", 404));
    }

    const categoriesExists = await Category.find({
        _id: { $in: categories }
    });

    if (categoriesExists.length !== categories.length) {
        return next(new AppError("One or more categories not found", 404));
    }

    next();
}

export const updateBookValidation = async (req, res, next) => {
    const { title, author, categories } = req.body;

    if (title) {
        const existBook = await Book.findOne({
            title: {
                $regex: `^${title}$`,
                $options: "i"
            },
            _id: {
                $ne: req.params.id
            }
        });

        if (existBook) {
            return next(new AppError(`${title} book already exists`, 400));
        }
    }

    if (author) {
        const existAuthor = await Author.findById(author);

        if(!existAuthor) {
            return next(new AppError("Author not found", 404));
        }
    }

    if (categories) {
        const categoriesExists = await Category.find({
            _id: { $in: categories }
        });

        if (categoriesExists.length !== categories.length) {
            return next(new AppError("One or more categories not found", 404));
        }
    }

    next();

}