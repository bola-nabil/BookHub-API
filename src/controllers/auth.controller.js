import { AuthService } from "../services/auth.service.js";
import { HttpResponses } from "../utils/httpResponses.js";

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

            response.success(res, 200, {
                message: "Login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        } catch(error) {
            next(error);
        }
    }
}