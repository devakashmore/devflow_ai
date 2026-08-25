import { Response } from "express"
import { AuthRequest } from "../../middleware/auth.middleware.js"
import { createOrganizationSchema } from "./organization.validation.js"
import { createOrganization, getOrganization } from "./organization.service.js"


export async function createOrganizationController(req: AuthRequest, res: Response) {
    try {

        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const data = createOrganizationSchema.parse(req.body);
        const organization = await createOrganization(req.userId, data.name);
        return res.status(201).json({
            success: true,
            message: "Organization created successfully",
            data: {
                organization,
            },
        });

    } catch (error) {
        // console.error(error);

        return res.status(400).json({
            success: false,
            message: "Unable to create organization",
        });
    }
}

export async function getOrganizationController(req: AuthRequest, res: Response) {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "authentication required",
            });
        }

        const organization = await getOrganization(
            req.userId,
            req.params.organizationId
        );
        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found",
            })
        }
        return res.json({
            success: true,
            data: {
                organization,
            },
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch organization",
        });
    }
}