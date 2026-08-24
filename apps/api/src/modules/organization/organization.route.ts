import { Router } from "express"
import { authenticate } from "../../middleware/auth.middleware.js"
import { createOrganizationController } from "./organization.controller.js"


const router = Router();

router.post("/", authenticate, createOrganizationController);


export default router