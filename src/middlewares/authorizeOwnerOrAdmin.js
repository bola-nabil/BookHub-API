import { AppError } from "../utils/appError.js";

export const authorizeOwnerOrAdmin = (req, res, next) => {
    const isOwner = req.user._id.toString() === req.params.id;

    const isAdmin = req.user.role === "admin";

    if(!isOwner || isAdmin) {
        return next(new AppError("Forbidden", 403));
    }

    next();
}