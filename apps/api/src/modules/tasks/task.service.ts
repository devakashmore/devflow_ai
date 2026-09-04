import { prisma } from "../../config/database.js"

export async function createTask(
    userId: string,
    projectId: string,
    data: {
        title: string;
        description?: string;
        priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
        assigneeId?: string;
        dueDate?: string;

    }
) {

    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        },
        include: {
            organization: true,
            members: true
        },
    });

    if (!project) {
        throw new Error("PROJECT_NOT_FOUND");
    }

    const organizationMember = await prisma.organizationMember.findUnique({
        where: {
            userId_organizationId: {
                userId,
                organizationId: project.organizationId,
            },
        },
    });

    if (!organizationMember) {
        throw new Error("NOT_ORGANIZATION_MEMBER");
    }
    const allowedRoles = [
        "OWNER",
        "ADMIN",
        "MANAGER",
        "DEVELOPER",
    ];

    if (
        !allowedRoles.includes(organizationMember.role)
    ) {
        throw new Error("INSUFFICIENT_PERMISSION");
    }

    if (data.assigneeId) {
        const projectMember = await prisma.projectMember.findUnique({
            where: {
                projectId_userId: {
                    projectId,
                    userId: data.assigneeId,
                },
            },
        });

        if (!projectMember) {
            throw new Error(
                "ASSIGNEE_NOT_PROJECT_MEMBER"
            );
        }
    }

    return prisma.task.create({
        data: {
            title: data.title,
            description: data.description,
            priority: data.priority,
            assigneeId: data.assigneeId,
            creatorId: userId,
            projectId,
            dueDate: data.dueDate
                ? new Date(data.dueDate)
                : undefined,
        },

        include: {
            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true,
                },
            },
            creator: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
    });

}

export async function getProjectTasks(userId: string, projectId: string) {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId
        }
    })

    if (!project) {
        throw new Error("PROJECT_NOT_FOUND");
    }

    const member = await prisma.organizationMember.findUnique({
        where: {
            userId_organizationId: {
                userId,
                organizationId: project.organizationId,
            },
        },
    });
    if (!member) {
        throw new Error("NOT_ORGANIZATION_MEMBER");
    }

    return await prisma.task.findMany({
        where: {
            projectId
        },
        include: {
            assignee: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatarUrl: true
                },
            },
            creator: {
                select: {
                    id: true,
                    name: true
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}







