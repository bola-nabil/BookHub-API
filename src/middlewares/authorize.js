import { AppError } from "../utils/appError.js";

export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!req.user) {
            throw new AppError("Authentication required", 401);
        }

        if(!roles.includes(req.user.role)) {
            throw new AppError("You do not have permission", 403);
        }

        next();
    }
}