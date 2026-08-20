import { Response } from "express";
import { prisma } from "../../config/database.js"
import { AuthRequest } from "../../middleware/auth.middleware.js";



export async function getCurrentUser(req: Request, res: Response) {

    if (!req.userId) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId
        },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
            isVerified: true,
            avatarUrl: true,
        }
    })

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        success: true,
        data: {
            user,

        }
    }
    );

}