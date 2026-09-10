import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createTaskController, getProjectTasksController, updateTaskController } from "./task.controller.js";
const router = Router();
router.post("/projects/:projectId/tasks", authenticate, createTaskController);
router.get("/projects/:projectId/tasks", authenticate, getProjectTasksController);
router.patch("/projects/:projectId/tasks/:taskId/status", authenticate, updateTaskController);
export default router;
