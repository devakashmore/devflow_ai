import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createTaskController, getProjectTasksController } from "./task.controller.js";


const router = Router();

router.post(
    "/projects/:projectId/tasks",
    authenticate,
    createTaskController
);

router.get("/projects/:projectId/tasks",
    authenticate,
    getProjectTasksController);

export default router;