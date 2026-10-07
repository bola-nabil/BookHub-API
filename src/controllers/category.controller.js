import Category from "../models/category.model.js";
import Book from "../models/book.model.js";
import { AppError } from "../utils/appError.js";
import { notFound } from "../utils/notFound.js";
import { HttpResponses } from "../utils/httpResponses.js";

const response = new HttpResponses();

export class CategoryController {
    /**
     * Get all categories with books details
     * @GET Method
     */
    static async getAllCategories(req, res, next) {
        try {
            const categories = 
                await Category.find().populate("books");
        
            response.success(res, 200, {
                success: true,
                data: categories
            });
        } catch(error) {
            next(new AppError(error.message, 400));
        }
    }
}