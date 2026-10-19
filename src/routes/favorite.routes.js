import express from "express";
import { FavoriteController } from "../controllers/favorite.controllers.js";

const favoriteRoute = express.Router();

favoriteRoute.post("/books/:bookId/favorite", FavoriteController.createFavorite);
favoriteRoute.get("/users/me/favorites", FavoriteController.getFavorites);
favoriteRoute.delete("/books/:bookId/favorite", FavoriteController.deleteFavorite);

export default favoriteRoute;