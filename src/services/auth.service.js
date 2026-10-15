import User from "../models/user.model.js";
import { AppError } from "../utils/appError.js";

export class AuthService {
    static register = async (data) => {
        const { name, email, password, role, avatar } = data;

        if(!name || !email || !password) {
            throw new AppError("Name, email and password are required", 400);
        }

        if(typeof password !== "string") {
            throw new AppError("Password must be string", 400);
        }

        if(role !== "user" || role !== "admin") {
            throw new AppError("Role not vaild", 400);
        }

        const existUser = await User.findOne({ email }).select("+password");

        if(existUser) {
            throw new AppError("You can't register with this email", 409);
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            avatar
        });

        return user;
    }
}