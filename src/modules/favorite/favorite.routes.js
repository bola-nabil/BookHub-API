import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { FavoriteController } from "./favorite.controllers.js";

const favoriteRoute = express.Router();

favoriteRoute.use(authMiddleware);

favoriteRoute.post("/books/:bookId/favorite", FavoriteController.createFavorite);
favoriteRoute.get("/users/me/favorites", FavoriteController.getFavorites);
favoriteRoute.delete("/books/:bookId/favorite", FavoriteController.deleteFavorite);

export default favoriteRoute;