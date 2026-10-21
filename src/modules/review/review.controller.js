import { HttpResponses } from "../../utils/httpResponses.js";
import { ReviewService } from "./review.service.js";

const response = new HttpResponses();

export class ReviewController {
    /**
     * Create Review
     * @POST Method
     */
    static async createReview(req, res, next) {
        try {
            const review = await ReviewService.create(
                req.body, req.user.id, req.params.bookId
            );

            response.success(res, 201, {
                success: true,
                data: review
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Get Review by book id
     * @GET Method
     */
    static async getReview(req, res, next) {
        try {
            const bookReview = await ReviewService.getByID(req.params.bookId);

            response.success(res, 200, {
                success: true,
                data: bookReview
            });
        } catch(error) {
            next(error);
        }
    }

    /**
     * Update review by id
     * @PATCH Method
     */
    static async updateReview(req, res, next) {
        try {
            const review = await ReviewService.update(
                req.params.id,
                req.body
            );

            response.success(res, 200, {
                success: true,
                data: review
            })
        } catch(error) {
            next(error);
        }
    }

    /**
     * Delete review by id
     * @DELETE Method
     */
    static async deleteReview(req, res, next) {
        try {
            await ReviewService.delete(req.params.id);

            response.success(res, 200, {
                success: true,
                message: "Review deleted successfully"
            });
        } catch(error) {
            next(error);
        }
    }
}