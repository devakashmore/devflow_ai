import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";

import {
    createProjectController, getProjectController,
    getProjectMembersController
} from "./project.controller.js";


const router = Router();
router.get(
    "/projects",
    authenticate,
    getProjectController
);

router.post("/organizations/:organizationId/projects",
    authenticate,
    createProjectController
);

router.get("/projects/:projectId/members", authenticate, getProjectMembersController);

export default router;