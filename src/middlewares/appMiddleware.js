export const appMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message;

    if(err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(el => el.message).join(', ');
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = `Duplicate field value: ${Object.keys(err.keyValue).join(', ')}`;
    }

    res.status(statusCode).json({
        success: false,
        message: statusCode === 500 ? "Internal server error" : message
    }); 
}