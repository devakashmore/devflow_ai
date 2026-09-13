import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { createTaskSchema, updateTakStatusSchema } from "./task.validation.js";
import { createTask } from "./task.service.js";
import { getProjectTasks, updateTaskStatus } from "./task.service.js"
// import { date, success } from "zod";
import { updateTaskSchema } from "./task.validation.js";
import { updateTask } from "./task.service.js";
import { success } from "zod";

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
            req.params.projectId as string,
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

export async function getProjectTasksController(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const task = await getProjectTasks(
            req.userId,
            req.params.projectId as string,
        );
        return res.status(200).json({
            success: true,
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
            error.message === "NOT_ORGANIZATION_MEMBER"
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not a member of this organization",
            });
        }

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch tasks",
        });
    }
}

export async function updateTaskStatusController(req: AuthRequest, res: Response) {
    try {

        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }
        const { status } = updateTakStatusSchema.parse(req.body);

        const task = await updateTaskStatus(
            req.userId,
            req.params.projectId as string,
            req.params.taskId as string,
            status
        );

        return res.status(200).json({
            success: true,
            message: "Task status updated successfully",
            data: { task },
        });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "PROJECT_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            if (error.message === "TASK_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: "Task not found",
                });
            }

            if (error.message === "NOT_ORGANIZATION_MEMBER") {
                return res.status(403).json({
                    success: false,
                    message: "You are not a member of this organization",
                });
            }
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Unable to update task",
        });

    }
}


export async function updateTaskController(
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

        const data = updateTaskSchema.parse(req.body);

        const task = await updateTask(
            req.userId,
            req.params.projectId,
            req.params.taskId,
            data
        );

        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: {
                task,
            },
        });




    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "PROJECT_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: "Project not found",
                });
            }

            if (error.message === "TASK_NOT_FOUND") {
                return res.status(404).json({
                    success: false,
                    message: "Task not found",
                });
            }

            if (error.message === "NOT_ORGANIZATION_MEMBER") {
                return res.status(403).json({
                    success: false,
                    message: "You are not a member of this organization",
                });
            }

            if (error.message === "INSUFFICIENT_PERMISSION") {
                return res.status(403).json({
                    success: false,
                    message: "You do not have permission to update tasks",
                });
            }
        }

        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Unable to update task",
        });
    }
}
