import { z } from "zod";
export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
    email: z.string().email("please provide valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be at most 50 characters long"),
});
export const loginSchema = z.object({
    email: z.string().email("please provide valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long").max(50, "Password must be at most 50 characters long"),
});
