import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "../utils/appError.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authentication token is required"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decode = jwt.verify(token, env.jwt_secret);

        req.user = {
            id: decode.userId,
            role: decode.role
        }

        return next();
    } catch {
       return next(new AppError("Invalid or expired token", 401));
    }
}