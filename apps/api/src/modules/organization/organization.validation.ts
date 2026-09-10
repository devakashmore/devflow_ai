import { z } from "zod"

export const createOrganizationSchema = z.object({
    name: z.string()
        .min(2, "Organization name must contain at least 2 characters")
        .max(100, "Organization name cannot exceed 100 characters")
})

export const addMemberSchema = z.object({
    email: z.string().email("Invalid email address"),

    role: z.enum([
        "ADMIN",
        "MANAGER",
        "DEVELOPER",
        "VIEWER",
    ]),
})
