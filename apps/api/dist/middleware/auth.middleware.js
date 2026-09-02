import jwt from "jsonwebtoken";
const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
if (!accessSecret) {
    throw new Error("JWT_ACCESS_SECRET is not configured");
}
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, accessSecret);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid token or expired token" });
    }
}
