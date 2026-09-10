import express from "express"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"



dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    // origin: "*",
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());

const PORT = Number(process.env.PORT) || 8000

app.get("/api/healthcheck", (req, res) => {
    res.json({ success: true, message: "healthy ok !" })
})

import authRoutes from "./modules/auth/auth.routes.js"
app.use("/api/v1/auth", authRoutes);

import userRoutes from "./modules/user/user.routes.js";
app.use("/api/v1/user", userRoutes);

import organizationRoutes from "./modules/organization/organization.route.js";

app.use("/api/v1/organizations", organizationRoutes);

import projectRoutes from "./modules/projects/project.routes.js";

app.use("/api/v1", projectRoutes);


import taskRoutes from "./modules/tasks/task.routes.js";
app.use("/api/v1", taskRoutes);


// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});