import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";

import {
    createProjectController, getProjectController
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


export default router;