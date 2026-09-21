import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { createProjectSchema } from "./project.validation.js"
import {
    createProject, getProjects, getProjectMembers
} from "./project.service.js";
import { success } from "zod";


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
            String(req.params.organizationId),
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

    } catch (error: any) {
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

export async function getProjectController(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const projects = await getProjects(req.userId);
        return res.status(200).json({
            success: true,
            message: "Projects fetched successfully",
            data: {
                projects,
            },
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch projects",
        });

    }
}

export async function getProjectMembersController(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const { projectId } = req.params;

        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const members = await getProjectMembers(
            req.userId,
            projectId
        );

        return res.status(200).json({
            success: true,
            message: "Project members fetched successfully",
            data: {
                members,
            },
        });
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            if (error.message === "PROJECT_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            if (error.message === "NOT_ORGANIZATION_MEMBER") {
                return res.status(403).json({
                    success: false,
                    message: "You are not a member of this organization",
                });
            }
        }

        return res.status(500).json({
            success: false,
            message: "Failed to fetch project members",
        });
    }
}