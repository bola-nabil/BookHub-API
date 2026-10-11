import { HttpResponses } from "../utils/httpResponses.js";
import { ReviewService } from "../services/review.service.js";

const response = new HttpResponses();

export class ReviewController {
    /**
     * Create Review
     * @POST Method
     */
    static async createReview(req, res, next) {
        try {
            const review = await ReviewService.createReview(
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
            const bookReview = await ReviewService.getReview(req.params.bookId);

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
            const review = await ReviewService.updateReview(
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
}