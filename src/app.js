import "dotenv/config";
import express from "express";
import { appMiddleware } from "./middlewares/appMiddleware.js";
import authRouter from "./modules/auth/auth.routes.js";
import authorRouter from "./modules/author/author.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import bookRouter from "./modules/book/book.routes.js";
import reivewRouter from "./modules/review/review.routes.js";
import favoriteRoute from "./modules/favorite/favorite.routes.js";
import { notFound } from "./middlewares/notFound.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1", reivewRouter);
app.use("/api/v1/", favoriteRoute);

app.use(notFound);
app.use(appMiddleware);

export default app;