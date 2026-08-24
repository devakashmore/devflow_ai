import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
interface JwtPayload {
    userId: string;
}
export interface AuthRequest extends Request {
    userId?: string;

}

const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET!;

if (!accessSecret) {
    throw new Error("JWT_ACCESS_SECRET is not configured");
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, accessSecret) as JwtPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token or expired token" });
    }


}