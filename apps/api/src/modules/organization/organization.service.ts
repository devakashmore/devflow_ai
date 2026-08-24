import { prisma } from "../../config/database.js"
import { createSlug } from "./organization.utils.js"


export async function createOrganization(userId: string, name: string) {
    let slug = createSlug(name);

    const existingOrganization = await prisma.organization.findUnique({
        where: {
            slug,
        }
    });

    if (existingOrganization) {
        slug = `${slug}-${Date.now}`;
    }

    return prisma.organization.create({
        data: {
            name,
            slug,
            members: {
                create: {
                    userId,
                    role: "OWNER"
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
                            avatarUrl: true
                        },
                    },
                },
            },
        },
    });
}