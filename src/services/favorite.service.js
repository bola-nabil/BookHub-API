import Favorite from "../models/favorite.model.js";

export class FavoriteService {
    static createFavorite = async (data, user) => {
        const book = data;

        const favorite = await Favorite.create({
            user: user,
            book: book
        });

        return favorite;
    }
}