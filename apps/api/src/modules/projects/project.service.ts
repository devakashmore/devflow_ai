import { prisma } from "../../config/database.js";
import { createProjectSlug } from "./project.utils.js";
export async function createProject(
    userId: string,
    organizationId: string,
    name: string,
    description?: string
) {
    const membership = await prisma.organizationMember.findUnique({
        where: {
            userId_organizationId: {
                userId,
                organizationId
            },
        },
    });
    if (!membership) {
        throw new Error("NOT_ORGANIZATION_MEMBER");
    }
    const allowedRoles = [
        "OWNER",
        "ADMIN",
        "MANAGER",
    ];

    if (!allowedRoles.includes(membership.role)) {
        throw new Error("INSUFFICIENT_PERMISSION");
    }
    let slug = createProjectSlug(name);

    const existingProject = await prisma.project.findUnique({
        where: {
            organizationId_slug: {
                organizationId,
                slug,
            },
        },
    });
    
    if (existingProject) {
        slug = `${slug}-${Date.now()}`;
    }

    return prisma.project.create({
        data: {
            name,
            description,
            slug,
            organizationId,
            members: {
                create: {
                    userId,
                    role: "MANAGER",
                },
            },
        },

        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
}