import User from "./user.model.js";
import { AppError } from "../../utils/appError.js";
import bcrypt from "bcrypt";

export class AuthService {
    static register = async (data) => {
        const { name, email, password, role, avatar } = data;

        if(!name || !email || !password) {
            throw new AppError("Name, email and password are required", 400);
        }

        if(typeof password !== "string") {
            throw new AppError("Password must be string", 400);
        }

        const existUser = await User.findOne({ email });

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

    static login = async (data) => {
        const { email, password } = data;

        if(typeof email !== "string" || typeof password !== "string"
            || !email || !password
        ) {
            throw new AppError("Email and password required", 400);
        }

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select("+password");

        if(!user) {
            throw new AppError("Email or password not vaild", 401);
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            throw new AppError("Email or password not vaild", 401);
        }

        return user;
    }
}