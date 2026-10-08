import Book from "../../models/book.model.js";
import Category from "../../models/category.model.js";
import Author from "../../models/author.model.js";
import { notFound } from "../../utils/notFound.js";
import { AppError } from "../../utils/appError.js";


export const updateBookMiddleware = async (req, res, next) => {
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
            throw new AppError(`${title} book already exists`, 400);
        }
    }

    if (author) {
        const existAuthor = await Author.findById(author);

        notFound(existAuthor, "Author");
    }

    if (categories) {
        const categoriesExists = await Category.find({
            _id: { $in: categories }
        });

        if (categoriesExists.length !== categories.length) {
            throw new AppError("One or more categories not found", 404);
        }
    }

    next();
};