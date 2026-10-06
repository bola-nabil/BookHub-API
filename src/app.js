import "dotenv/config";
import express from "express";
import { env } from "./config/env.js";
import connectDB from "./config/db.js";
import { appMiddleware } from "./middlewares/appMiddleware.js";
import authorRouter from "./routes/author.routes.js";

const app = express();

await connectDB();

app.use(express.json());

app.use("/api/v1/authors", authorRouter);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Router to found"
    });
})

app.use(appMiddleware);

app.listen(env.port, () => {
    console.log(`APP running on http://localhost:${env.port}`);
})