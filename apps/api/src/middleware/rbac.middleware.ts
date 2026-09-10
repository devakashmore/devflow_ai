import { Response, NextFunction } from "express"
import { prisma } from "../config/database.js"
import { AuthRequest } from "./auth.middleware.js"



type OrganizationRole = | "OWNER" | "ADMIN" | "MANAGER" | "DEVELOPER" | "VIEWER";

// export function requireOrganizationRole( allowedRoles: OrganizationRole) {
export function requireOrganizationRole(allowedRoles: OrganizationRole[]) {
    return async (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.userId) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication required"
                });
            }

            const organizationId = String(req.params.organizationId);

            if (!organizationId) {
                return res.status(401).json({
                    success: false,
                    message: "oragnization id is required"
                })
            }

            const membership = await prisma.organizationMember.findUnique({
                where: {
                    userId_organizationId: {
                        userId: req.userId,
                        organizationId,
                    },
                },
            });

            if (!membership) {
                return res.status(403).json({
                    success: false,
                    message: "You are not a member of this organization"
                })
            }

            if (!allowedRoles.includes(membership.role)) {
                return res.status(401).json({
                    success: false,
                    message: "You do not have permission for this action"
                });
            }

            next();
        } catch (error: any) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Authorization check failed",
            });
        }
    }
}
