
export const notFound = (res, req, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });

    next();
}