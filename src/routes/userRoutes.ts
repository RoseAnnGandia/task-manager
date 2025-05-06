import express from "express";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "@controllers/userController";
import { getTaskByUserId } from "@controllers/taskController";

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.get("/:id/tasks", getTaskByUserId);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export const userRoutes = router;
