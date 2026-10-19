import { HttpResponses } from "../utils/httpResponses.js";
import { FavoriteService } from "../services/favorite.service.js";

const response = new HttpResponses();

export class FavoriteController {
    static createFavorite = async (req, res, next) => {
        try {
            const favorite = await FavoriteService.createFavorite(req.params.bookId, req.user.id);

            response.success(res, 201, {
                success: true,
                data: favorite,
            });
        } catch(error) {
            next(error);
        }
    }
}