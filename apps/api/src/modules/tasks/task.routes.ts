import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createTaskController } from "./task.controller.js";


const router = Router();

router.post(
    "/projects/:projectId/tasks",
    authenticate,
    createTaskController
);


export default router;