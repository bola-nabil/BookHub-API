import mongoose from "mongoose";
import { env } from "./env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(env.db_url);
        console.log("Database connected successfully");
    } catch(error) {
        console.error("Database failed to connect => ", error.message);
    }
}

export default connectDB;