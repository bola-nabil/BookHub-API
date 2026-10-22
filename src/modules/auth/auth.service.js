import User from "./user.model.js";
import { AppError } from "../../utils/appError.js";

export class AuthService {
    static register = async (data) => {
        const { name, email, password, avatar } = data;

        const existUser = await User.findOne({ email });

        if(existUser) {
            throw new AppError("You can't register with this email", 409);
        }

        const user = await User.create({
            name,
            email,
            password,
            role: "user",
            avatar
        });

        return user;
    }

    static login = async (data) => {
        const { email, password } = data;

        const user = await User.findOne({
            email: email.trim().toLowerCase()
        }).select("+password");

        if(!user) {
            throw new AppError("Email or password not vaild", 401);
        }

        return user;
    }
}