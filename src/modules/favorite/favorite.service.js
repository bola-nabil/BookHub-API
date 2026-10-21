import Favorite from "./favorite.model.js";
import { AppError } from "../../utils/appError.js";

export class FavoriteService {
    static create = async (data, user) => {
        const book = data;

        const favorite = await Favorite.create({
            user: user,
            book: book
        });

        return favorite;
    }

    static getByID = async (userId) => {
        const favorites = await Favorite.find({
            user: userId
        }).populate("user").populate("book", "title author coverImage");

        if(favorites.length === 0) {
            throw new AppError("No Favorites Added", 404);
        }

        return favorites;
    }

    static delete = async (userId, bookId) => {
        const favorite = await Favorite.deleteOne({
            user: userId,
            book: bookId
        });

        if(!favorite) {
            throw new AppError("Favorite not found", 404);
        }

        return favorite;
    }
}