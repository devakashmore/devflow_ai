import { z } from "zod";
export const createTaskSchema = z.object({
    title: z.string()
        .min(2, "Task title must contain at least 2 characters")
        .max(200),
    description: z
        .string()
        .max(2000)
        .optional(),
    priority: z
        .enum([
        "LOW",
        "MEDIUM",
        "HIGH",
        "URGENT",
    ])
        .default("MEDIUM"),
    assigneeId: z
        .string()
        .optional(),
    dueDate: z
        .string()
        .datetime()
        .optional()
});
export const updateTakStatusSchema = z.object({
    status: z.enum([
        "TODO",
        "IN_PROGRESS",
        "IN_REVIEW",
        "DONE",
    ]),
});
