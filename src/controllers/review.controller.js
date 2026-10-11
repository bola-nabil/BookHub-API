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
}