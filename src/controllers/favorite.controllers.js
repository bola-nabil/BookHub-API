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

    static getFavorites = async (req, res, next) => {
        try {
            const favorites = await FavoriteService.getFavorites(req.user.id);

            response.success(res, 200, {
                success: true,
                data: favorites
            });
        } catch(error) {
            next(error);
        }
    }

    static deleteFavorite = async (req, res, next) => {
        try {
            await FavoriteService.deleteFavorite(
                req.user.id,
                req.params.bookId
            );

            response.success(res, 200, {
                success: true,
                message: "Favorite deleted successfully"
            });
        } catch(error) {
            next(error);
        }
    }
}