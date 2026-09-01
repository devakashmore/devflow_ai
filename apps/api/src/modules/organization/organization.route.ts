import { Router } from "express"
import { authenticate } from "../../middleware/auth.middleware.js"
import {
    createOrganizationController, getOrganizationController, getMemberController,
    addMemberController,
} from "./organization.controller.js"
import { requireOrganizationRole } from "../../middleware/rbac.middleware.js";

const router = Router();

router.post("/", authenticate, createOrganizationController);
router.get("/:organizationId", authenticate, getOrganizationController);

router.get("/:organizationId/members", authenticate, getMemberController);
router.post(
    "/:organizationId/members",
    authenticate,
    requireOrganizationRole([
        "OWNER",
        "ADMIN",
    ]),
    addMemberController
);

router.get("/:organizationId/admin-test", authenticate, requireOrganizationRole(["OWNER", "ADMIN"]),
    (req, res) => {
        res.json({
            success: true,
            message: "You have admin-level access.",
        });
    })


export default router;