import bcrypt from "bcryptjs";
import { prisma } from "../../config/database.js";
export async function registerUser(input) {
    const { name, email, password } = input;
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            isVerified: true,
            createdAt: true
        }
    });
    return user;
}
export async function loginUser(input) {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error("User not found please enter correct email");
    }
    const matchPassword = await bcrypt.compare(password, user.passwordHash);
    if (!matchPassword) {
        throw new Error("Invalid password please enter valid password");
    }
    return user;
}
