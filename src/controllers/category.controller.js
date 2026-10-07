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

    /**
     * Get category by id with book details
     * @GET Method
     */
    static async getCategory(req, res, next) {
        try {
            const category = 
                await Category.findById(req.params.id).populate("books");

            notFound(category, "Category");

            response.success(res, 200, {
                success: true,
                data: category
            });
        } catch(error) {
            next(new AppError(error.message, error.statusCode || 400));
        }
    }

    /**
     * Create category
     * @POST Method
     */
    static async createCategory(req, res, next) {
        try {
            const existCategory = await Category.findOne(req.body);

            if(existCategory) {
                throw new AppError("Sorry category exist before", 400);
            }

            const category = await Category.create(req.body);

            response.success(res, 201, {
                success: true,
                data: category
            });
        } catch(error) {
            next(new AppError(error.message, error.statusCode || 400));
        }
    }
}