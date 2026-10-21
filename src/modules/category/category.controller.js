import { HttpResponses } from "../../utils/httpResponses.js";
import { CategoryService } from "./category.service.js";

const response = new HttpResponses();

export class CategoryController {
    /**
     * Get all categories with books details
     * @GET Method
     */
    static async getAllCategories(req, res, next) {
        try {
            const categories = await CategoryService.getAll();
        
            response.success(res, 200, {
                success: true,
                data: categories
            });
        } catch(error) {
           next(error);
        }
    }

    /**
     * Get category by id
     * @GET Method
     */
    static async getCategory(req, res, next) {
        try {
            const category = await CategoryService.getById(req.params.id);

            response.success(res, 200, {
                success: true,
                data: category
            });
        } catch(error) {
            next(error);
        }
    }


    /**
     * Get category by id with book details
     * @GET Method
     */
    static async getCategoryWithBooks(req, res, next) {
        try {
            const category = await CategoryService.getByBooks(req.params.id);

            response.success(res, 200, {
                success: true,
                data: category
            });
        } catch(error) {
            next(error);
        }
    }

    
    /**
     * Create category
     * @POST Method
     */
    static async createCategory(req, res, next) {
        try {
            const category = await CategoryService.create(req.body);

            response.success(res, 201, {
                success: true,
                data: category
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update category by id
     * @PATCH Method
     */
    static async updateCategory(req, res, next) {
        try {
            const category = await CategoryService.update(
                req.params.id,
                req.body
            );
            response.success(res, 200, {
                success: true,
                data: category
            });
        } catch(error) {
           next(error);
        }
    }

    /**
     * Delete category by id
     * @DELETE Method
     */
    static async deleteCategory(req, res, next) {
        try {
            await CategoryService.delete(req.params.id);

            response.success(res, 200, {
                success: true,
                message: "Category deleted successfully"
            });
        } catch(error) {
            next(error);
        }
    }
}