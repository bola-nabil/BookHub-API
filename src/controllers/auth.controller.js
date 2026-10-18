import { AuthService } from "../services/auth.service.js";
import { HttpResponses } from "../utils/httpResponses.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const response = new HttpResponses();

export class AuthController {
    static register = async (req, res, next) => {
        try {
            const user = await AuthService.register(req.body);

            response.success(res, 201, {
                message: "You're registered successfully",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch(error) {
            next(error);
        }
    }

    static login = async (req, res, next) => {
        try {
            const user = await AuthService.login(req.body);

            const token = jwt.sign(
                { userId: user._id.toString() },
                env.jwt_secret,
                { expiresIn: "1h"}
            )

            response.success(res, 200, {
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                },
                token
            });
        } catch(error) {
            next(error);
        }
    }
}