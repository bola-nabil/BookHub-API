import express from "express";
import { FavoriteController } from "../controllers/favorite.controllers.js";

const favoriteRoute = express.Router();

favoriteRoute.post("/:bookId/favorite", FavoriteController.createFavorite);

export default favoriteRoute;