import "dotenv/config";
import express from "express";
import { env } from "./config/env.js";
import connectDB from "./config/db.js";

const app = express();

await connectDB();

app.listen(env.port, () => {
    console.log(`APP running on http://localhsot:${env.port}`);
})