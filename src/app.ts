import express from "express";
import { taskRoutes } from "@routes/taskRoutes";
import { userRoutes } from "@routes/userRoutes";
import { authRoutes } from "@routes/authRoutes";
import { errorHandler } from "@utils/errorHandler";
import { authenticateToken } from "@middlewares/authentication";
import { Request, Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});

app.use("/tasks", authenticateToken, taskRoutes);
app.use("/users", authenticateToken, userRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
