import app from "./app.js";
import { env } from "./config/env.js";
import connectDB from "./config/db.js";

const startServer = async () => {
    await connectDB();

    app.listen(env.port, () => {
        console.log(`APP running on http://localhost:${env.port}`);
    });
}

startServer().catch((error) => {
    console.error("Server startup failed:", error);
    process.exit(1);
});