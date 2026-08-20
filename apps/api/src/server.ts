import express from "express"
import helmet from "helmet"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./modules/auth/auth.routes.js"


dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({
    origin: "*",
}));
app.use(express.json());

const PORT = process.env.PORT || 8000

app.get("/api/healthcheck", (req, res) => {
    res.json({ success: true, message: "healthy ok !" })
})


app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})