import { prisma } from "../../config/database.js";
import { createSlug } from "./organization.utils.js";
export async function createOrganization(userId, name) {
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
export async function getOrganization(userId, organizationId) {
    return prisma.organization.findFirst({
        where: {
            id: organizationId,
            members: {
                some: {
                    userId,
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
export async function getOrganizationMembers(organizationId) {
    return prisma.organizationMember.findMany({
        where: {
            organizationId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                },
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}
export async function addOrganizationMember(organizationId, email, role) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    const existingMember = await prisma.organizationMember.findUnique({
        where: {
            userId_organizationId: {
                userId: user.id,
                organizationId,
            },
        },
    });
    if (existingMember) {
        throw new Error("MEMBER_ALREADY_EXISTS");
    }
    return prisma.organizationMember.create({
        data: {
            userId: user.id,
            organizationId,
            role,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                },
            },
        },
    });
}
