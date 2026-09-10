import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { createProjectController } from "./project.controller.js";
const router = Router();
router.post("/organizations/:organizationId/projects", authenticate, createProjectController);
export default router;
