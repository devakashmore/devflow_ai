import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { createTaskSchema } from "./task.validation.js";
import { createTask } from "./task.service.js";

export async function createTaskController(req: AuthRequest, res: Response) {

    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const data = createTaskSchema.parse(req.body);
        const task = await createTask(
            req.userId,
            req.params.projectId,
            data
        );
        return res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: {
                task,
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "PROJECT_NOT_FOUND"
        ) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        if (
            error instanceof Error &&
            error.message ===
            "NOT_ORGANIZATION_MEMBER"
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not a member",
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
                    "You do not have permission to create tasks",
            });
        }

        if (
            error instanceof Error &&
            error.message ===
            "ASSIGNEE_NOT_PROJECT_MEMBER"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Assignee is not a member of this project",
            });
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Unable to create task",
        });
    }
}

