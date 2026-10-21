import Category from "./category.model.js";
import Book from "../book/book.model.js";
import { AppError } from "../../utils/appError.js";

export class CategoryService {
    static async getAll() {
        return await Category.find();
    }

    static async getById(id) {
        const category = await Category.findById(id);

        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }

    static async getByBooks(id) {
        const category = await Category.findById(id)
                                        .populate("books");
        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }

    static async create(data) {
        const existCategory = await Category.findOne(data);

        if(existCategory) {
            throw new AppError("Sorry category exist before", 400);
        }

        const category = await Category.create(data);

        return category;
    }

    static async update(id, data) {
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

    static async delete(id) {
        const category = await Category.findByIdAndDelete(id);

        if(!category) {
            throw new AppError("Category not found", 404);
        }

        return category;
    }
}