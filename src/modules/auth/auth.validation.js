import { AppError } from "../../utils/appError.js";
import bcrypt from "bcrypt";

export const registerValidation = (req, res, next) => {
    const { name, email, password} = req.body;

    if(!name || !email || !password) {
        return next(new AppError("Name, email and password are required", 400));
    }

    if(typeof password !== "string") {
        return next(new AppError("Password must be string", 400));
    }
    
    next();
}

export const loginValidation = async (req, res, next) => {
    const { email, password } = req.body;

    if(typeof email !== "string" || typeof password !== "string"
        || !email || !password
    ) {
        return next(new AppError("Email and password required", 400));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) {
        return next(new AppError("Email or password not vaild", 401));
    }

    next();
}