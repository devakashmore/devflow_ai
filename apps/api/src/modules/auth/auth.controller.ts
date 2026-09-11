import { Request, Response } from "express"
import { loginUser, registerUser } from "../auth/auth.service.js"
import { generateAccessToken, generateRefreshToken } from "../auth/auth.token.js"
import { loginSchema, registerSchema } from "../auth/auth.validation.js"


export async function register(req: Request, res: Response) {
    try {
        const data = registerSchema.parse(req.body);
        const user = await registerUser(data);
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.status(201).json(
            {
                success: true,
                message: "User registered successfully",
                data: {
                    user,
                    accessToken,
                    refreshToken
                }
            });
    } catch (error: any) {

        if (error instanceof Error && error.message === "User already exists") {
            res.status(409).json({
                success: false,
                message: "User already exists"
            });
        } else {
            res.status(400).json({
                success: false,
                message: "invalid registration data",
                error: error.message,
                errors: error.issues,

            });
            console.log(error);

        }
    }
}

export async function login(req: Request, res: Response) {
    try {
        const data = loginSchema.parse(req.body);
        const user = await loginUser(data);
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    avatarUrl: user.avatarUrl,
                },
                accessToken,
                refreshToken
            }
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: "invalid login data(email or password)",
        });
    }
}