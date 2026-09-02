import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { createProjectSchema } from "./project.validation.js"
import {
    createProject
} from "./project.service.js";


export async function createProjectController(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const data = createProjectSchema.parse(req.body);
        const project = await createProject(
            req.userId,
            req.params.organizationId,
            data.name,
            data.description
        );

        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            data: {
                project,
            },
        });

    } catch (error) {
        if (
            error instanceof Error &&
            error.message ===
            "NOT_ORGANIZATION_MEMBER"
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not a member of this organization",
            });
        }


        if (
            error instanceof Error &&
            error.message ===
            "INSUFFICIENT_PERMISSION"
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You do not have permission to create projects",
            });
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Unable to create project",
        });

    }
}
