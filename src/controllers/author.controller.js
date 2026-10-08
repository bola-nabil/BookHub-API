import { HttpResponses } from "../utils/httpResponses.js";
import { AuthorService } from "../services/author.service.js";

const response = new HttpResponses();

export class AuthorController {
    /**
     * Create author
     * @POSt Method
     */
    static async createAuthor(req, res, next) {
        try {
            const author = await AuthorService.createAuthor(req.body);

            response.success(res, 201, {
                success: true,
                data: author
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Get all authors with books details
     * @GET Method
     */
    static async getAllAuthors(req, res, next) {
        try {
            const authors = await AuthorService.getAllAuthors();

            response.success(res, 200, {
                success: true,
                data: authors
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Get author by id with book informations
     * @GET Method
     */
    static async getAuthor(req, res, next) {
        try {
            const author = await AuthorService.getAuthor(req.params.id);

            response.success(res, 200, {
                success: true,
                data: author
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update author information
     * @PATCH Method
     */
    static async updateAuthor(req, res, next) {
        try {

            const author = await AuthorService.updateAuthor(
                req.params.id,
                req.body
            );

            response.success(res, 200, {
                success: true,
                data: author
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Delete author by id and related books
     * @DELETE Method
     */
    static async deleteAuthor(req, res, next) {
        try {
            await AuthorService.deleteAuthor(req.params.id);

            response.success(res, 200, {
                success: true,
                message: "Author deleted successfully"
            });
        } catch(error) {
            next(error);
        }
    }
}