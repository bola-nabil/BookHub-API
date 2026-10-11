import Category from "../models/category.model.js";
import Book from "../models/book.model.js";
import { AppError } from "../utils/appError.js";

export class CategoryService {
    static async getAllCategories() {
        return await Category.find();
    }

    static async getCategory(id) {
        const category = await Category.findById(id);

        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }

    static async getCategoryWithBooks(id) {
        const category = await Category.findById(id)
                                        .populate("books");
        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }

    static async createCategory(data) {
        const existCategory = await Category.findOne(data);

        if(existCategory) {
            throw new AppError("Sorry category exist before", 400);
        }

        const category = await Category.create(data);

        return category;
    }

    static async updateCategory(id, data) {
        const category = await Category.findByIdAndUpdate(
            id,
            data,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }

    static async deleteCategory(id) {
        const category = await Category.findByIdAndDelete(id);

        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }
}