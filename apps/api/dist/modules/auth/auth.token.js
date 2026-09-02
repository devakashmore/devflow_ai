import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.JWT_REFRESH_TOKEN_SECRET;
if (!accessSecret || !refreshSecret) {
    throw new Error("JWT secrets Are Not Configured");
}
export function generateAccessToken(userId) {
    return jwt.sign({ userId }, accessSecret, { expiresIn: "15m" });
}
export function generateRefreshToken(userId) {
    return jwt.sign({ userId }, refreshSecret, { expiresIn: "5d" });
}
